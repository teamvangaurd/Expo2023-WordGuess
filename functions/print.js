const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  // Get the current working directory
  const currentDirectory = process.cwd();
  console.log('Current Directory:', currentDirectory);

  // List files in the current directory
  try {
    const files = fs.readdirSync(currentDirectory);
    console.log('Files in Current Directory:', files);
  } catch (error) {
    console.error('Error listing files:', error);
  }

  return {
    statusCode: 200,
    body: 'Check the logs for current directory and file list.',
  };
};
