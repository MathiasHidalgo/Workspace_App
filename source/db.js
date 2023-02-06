const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // added o solve a problem

mongoose.connect('mongodb://127.0.0.1:27017/notes-wsapp') // connect to MongoDB after mongosh was started and /notes-wsapp is a collection created if isn't already present
  .then(() => console.log('Connected to MongoDB')) // if all goes well, send a message to console
  .catch(() => console.error(err));

