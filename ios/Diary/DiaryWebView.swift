import SwiftUI
import UIKit
import WebKit
import UniformTypeIdentifiers

struct DiaryWebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator { Coordinator() }
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()
        context.coordinator.updateBootstrap(in: config.userContentController)
        config.userContentController.add(context.coordinator, name: "diary")
        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.scrollView.bounces = false
        web.isOpaque = false
        web.backgroundColor = UIColor(red: 0.965, green: 0.957, blue: 0.941, alpha: 1)
        context.coordinator.webView = web
        if let root = Bundle.main.url(forResource: "Web", withExtension: nil),
           let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") {
            web.loadFileURL(url, allowingReadAccessTo: root)
        }
        return web
    }
    func updateUIView(_ uiView: WKWebView, context: Context) {}
    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "diary")
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler, UIDocumentPickerDelegate {
        weak var webView: WKWebView?
        private let limit = 10 * 1024 * 1024
        private var dataFile: URL {
            FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
                .appendingPathComponent("OriginalDiary", isDirectory: true).appendingPathComponent("state.json")
        }
        func updateBootstrap(in controller: WKUserContentController) {
            let encoded = (try? Data(contentsOf: dataFile))?.base64EncodedString() ?? ""
            controller.removeAllUserScripts()
            controller.addUserScript(WKUserScript(source: "window.__DIARY_NATIVE_DATA_B64__ = '\(encoded)';",
                injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }
        private func reportStorageError() {
            webView?.evaluateJavaScript("window.dispatchEvent(new CustomEvent('diary-native-error',{detail:'Could not save the iOS data copy. Export a backup and check device storage.'}));")
        }
        private func isLocal(_ url: URL?) -> Bool {
            guard let url, url.isFileURL,
                  let root = Bundle.main.url(forResource: "Web", withExtension: nil) else { return false }
            return url.standardizedFileURL.path.hasPrefix(root.standardizedFileURL.path + "/")
        }
        private func present(_ controller: UIViewController) {
            guard let root = webView?.window?.rootViewController else { return }
            var top = root
            while let next = top.presentedViewController { top = next }
            if let pop = controller.popoverPresentationController {
                pop.sourceView = top.view
                pop.sourceRect = CGRect(x: top.view.bounds.midX, y: top.view.bounds.midY, width: 1, height: 1)
                pop.permittedArrowDirections = []
            }
            top.present(controller, animated: true)
        }
        private func showError(_ message: String) {
            let alert = UIAlertController(title: "NFTALT", message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert)
        }
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "diary", message.frameInfo.isMainFrame,
                  isLocal(message.frameInfo.request.url),
                  let body = message.body as? [String: Any], let action = body["action"] as? String else { return }
            switch action {
            case "save":
                guard let content = body["content"] as? String, let bytes = content.data(using: .utf8), bytes.count <= limit,
                      let state = (try? JSONSerialization.jsonObject(with: bytes)) as? [String: Any],
                      state["entries"] is [[String: Any]] else { reportStorageError(); return }
                do {
                    try FileManager.default.createDirectory(at: dataFile.deletingLastPathComponent(), withIntermediateDirectories: true)
                    try bytes.write(to: dataFile, options: [.atomic, .completeFileProtectionUnlessOpen])
                    updateBootstrap(in: userContentController)
                } catch { reportStorageError() }
            case "export":
                guard let content = body["content"] as? String, let data = content.data(using: .utf8), data.count <= limit,
                      (try? JSONSerialization.jsonObject(with: data)) != nil else {
                    showError("Could not prepare your backup."); return
                }
                let file = FileManager.default.temporaryDirectory.appendingPathComponent("diary-backup-\(UUID().uuidString).json")
                do {
                    try data.write(to: file, options: [.atomic, .completeFileProtectionUnlessOpen])
                    let share = UIActivityViewController(activityItems: [file], applicationActivities: nil)
                    share.completionWithItemsHandler = { _, _, _, _ in try? FileManager.default.removeItem(at: file) }
                    present(share)
                } catch { showError("Could not write your backup.") }
            case "import":
                let picker = UIDocumentPickerViewController(forOpeningContentTypes: [.json, .plainText], asCopy: true)
                picker.delegate = self
                picker.allowsMultipleSelection = false
                present(picker)
            default: break
            }
        }
        func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
            guard let url = urls.first else { return }
            let scoped = url.startAccessingSecurityScopedResource()
            defer { if scoped { url.stopAccessingSecurityScopedResource() } }
            guard let stream = InputStream(url: url) else { showError("Could not open the file."); return }
            stream.open(); defer { stream.close() }
            var data = Data()
            var buffer = [UInt8](repeating: 0, count: 8192)
            while true {
                let count = stream.read(&buffer, maxLength: buffer.count)
                if count < 0 { showError("Could not read the file."); return }
                if count == 0 { break }
                data.append(contentsOf: buffer.prefix(count))
                if data.count > limit { showError("The file is larger than 10 MB."); return }
            }
            guard let text = String(data: data, encoding: .utf8),
                  let encodedData = try? JSONSerialization.data(withJSONObject: [text]),
                  let encoded = String(data: encodedData, encoding: .utf8) else {
                showError("Choose a JSON backup encoded as UTF-8."); return
            }
            let script = "window.dispatchEvent(new CustomEvent('diary-native-import', {detail: \(encoded)[0]}));"
            webView?.evaluateJavaScript(script) { _, error in
                if error != nil { self.showError("Return to your diary and try importing again.") }
            }
        }
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            let url = navigationAction.request.url
            if isLocal(url) || url?.absoluteString == "about:blank" {
                decisionHandler(.allow)
            } else {
                if let url {
                    let scheme = url.scheme?.lowercased() ?? ""
                    if scheme == "mailto" || (scheme == "https" && navigationAction.navigationType == .linkActivated) {
                        UIApplication.shared.open(url)
                    }
                }
                decisionHandler(.cancel)
            }
        }
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if navigationAction.targetFrame == nil, isLocal(navigationAction.request.url) {
                webView.load(navigationAction.request)
            }
            return nil
        }
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            if (error as NSError).code != NSURLErrorCancelled { showError("Could not open your diary. Please restart the app.") }
        }
    }
}
