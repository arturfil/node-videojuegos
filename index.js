const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const expressValidor = require('express-validator');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database Setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => { console.log("Database connected")})

// Routes
app.get('/', (req, res) => {
  res.send('hola latinoamerica!')
});
app.use('/api/users', require('./routes/auth'));

const port = process.env.PORT

// Listen to port setup;
app.listen(port, () => {
  console.log(`Servidor de videojuegos esta corriendo en el puerto ${port}`)
})
