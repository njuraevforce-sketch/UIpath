# Standalone iOS target

Open `Diary.xcodeproj` on a Mac with an Xcode release accepted by App Store Connect. Select the shared **Diary** scheme.

1. Use the NEW Apple Developer account, its Team ID, registered Bundle ID, provisioning profile and App Store Connect listing. The example `com.example.originaldiary` must be replaced consistently before signing. Do not use TSQ2.0 account credentials or app identifiers.
2. Run the app on a physical iPhone. The included `Diary/Web` folder is the production PWA resource bundle and works offline without a remote launch URL.
3. Test writing, relaunch persistence, search, mood filtering, favorites, calendar, backup export via the system share sheet and import via the Files picker. Test on iPad too if retaining universal support.
4. In Xcode use Product > Archive, then Validate App and Distribute App through Organizer.
5. Complete App Store Connect metadata, public legal URLs, privacy declarations, age rating and screenshots using `../app-store` as preparation material.

No third-party Swift packages or native SDKs are included in this target. The application embeds WKWebView and system iOS components. The HTML5+ HBuilderX option is separate and has a different runtime; validate its SDK/privacy behavior independently.

Source and plist structure have been checked on Linux. This target has NOT been compiled, signed, installed, archived or validated by Xcode in this environment. No IPA is supplied.

The privacy manifest contains no declared tracking, developer-collected data or directly used required-reason API categories for this source target. Verify the final Xcode privacy report and update it if you add APIs or SDKs. Copying a privacy manifest next to web assets does not replace bundling it in the native target; this project includes it in Copy Bundle Resources.

`npm run build` at the Vue project root updates `Diary/Web` automatically. Bundle ID changes can create a different app/data container: keep the same ID when updating an existing published app.

The native wrapper keeps a mirrored state.json in the application support container, written atomically with system data protection. Browser WebKit storage is retained as a fallback; the latest saved snapshot is used. The mirror contains the same diary content and is reset to anonymous empty state by Delete all data.
