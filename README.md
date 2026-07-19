# QuickRoom - Fresher Project

A simple temporary chat app built with Spring Boot + React.
Perfect for Java Backend Freshers learning full-stack development.

## What It Does
- Register/Login with JWT tokens
- Create a room (auto-generates 6-char code)
- Join a room using the code
- Chat in real-time with WebSocket
- Max 2 people per room
- Room auto-deletes when empty
- No messages saved anywhere

## Tech Stack
- **Backend:** Java 21, Spring Boot, Spring Security, JPA, WebSocket, PostgreSQL
- **Frontend:** React, Vite, Tailwind CSS, Axios, STOMP.js
- **Database:** PostgreSQL

## Project Structure
```
quickroom/
├── backend/
│   ├── pom.xml                          # Maven dependencies
│   └── src/main/
│       ├── resources/
│       │   └── application.properties   # Database config
│       └── java/com/quickroom/
│           ├── QuickRoomApplication.java
│           ├── controller/              # REST APIs
│           │   ├── AuthController.java
│           │   ├── RoomController.java
│           │   └── ChatController.java
│           ├── service/                 # Business logic
│           │   ├── AuthService.java
│           │   └── RoomService.java
│           ├── model/                   # Database tables
│           │   ├── User.java
│           │   └── Room.java
│           ├── repository/              # Database queries
│           │   ├── UserRepository.java
│           │   └── RoomRepository.java
│           ├── dto/                     # Request/Response objects
│           │   ├── RegisterRequest.java
│           │   ├── LoginRequest.java
│           │   ├── AuthResponse.java
│           │   ├── RoomDto.java
│           │   └── ChatMessage.java
│           ├── config/
│           │   ├── SecurityConfig.java  # JWT + CORS
│           │   └── WebSocketConfig.java # Chat setup
│           ├── security/
│           │   ├── JwtUtil.java         # Token generation
│           │   └── JwtFilter.java       # Token validation
│           └── exception/
│               └── GlobalExceptionHandler.java
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api.js
        ├── context/AuthContext.jsx
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            ├── Dashboard.jsx
            └── ChatRoom.jsx
```

## Setup Steps

### 1. Create Database
Open pgAdmin or psql and run:
```sql
CREATE DATABASE quickroom;
```

### 2. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on http://localhost:8080

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| POST | /api/rooms/create | Create room (needs JWT) |
| POST | /api/rooms/join | Join room (needs JWT) |
| POST | /api/rooms/leave | Leave room (needs JWT) |
| GET | /api/rooms/{code} | Get room info (needs JWT) |

## WebSocket
- Connect to: `ws://localhost:8080/ws`
- Subscribe: `/topic/room/{roomCode}`
- Send to: `/app/chat/{roomCode}`

## Key Concepts You Will Learn
1. **Spring Boot REST APIs** - @RestController, @GetMapping, @PostMapping
2. **Spring Data JPA** - No SQL needed, just interfaces
3. **Spring Security** - JWT tokens, password hashing
4. **WebSocket** - Real-time chat with STOMP
5. **Layered Architecture** - Controller -> Service -> Repository
6. **React Hooks** - useState, useEffect, useRef
7. **Context API** - Global state management

## Troubleshooting

**"Failed to connect to database"**
- Check PostgreSQL is running
- Update username/password in `application.properties`

**"CORS error"**
- Make sure backend is running on port 8080
- Make sure frontend is running on port 5173

**"WebSocket connection failed"**
- Check backend is running
- Check firewall is not blocking port 8080
