/**
 * @swagger
 * tags:
 * name: Organizations
 * description: Organization management
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: List all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       organization_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       contact_email:
 *                         type: string
 *                       status:
 *                         type: string
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM organizations ORDER BY name');
        res.json({
            count: result.rowCount,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

