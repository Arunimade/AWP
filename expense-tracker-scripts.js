document.addEventListener('DOMContentLoaded', () => {
    // Personal Finance Variables
    let personalEntries = [];
    let personalBudget = 0;
    let personalTotalIncome = 0;
    let personalTotalExpenses = 0;

    // Shared Expenses Variables
    let sharedEntries = [];
    let sharedBudget = 0;
    let sharedTotalIncome = 0;
    let sharedTotalExpenses = 0;

    // Add Personal Finance Entry
    document.getElementById('personal-finance-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('entry-name').value;
        const amount = parseFloat(document.getElementById('entry-amount').value);
        const date = document.getElementById('entry-date').value;
        const type = document.getElementById('entry-type').value;
        const category = document.getElementById('entry-category').value;

        const entry = { name, amount, date, type, category };
        personalEntries.push(entry);

        if (type === 'Income') {
            personalTotalIncome += amount;
        } else {
            personalTotalExpenses += amount;
        }

        updatePersonalSummary();
        addPersonalEntryToList(entry);
        document.getElementById('personal-finance-form').reset();
    });

    // Set Personal Budget
    document.getElementById('personal-budget-form').addEventListener('submit', (e) => {
        e.preventDefault();
        personalBudget = parseFloat(document.getElementById('budget-amount').value);
        updatePersonalSummary();
        document.getElementById('personal-budget-form').reset();
    });

    // Update Personal Finance Summary
    function updatePersonalSummary() {
        document.getElementById('personal-total-income').innerText = personalTotalIncome.toFixed(2);
        document.getElementById('personal-total-expenses').innerText = personalTotalExpenses.toFixed(2);
        const remainingBudget = personalBudget - personalTotalExpenses;
        document.getElementById('personal-remaining-budget').innerText = remainingBudget.toFixed(2);

        updatePersonalChart();
    }

    // Add Personal Entry to List
    function addPersonalEntryToList(entry) {
        const entryList = document.getElementById('personal-entry-list');
        const entryItem = document.createElement('div');
        entryItem.classList.add('entry-item');
        entryItem.innerHTML = `
            <p>${entry.name} - Rs ${entry.amount} (${entry.type}, ${entry.category})</p>
            <p>Date: ${entry.date}</p>
        `;
        entryList.appendChild(entryItem);
    }

    // Update Personal Chart
    function updatePersonalChart() {
        const ctx = document.getElementById('personal-summary-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    label: 'Personal Summary',
                    data: [personalTotalIncome, personalTotalExpenses],
                    backgroundColor: ['#2ecc71', '#e74c3c']
                }]
            }
        });
    }

    // Add Shared Expense Entry
    document.getElementById('shared-expenses-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('shared-entry-name').value;
        const amount = parseFloat(document.getElementById('shared-entry-amount').value);
        const date = document.getElementById('shared-entry-date').value;
        const participants = document.getElementById('shared-entry-participants').value.split(',');
        const individualShare = parseFloat(document.getElementById('shared-entry-individual-share').value);
        const paymentMethod = document.getElementById('shared-entry-payment-method').value;
        const category = document.getElementById('shared-entry-category').value;
        const status = document.getElementById('shared-entry-status').value;

        const entry = { name, amount, date, participants, individualShare, paymentMethod, category, status };
        sharedEntries.push(entry);

        if (status === 'Settled') {
            sharedTotalIncome += amount;
        } else {
            sharedTotalExpenses += amount;
        }

        updateSharedSummary();
        addSharedEntryToList(entry);
        document.getElementById('shared-expenses-form').reset();
    });

    // Set Shared Budget
    document.getElementById('shared-budget-form').addEventListener('submit', (e) => {
        e.preventDefault();
        sharedBudget = parseFloat(document.getElementById('shared-budget-amount').value);
        updateSharedSummary();
        document.getElementById('shared-budget-form').reset();
    });

    // Update Shared Finance Summary
    function updateSharedSummary() {
        document.getElementById('shared-total-income').innerText = sharedTotalIncome.toFixed(2);
        document.getElementById('shared-total-expenses').innerText = sharedTotalExpenses.toFixed(2);
        const remainingSharedBudget = sharedBudget - sharedTotalExpenses;
        document.getElementById('shared-remaining-budget').innerText = remainingSharedBudget.toFixed(2);

        updateSharedChart();
    }

    // Add Shared Entry to List
    function addSharedEntryToList(entry) {
        const entryList = document.getElementById('shared-entry-list');
        const entryItem = document.createElement('div');
        entryItem.classList.add('entry-item');
        entryItem.innerHTML = `
            <p>${entry.name} - Rs ${entry.amount} (${entry.status}, ${entry.category})</p>
            <p>Participants: ${entry.participants.join(', ')}</p>
            <p>Date: ${entry.date}</p>
        `;
        entryList.appendChild(entryItem);
    }

    // Update Shared Chart
    function updateSharedChart() {
        const ctx = document.getElementById('shared-summary-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Settled', 'Outstanding'],
                datasets: [{
                    label: 'Shared Summary',
                    data: [sharedTotalIncome, sharedTotalExpenses],
                    backgroundColor: ['#3498db', '#e74c3c']
                }]
            }
        });
    }
});
