const fs = require('fs');

exports.handler = async function (event, context) {
    try {
        const { name, score } = JSON.parse(event.body);

        // Perform any necessary validation or data processing here

        // Load existing data from the file
        let data = [];
        try {
            const fileContents = fs.readFileSync('./netlify/data.json', 'utf-8');
            data = JSON.parse(fileContents);
        } catch (readError) {
            console.error('Error reading data file:', readError);
        }

        // Add the new score to the data array
        data.push({ name, score });

        // Save the updated data back to the file
        try {
            fs.writeFileSync('./netlify/data.json', JSON.stringify(data, null, 2), 'utf-8');
        } catch (writeError) {
            console.error('Error writing data file:', writeError);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error saving score:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
        };
    }
};
