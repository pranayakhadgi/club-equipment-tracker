const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-docs');

module.exports = {
    serve: swaggerUi.serve,
    setup: (req, res, next) => {
        const swaggerDocs = require('./swagger-docs');
        swaggerUi.setup(swaggerDocs)(req, res, next);
    }
};
