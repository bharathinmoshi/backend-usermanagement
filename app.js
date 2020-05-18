const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// models
Role = require("./helpers/roles");
User = require("./helpers/user");

// routes
roleRoute = require("./routes/roles");
userRoute = require("./routes/user")



app.use(express.static(__dirname));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit:50000
}));
app.use('/role',roleRoute);
app.use('/user',userRoute);


   

mongoose.connect('mongodb://localhost/user-management', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
app.get('/', (req, res) => {
    res.send("user-management");
});


app.listen(3000);
console.log("RUNNING PORT ON 3OOO");