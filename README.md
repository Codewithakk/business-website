#Business Website

This project is a **professional business website** with a secure **Admin Panel**

---

## 📌 **Project Overview**

**Part A: Home Page (Client Facing)**  
- Fully responsive landing page
- Sticky header with smooth scrolling nav
- Dynamic image slider (images from backend)
- About, Services, Testimonials sections (content managed via Admin Panel)
- Secure Contact Form with validation + CAPTCHA
- Footer with contact details & social links

**Part B: Admin Panel**  
- Protected login with JWT (Access + Refresh Token)
- Token auto-renewal
- Manage Slider, About, Services, Testimonials, Contact submissions
- All APIs secured and validated

---

## 🚀 **Tech Stack**

- **Frontend:** React, React Router, Swiper.js, Rich Text Editor (Quill)
- **Backend:** Node.js, Express, MongoDB Atlas
- **Auth:** JWT (2 min Access Token, 2 day Refresh Token)
- **Security:** Helmet.js, CORS, express-validator, express-mongo-sanitize, xss-clean, rate limiting

---

## 🔒 **Security Features**

✅ Input sanitization (XSS, NoSQL Injection)  
✅ Helmet + CORS configured  
✅ Rate limiting for auth & forms  
✅ All input validated with `express-validator`  
✅ Consistent error handling and JSON responses  
✅ Protected routes with JWT

---

## 📂 **Folder Structure**

```plaintext
.
├── client/           # React Frontend
│   ├── src/
│   ├── public/
│   ├── .env
│   └── ...
├── server/           # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── .env
│   └── ...
├── README.md
├── package.json
└── postman_collection.json
````

---

## ⚙️ **Setup Instructions**

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Codewithakk/business-website.git
cd business-website
```

### 2️⃣ Setup Environment Variables

Create `.env` files for **both frontend and backend**.

**Example `.env` (Backend):**

```
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:3000
```

**Example `.env` (Frontend):**

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RECAPTCHA_SITE_KEY=your_google_recaptcha_key
```

---

### 3️⃣ Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### 4️⃣ Run Locally

**Start Backend**

```bash
cd backend
npm run dev
```

**Start Frontend**

```bash
cd ../frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

for Admin panel 

http://localhost:3000/admin/login