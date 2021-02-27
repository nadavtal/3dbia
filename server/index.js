/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const config = require('./config.js');

const db = require("./models");
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

db.sequelize.sync();
const app = express();



/**
   * Router
   */
const routes = require('./app.routes.js');
const orgRoutes = require('./routes/organizations');
const userRoutes = require('./routes/users');
const providersRoutes = require('./routes/providers');
const projectsRoutes = require('./routes/projects');
const bridgesRoutes = require('./routes/bridges');
const rolesRoutes = require('./routes/roles');
const surveysRoutes = require('./routes/surveys');
const projectUsersRoutes = require('./routes/project-users');
const providerUsersRoutes = require('./routes/provider-users');
const organizationUsersRoutes = require('./routes/organization-users');
const organizationProvidersRoutes = require('./routes/organization-providers');
const projectSurveysRoutes = require('./routes/project-surveys');
const messages = require('./routes/messages');
const processTemaplateTasksRoutes = require('./routes/process-template-tasks');
const processesRoutes = require('./routes/processes');
const tasksRoutes = require('./routes/tasks');
const emailsRoutes = require('./routes/emails');
const uploadsRoutes = require('./routes/uploads');
const folderStructureRoutes = require('./routes/folder-structure');
const userConnectionsRoutes = require('./routes/users-connections');
const appDataRoutes = require('./routes/appData');


const bodyParser = require('body-parser')
const fs = require('fs');


app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(config.apiRoute, [routes, orgRoutes, userRoutes, providersRoutes, projectsRoutes, bridgesRoutes, surveysRoutes, projectUsersRoutes, projectSurveysRoutes,
                          providerUsersRoutes, organizationProvidersRoutes, messages, processTemaplateTasksRoutes, rolesRoutes, processesRoutes, tasksRoutes, 
                          emailsRoutes, organizationUsersRoutes, uploadsRoutes, folderStructureRoutes, userConnectionsRoutes, appDataRoutes]);




// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use(function (req, res, next) {
//   console.log(req.body)
//   console.log(req.method)
//   console.log('app Time:', Date.now())
//   next()
// })
// app.use('/api', myApi);
 
// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

const useServerSentEventsMiddleware = (req, res, next) => {
  console.log(req)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection: keep-alive');
  res.setHeader('X-Accel-Buffering: no');

  // only if you want anyone to access this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.flushHeaders();

  const sendEventStreamData = (data) => {
      const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
      res.write(sseFormattedResponse);
  }

  // we are attaching sendEventStreamData to res, so we can use it later
  Object.assign(res, {
      sendEventStreamData
  });

  next();
}

const streamRandomNumbers = (req, res) => {
  // We are sending anyone who connects to /stream-random-numbers
  // a random number that's encapsulated in an object
  let interval = setInterval(function generateAndSendRandomNumber(){
      const data = {
          value: Math.random(),
      };
      console.log('data', data)
      res.sendEventStreamData(data);
  }, 1000);

  // close
  res.on('close', () => {
      clearInterval(interval);
      res.end();
  });
}

app.get('/stream-random-numbers', useServerSentEventsMiddleware, 
  streamRandomNumbers)
 
// const cors_proxy = require('cors-anywhere');
// cors_proxy.createServer({
//   originWhitelist: [], // Allow all origins
//   requireHeader: ['origin', 'x-requested-with'],
//   removeHeaders: ['cookie', 'cookie2']
// }).listen(3000, host, function() {
//   console.log('Running CORS Anywhere on ' + host + ':' + port);
// });

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});





