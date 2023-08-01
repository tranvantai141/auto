# vcb-onboarding-app

Onboarding Mobile Application in React Native

## Versions

**react-native** : 0.70.6

> **yarn** : 1.22.19
> **node** : => 16.15.1

## Getting started

Install dependencies

```
yarn install
```

## Run App

####**iOS**

**Step 1: Install node modules**

> yarn install

**Step2: To run app on simulator**

cd ios

> pod install
> react-native run-ios

#### **Android**

**Step 1: Install node modules**

> yarn install

**Step2: To run app on simulator**

> react-native run-android

**Step 3 : To generate android apk file**

> react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

> cd android && ./gradlew assembleDebug

## Run Test

```
yarn test
```
