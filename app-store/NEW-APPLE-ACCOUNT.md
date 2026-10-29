# New Apple Developer account

The owner confirmed that NFTALT will be published from a DIFFERENT Apple account than TSQ2.0. No TSQ Team ID, Bundle ID, certificate, provisioning profile or App Store Connect API key is used for signing this diary. TSQ is only a technical implementation reference.

## Required owner configuration

1. In the new Apple Developer account, register a unique explicit App ID and create an Apple Distribution certificate/profile for that ID. Create a matching App Store Connect app.
2. In Xcode, set the NEW Team and Bundle ID. The account has been verified in the browser: Team `P27PL3XZ88`, registered App ID `com.heddichloe.originaldiary`, App Store Connect app `6828440288` with the name NFTALT. The target is configured for that Team and ID; signing still needs this account's certificate/profile.
3. In UIpath repository Actions secrets add only credentials belonging to the NEW account:
   - NFTALT_APP_STORE_CONNECT_API_KEY_BASE64
   - NFTALT_APP_STORE_CONNECT_API_KEY_ID
   - NFTALT_APP_STORE_CONNECT_API_ISSUER_ID
   - NFTALT_BUILD_CERTIFICATE_BASE64
   - NFTALT_P12_PASSWORD
   - NFTALT_KEYCHAIN_PASSWORD
4. When manually running the upload workflow, enter that account's Team ID, registered Bundle ID and a unique positive build number. The workflow verifies the profile application identifier against both before archiving/uploading.

Never send private keys or certificate passwords in chat or commit them. Repository secrets are not copied from TSQ2.0. Public support contact and App Store publisher details must also be confirmed for the new app/account.
