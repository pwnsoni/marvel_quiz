const games = require('./game');
// const snsGroups = require('./snsGroups');
// const lambda = require('./lambda');
// const hit = require('./hit');

module.exports = (router) => {
  games(router)
  return router;
};