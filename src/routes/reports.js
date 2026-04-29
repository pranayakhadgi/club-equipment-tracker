const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/csv', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                d.discrepancy_id,
                d.type,
                d.status,
                d.reported_at::date as reported_date,
                d.resolved_at::date as resolved_date,
                o.name as organization,
                i.name as item,
                ri.quantity_requested,
                ri.quantity_returned,
                d.notes
            FROM discrepancies d
            JOIN reservation_items ri ON d.reservation_item_id = ri.reservation_item_id
            JOIN items i ON ri.item_id = i.item_id
            JOIN reservations r ON ri.reservation_id = r.reservation_id
            JOIN organizations o ON r.organization_id = o.organization_id
            ORDER BY d.reported_at DESC
            `);

        const headers = [
            'Discrepancy ID',
            'Type',
            'Status',
            'Reported Date',
            'Resolved Date',
            'Organization',
            'Item',
            'Quantity Requested',
            'Quantity Returned',
            'Notes'
        ].join(',');

        const rows = result.rows.map(row =>
            [
                row.discrepancy_id,
                row.type,
                row.status,
                row.reported_date,
                row.resolved_date || '', 
                `"${row.organization}"`, 
                `"${row.item}"`, 
                row.quantity_requested, 
                row.quantity_returned, 
                `"${(row.notes || '').replace(/"/g, '""')}"`
            ].join(','));

        const csv = [headers, ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="discrepancy-report.csv"');
        res.send(csv);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;
