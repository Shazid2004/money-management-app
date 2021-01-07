const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Connected to server at port ${PORT}`);
  mongoose.connect(
    'mongodb://localhost:27017/money-management-app',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log('Database Connected');
    }
  );
});
