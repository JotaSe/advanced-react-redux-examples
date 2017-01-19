const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

router(app);
// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listen on:', port);
