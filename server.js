
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const dbconfig = require('./config/config');
const routes = require('./routes/categories');
const instructorRoutes = require('./routes/instructor');
const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');
const routerPayment = require('./routes/paymentRoot');
const studentRoutes = require('./routes/student');
const subjectRoutes = require('./routes/subject');
const paginationRoutes = require('./routes/paginationRoutes');

mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

let app = express();
let port = 8001;

/*use for call local api*/
app.use(cors());

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.get('/',function (req,res){
    res.send("hello world");
});

app.use('/uploads', express.static('uploads'));
app.use('/categories',routes);
app.use('/instructor',instructorRoutes);
app.use('/course',courseRoute);
app.use('/user',userRoute);
app.use('/payment',routerPayment);

//student info
app.use('/student',studentRoutes);
app.use('/subject',subjectRoutes);

//
app.use('/numberofdata',paginationRoutes);

app.listen(port,() => {
    console.log(`port assignment is: ${port}`);
});
