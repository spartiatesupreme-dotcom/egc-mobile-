# Build Android with Android Studio

## Requirements

- Node.js 20 or newer
- Android Studio with the Android SDK installed
- JDK 21

## Open the project

1. Optionally configure `VITE_API_URL` in a `.env.production` file with the
   HTTPS URL of the backend API. It defaults to
   `https://egc-front-production.up.railway.app`; set `VITE_API_URL` only when
   using a different endpoint.
2. From the project directory, run `npm run android:sync` to build the web site,
   copy it into the Android WebView, and build the APK.
3. Run `npm run android:open` or open the `android` folder in Android Studio.
4. In Android Studio, wait for Gradle sync to finish, then choose **Build >
   Build Bundle(s) / APK(s) > Build APK(s)**.

The APK is produced under `android/app/build/outputs/apk/`.

Run `npm run android:sync` again after changing the app so the APK contains the
latest site and bundled offline content.

## Offline-first behavior

Android displays the React site in a Capacitor WebView. The site, Bible module,
and Bible text are bundled in the APK, so use **Bible > Lire la Bible** without
an Internet connection. Other features that contact the backend still require
network access; announcements and events already loaded online, along with
their uploaded images, remain available from the on-device cache offline.

The dependencies are already declared in `package.json`. For a fresh checkout:

```sh
npm install
npm run android:sync
```

## Backend access

The Android app cannot reach a development backend through `localhost`.
Configure `VITE_API_URL` to a backend address reachable by the device. For
production, use HTTPS. The Android app calls the API directly and does not
depend on browser CORS permissions.

## Local backend prototype

The Express + SQLite prototype is in `server/`. Configure its `server/.env`
from `server/.env.example`, then run `npm run server:dev` from the project root.
The backend requires Node.js 22.13 or newer. The Android emulator/device must
be able to reach the backend host; do not use `localhost` from the Android app.
Use a private HTTPS endpoint before handling real users or donations.

MTN MoMo is not connected yet. The app can record an unpaid intent for the
admin to review, but no payment is initiated or confirmed. Follow
`server/README.md` before treating donations as received.
