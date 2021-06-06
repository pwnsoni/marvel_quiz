const redisController = require('../redis');
const gameController = require('../redis/game');

module.exports = (router) => {
    router.route('/addScore')
        .post(redisController.addScore);

    router.route('/leaderBoard')
        .post(redisController.getLeaderBoard);

    router.route('/joinRoom')
        .post(redisController.joinRoom);

    router.route('/questions')
        .get(gameController.getQuestions);
    // router.route('/cron/:_id')
    //     .get(cronController.getThisCron)
    //     .put(cronController.updateThisCron)
    //     .delete(cronController.deleteThisCron);
};