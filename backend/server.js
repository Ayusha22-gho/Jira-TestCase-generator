const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/issue/:id", async (req, res) => { 
  console.log("Received request for issue ID:", req.params.id);   
  const { id } = req.params;

  const authHeader = `Basic ${Buffer.from(
    `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
  ).toString("base64")}`;

  try {
    const response = await axios.get(
      `https://cognizant-team-xn1plsms.atlassian.net/rest/api/3/issue/${id}`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));