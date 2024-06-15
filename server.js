//Note: Setting up dependencies and configurations
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const exp = require('constants');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Note: loading environment variables from .env
require('dotenv').config();

//Note: Setting up an instance of express application & using default port 3001
const app = express();
const PORT = process.env.PORT || 3001;

//Note: setting up handlebars with custom helpers
const hbs = exphbs.create({ helpers });

//Note: Setting up the session
//FixMe: May have to fix this code?
const sessions = {
    secret: 'big secret',
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequilize,
    }),
};

//Note: setting up & use express session middleware
app.use(session(sessions));

//Note: Setting up handlebar template & default view engine 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Note: MIDDLEWARE
//Note: parse incoming requests with JSON & URL encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Note: setting up static file server middleware with express
app.use(express.static(path.join(_dirname, 'public')));
//Note: uses routes from route modules
app.use(routes);

//Note: sync sequelize models with database (no dropping and recreating) & start express server on default port
//FIXME: may have to come back to this code and change it
sequelize.sync({ force: false }).then (() => {
    app.listen(process.env.PORT || 3001, () => console.log('Ready to receive'));
});