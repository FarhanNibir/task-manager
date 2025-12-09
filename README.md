
# Task Management System (Laravel 12 + Vue 3 + Sanctum)

A full-stack **Task Management CRUD application** built with **Laravel 12 (API)** and **Vue 3 (SPA)** using **Laravel Sanctum authentication**. This project was developed as part of a technical assessment to demonstrate clean architecture, authentication, RESTful API design, and frontend integration.

---

## Features

### Authentication (Laravel Sanctum)
- User Registration
- User Login
- Token-based Authentication
- Logout

### Task Management (CRUD)
- Create Task
- View All Tasks
- Update Task
- Delete Task

Each task includes:
- `title`
- `description`
- `status` (pending / completed)

### Frontend (Vue 3 + Tailwind CSS)
- Vue 3 SPA
- Pinia for State Management
- Axios for API Requests
- Tailwind CSS UI Design
- Auth Protected Routes
- Navbar with Authentication State

---

## Tech Stack

### Backend
- Laravel 12
- Laravel Sanctum
- SQLite
- REST API
- Clean Architecture (Controllers, Services, Requests, Resources)

### Frontend
- Vue 3
- Vite
- Pinia
- Axios
- Tailwind CSS

---

## 📂 Project Structure

```

backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   ├── Services/
│   ├── Models/
├── routes/
├── database/

frontend/
├── src/
│   ├── views/
│   ├── components/
│   ├── stores/
│   ├── router/
│   ├── api/

````

---

## ⚙️ Backend Setup (Laravel 12)

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd backend
````

### 2️⃣ Install Dependencies

```bash
composer install
```

### 3️⃣ Environment Setup

```bash
cp .env.example .env
php artisan key:generate
```

### 4️⃣ Run Migrations

```bash
php artisan migrate
```

### 5️⃣ Start Server

```bash
php artisan serve
```

---

## 🌐 API Endpoints

### Auth

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | `/api/register` | Register user |
| POST   | `/api/login`    | Login user    |
| POST   | `/api/logout`   | Logout user   |

### Tasks (Protected)

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | `/api/tasks`      | Get all tasks |
| POST   | `/api/tasks`      | Create task   |
| PUT    | `/api/tasks/{id}` | Update task   |
| DELETE | `/api/tasks/{id}` | Delete task   |

---

## Frontend Setup (Vue 3)

### 1️⃣ Navigate to Frontend Folder

```bash
cd frontend
```

### 2️⃣ Install Packages

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

---

## Authentication Flow

* User registers or logs in
* API returns Sanctum token
* Token is stored in `localStorage`
* Axios automatically attaches token in requests
* Protected routes require authentication

---

## Validation & Security

* Laravel Form Request Validation
* Proper API Error Responses
* Auth-protected routes with Sanctum
* Unauthorized requests return **403**
* CSRF disabled for API routes

---

## Git Commit Strategy

* Meaningful commits
* Feature-based commits
* Clear messages (e.g., `Add task CRUD API`, `Implement auth store`, `Fix CSRF issue`)

---

## Completed Requirements

✔ Laravel REST API
✔ Sanctum Authentication
✔ Vue 3 SPA
✔ CRUD Operations
✔ Clean Code Structure
✔ Validation & Error Handling
✔ Tailwind UI
✔ Git Version Control

---

## Demo Preview

✅ Task List
✅ Create Task
✅ Login / Register
✅ Protected Routes
✅ Navbar with Auth State

---

## Developer

**Name:** *Farhan Jarif Nibir*
**Role:** Full Stack Developer
**Tech:** Laravel | Vue | API | Tailwind | Sanctum


## Final Note

This project demonstrates:

* Strong understanding of **Full-Stack Development**
* Secure **API Authentication**
* Proper **Frontend–Backend Integration**
* Clean **Architecture & Best Practices**

Thank you for reviewing this project!

