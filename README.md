# expo-good-morning-app

A single-screen, colorful Expo Router (SDK 56) app — "Good morning!"
dashboard mock-up with a gradient hero card, bar chart, and recent-activity
list. No tabs, just one screen.

Built from a wireframe brief: same layout, ignoring the tab bar.

## Stack

- Expo SDK 56
- Expo Router 56
- React Native 0.85
- `expo-linear-gradient` for the gradient background and hero card

## Run it

```bash
npm install
npm run android   # or: npm run ios / npm run web
```

The screen lives at `src/app/index.tsx`; the root layout at
`src/app/_layout.tsx` uses a plain `Stack` with the header hidden — no tab
navigator.
