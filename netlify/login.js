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
      const rawData = fs.readFileSync("data.json");
      const jsonData = JSON.parse(rawData);

      // Check for duplicate names in the JSON data
      const isDuplicate = jsonData.some(user => user.name === username);

      return {
        statusCode: 200,
        body: JSON.stringify({ isDuplicate }),
      };
  } catch (error) {
    console.error('Error reading data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
