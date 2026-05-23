
# TaxFlow AI – Email Management System

## 📌 Overview

TaxFlow AI is a full-stack email management system designed to streamline and manage email workflows for tax operations.
It includes authentication, user management, and a dashboard interface.

---

## 🛠 Tech Stack

* **Frontend:** Angular
* **Backend:** .NET Core Web API
* **Database:** SQL Server
* **Authentication:** JWT (JSON Web Tokens)

---

## 🚀 Features

* Secure User Login (JWT Authentication)
* Dashboard displaying system users
* Role-based user management
* Backend API with structured architecture (Controllers, Services, Repositories)

---

## 📂 Project Structure

```
email-management-migration/
│
├── api/       → Backend API (.NET Core)
│   ├── src/   → Application source code
│   └── tests/ → Backend test files
│
├── ui/        → Angular frontend
│   ├── src/   → Frontend source code
│   └── tests/ → Frontend test files
│
├── docs/      → Project documentation
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd api/src/EmailManagementAPI
dotnet restore
dotnet run
```

Backend will run on:

```
http://localhost:5285
```

---

### 🔹 Frontend Setup

```bash
cd ui
npm install
ng serve
```

Frontend will run on:

```
http://localhost:4200
```

---

## 🔐 Authentication Flow

1. User logs in via Angular UI
2. Request is sent to backend API
3. API validates credentials
4. JWT token is generated and returned
5. Token is stored in browser (localStorage)
6. Token is used for authorized API calls

---

## 📊 Current Status

* Authentication implemented ✅
* Dashboard working ✅
* API integration complete ✅
* Database connected (SQL Server) ✅
* Project structure aligned with guidelines ✅

---

## 🧪 Testing

Test folders are created for both frontend and backend.
Test cases will be added in future iterations.

---

## 📄 Documentation

Additional documentation (architecture, API details) will be maintained inside the `docs/` folder.

---

## 📌 Future Improvements

* Email classification using AI
* Email routing automation
* Improved UI/UX
* Full test coverage
* Deployment setup

---

## 👨‍💻 Author

Kasinadhan B

---

## 📎 Notes

This project is being developed following structured guidelines including:

* Layered backend architecture
* Clean frontend structure
* Proper Git workflow (feature branches)
* Documentation and testing standards

