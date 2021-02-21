const port = require('./port');
;(function() {

  /**
   * App configuration inluding MongoDB, API route etc.
   */

  'use strict';

  module.exports = {
    db: {
      development: {
        url: 'Vm1.manam.co.il/apidev',
        port: 5000,
      },
      test: {
        url: 'Vm1.manam.co.il/apitest',
        port: 5555,
      },
      production: {
        url: 'Vm1.manam.co.il/apiprod',
        port: 5300,
      },
    },
    baseUrl: `http://localhost/:${port}/`,
    HOST: 'Vm1.manam.co.il',
    USER: 'manam_3dbia',
    PASSWORD: 'Manam12!@',
    DB: 'db_3dbia_4',
    dialect: 'mysql',
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 30000,
      maxIdleTime: 30,
      connectionLimit: 100,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      multipleStatements: true,
    },
    secret: 'customSecret2016?!', // BEWARE: this should not goes into repository
    apiRoute: '/api/v1/',
  };

})();
