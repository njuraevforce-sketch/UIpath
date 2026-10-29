# TSQ2.0 reference review

Read-only reference: `njuraevforce-sketch/TSQ2.0`, commit `bdb60955efb9bbccca6615adf4ade01dd8d84cf0`. The latest observed Upload PIXEL to App Store Connect workflow completed successfully; workflow upload success is not independent proof of App Review approval.

Adapted patterns:
- WKWebView and system iOS Share/Files.
- Local iOS application-container persistence with a bootstrap snapshot.
- English native alerts, privacy declaration and export-compliance setting.
- Manual signing/upload workflow using diary-specific secrets for the new Apple account, with profile/Team/Bundle ID verification.
- Unsigned simulator compilation in GitHub Actions.

Intentionally app-specific:
- New diary purpose, writing/calendar/favorites features and its own app identity.
- A new registered Bundle ID and Team from the new Apple account; TSQ2.0 keeps its own account and app identity.
- Diary resources are packaged locally for offline first launch, rather than loading TSQ's `https://ktrading.org/`.
- No planner timers or notification permission, because those are not needed for diary functionality.
- No sharing of PIXEL user data or changes to the TSQ repository.

This comparison informs implementation and build preparation. It is not an Apple approval certificate.
