// functions/login.js

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(process.cwd(), 'netlify/data/data.json');
console.log(__dirname);
exports.handler = async function (event, context) {
  const { username } = JSON.parse(event.body);
  console.log(username)
  try {
    console.log(dataPath);
    const path = require('path');

    const currentDirectory = process.cwd();
    const parentDirectory = path.join(currentDirectory, '..');
    
    console.log('Current Directory:', currentDirectory);
    console.log('Parent Directory:', parentDirectory);
    
  
    // List files in the current directory
    try {
      const files = fs.readdirSync(currentDirectory);
      const files2 = fs.readdirSync(parentDirectory);
      console.log('Files in Current Directory:', files,files2);
    } catch (error) {
      console.error('Error listing files:', error);
    }
    // Read the data from the data.json file
      const rawData = fs.readFileSync("/app/netlify/data/data.json");
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
