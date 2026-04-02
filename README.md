🚀 AI House Price Prediction System

An intelligent full-stack AI-powered web application that predicts real estate prices based on property features using a custom-built machine learning logic.

Designed with scalability, performance, and real-world usability in mind, this project demonstrates end-to-end integration of frontend, backend, and database systems.

🌟 Features

✨ Real-time house price prediction
📊 Location-based pricing (Chennai-specific logic)
⚡ Fast and efficient API using FastAPI
🧠 AI-driven calculation with dynamic factors
💾 Persistent storage of predictions
📈 Confidence interval for better decision-making
🔗 Fully integrated frontend + backend architecture

🏗️ Tech Stack
🔹 Frontend
React.js
JavaScript
Responsive UI for seamless user interaction
🔹 Backend
FastAPI
RESTful API architecture
High-performance asynchronous handling
🔹 Database
PostgreSQL
Structured storage for predictions and inputs
🔄 System Architecture
React Frontend → FastAPI Backend → PostgreSQL Database
⚙️ How It Works
🧑‍💻 User enters property details
📡 Frontend sends request to FastAPI
🧠 Backend processes data using ML logic
💰 Price is predicted with confidence range
💾 Data is stored in PostgreSQL
📤 Result is returned to the user
📌 API Endpoint
🔹 Predict Price
POST /predict-price
Sample Request:
{
  "square_feet": 1200,
  "bedrooms": 3,
  "bathrooms": 2,
  "location": "Adyar",
  "condition": "good"
}
Sample Response:
{
  "predictedPrice": 8500000,
  "confidenceInterval": {
    "low": 7480000,
    "high": 9520000
  }
}
📂 Project Structure
frontend/      → React application  
backend/       → FastAPI server  
database/      → PostgreSQL schema & data  
🚀 Getting Started
🔹 Backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
🔹 Frontend (React)
cd frontend
npm install
npm start
📊 Future Enhancements
🤖 Integrate advanced ML models (Regression / XGBoost)
🌍 Expand to multiple cities
🔐 Add user authentication
📉 Add analytics dashboard
☁️ Deploy on cloud (AWS / Render)
💡 Highlights
🔥 Full-stack AI project
⚡ Real-time prediction system
🧩 Clean and modular architecture
🎯 Industry-relevant use case
🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

📬 Contact

If you have any questions or suggestions, feel free to reach out!

⭐ Show Your Support

If you like this project, don’t forget to ⭐ the repository!

🧠 Pro Tip (for you)

When you upload this:

👉 Add this line at top (optional but powerful):

“Built by Nithishwar A.P. – AI & Data Science Engineer”
