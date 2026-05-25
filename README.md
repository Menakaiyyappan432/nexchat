# NexChat — Cross-Platform Real-Time Messaging App

A WhatsApp-style real-time chat application built with Firebase, supporting Web, Android, and iOS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS (PWA) |
| Auth | Firebase Authentication (Email/Password) |
| Database | Firebase Realtime Database |
| Notifications | Firebase Cloud Messaging (FCM) |
| Mobile | WebView wrapper (Android APK via WebIntoApp) |
| Hosting | GitHub Pages |

## Features

- ✅ User Registration / Login / Logout
- ✅ Real-time one-to-one messaging
- ✅ Chat history stored in Firebase
- ✅ All 4 notification cases handled
- ✅ Typing indicators
- ✅ Online/Offline status
- ✅ Responsive — mobile + desktop
- ✅ PWA — Add to Home Screen on mobile

## Notification Logic

| Case | Condition | Behavior |
|------|-----------|----------|
| 1 | User viewing same chat | Message appears live — NO notification |
| 2 | App open, different screen | In-app toast + Browser notification |
| 3 | App closed / killed | FCM background push via Service Worker |
| 4 | User logged out | FCM token deleted — NO notification sent |

## Setup Instructions

### Prerequisites
- Firebase project (already configured)
- GitHub account (for hosting)

### 1. Files
```
index.html                  ← Main app (renamed from nexchat.html)
firebase-messaging-sw.js    ← Service worker for background push
README.md                   ← This file
```

### 2. Firebase Console Setup
1. **Authentication** → Sign-in method → Email/Password → **Enable**
2. **Realtime Database** → Create database → **Test mode**
3. **Database Rules:**
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### 3. Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "NexChat initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nexchat.git
git push -u origin main
```
Then: Settings → Pages → Source: main branch → Save

Live URL: `https://YOUR_USERNAME.github.io/nexchat`

### 4. Android APK
1. Go to https://webintoapp.com
2. Enter your GitHub Pages URL
3. App Name: NexChat
4. Enable "Firebase Push Notifications"
5. Download APK

### 5. iOS Testing
- Use **Appetize.io** — upload APK or use browser-based demo
- Or use **Expo Go** with a React Native wrapper
- Or record demo on Safari mobile (PWA mode)

## Project Structure
```
nexchat/
├── index.html                 # Single-file PWA app
├── firebase-messaging-sw.js   # FCM service worker
└── README.md                  # Setup guide
```

## Demo Flow (Mandatory Video)

1. Login on website as **User A**
2. Login on mobile/second device as **User B**
3. Send messages — appear instantly ✓
4. User B stays in chat — NO notification ✓
5. User B goes to another screen — notification appears ✓
6. Kill/close app — notification still comes ✓
7. Tap notification — correct chat opens ✓
8. Logout User B — no more notifications ✓

## Architecture

```
User A (Browser) ──▶ Firebase RTDB ──▶ User B (Mobile)
                           │
                     FCM Server
                           │
                    Push Notification
                    (even if app killed)
```

---
Built for Cross-Platform Real-Time Messaging Assessment — Round 3
