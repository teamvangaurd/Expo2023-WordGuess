const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    gamepage: './src/gamepage/index.js',
    loginpage: './src/loginpage/index.js',
    leaderboard: './src/leaderboard/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../assets/javascript/'),
    publicPath: '../assets/javascript/'
  }
};

