const Redis = require("ioredis");

const connectToRedis = () => {
    const redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD
    });
   return redis;    
}

const addScoreInRoom = async (room, username, score) => {
    const redis = connectToRedis();
    const sessionKey = `sessions:${username}`;
    const addScoreRes = await redis
                                .pipeline()
                                .set(sessionKey, JSON.stringify({username, score}))
                                .zadd(room, score, sessionKey)
                                .exec();

    console.log(`addScoreResult: ${addScoreRes}`);
    redis.quit()
    return addScoreRes;
}

const getLeaderBoardTops = async (room, toppers) => {
    const redis = connectToRedis();
    redis.defineCommand('leaderboard', {
        numberOfKeys: 1,
        lua: `
          local keys = redis.call("zrevrange", KEYS[1], 0, ARGV[1])
          if next(keys) == nil then
            return {}
          end
          return redis.call("mget", unpack(keys))
        `,
      });

    let response = await redis.leaderboard(room, toppers);
    console.log(`Current Leaderboard: ${JSON.stringify(response.map(JSON.parse))}`);
    redis.quit();
    return response.map(JSON.parse);
}

module.exports = {getLeaderBoardTops, addScoreInRoom};