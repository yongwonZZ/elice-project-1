import mongoose from 'mongoose';
module.exports = () => {
  function connect() {
    mongoose.connect("mongodb+srv://seonseon042:7IQXfch2LKcTIv89@mongodb-sample.3flbdwk.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-sample"
, function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./user.js'); // user.js는 나중에 만든다 치고...?
};