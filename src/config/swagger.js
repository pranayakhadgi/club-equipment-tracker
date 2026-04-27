const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Equipment Inventory API",
            version: "1.0.0",
            description: "Campus equipment management system with ghost return detection",
            contact: {
                name: "[theMFdev]",
                email: "an.al123@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs)
};
