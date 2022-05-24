'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/pages')(app);
  require('./router/api')(app);
};
