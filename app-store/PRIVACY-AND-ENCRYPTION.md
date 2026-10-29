# App Store Connect declarations — preparation guide

These are expected answers for the standalone Swift/WKWebView target as written. Validate the signed binary and any added SDK before submitting. The HBuilderX runtime needs its own assessment.

## Privacy

- Diary content, dates, moods, favorites, optional profile name and illustration choices stay in local WebKit storage.
- There is no developer-operated account, cloud sync endpoint, analytics integration, advertising SDK or tracking domain in the standalone target.
- Backup export is an explicit user action. The file goes to the user's selected destination. Do not classify unrelated third-party apps as if they were embedded diary SDKs.
- Support email is an optional external mail action. Disclose support correspondence as described in the policy and assess its actual handling by the publisher.
- The hosted PWA has normal hosting request logs, which need to be considered when making declarations for any variant that loads remote resources.
- Do not copy a blanket "Data Not Collected" declaration to a different wrapper that adds telemetry or SDKs.

## Privacy manifest

`ios/Diary/PrivacyInfo.xcprivacy` is included in the native target resources. It reflects the supplied source: no tracking domains, no developer-collected data types and no directly invoked required-reason API category declared. Review the Xcode privacy report and required-reason API list for the final executable. If you add a covered API, declare an approved reason matching its actual use.

The manifest is not a certificate of compliance and cannot describe unknown SDK behavior.

## Encryption

`ITSAppUsesNonExemptEncryption` is set to false for the standalone target. It does not implement its own cryptography and uses system-provided storage/data protection. Reassess the declaration if adding cryptography, a VPN or other encryption functionality.

## Publisher inputs still required

- Apple developer legal identity, copyright and actual support contact.
- Real public HTTPS privacy and support URLs after deployment.
- Correct age-rating questionnaire answers and geographic availability.
- Confirmation of rights to included artwork and brand.
