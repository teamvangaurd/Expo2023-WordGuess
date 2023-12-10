// functions/saveScore.js

exports.handler = async function (event, context) {
    try {
        const { name, score } = JSON.parse(event.body);

        // Perform any necessary validation or data processing here

        // In a real application, you would store the data in a database
        // For simplicity, this example logs the data to the console
        console.log('Saving score:', { name, score });

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
