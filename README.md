# Tealium APJ React Native

This repository contains a React Native app. Below are step-by-step instructions to get the project running on macOS for both iOS and Android. These instructions assume a fresh macOS developer machine.

## Prerequisites (macOS)

- Homebrew (package manager)
- Node.js (LTS) and npm or Yarn
- Xcode (for iOS)
- Android SDK / Android Studio (for Android) — full Android Studio is recommended, but a CLI-only Android SDK setup is also provided below
- CocoaPods (for iOS native dependencies)

If you don't have Homebrew installed yet, install it with:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install common tools:

```bash
brew install node

# Optional: yarn package manager
brew install yarn

# Watchman (recommended for React Native development)
brew install watchman

# CocoaPods
sudo gem install cocoapods
# or
brew install cocoapods
```

Note: If you prefer Node via nvm, use nvm to install a supported Node LTS instead of Homebrew.

## iOS — Setup and Run

1. Install Xcode from the App Store and the Command Line Tools:

```bash
xcode-select --install
```

2. From the project root, install iOS native dependencies (CocoaPods):

```bash
cd ios
pod install
cd ..
```

3. Start Metro (the React Native bundler) in a separate terminal:

```bash
npx react-native start
```

4. Run the app on the iOS simulator:

```bash
# choose a simulator by name, e.g. iPhone 14
npx react-native run-ios --simulator "iPhone 14"
```

Alternatively, open `ios/TealiumAPJreactNative.xcworkspace` in Xcode and run from there. If you encounter provisioning or code signing errors when building to a device, use Xcode's signing settings to select a development team or use a simulator for quick testing.

## Android — Setup and Run

You have two main options: install full Android Studio (recommended for most users), or install only the Android SDK command-line tools (CLI-only). In either case, set the following environment variables in your `~/.zshrc` (or other shell rc):

```bash
# add to ~/.zshrc
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools"
```

Reload your shell after editing:

```bash
source ~/.zshrc
```

### Option A — Android Studio (full install, recommended)

1. Download and install Android Studio from https://developer.android.com/studio.
2. In Android Studio's SDK Manager, install:
   - Android SDK Platform 33 (or a compatible API level for the project)
   - Android SDK Platform-Tools
   - Android SDK Build-Tools
   - Android Emulator (if you want an emulator)
   - A system image (e.g. "Google APIs x86_64") for an emulator

3. Create and start an AVD (emulator) via AVD Manager in Android Studio.

4. From the project root, run:

```bash
# start Metro if not already running
npx react-native start

# in another terminal, build & run on the emulator/device
npx react-native run-android
```

### Option B — CLI-only Android SDK (no Android Studio GUI)

This option installs only the Android SDK command-line tools and is useful if you prefer a minimal setup.

1. Download the Command line tools for macOS from:
   https://developer.android.com/studio#cmdline-tools

2. Unzip and place the command-line tools under `$HOME/Library/Android/cmdline-tools/latest` (create directories as necessary). Example:

```bash
mkdir -p "$HOME/Library/Android/cmdline-tools"
unzip commandlinetools-mac-*.zip -d "$HOME/Library/Android/cmdline-tools/latest"
```

3. Set `ANDROID_HOME` and add sdkmanager/emulator to PATH (see snippet above).

4. Use `sdkmanager` to install required SDK components (example targets API 33 — adjust if needed):

```bash
# install platform tools, build-tools, emulator and a system image
sdkmanager --sdk_root="$HOME/Library/Android/sdk" "platform-tools" "platforms;android-33" "build-tools;33.0.0" "emulator" "system-images;android-33;google_apis;x86_64"
```

5. Create an AVD using `avdmanager`:

```bash
avdmanager create avd -n pixel -k "system-images;android-33;google_apis;x86_64" --device "pixel"
```

6. Start the emulator:

```bash
$ANDROID_HOME/emulator/emulator -avd pixel
```

7. Build and run the app (from project root):

```bash
# start Metro if not already running
npx react-native start

# in another terminal
npx react-native run-android
```

If you prefer to test on a physical Android device, enable USB debugging on the device and connect it to your Mac. Confirm adb device listing with:

```bash
adb devices
```

## Common Troubleshooting

- If pod install fails, run `pod repo update` then `pod install`.
- If Metro still serves old bundles, clear cache: `npx react-native start --reset-cache`.
- For Android build failures, check the Android SDK versions in `android/build.gradle` and installed SDK versions. Also confirm `ANDROID_HOME` is set correctly.

## Quick checklist

1. Install Homebrew, Node, Watchman, CocoaPods
2. Install Xcode + Command Line Tools
3. Install Android Studio (or CLI SDK) and configure `ANDROID_HOME`
4. In project: `cd ios && pod install` then `npx react-native run-ios` or `npx react-native run-android`

If you'd like, I can also add convenience scripts (Makefile or npm scripts) to automate some of these steps. Let me know which you prefer.
