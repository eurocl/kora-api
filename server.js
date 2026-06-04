const http = require('http');

const rateLimiter = require('./middleware/rateLimiter');
const { connectRedis } = require('./services/redisClient');
const { saveIncident } = require('./services/sqliteService');

const {
    getAllProducts,
    getProductById,
    getProductsByCategory
} = require('./services/productService');

const parseBody = require('./utils/bodyParser');
const { sendJSON } = require('./utils/responses');

connectRedis();

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {

        res.writeHead(204);
        return res.end();
    }

    try {

        const url = new URL(
            req.url,
            `http://${req.headers.host}`
        );

        // =================================
        // POST /api/data
        // =================================
        if (
            req.method === 'POST' &&
            url.pathname === '/api/data'
        ) {

            const allowed =
                await rateLimiter(req, res);

            if (!allowed) return;

            try {

                const data =
                    await parseBody(req);

                if (
                    !data.message ||
                    typeof data.message !== 'string'
                ) {

                    return sendJSON(res, 400, {
                        error: 'Payload inválido'
                    });
                }

                const ip =
                    req.socket.remoteAddress;

                await saveIncident(ip, data);

                return sendJSON(res, 201, {
                    success: true,
                    data
                });

            } catch (error) {

                return sendJSON(res, 400, {
                    error: 'JSON inválido'
                });
            }
        }

        // =================================
        // GET /productos
        // GET /productos?category=tees
        // =================================
        if (
            req.method === 'GET' &&
            url.pathname === '/productos'
        ) {

            const category =
                url.searchParams.get('category');

            if (category) {

                const products =
                    await getProductsByCategory(
                        category
                    );

                return sendJSON(
                    res,
                    200,
                    products
                );
            }

            const products =
                await getAllProducts();

            return sendJSON(
                res,
                200,
                products
            );
        }

        // =================================
        // GET /productos/:id
        // =================================
        if (
            req.method === 'GET' &&
            url.pathname.startsWith('/productos/')
        ) {

            const id =
                url.pathname.split('/')[2];

            const product =
                await getProductById(id);

            if (!product) {

                return sendJSON(res, 404, {
                    error:
                        'Producto no encontrado'
                });
            }

            return sendJSON(
                res,
                200,
                product
            );
        }

        // =================================
        // GET /health
        // =================================
        if (
            req.method === 'GET' &&
            url.pathname === '/health'
        ) {

            return sendJSON(res, 200, {
                status: 'OK'
            });
        }

        // =================================
        // 404
        // =================================
        return sendJSON(res, 404, {
            error: 'Ruta no encontrada'
        });

    } catch (error) {

        console.error(error);

        return sendJSON(res, 500, {
            error: 'Internal Server Error'
        });
    }
});

server.listen(3001, () => {

    console.log(
        'Servidor corriendo en puerto 3001'
    );
});