
function parseBody(req) {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', chunk => {

            body += chunk.toString();

            // protección básica
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });

        req.on('end', () => {

            try {

                const data = JSON.parse(body);

                resolve(data);

            } catch (error) {

                reject(error);
            }
        });
    });
}

module.exports = parseBody;
