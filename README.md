# 🏦 GrameenLoan - Microloan Management System

![GrameenLoan Banner](./screenshot/hero.png)

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://grameen-loan-c.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/itstumpa/Grameen-Loan-C)

**A modern, full-stack microfinance platform for seamless loan management**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About the Project

**GrameenLoan** is a comprehensive microfinance management system designed to streamline the loan application, approval, and repayment process. Built with the MERN stack, it provides a secure, user-friendly platform for borrowers to apply for loans and administrators to manage applications efficiently.

### 🎬 Live Demo
👉 **[Visit Live Website](https://grameen-loan-c.netlify.app)**

### 🔗 Important Links
- **Client Repository:** [GitHub - Frontend](https://github.com/itstumpa/Grameen-Loan-C)
- **Server Repository:** [GitHub - Backend](https://github.com/itstumpa/Grameen-Loan-S)

---

## ✨ Key Features

### 🌟 **For Borrowers:**
- ✅ **User Authentication** - Secure login/registration with Firebase (Email/Password & Google OAuth)
- ✅ **Browse Loans** - Explore 8+ loan categories (Personal, Business, Education, Emergency, etc.)
- ✅ **Smart Search & Filter** - Find loans by category, interest rate, and amount
- ✅ **Loan Details** - View comprehensive information including EMI plans, eligibility, and documents
- ✅ **Apply Online** - Submit loan applications with document upload
- ✅ **Application Tracking** - Real-time status updates (Pending/Approved/Rejected)
- ✅ **Secure Payments** - Stripe integration for application fees
- ✅ **Profile Management** - Update personal information and view loan history
- ✅ **Dark/Light Mode** - Seamless theme switching for comfortable viewing

### 🛡️ **For Admins:**
- ✅ **Dashboard** - Comprehensive overview of all loan applications
- ✅ **Application Management** - Review, approve, or reject applications
- ✅ **User Management** - View and manage all registered users
- ✅ **Loan Products** - Add, edit, or remove loan offerings
- ✅ **Advanced Filtering** - Sort applications by status, category, date
- ✅ **Detailed View** - Access complete applicant information and documents
- ✅ **Analytics** - Track approval rates, total funded, active loans

### 🎨 **Design & UX:**
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Modern UI** - Professional banking aesthetic with smooth animations
- ✅ **Accessibility** - WCAG compliant with keyboard navigation
- ✅ **Fast Loading** - Optimized performance with lazy loading
- ✅ **Intuitive Navigation** - Clear user flow and breadcrumbs

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](./screenshot/dark_home.png)
*Professional hero section with loan categories and statistics*

### 💼 All Loans Page
![All Loans](./screenshot/all_loans.png)
*Browse and filter available loan products*

### 📄 Loan Details
![Loan Details](./screenshot/loan_details.png)
*Comprehensive loan information with EMI calculator*

### 📝 Loan Application Form
![Application Form](./screenshot/application_form.png)
*User-friendly multi-step application process*

### 💳 Payment Page
![Payment](./screenshot/payment.png)
*Secure payment gateway with Stripe integration*

### 👤 User Dashboard
![User Dashboard](./screenshot/user_dashboard.png)
*Track application status and manage profile*

### 🛡️ Admin Dashboard
![Admin Dashboard](./screenshot/admin_dashboard.png)
*Comprehensive admin panel for managing applications*

### 🌙 Dark Mode
![Dark Mode](./screenshot/light_home.png)
*Elegant dark theme for comfortable viewing*

---

## 🛠️ Tech Stack

### **Frontend:**
- ⚛️ **React 19** - UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌸 **DaisyUI** - Tailwind component library
- 🎭 **Framer Motion** - Animation library
- 🔄 **React Router** - Client-side routing
- 📊 **TanStack Query** - Data fetching and caching
- 🎣 **React Hook Form** - Form management
- 🔥 **Firebase Auth** - Authentication
- 💳 **Stripe** - Payment processing
- 🎯 **Axios** - HTTP client
- 🍞 **React Toastify** - Notifications
- 🍬 **SweetAlert2** - Beautiful alerts
- 🎨 **Lucide Icons** - Modern icon library

### **Backend:**
- 🟢 **Node.js** - Runtime environment
- 🚂 **Express.js** - Web framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **Firebase Admin** - Server-side authentication
- 💳 **Stripe API** - Payment gateway
- 🔒 **CORS** - Cross-origin resource sharing
- 🔑 **dotenv** - Environment variables

### **DevOps & Tools:**
- 📦 **Vite** - Build tool
- 🐙 **Git & GitHub** - Version control
- 🚀 **Vercel/Netlify** - Frontend deployment
- ☁️ **MongoDB Atlas** - Database hosting
- 🔥 **Firebase** - Authentication & Hosting

---

## 📥 Installation

### **Prerequisites:**
- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- Firebase account
- Stripe account
- Git

### **1. Clone the Repository**

```bash
# Clone the main repository
git clone https://github.com/itstumpa/Grameen-Loan-C client
git clone https://github.com/itstumpa/Grameen-Loan-S server
```

### **2. Install Dependencies**

#### **Frontend Setup:**
```bash
cd client
npm install
```

#### **Backend Setup:**
```bash
cd server
npm install
```

### **3. Configure Environment Variables**

Create `.env` files in both client and server directories:

#### **Client `.env`:**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMAGE_HOST_KEY=your_imgbb_api_key
VITE_API_URL=https://grameen-loan-server.vercel.app
```

#### **Server `.env`:**
```env
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
```

### **4. Run the Application**

#### **Start Backend:**
```bash
cd server
nodemon index.js
# Server runs on https://grameen-loan-server.vercel.app
```

#### **Start Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### **5. Build for Production**

#### **Frontend:**
```bash
cd client
npm run build
```

#### **Backend:**
```bash
cd server
# Backend runs on Node.js directly
node index.js
```

---

## 🔐 Environment Variables

### **Required Environment Variables:**

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `VITE_IMAGE_HOST_KEY` | ImgBB API key for image uploads | ✅ |
| `DB_USER` | MongoDB username | ✅ |
| `DB_PASS` | MongoDB password | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `FIREBASE_ADMIN_PRIVATE_KEY` | Firebase Admin SDK key | ✅ |

---

## 📖 Usage Guide

### **For Borrowers:**

#### **1. Registration & Login**
1. Navigate to the website
2. Click **"Register"** in the navbar
3. Fill in your details or sign up with Google
4. Verify your email (if using email/password)
5. Login with your credentials

#### **2. Browse Loans**
1. Click **"All Loans"** in the navbar
2. Use filters to narrow down options:
   - Filter by category (Personal, Business, etc.)
   - Search by keywords
3. Click **"View Details"** to see loan information

#### **3. Apply for a Loan**
1. On the loan details page, click **"Apply Now"**
2. Fill out the application form:
   - Personal information
   - Financial details
   - Upload required documents
3. Review and submit

#### **4. Pay Application Fee**
1. After submission, you'll be redirected to payment page
2. Review the $10 non-refundable fee
3. Check the agreement checkbox
4. Click **"Pay Now"**
5. Complete payment via Stripe

#### **5. Track Application**
1. Go to **"Dashboard"** from navbar
2. View your application status:
   - 🟡 **Pending** - Under review
   - 🟢 **Approved** - Loan approved
   - 🔴 **Rejected** - Application rejected
3. Download approval documents

#### **6. Manage Profile**
1. Click on your profile picture
2. Select **"My Profile"**
3. Update your information
4. Change profile picture

### **For Administrators:**

#### **1. Access Admin Panel**
1. Login with admin credentials
2. Navigate to **"Dashboard"**
3. Access admin-only features

#### **2. Review Applications**
1. Go to **"Loan Applications"**
2. View all submitted applications
3. Use filters:
   - Filter by status (Pending/Approved/Rejected)
   - Search by name, email, or loan ID
4. Click **"View"** for detailed information

#### **3. Approve/Reject Applications**
1. Open application details
2. Review applicant information
3. Click **"Approve"** or **"Reject"**
4. Add rejection reason (if rejecting)
5. Applicant receives email notification

#### **4. Manage Loan Products**
1. Go to **"Manage Loans"**
2. Add new loan products
3. Edit existing loans
4. Deactivate/activate loans

#### **5. View Analytics**
1. Dashboard shows:
   - Total applications
   - Approval rate
   - Total funded amount
   - Active loans
2. Export reports (CSV/PDF)

---


## 👨‍💻 Author

**Tumpa Das**

- GitHub: [@itstumpa](https://github.com/itstumpa)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/itstumpa)
- Portfolio: [Portfolio](https://itstumpa.netlify.app)
- Email: itstumpaa@gmail.com

---



## 🚀 Deployment

### **Frontend (Netlify):**
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Add environment variables
4. Deploy
### **Backend (Vercel):**

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ for the community**

[Back to Top](#-grameenloan---microloan-management-system)

</div>