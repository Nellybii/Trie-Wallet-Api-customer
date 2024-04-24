const express = require("express");
//const sequelize = require("./db");
//const bodyParser = require('body-parser');

//const { Sequelize } = require('sequelize');
const customerRouter = require("./routes/customer.Route");
const accountRouter = require("./routes/account.Route");
const userRouter = require("./routes/user.Route");

const app = express();
const port = 5000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use('/api', customerRouter);
app.use('/api', accountRouter);
app.use('/api',userRouter);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
