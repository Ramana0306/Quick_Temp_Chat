# QuickRoom

A simple **real-time chat application** built with Spring Boot and React. Users can create or join a temporary room and chat with another user in real time.

## 🚀 Features

* User Registration & Login
* JWT-based Authentication
* Create a chat room with a unique room code
* Join a room using the room code
* Real-time messaging using WebSocket
* Maximum 2 users per room
* Room is removed when both users leave
* Messages are not permanently stored

## 🛠️ Tech Stack

**Backend**

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* WebSocket / STOMP
* PostgreSQL
* Maven

**Frontend**

* React
* Vite
* Tailwind CSS
* Axios
* STOMP.js

## 🏗️ Architecture

```text
React + Vite
     ↓
REST API / WebSocket
     ↓
Spring Boot
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
```

## 🔐 Authentication

The application uses **JWT authentication**.

```text
Login
  ↓
JWT Token
  ↓
Authenticated API Requests
```

Passwords are securely hashed before being stored.

## 💬 Real-Time Chat

QuickRoom uses **WebSocket with STOMP** for real-time communication.

```text
User A
   ↓
WebSocket
   ↓
Spring Boot
   ↓
Room Topic
   ↓
User B
```

Messages are delivered instantly without repeatedly polling the server.

## 🌐 Main APIs

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register user    |
| POST   | `/api/auth/login`    | Login            |
| POST   | `/api/rooms/create`  | Create room      |
| POST   | `/api/rooms/join`    | Join room        |
| POST   | `/api/rooms/leave`   | Leave room       |
| GET    | `/api/rooms/{code}`  | Get room details |

Room APIs require JWT authentication.


Web App live at:

```text
http://13.48.6.97:3000
```

## 📚 What I Learned

* Building REST APIs with Spring Boot
* JWT authentication with Spring Security
* Database integration using Spring Data JPA
* Real-time communication using WebSocket
* STOMP messaging
* React component development
* REST API and WebSocket integration
* Layered backend architecture
* Authentication and user access control

## 🔮 Future Improvements

* Private room invitations
* Online/offline user status
* Typing indicator
* Message timestamps
* Message history
* Automated testing
* Docker deployment

## 👨‍💻 About

This project was built to strengthen my practical understanding of **Java, Spring Boot, REST APIs, WebSocket, PostgreSQL, and React** while developing a complete full-stack application.
