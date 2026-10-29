# NFTALT signing setup

New Apple Team: P27PL3XZ88. Bundle ID: com.heddichloe.originaldiary.
Apple Distribution certificate 3G2F7ZN2QS and App Store profile U9MJNR4JTU (NFTALT App Store 20261029) created with owner authorization on October 29, 2026. Certificate and profile were verified to match each other and this app/team.

The upload workflow installs the owner-generated profile from encrypted NFTALT_PROVISIONING_PROFILE_BASE64. It does not need an API key with certificate-management privileges. Use a Developer role team API key for uploads. Private signing material is kept out of source code.

Required repository secrets: NFTALT_APP_STORE_CONNECT_API_KEY_BASE64, NFTALT_APP_STORE_CONNECT_API_KEY_ID, NFTALT_APP_STORE_CONNECT_API_ISSUER_ID, NFTALT_BUILD_CERTIFICATE_BASE64, NFTALT_PROVISIONING_PROFILE_BASE64, NFTALT_P12_PASSWORD, NFTALT_KEYCHAIN_PASSWORD.
