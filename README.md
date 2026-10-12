# SmartServe — Service Request & Priority Management System

SmartServe is a full-stack web application designed to streamline service request management through intelligent priority scheduling, role-based access control, and efficient request tracking.

The system helps manage service requests based on severity and waiting time, ensuring that high-priority issues are handled efficiently while reducing request starvation.

## 🚀 Live Demo

- **Live Application:** [SmartServe](https://smart-serve-cg2g.vercel.app/)
- **GitHub Repository:** [SmartServe on GitHub](https://github.com/mr-tech9580/SmartServe)

## ✨ Features

- **Service Request Management:** Create, manage, and track service requests.
- **Priority-Based Scheduling:** Uses a custom Max-Heap priority queue for efficient scheduling and retrieval of high-priority requests.
- **Dynamic Priority Calculation:** Combines issue severity and waiting time to reduce starvation and maintain fair request processing.
- **Authentication & Authorization:** Implements JWT authentication and role-based access control.
- **Efficient Request Processing:** Supports efficient priority queue operations with O(log n) insertion and retrieval.
- **Duplicate Detection:** Uses HashMap and HashSet-based techniques to identify duplicate requests efficiently.
- **Responsive User Interface:** Provides an interactive interface for managing service requests.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database
- MongoDB

### Data Structures & Algorithms
- Max-Heap Priority Queue
- HashMap
- HashSet
- Time Complexity Optimization

### Tools
- Git
- GitHub
- VS Code
- Vercel

## 🏗️ System Architecture

SmartServe follows a frontend-backend architecture:

1. **Frontend:** Provides the user interface for interacting with service requests.
2. **Backend:** Handles API requests, authentication, authorization, and request management.
3. **Database:** MongoDB stores application data.
4. **Priority Scheduling:** A Max-Heap-based mechanism prioritizes requests using severity and waiting time.
5. **Duplicate Detection:** Hash-based data structures help identify duplicate requests efficiently.

## 📂 Project Structure

```text
SmartServe/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative. Adjust the listed folders to match the actual repository.*

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance or MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mr-tech9580/SmartServe.git
cd SmartServe
```

### 2. Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Install the backend dependencies in a separate terminal:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create the environment file required by the backend and configure your MongoDB connection string and authentication secret according to the variables used in your application.

Keep all credentials private and never commit your `.env` file to GitHub.

### 4. Run the Application

Start the backend using its configured start script:

```bash
cd backend
npm start
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

*Note: Use the actual scripts and environment variable names defined in your project's `package.json` and configuration files.*

## 📈 Algorithmic Efficiency

SmartServe uses data structures and algorithms to improve request scheduling and processing.

| Operation | Approach | Time Complexity |
|---|---|---|
| Priority queue insertion | Max-Heap | O(log n) |
| Highest-priority request retrieval | Max-Heap | O(log n) when removing the root |
| Duplicate lookup | HashMap / HashSet | O(1) average-case lookup |

Hash-based lookup complexity depends on hashing performance and collision behavior. Actual scheduling performance depends on the implementation.

## 🔐 Security

- JWT-based authentication.
- Role-based access control.
- Protected backend routes.
- Environment-based configuration for sensitive credentials.

## 🎯 Project Objectives

- Improve service request handling and prioritization.
- Reduce delays for high-severity issues.
- Prevent request starvation through waiting-time-based prioritization.
- Improve efficiency using appropriate data structures and algorithms.
- Provide a maintainable full-stack service management solution.

## 👩‍💻 Author

**Megha Rajpurohit**

- GitHub: [mr-tech9580](https://github.com/mr-tech9580)

---

*SmartServe — Smarter prioritization, faster service resolution.*