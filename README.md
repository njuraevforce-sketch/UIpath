# NFTALT — Vue 2 PWA

A private English-language diary using the visual style and original artwork supplied by the project owner. No account, advertising, deposits, purchases, NFT trading or financial functionality is included. The illustrations are diary covers and avatars.

## Open the right folder

This folder contains `package.json` and the Vue source. The build outputs are:

- `PWA/`: ready-to-host installable web app.
- `HBuilderX-App/`: HTML5+ project for HBuilderX cloud packaging.
- `ios/Diary.xcodeproj`: standalone Swift/WKWebView wrapper for Xcode, with the same PWA interface bundled locally.

## Development on Windows/macOS

Use Node.js 20 or 22 LTS.

```sh
npm ci
npm run dev
```

`npm run serve` is an alias for the same development server. Open the URL printed in the terminal. The development server is not the offline production build.

```sh
npm run build
npm run verify:release
```

Build creates `dist`, generates its service worker and synchronizes `PWA`, `HBuilderX-App` and `ios/Diary/Web`. All illustrations and interface resources are local, not loaded from third-party sites.

## Deploy the PWA

Upload the contents of `PWA` to an HTTPS host, at the site root or a subdirectory. Serve `.webmanifest` as `application/manifest+json` and `.js` as JavaScript. Use `Cache-Control: no-cache` for `sw.js` and the entry HTML; hashed JS/CSS may use long-lived caching. The PWA is not deployed by this archive.

On iPhone: Safari → Share → Add to Home Screen → open as a web app. The first successful online load fills the offline cache. Subsequent launches work offline. The PWA and a separate native installation can have different storage; use a backup to move entries.

Legal/support pages: `privacy.html`, `support.html`, `terms.html`. After deployment, use their real absolute HTTPS URLs in App Store Connect. The configured support address is `n.juraevforce@gmail.com`, from the connected GitHub profile; confirm it before publication.

## App Store packaging

A PWA does not itself produce an App Store upload. Choose one iOS wrapper:

### HBuilderX

Import `HBuilderX-App` as an existing HTML5+ project. Open `manifest.json`, obtain your own DCloud AppID, set your iOS Bundle ID, and provide Apple distribution signing credentials in the cloud packaging dialog. The project intentionally has no invented DCloud ID. Test the chosen runtime and its privacy/SDK declarations before submission.

### Standalone Xcode target

Open `ios/Diary.xcodeproj` on a Mac. The new app uses a different Apple Developer account. Verified Team `P27PL3XZ88` and registered Bundle ID `com.heddichloe.originaldiary` are configured; run on a device, then archive and validate. This target uses native share/file pickers and a privacy cover while inactive. See `ios/README.md`.

No signing credentials, signed IPA, store submission or Apple approval is included. The manual `Upload NFTALT to App Store Connect` workflow uses diary-specific `DIARY_` secrets for the NEW account and accepts its Team ID / Bundle ID as manual inputs. The upload workflow is never triggered by a push. Review `app-store/RELEASE-CHECKLIST.md` for remaining owner/device steps.

## Features

Create, edit and delete entries; date and mood; 22 selectable illustrated covers; avatar selection; calendar; full-text search; favorites; optional profile name; larger text; JSON backup export/import; delete all personal diary data; privacy/support pages.

Backups are merged by ID, preferring newer timestamps. Legacy Russian mood labels are migrated to English, while user-written content is preserved. The interface is English throughout.

## Privacy and backups

Diary content is stored locally and is not uploaded by the app. It is not additionally encrypted by the application. Protect your device and export backups regularly. Deleting the app or clearing storage may erase data. Exported copies remain wherever you saved them until you delete them.

The browser downloads a JSON backup. The standalone Xcode wrapper shares a JSON file through iOS and imports with Files. The HBuilderX option saves a local backup and shares JSON text; it can be restored using paste or a JSON/TXT file.

## Verification and limitations

See `VALIDATION.md`, `ARTWORKS-PROVENANCE.md` and `app-store/RELEASE-CHECKLIST.md`. Vue 2 was explicitly requested and is end-of-life. An external npm audit was blocked by automatic approval review; dependency audit clearance is not claimed. Native iOS compilation and physical-device testing must be completed on macOS/iOS before submission.

## GitHub and comparison with TSQ2.0

Repository: https://github.com/njuraevforce-sketch/UIpath

The legacy UIpath files are replaced by this diary. Before replacement the old commit is preserved in `backup/before-original-diary-20261029`. TSQ2.0 is a read-only reference and is not modified. Its WebKit/native-container persistence, system Share/Files and signing workflow patterns are adapted for this product. Its PIXEL Bundle ID, web domain, planner data and app identity are not copied.

Unlike TSQ's server-only launch, this diary packages its reviewed PWA resources locally so it works offline from first launch. Native iOS mirrors diary state atomically into its own Application Support container. Browser storage is retained as a fallback; the latest saved snapshot is selected on relaunch.

`Verify NFTALT` compiles the web app and unsigned iOS Simulator target. `Deploy diary PWA to GitHub Pages` is a manual workflow; first select GitHub Actions as the repository Pages source. It would publish the PWA and legal pages at the URL returned by the deployment; no live Pages deployment is asserted until it succeeds. `Upload NFTALT to App Store Connect` is also manual and requires the authorized signing secrets and an app-specific profile.
