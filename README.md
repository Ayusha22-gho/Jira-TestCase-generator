# Jira TestCase Generator

A web application to automatically generate test cases from Jira user stories. This project enables users to fetch a user story from Jira by story ID and generate test cases from the story description, simplifying the QA workflow for Jira users.

## Features

- **Fetch Jira User Story:** Enter your Jira instance URL and a story ID to retrieve the story's description from Jira using the REST API.
- **Generate Test Cases:** Automatically splits the user story description into sentences and creates basic test cases for each sentence.
- **View Test Cases:** Presents generated test cases with steps and expected results in a user-friendly format.
- **Simple Interface:** Built with React and Bootstrap for an intuitive experience.

## How It Works

1. **Backend (Express + Axios):**
   - `/backend/server.js` provides an API endpoint `/api/issue/:id` that fetches a Jira issue's details using the Jira REST API.
   - Requires your Jira email and API token as environment variables for authentication.

2. **Frontend (React):**
   - Enter your Jira URL and Story ID in the app.
   - Click "Fetch User Story" to load the story description.
   - Click "Generate Test Cases" to automatically create test cases from the description.
   - View the generated test cases, each with steps and expected results.

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayusha22-gho/Jira-TestCase-generator.git
   cd Jira-TestCase-generator
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up the backend:
   - Go to the `backend` folder.
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with your Jira credentials:
     ```
     JIRA_EMAIL=your-email@example.com
     JIRA_API_TOKEN=your-jira-api-token
     ```
   - Run the backend server:
     ```bash
     node server.js
     ```

### Running the App

- Start the frontend development server:
  ```bash
  npm start
  ```
- The app runs at [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter your Jira instance URL (e.g., `https://your-domain.atlassian.net`).
2. Enter the story ID (e.g., `KAN-123`).
3. Click "Fetch User Story" to retrieve the description.
4. Click "Generate Test Cases" to view automatically generated test cases.

## Technologies Used

- **Frontend:** React, Bootstrap, JavaScript, HTML, CSS
- **Backend:** Node.js, Express, Axios
- **Other:** Jira REST API

## Project Structure

```
backend/
  server.js         # Express backend to fetch Jira issues
src/
  App.js            # Main React app with user story and test case generation logic
  setupProxy.js     # Proxy setup for API requests
  index.js, index.css, ... # React entry and styling
public/
  index.html        # HTML template
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or new features.

## License

This project is licensed under the MIT License.

---
