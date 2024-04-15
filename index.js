const express = require("express");
//const sequelize = require("./db");
//const bodyParser = require('body-parser');

//const { Sequelize } = require('sequelize');
const customerRouter = require('./src/route')

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use('/api', customerRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
