// functions/login.js

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../data.json');
console.log(__dirname);
exports.handler = async function (event, context) {
  const { username } = JSON.parse(event.body);
  console.log(username)
  try {
    console.log(dataPath);
    // Read the data from the data.json file
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath);
      const jsonData = JSON.parse(rawData);

      // Check for duplicate names in the JSON data
      const isDuplicate = jsonData.some(user => user.name === username);

      return {
        statusCode: 200,
        body: JSON.stringify({ isDuplicate }),
      };
    } else {
      // Handle case where data file is missing
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Data file not found' }),
      };
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
