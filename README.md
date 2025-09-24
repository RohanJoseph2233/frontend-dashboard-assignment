 Frontend Dashboard Assignment

 
 Overview 
 This project is built as part of the Frontend Developer Intern Assignment.
 It includes a React frontend with authentication and a Node.js + Express backend connected to MongoDB.



 Features : 

 User Registration & Login (JWT authentication)

 Protected Dashboard (only accessible after login)

 User Profile (fetched from backend)

 CRUD operations on tasks (Add, Edit, Delete)

  Responsive design with TailwindCSS

  Secure password hashing (bcrypt)



🛠️ Tech Stack

Frontend: React, React Router, Axios, TailwindCSS

Backend: Node.js, Express, MongoDB, JWT, bcrypt

Database: MongoDB Atlas



⚙️ Installation & Setup


1. Clone the Repository
git clone https://github.com/your-username/frontend-dashboard-assignment.git
cd frontend-dashboard-assignment

2. Setup Backend
cd server
npm install


Create a .env file inside server/:

MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
PORT=5000


Start the backend:

npm start

3. Setup Frontend
cd client
npm install
npm run dev


Frontend runs on: http://localhost:5173

Backend runs on: http://localhost:5000






🔑 API Endpoints
Authentication

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Profile

GET /api/profile → Fetch user profile (protected)

Tasks (CRUD)

GET /api/tasks → Get all tasks

POST /api/tasks → Create task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task





🚀 Deployment & Scalability Notes

The project is structured for scalability with separate frontend and backend folders.

In production, frontend can be built and served via CDN/hosting (Netlify, Vercel).

Backend can be deployed to Render/Heroku/Vercel with MongoDB Atlas as cloud DB.

CORS & environment variables used for security.





📸 Screenshots








<img width="1920" height="1080" alt="Screenshot 2025-09-24 151651" src="https://github.com/user-attachments/assets/535ca0ea-9622-4337-93c9-741191b1f2b0" />




<img width="1920" height="1080" alt="Screenshot 2025-09-24 151637" src="https://github.com/user-attachments/assets/f2113357-dd5b-4637-8630-bde08a6c14ed" />




<img width="1920" height="1080" alt="Screenshot 2025-09-24 151614" src="https://github.com/user-attachments/assets/15031dac-3676-47d0-9e8e-01f535ab8c70" />



📸 terminal Screenshots

front end 

<img width="1603" height="324" alt="Screenshot 2025-09-24 155358" src="https://github.com/user-attachments/assets/41238dad-a59b-4032-92e8-9c94d61f434a" />



backend



<img width="1601" height="264" alt="Screenshot 2025-09-24 155910" src="https://github.com/user-attachments/assets/cead0094-9519-4ea3-860f-cc3927bc3997" />


















