# 🛒 Next Basket Expo

A modern cross-platform e-commerce application built with **Expo**, **React Native**, and **TypeScript**. Next Basket Expo delivers a seamless shopping experience with secure authentication, product browsing, cart management, order tracking, and profile management, powered by a scalable backend architecture using **MongoDB** and **Redis**.

## ✨ Features

### 🔐 Authentication

* Email & Password Authentication
* Secure Session Management
* Protected Routes
* Better Auth Integration

### 🛍️ Shopping Experience

* Browse Products
* View Product Details
* Add to Cart
* Update Cart Quantities Instantly
* Place Orders
* Order History & Tracking

### 👤 User Management

* User Profiles
* Account Settings
* Secure Authentication Flow

### ⚡ Performance

* Fast Cart Updates with Redis
* Optimized Mobile Experience
* Type-Safe Development with TypeScript
* Cross-Platform Support (Android, iOS, Web)

---

## 🏗️ Tech Stack

### Frontend

* Expo
* React Native
* Expo Router
* TypeScript

### Authentication

* Better Auth
* Expo Secure Store
* Expo Web Browser

### Backend

* MongoDB
* Redis

### Database Usage

| Service | Purpose                                       |
| ------- | --------------------------------------------- |
| MongoDB | Users, Products, Orders, and Application Data |
| Redis   | High-speed Cart Quantity Updates and Caching  |

---

## 📂 Project Structure

```bash
next-basket-expo/
├── assets/                     # Images, icons, and static assets
├── src/
│   ├── app/                    # Expo Router screens and navigation
│   │   └── _layout.tsx
│   │
│   ├── components/             # Reusable UI components
│   │   ├── AuthHeader.tsx
│   │   ├── GoogleLogin.tsx
│   │   ├── Header.tsx
│   │   └── productCard.tsx
│   │
│   ├── lib/                    # Authentication and shared utilities
│   │   ├── auth.ts
│   │   └── auth-client.ts
│   │
│   └── types.ts                # Shared TypeScript types
│
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm, yarn, pnpm, or bun
* Expo CLI
* MongoDB Database
* Redis Server

### Clone the Repository

```bash
git clone https://github.com/surajit20107/next-basket-expo.git
cd next-basket-expo
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_BASE_URL=your_api_url
```

### Start Development Server

```bash
npx expo start
```

---

## 📱 Run the App

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

### Web

```bash
npx expo start --web
```

---

## 🗄️ Backend Architecture

### MongoDB

Stores persistent application data:

* Users
* Products
* Orders
* Authentication Data
* User Profiles

### Redis

Handles high-speed operations:

* Cart Quantity Updates
* Temporary Cart Storage
* Session Caching
* Performance Optimization

This hybrid approach ensures fast user interactions while maintaining reliable long-term data storage.

---

## 🔮 Future Improvements

* Product Search
* Product Categories
* Wishlist
* Push Notifications
* Dark Mode
* Product Reviews & Ratings
* Admin Dashboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Surajit**

Built with ❤️ using Expo, React Native, MongoDB, Redis, and Better Auth.
