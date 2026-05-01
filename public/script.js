async function loadDiscrepancies() {
    try {
        // a dicrepancy report?
        const response = await fetch('/discrepancies');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        // Update stats
        document.getElementById('total-count').textContent = data.count;
        document.getElementById('flagged-count').textContent = data.flagged;
        document.getElementById('resolved-count').textContent = data.resolved;

        // Populate table
        const tbody = document.getElementById('discrepancies-body');
        tbody.innerHTML = data.data.map(d => `
                    <tr>
                        <td>${d.discrepancy_id}</td>
                        <td>${d.organization_name}</td>
                        <td>${d.item_name}</td>
                        <td>${d.type}</td>
                        <td><span class="status ${d.status}">${d.status}</span></td>
                        <td>${new Date(d.reported_at).toLocaleDateString()}</td>
                        <td>${d.notes || '-'}</td>
                    </tr>
                `).join('');

        // Show table, hide loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('discrepancies-table').style.display = 'table';

    } catch (err) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').innerHTML = `
                    <div class="error">Failed to load data: ${err.message}</div>
                `;
    }
}

loadDiscrepancies();