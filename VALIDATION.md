# Validation — NFTALT 1.1.0

## Passed locally

- Vue 2.7.16 / Vue CLI 5 production compilation.
- Release verification: English manifest/UI, privacy/support/terms pages, service worker, synchronized PWA/HBuilderX/iOS resource copies.
- SHA-256 verification of 22 unchanged artwork files against the user-supplied archive inventory.
- Headless Chromium functional checks at 390×844, timezone Asia/Tashkent: entry creation, edit, deletion, search, mood filter, favorites, date/calendar lookup and profile name.
- Original artwork cover selection, avatar selection and carousel controls.
- Service worker registration and offline reload; entry persistence and artwork loading without network.
- Browser JSON export, text import, merging and migration of legacy Russian mood labels to English without changing user-authored text.
- Unsaved-edit confirmation and full diary/profile deletion; larger-text preference resets on deletion.
- Native-message export/import paths tested with a simulated browser bridge only.
- No horizontal overflow at 320px, 390px or 768px in the checked pages.
- No uncaught JavaScript errors in the tested scenarios.
- Manual visual inspection of Home, Entries and Profile screenshots.
- Native source structure: Info.plist and PrivacyInfo.xcprivacy parse; shared scheme XML and PBX object references validate.

## Not verified / not performed

- Swift compilation, Xcode Archive, code signing, signed IPA validation, TestFlight and physical iPhone/iPad testing.
- Target repository is now `njuraevforce-sketch/UIpath`. Native compilation status is determined by the Actions run linked in the delivery message.
- Public HTTPS hosting, installation on actual iOS Safari and public legal URL reachability.
- Apple review, metadata submission, privacy report of a signed binary and legal verification of artwork rights.
- External dependency audit: automatically rejected because npm audit would send dependency metadata to an external registry. It was not retried by another route. The previously reported dependency vulnerabilities have not been certified as resolved.

Vue CLI reports only a bundle-size performance recommendation during production build; the build completes. Vue 2 is end-of-life and remains here because Vue 2 was explicitly requested.

The additional native mirror uses application-container storage and source-level validation; actual iOS compilation is checked in GitHub Actions.
