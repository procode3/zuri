const express = require('express')
const http = require('http')
const app = express()

// Define a route that handles the GET request with query parameters
app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with validation of +/-2 hours
  const now = new Date();
  const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + (2 * 60 * 60 * 1000)).toISOString();

  // Get the GitHub URL of the file being run and the GitHub repository URL
  const githubFileURL = 'https://github.com/username/repo/blob/main/file_name.ext'; // Replace with your actual URLs
  const githubRepoURL = 'https://github.com/username/repo'; // Replace with your actual URL

  // Respond with the JSON object
  res.json({
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  });
});

// Start the Express server
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
