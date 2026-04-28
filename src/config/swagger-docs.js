const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'Equipment Inventory API',
        version: '1.0.0',
        description: 'Campus equipment management with ghost return detection',
        contact: { name: 'Pranaya Khadgi Shahi', email: 'pranaya.khadgi99@gmail.com' }
    },
    servers: [{ url: 'http://localhost:3000', description: 'Development' }],
    paths: {
        '/health': {
            get: {
                summary: 'System health check',
                tags: ['System'],
                responses: {
                    '200': {
                        description: 'Healthy',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'healthy' },
                                        timestamp: { type: 'string', format: 'date-time' },
                                        database: {
                                            type: 'object',
                                            properties: {
                                                connected: { type: 'boolean' },
                                                serverTime: { type: 'string', format: 'date-time' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/organizations': {
            get: {
                summary: 'List all organizations',
                tags: ['Organizations'],
                responses: {
                    '200': {
                        description: 'List of organizations',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer' },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    organization_id: { type: 'integer' },
                                                    name: { type: 'string' },
                                                    type: { type: 'string' },
                                                    contact_email: { type: 'string' },
                                                    status: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/items': {
            get: {
                summary: 'List all items with locations',
                tags: ['Inventory'],
                responses: {
                    '200': {
                        description: 'List of equipment',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer' },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    item_id: { type: 'integer' },
                                                    name: { type: 'string' },
                                                    category: { type: 'string' },
                                                    status: { type: 'string' },
                                                    location_name: { type: 'string' },
                                                    location_type: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/reservations': {
            get: {
                summary: 'List all reservations',
                tags: ['Reservations'],
                responses: {
                    '200': {
                        description: 'List of reservations',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer' },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    reservation_id: { type: 'integer' },
                                                    organization_name: { type: 'string' },
                                                    location_name: { type: 'string' },
                                                    start_time: { type: 'string', format: 'date-time' },
                                                    end_time: { type: 'string', format: 'date-time' },
                                                    status: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Create new reservation',
                tags: ['Reservations'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['organization_id', 'start_time', 'end_time', 'items'],
                                properties: {
                                    organization_id: { type: 'integer' },
                                    location_id: { type: 'integer' },
                                    start_time: { type: 'string', format: 'date-time' },
                                    end_time: { type: 'string', format: 'date-time' },
                                    items: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                item_id: { type: 'integer' },
                                                quantity: { type: 'integer' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Reservation created' },
                    '400': { description: 'Validation failed' }
                }
            }
        },
        '/reservations/{id}': {
            get: {
                summary: 'Get reservation details',
                tags: ['Reservations'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    '200': { description: 'Reservation details' },
                    '404': { description: 'Not found' }
                }
            }
        },
        '/reservations/{id}/return': {
            post: {
                summary: 'Process item return',
                tags: ['Reservations'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                reservation_item_id: { type: 'integer' },
                                                quantity_returned: { type: 'integer' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Return processed' },
                    '400': { description: 'Validation failed' }
                }
            }
        },
        '/discrepancies/{id}/resolve': {
            put: {
                summary: 'Resolve discrepancy',
                tags: ['Discrepancies'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    '200': { description: 'Discrepancy resolved' },
                    '404': { description: 'Not found' }
                }
            }
        }
    }
};

module.exports = swaggerDocs;