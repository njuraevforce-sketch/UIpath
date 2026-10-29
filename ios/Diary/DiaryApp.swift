import SwiftUI

@main
struct DiaryApp: App {
    @Environment(\.scenePhase) private var scenePhase
    var body: some Scene {
        WindowGroup {
            ZStack {
                DiaryWebView().ignoresSafeArea()
                if scenePhase != .active {
                    Color(red: 0.965, green: 0.957, blue: 0.941).ignoresSafeArea()
                    VStack(spacing: 12) {
                        Image(systemName: "book.closed").font(.system(size: 42)).foregroundStyle(.orange)
                        Text("NFTALT").font(.headline)
                    }.accessibilityLabel("Your private diary is hidden")
                }
            }.preferredColorScheme(.light)
        }
    }
}
