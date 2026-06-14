# Notes App

A full-stack Notes Management application built using React, Node.js, Express.js, MongoDB, and Mongoose.

## Features

### Core Features

- Create Notes
- View All Notes
- View Single Note
- Update Notes
- Delete Notes
- Search Notes by Title and Content
- Responsive User Interface
- Loading States
- Error Handling
- Form Validation

### Additional Features

- Categories
- Tags
- Auto Save while Editing
- Notes Sorted by Recently Updated

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Fetch API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

### Clone Repository

```bash
git clone https://github.com/abhee-hub/popaya-fullstack.git
```

## Clone and Setup Project

After cloning the repository, install the required dependencies manually.

### Backend Setup

Navigate to the backend folder:

```bash
cd backend/notes-api
```

Install dependencies:

```bash
npm i
```

Start the server:

```bash
node index.js
```

### Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend/notes-ui
```

Install dependencies:

```bash
npm i
```

Start the application:

```bash
npm run dev
```

### Important Note

The `node_modules` folder is intentionally excluded from the repository using `.gitignore`.

After cloning the project, run the following command in both the frontend and backend folders:

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

## API Endpoints

### Get All Notes

```http
GET /api/notes
```

### Get Single Note

```http
GET /api/notes/:id
```

### Create Note

```http
POST /api/notes
```

### Update Note

```http
PUT /api/notes/:id
```

### Delete Note

```http
DELETE /api/notes/:id
```

### Search Notes

```http
GET /api/notes?search=keyword
```

## Note Schema

```js
{
  title: String,
  content: String,
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Validation

- Title is required.
- Proper error messages are displayed for invalid requests.
- Backend request validation implemented.
