const express = require('express');
const bodyParser = require('body-parser');

//built in modules
const path = require('path');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();


app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = { app };