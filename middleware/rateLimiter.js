
const { client } = require('../services/redisClient');
const { sendJSON } = require('../utils/responses');

async function rateLimiter(req, res) {

    const ip = req.socket.remoteAddress;

    const key = `rate:${ip}`;

    let requests = await client.get(key);

    if (!requests) {

        await client.set(key, 1, {
            EX: 10
        });

        return true;
    }

    requests = parseInt(requests);

    if (requests >= 5) {

        sendJSON(res, 429, {
            error: 'Too Many Requests'
        });

        return false;
    }

    await client.incr(key);

    return true;
}

module.exports = rateLimiter;

