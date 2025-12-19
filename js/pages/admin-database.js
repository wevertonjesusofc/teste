/**
 * WEM CONSULTANCY - Static Admin Database Page
 */

function renderAdminDatabase() {
    if (!stateService.isAdmin()) {
        navigate('landing');
        return;
    }

    const tables = {
        users: window.db.users.listAll() || [],
        investments: window.db.investments.listAll() || [],
        withdrawals: window.db.withdrawals.listAll() || [],
        transactions: window.db.transactions.listAll() || [],
        dailyPLR: window.db.plr.getHistory() || [],
        referrals: (window.db.users.listAll() || []).filter(u => u.referredBy)
    };

    document.getElementById('app').innerHTML = `
        <div class="min-h-screen bg-background-dark">
            <!-- Header (Consistent with admin-panel) -->
            <header class="sticky top-0 z-40 bg-background-dark-2/95 backdrop-blur-md border-b border-danger/30">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('admin-panel')">
                            <span class="material-symbols-outlined text-danger">admin_panel_settings</span>
                            <span class="font-bold text-lg">WEM ADMIN</span>
                        </div>
                        <span class="px-2 py-1 rounded bg-danger/20 text-danger text-xs font-bold uppercase">Banco de Dados</span>
                    </div>
                    <div class="flex items-center gap-4">
                        ${getModeSwitchButton()}
                        <button onclick="authService.logout()" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger/20 text-danger hover:bg-danger hover:text-white font-bold">
                            <span class="material-symbols-outlined">logout</span>
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <!-- Data Overview Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    ${Object.entries(tables).map(([name, data]) => `
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-4 hover:border-primary/50 cursor-pointer" onclick="updateTableViewer('${name}')">
                            <p class="text-xs text-text-secondary uppercase">${name}</p>
                            <p class="text-2xl font-bold mt-1">${data.length}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Export Actions -->
                    <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                        <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-primary">download</span>Exportar Dados</h3>
                        <p class="text-sm text-text-secondary mb-4">Baixe um backup completo do banco de dados simulado em formato JSON.</p>
                        <button onclick="handleExportDB()" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover">
                            <span class="material-symbols-outlined">download</span>Exportar Banco de Dados
                        </button>
                    </div>
                    <!-- Danger Zone -->
                    <div class="rounded-xl border border-danger/30 bg-danger/5 p-6">
                        <h3 class="text-lg font-bold mb-4 text-danger flex items-center gap-2"><span class="material-symbols-outlined">warning</span>Zona de Perigo</h3>
                        <p class="text-sm text-text-secondary mb-4">Limpe todos os dados (exceto admin). Esta ação é simulada e não afetará arquivos físicos.</p>
                        <button onclick="handleResetDB()" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-danger text-white font-bold hover:bg-red-600">
                            <span class="material-symbols-outlined">delete_forever</span>Limpar Banco de Dados
                        </button>
                    </div>
                </div>
                
                <!-- Data Viewer Table -->
                <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                    <div class="px-6 py-5 border-b border-surface-highlight flex justify-between items-center">
                        <h3 class="text-lg font-bold">Visualizador de Dados</h3>
                        <select id="db-table-selector" onchange="updateTableViewer(this.value)" class="px-4 py-2 rounded-lg bg-background-dark border border-border-dark text-white focus:ring-2 focus:ring-primary outline-none">
                            <option value="users">users</option>
                            <option value="investments">investments</option>
                            <option value="withdrawals">withdrawals</option>
                            <option value="transactions">transactions</option>
                            <option value="dailyPLR">dailyPLR</option>
                        </select>
                    </div>
                    <div class="p-6">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm" id="database-viewer-table">
                                <!-- Dynamic Content -->
                            </table>
                        </div>
                        <p class="text-xs text-text-secondary mt-4" id="table-count-info"></p>
                    </div>
                </div>
            </main>
        </div>
    `;

    // Initialize with users table
    updateTableViewer('users');
}

function updateTableViewer(tableName) {
    const table = document.getElementById('database-viewer-table');
    const info = document.getElementById('table-count-info');
    const selector = document.getElementById('db-table-selector');

    if (selector) selector.value = tableName;

    let data = [];
    let headers = [];

    switch (tableName) {
        case 'users':
            data = window.db.users.listAll();
            headers = ['id', 'email', 'name', 'role', 'migrated', 'createdAt'];
            break;
        case 'investments':
            data = window.db.investments.listAll();
            headers = ['id', 'userId', 'amount', 'status', 'createdAt'];
            break;
        case 'withdrawals':
            data = window.db.withdrawals.listAll();
            headers = ['id', 'userId', 'amount', 'type', 'status', 'createdAt'];
            break;
        case 'transactions':
            data = window.db.transactions.listAll();
            headers = ['id', 'userId', 'amount', 'type', 'description', 'date'];
            break;
        case 'dailyPLR':
            data = window.db.plr.getHistory();
            headers = ['id', 'percentage', 'timestamp'];
            break;
    }

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td class="py-8 text-center text-text-secondary">Nenhum dado encontrado para ${tableName}</td></tr>`;
        info.innerHTML = '';
        return;
    }

    // Render Table
    table.innerHTML = `
        <thead>
            <tr class="border-b border-surface-highlight">
                ${headers.map(h => `<th class="px-4 py-3 text-left text-text-secondary font-bold uppercase tracking-wider">${h}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${data.map(item => `
                <tr class="border-b border-surface-highlight/40 hover:bg-surface-highlight/20 transition-colors">
                    ${headers.map(h => {
        let val = item[h === 'id' ? 'userId' || 'id' : h] || item[h] || '-';
        if (h === 'userId' && tableName !== 'users') val = `<span class="text-primary font-mono text-xs">${val}</span>`;
        if (h === 'amount') val = `<strong>${formatCurrency(val)}</strong>`;
        if (h === 'createdAt' || h === 'date' || h === 'timestamp') val = formatDate(val);
        if (h === 'percentage') val = `<strong>${val.toFixed(2)}%</strong>`;
        if (h === 'status') {
            const colors = { pending: 'text-warning', approved: 'text-success', active: 'text-success', rejected: 'text-danger' };
            val = `<span class="${colors[val] || 'text-text-secondary'} font-bold uppercase text-[10px]">${val}</span>`;
        }
        return `<td class="px-4 py-3 text-text-secondary whitespace-nowrap">${val}</td>`;
    }).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;

    info.innerHTML = `Mostrando ${data.length} registro(s) da tabela <strong>${tableName}</strong>`;
}

function handleExportDB() {
    const backup = {
        users: window.db.users.listAll(),
        investments: window.db.investments.listAll(),
        withdrawals: window.db.withdrawals.listAll(),
        transactions: window.db.transactions.listAll(),
        plrHistory: window.db.plr.getHistory(),
        exportDate: new Date().toISOString()
    };

    // Simulate JSON Download
    console.log('Exporting database:', backup);
    showToast('Backup do banco de dados exportado com sucesso!', 'success');
}

function handleResetDB() {
    if (confirm('Deseja realmente limpar o banco de dados simulado? Esta ação resetará o estado do navegador.')) {
        localStorage.clear();
        showToast('Banco de dados resetado. Recarregando...', 'info');
        setTimeout(() => window.location.reload(), 1500);
    }
}

