# Release status — NFTALT 1.1.0

## Prepared in this package

- English Vue 2 interface, PWA manifest, service worker and offline cache.
- Original user-supplied artwork files, checksum inventory, 22 cover/avatar options.
- Real entry creation, editing, deletion, search, mood filtering, calendar and favorites.
- Local data storage, backup export/import, per-entry and all-data deletion.
- Public-ready English privacy, support and terms pages in the PWA output.
- English App Store metadata and truthful reviewer instructions.
- Native Swift/WKWebView source target loading nftalt1.com with packaged offline fallback, iOS share/file picker integration and background privacy cover.
- PrivacyInfo.xcprivacy, Info.plist, app icons and a shared Xcode scheme.
- HBuilderX HTML5+ alternative and synchronized production assets.

## Required before submission — not completed here

1. Target repository: `njuraevforce-sketch/UIpath`. Confirm the deployment domain, then deploy the PWA via HTTPS and check public /privacy.html and /support.html URLs. Relative paths in metadata are not App Store Connect URLs.
2. Confirm that n.juraevforce@gmail.com is the intended published support mailbox. It comes from the connected GitHub profile. Change src/release-config.json and the legal pages if another address is desired.
3. Confirm artwork rights and the developer/publisher identity shown in Apple Developer and App Store Connect. The archive documentation describes AI-generated artwork, but rights were not independently verified.
4. The new diary uses a different Apple Developer account. Set its Team ID and unique registered Bundle ID, and create its own App Store Connect app/profile. Verified new account: Team `P27PL3XZ88`, registered App ID `com.heddichloe.originaldiary`, App Store Connect app `6828440288` named NFTALT. Certificate/profile setup is still required before signing.
5. Compile with Xcode 26 or newer and iOS SDK 26 or newer, as required for current App Store uploads. Archive and validate on macOS. The Swift target has not been compiled in this Linux environment.
6. Test on physical iPhone and, if keeping universal device support, iPad: keyboard, rotations, safe area, iPad share-sheet popover, first-launch offline, relaunch persistence, sharing, import cancellation, all-data deletion and privacy cover.
7. Generate App Store screenshots from the actual release build. Do not use screenshots showing unrelated financial features or the reference NFT application.
8. Inspect the signed archive's privacy report. The supplied privacy manifest describes the standalone target as written, not an arbitrary third-party wrapper or SDK. Audit any additional SDKs separately.
9. Complete App Privacy, age rating, export compliance, copyright and country availability accurately. Choose answers based on the actual distributed binary and hosting behavior.
10. Run TestFlight testing, then upload the release build and submit. Final approval is Apple's decision.

## Dependency status

Vue 2 was explicitly requested and is end-of-life. Vue CLI also includes older development dependencies. Previously reported npm warnings and vulnerabilities have not been certified as resolved. The npm audit request was blocked by automatic approval review because it would disclose dependency metadata to an external registry. No alternative external audit was attempted. The release was checked locally by compilation, source/asset checks and browser functional tests only.

## PWA versus App Store

The PWA can be installed from Safari. App Store distribution requires an iOS app binary that is reviewed as an app; a PWA label is not an approval exemption. Guideline 4.2 requires adequate utility beyond a repackaged website. This diary provides real offline authoring and organization, but no 100% approval guarantee is made.

Official sources consulted on October 29, 2026:
- https://developer.apple.com/app-store/review/guidelines/
- https://developer.apple.com/app-store/review/
- https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
- https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api

## Hosted delivery and privacy

The online-first target supersedes the bundled-only description above. Deploy the current PWA/ output to nftalt1.com. Declare retained technical hosting logs as described in PRIVACY-HOSTING.md; the previous no-collection draft must not be published. The prepared privacy manifest declares linked Other Diagnostic Data for App Functionality, without tracking. Confirm actual hosting uses before final submission.
