# MERN Stack Auth System 🔐

A full-stack authentication system built with the **MERN stack**, featuring:

- ✅ Email OTP Verification
- 🔐 JWT-based Authentication
- 🔁 Password Reset Flow
- 🧠 Zustand for State Management
- 📋 Formik + Yup for Form Handling and Validation

---

## 🧱 Tech Stack

### Backend
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Nodemailer** for email OTPs
- **bcryptjs** for password hashing

### Frontend
- **React**
- **Formik** + **Yup** (forms + validation)
- **Zustand** for global state
- Pages: `Register`, `Login`, `OTP Verification`, `Reset Password`, `User Profile`

---

## 🔐 Features

### Backend
- User registration with OTP email verification
- JWT-based login and protected routes
- Password hashing with bcrypt
- Forgot password + reset flow via email
- OTP expiration, one-time use, and security checks

### Frontend
- React SPA with basic auth pages
- Zustand for login state, user data, token handling
- Formik/Yup forms for Register, Login, OTP, and Reset Password
- Profile page only accessible after login