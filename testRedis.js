const { connectRedis, client } = require('./services/redisClient');

async function test() {
    await connectRedis();

    await client.set('saludo', 'hola');

    const valor = await client.get('saludo');

    console.log(valor);

    process.exit();
}

test();