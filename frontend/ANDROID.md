# Build Android with Android Studio

## Requirements

- Node.js 20 or newer
- Android Studio with the Android SDK installed
- JDK 21

## Open the project

1. Configure `VITE_API_URL` in a `.env.production` file with the HTTPS URL of
   the backend API (`https://egc-api-production-89c8acaf.up.railway.app` for
   production). Set `VITE_APP_DOWNLOAD_URL` to the public site URL as well.
   See `.env.example`.
2. The Capacitor app embeds the built `dist` bundle locally. It does not load
   the published site remotely, so the APK remains independent of website
   deployments. Online data uses the production API.
3. From the `frontend/` directory, run `npm run android:sync`.
4. Run `npm run android:open` or open the `android` folder in Android Studio.
5. In Android Studio, wait for Gradle sync to finish, then choose **Build >
   Build Bundle(s) / APK(s) > Build APK(s)**.

The APK is produced under `android/app/build/outputs/apk/`.

Run `npm run android:sync` again after changing the web app so the Android
project receives the latest build.

The API URL must point to the deployed backend over HTTPS, without a trailing slash.
Production builds reject HTTP and localhost API URLs to prevent shipping an app
that sends requests or credentials to an insecure or unreachable server. The
Live and sermons screen gets its video list from that backend's `/api/videos`
route; the videos will not load if the URL is missing, points to `localhost`,
or the backend is not reachable from the phone. Production builds now stop
with an error when `VITE_API_URL` is not configured. After changing the URL,
build and install a new APK; an installed APK cannot pick up the setting. The
embedded interface does not require the website to load. Internet is still
required for live announcements, administration, registrations, donations,
YouTube and map data.

## Backend access

The Android app cannot reach a development backend through `localhost`.
Configure `VITE_API_URL` to a backend address reachable by the device. For
production, use HTTPS and allow the Android app's Capacitor origin in the
backend CORS configuration.

## Local backend prototype

The Express + SQLite prototype is in the sibling `backend/` directory. Configure
`backend/.env` from `backend/.env.example`, then run `npm run server:dev` from
the `frontend/` directory (or run `npm run dev` from `backend/`). The backend
requires Node.js 22.13 or newer. The Android emulator/device must
be able to reach the backend host; do not use `localhost` from the Android app.
Use a private HTTPS endpoint before handling real users or donations.

The administration dashboard is available at `/admin` in the frontend. Admins
can manage and publish announcements, upload images, view registration
addresses, and export registration lists. Registration exports include
personal contact and address information; store them securely.

### Testing on a physical Android phone

The phone and development computer must be on the same Wi-Fi network, and the
API must be reachable from the phone. For a local debug build, set
`VITE_API_URL` to the computer's Wi-Fi IP and run the Android sync/build steps.
The debug manifest permits HTTP for local testing only; release builds do not
inherit this permission. The computer's IP may change, so update it before
building again if needed. Use HTTPS for a production API.

MTN MoMo is not connected yet. The app can record an unpaid intent for the
admin to review, but no payment is initiated or confirmed. Follow
`../backend/README.md` before treating donations as received.

## Publishing the APK

The website's Android download button points to the latest GitHub Release asset
named `EGC-Android.apk`. Upload the APK with that asset name so the button
serves the latest version without storing the binary in the Git repository or
Railway build. Use the original release signing key for public updates; a
debug-signed APK may not update an existing production installation.
