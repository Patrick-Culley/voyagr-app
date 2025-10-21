# Voyagr – Travel Experience Sharing 
Voyagr is a web application that allows users to create, share, and explore travel experiences. Users can register for an account, log in, add trips, upload photos, and browse experiences by location or keyword. This is designed to make trips inspirational by showcasing engaging experiences.

## Tech Stack 
- Frontend: ReactJS 
- Backend: NodeJS + ExpressJS 
- Database: MongoDB (via Mongoose)
- Deployment: Google Cloud Platform (GCP)
- Version Control: Git & GitHub

## Voyagr Backend: Local Setup
### Prerequisites 
Before running the project locally, make sure you have:
- Node.js (v18 or later)
- npm (comes with Node)
- A MongoDB Atlas account & cluster access

#### 1. Clone the Repository
- `git clone https://github.com/<your-username>/voyagr-app.git`
- `cd voyagr-app/backend`
#### 2. Install Dependencies
- `nmp install`
- This will install express, mongoose, dotenv, cors (front-end)
#### 3. Create a .env File
- Inside the `backend` folder, create a file called `.env`: 
- Add the following: `MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority&appName=<yourAppName>
PORT=5555`
- Replace the username & password with your MongoDB Atlas credentials
#### 4. Start the Backend Server 
- Run the backend locally: `node server.js`




