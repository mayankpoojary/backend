const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/userRoute');
const docRoutes = require('./routes/doctorRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
app.use(
    cors({
      origin: '*',
    })
  );



app.get('/', (req, res) => {
    res.send('This is api for the Pro Manage app');
  });
  
app.use("/api/user",authRoutes)
app.use("/api/doctor",docRoutes)


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });
  

const PORT = process.env.PORT||3000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected Successfully.")
    app.listen(PORT,()=>{
        console.log(`Server is running on port :${PORT}`)
    })
}).catch(error=>console.log(error));
