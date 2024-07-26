# Calendar Scheduler

This is a React Native project for displaying a weekly calendar with schedule slots. Users can navigate between weeks and click on schedule slots to view more details.

## Features

- Display a weekly calendar in French
- Navigate between weeks using arrows
- View available schedule slots for each day
- Click on schedule slots to highlight them

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher) or Yarn (v1.22 or higher)
- Expo CLI (if using Expo)
- Android Studio or Xcode for iOS (if running on a physical device or emulator)

## Getting Started

### Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/medea-learner/test-calendar-react-native-app
cd test-calendar-react-native-app/calendar-app
git checkout part2
```
### Installation
Install the dependencies using npm or Yarn:

```bash
# Using npm
npm install

# Using Yarn
yarn install
```
### Running the Project

#### Using Expo
1. Install Expo CLI (if not already installed):
```bash
npm install -g expo-cli
```

2. Start the Expo server:
```bash
expo start
```

3. Run on your device:
. Use the Expo Go app on your mobile device to scan the QR code.
. Alternatively, you can run it on an emulator by pressing i for iOS or a for Android.

#### Without Expo
If you prefer running the project without Expo, follow these steps:

1. Start the Metro bundler:
```bash
npx react-native start
```

2. Run on Android:
```bash
npx react-native run-android
```

3. Run on iOS (requires Xcode):
```bash
npx react-native run-ios
```

## License
This project is licensed under the MIT License