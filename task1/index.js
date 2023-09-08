const express = require('express')
const app = express()


// Define a route that handles the GET request with query parameters
app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with validation of +/-2 hours
  const now = new Date();
  const utcTime = now.toISOString().slice(0, -5) + 'Z'; 


  // Get the GitHub URL of the file being run and the GitHub repository URL
  const githubFileURL = 'https://github.com/procode3/zuri/blob/master/task1/index.js';
  const githubRepoURL = 'https://github.com/procode3/zuri'; 

  // Respond with the JSON object
  const jsonResponse = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('ngrok-skip-browser-warning', 'Yes');
  res.send(JSON.stringify(jsonResponse, null, 2));
});

// Start the Express server
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
