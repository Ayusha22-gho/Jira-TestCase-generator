// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Card } from "react-bootstrap";

function App() {
  const [jiraUrl, setJiraUrl] = useState("");
  const [storyId, setStoryId] = useState("");
  const [userStory, setUserStory] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [error, setError] = useState('');

  const getDescription = (desc) => {
    if (!desc || !desc.content) return '';
    return desc.content
      .map(block =>
        block.content
          ? block.content.map(inline => inline.text).join(' ')
          : ''
      )
      .join('\n');
  };
  const fetchUserStory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/issue/${storyId}`);
      const description = getDescription(response.data.fields.description);
      setUserStory(description);
      setError('');
    } catch (error) {
      console.error("Error fetching user story:", error);
    }
  };

  // const response = await axios.get("/api/issue/KAN-4", {
  //   headers: {
  //     Authorization: `Basic ${btoa("your-email@example.com:your-api-token")}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  const generateTestCases = () => {
    if (!userStory) return;
    // Simple test case generation: split by sentences and create a test case for each
    const sentences = userStory.split('.').map(s => s.trim()).filter(Boolean);
    const cases = sentences.map((sentence, idx) => ({
      id: idx + 1,
      title: `Test Case ${idx + 1}`,
      steps: sentence,
      expected: `Verify: ${sentence}`,
    }));
    setTestCases(cases);
  };

  return (
    <Container className="mt-5">
      <h1>Test Case Generator - Jira</h1>
      <Form>
        <Form.Group>
          <Form.Label>Jira URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://cognizant-team-xn1plsms.atlassian.net"
            value={jiraUrl}
            onChange={(e) => setJiraUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Story ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Jira Story ID"
            value={storyId}
            onChange={(e) => setStoryId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchUserStory}>
          Fetch User Story
        </Button>
      </Form>

      {userStory && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>User Story</Card.Title>
            <Card.Text>{userStory}</Card.Text>
            <Button variant="success" onClick={generateTestCases}>
              Generate Test Cases
            </Button>
          </Card.Body>
        </Card>
      )}


      {testCases.length > 0 && (
        <div>
          <h3>Generated Test Cases</h3>
          <ul>
            {testCases.map(tc => (
              <li key={tc.id}>
                <strong>{tc.title}</strong>
                <div>Steps: {tc.steps}</div>
                <div>Expected Result: {tc.expected}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </Container>
  );
}

export default App;