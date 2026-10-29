# New Apple Developer account

The owner confirmed that Original Diary will be published from a DIFFERENT Apple account than TSQ2.0. No TSQ Team ID, Bundle ID, certificate, provisioning profile or App Store Connect API key is used for signing this diary. TSQ is only a technical implementation reference.

## Required owner configuration

1. In the new Apple Developer account, register a unique explicit App ID and create an Apple Distribution certificate/profile for that ID. Create a matching App Store Connect app.
2. In Xcode, set the NEW Team and Bundle ID. The source intentionally contains an empty Team and `com.example.originaldiary` as a placeholder, so unsigned Simulator verification works without any Apple account.
3. In UIpath repository Actions secrets add only credentials belonging to the NEW account:
   - DIARY_APP_STORE_CONNECT_API_KEY_BASE64
   - DIARY_APP_STORE_CONNECT_API_KEY_ID
   - DIARY_APP_STORE_CONNECT_API_ISSUER_ID
   - DIARY_BUILD_CERTIFICATE_BASE64
   - DIARY_P12_PASSWORD
   - DIARY_KEYCHAIN_PASSWORD
4. When manually running the upload workflow, enter that account's Team ID, registered Bundle ID and a unique positive build number. The workflow verifies the profile application identifier against both before archiving/uploading.

Never send private keys or certificate passwords in chat or commit them. Repository secrets are not copied from TSQ2.0. Public support contact and App Store publisher details must also be confirmed for the new app/account.
