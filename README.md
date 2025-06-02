# Technologies Video Library

## Overview
Technologies Video Library is a web application that allows users to browse, watch, and manage technology-related videos. The application includes separate dashboards for administrators and users, providing tailored functionality for each role.

## Features

### Admin Dashboard
- View a list of all videos with details such as title, preview, likes, dislikes, views, and comments.
- Add new videos to the library.
- Edit existing videos.
- Delete videos from the library.
- **Logout functionality:** A Logout button is available on the top right of the Admin Dashboard. Clicking this button logs the admin out by redirecting to the Admin Login page, ensuring secure exit from the dashboard.

### User Dashboard
- Browse and watch videos.
- Manage personal watch lists.
- User registration and login.

## Installation
1. Clone the repository.
2. Navigate to the `Frontend` and `Backend` directories and run `npm install` to install dependencies.
3. Start the backend server (e.g., `node index.js` in the Backend directory).
4. Start the frontend development server (e.g., `npm start` in the Frontend directory).

## Usage
- Access the application via the frontend URL (usually `http://localhost:3000`).
- Admins can log in via the Admin Login page to access the Admin Dashboard.
- Users can register and log in to access user-specific features.

## Technologies Used
- React for frontend UI.
- Axios for HTTP requests.
- React Router for client-side routing.
- Node.js and Express for backend API.
- Other dependencies as listed in `package.json`.




