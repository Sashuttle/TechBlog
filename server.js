//Setting up dependencies and configurations
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
//FixMe: Do not need a database for this challenge?
//const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

//Setting up the session
const sessions = {
    secret: 'big secret',
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequilize,
    })
};

//Setting up an instance of express application & using default port
const app = express();
const PORT = process.env.PORT || 3000;

//setting up static file server middleware with express
app.use(express.static(path.join(_dirname, 'public')));

//Setting up handlebar template & default view engine 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//parse incoming requests with JSON & URL encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting up & use express session middleware
app.use(session(sessions));

//uses routes from route modules
app.use(routes);

//sync sequelize models with database (no dropping and recreating) & start express server on default port
Sequelize.sync({ force: false }).then (() => {
    app.listen(process.env.PORT || 3000, () => console.log('Ready to receive'));
});