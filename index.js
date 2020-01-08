// npm i express body-parser morgan helmet express-es6-template-engine
// npm i -D nodemon

const http = require('http');
const express = require('express')
const app = express();

const PORT = 3000; 
const server = http.createServer(app);

const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

const helmet = require('helmet');
app.use(helmet());

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.static('public'));

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { stuff } = require('./models');

app.get('/', (req, res) => {
    console.log(stuff.all())
    res.send('so many dependencies. <a href="/create">create</a>');
});

app.get('/create', (req, res)=> {
    res.render('form');
});

app.post('/create', parseForm, (req, res) => {
    // console.log(`*********post`)
    const {name, givesJoy} = req.body;
    stuff.create(name, givesJoy)
    // reading the data from the form
    console.log(req.body)
    res.redirect('/create/success');
})

app.get('/create/success', (req, res) => {
    // console.log('redirect**********')
    console.log(stuff.all())
    res.send(`success. <a href="/create">create</a>`);
})

server.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}...`)
})
