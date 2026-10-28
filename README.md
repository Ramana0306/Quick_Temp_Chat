# QuickRoom - Real-Time Chat Application 💬

QuickRoom is a simple real-time chat application developed using Java Spring Boot and React. Users can register, log in, join chat rooms, and send messages instantly.

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Java 21, Spring Boot
- **Database:** PostgreSQL
- **Security:** Spring Security, JWT
- **Real-Time Chat:** WebSocket, STOMP, SockJS
- **Deployment:** Vercel, Render, Supabase

## Features

- User registration and login
- JWT-based authentication
- Create and join chat rooms
- Real-time messaging
- Maximum two users per room
- Join and leave notifications

## Live Demo

- **Frontend:** https://quick-temp-rapid-nq2h5nbph-ramana20.vercel.app
- **Backend:** https://quick-temp-chat.onrender.com

## How to Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/Ramana0306/Quick_Temp_Chat.git
cd Quick_Temp_Chat
```

**2. Run the backend**

Configure the PostgreSQL database and required environment variables, then run:

```bash
cd backend
mvn spring-boot:run
```

**3. Run the frontend**

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

## Author

Ramana M.

GitHub: https://github.com/Ramana0306
