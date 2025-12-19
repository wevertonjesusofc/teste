/**
 * WEM CONSULTANCY - Static Admin Dashboard
 */

function renderAdminDashboard() {
    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${adminSidebar('dashboard')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${adminHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div><h2 class="text-2xl md:text-3xl font-bold">Painel Administrativo</h2><p class="text-text-secondary">Visão geral da plataforma WEM CONSULTANCY</p></div>
                        </div>
                        
                        <div class="rounded-xl bg-warning/10 border border-warning/30 p-4 flex items-center gap-4">
                            <span class="material-symbols-outlined text-warning text-2xl">pending_actions</span>
                            <div class="flex-1"><p class="font-bold text-warning">Itens pendentes</p><p class="text-sm text-text-secondary">3 investimentos e 2 saques aguardando.</p></div>
                            <button onclick="navigate('admin-users')" class="px-4 py-2 rounded-lg bg-warning text-black font-bold">Ver pendentes</button>
                        </div>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            ${statCard('Total Investido', 'R$ 847.500,00', 'account_balance', 'primary')}
                            ${statCard('Usuários Ativos', '156', 'group', 'primary')}
                            ${statCard('Rendimentos Totais', 'R$ 42.375,00', 'trending_up', 'success')}
                            ${statCard('Saques Pendentes', '2', 'pending', 'warning')}
                            ${statCard('Lucro Plataforma', 'R$ 6.356,25', 'payments', 'gold')}
                        </div>
                        
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <h3 class="text-lg font-bold mb-6">Crescimento da Plataforma</h3>
                                <div class="h-[300px]"><canvas id="admin-growth-chart"></canvas></div>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <h3 class="text-lg font-bold mb-6">Distribuição de Investimentos</h3>
                                <div class="h-[300px]"><canvas id="admin-dist-chart"></canvas></div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6 hover:border-primary/50 cursor-pointer" onclick="navigate('admin-plr')">
                                <div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><span class="material-symbols-outlined text-2xl">percent</span></div><div><h4 class="font-bold">Aplicar PLR</h4><p class="text-sm text-text-secondary">Definir rendimento diário</p></div></div>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6 hover:border-success/50 cursor-pointer" onclick="navigate('admin-users')">
                                <div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success"><span class="material-symbols-outlined text-2xl">verified</span></div><div><h4 class="font-bold">Aprovar Investimentos</h4><p class="text-sm text-text-secondary">3 pendentes</p></div></div>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6 hover:border-warning/50 cursor-pointer" onclick="navigate('admin-withdrawals')">
                                <div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning"><span class="material-symbols-outlined text-2xl">payments</span></div><div><h4 class="font-bold">Processar Saques</h4><p class="text-sm text-text-secondary">2 aguardando</p></div></div>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight flex justify-between"><h3 class="text-lg font-bold">Usuários Recentes</h3><a href="#admin-users" class="text-sm text-primary font-bold">Ver todos</a></div>
                            <table class="w-full"><thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Usuário</th><th class="px-6 py-4 text-sm text-text-secondary">ID</th><th class="px-6 py-4 text-sm text-text-secondary">Investido</th><th class="px-6 py-4 text-sm text-text-secondary">Cadastro</th></tr></thead>
                            <tbody>
                                <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-sm">JS</div><div><p class="font-medium">João Silva</p><p class="text-xs text-text-secondary">joao@email.com</p></div></div></td><td class="px-6 py-4 font-mono text-primary">AB12CD34JOAO</td><td class="px-6 py-4">R$ 15.000,00</td><td class="px-6 py-4 text-text-secondary">18/12/2024</td></tr>
                                <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-success to-green-400 flex items-center justify-center font-bold text-sm">MS</div><div><p class="font-medium">Maria Santos</p><p class="text-xs text-text-secondary">maria@email.com</p></div></div></td><td class="px-6 py-4 font-mono text-primary">XY56ZW78MARI</td><td class="px-6 py-4">R$ 8.500,00</td><td class="px-6 py-4 text-text-secondary">17/12/2024</td></tr>
                            </tbody></table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
    initAdminCharts();
}

function adminSidebar(active) {
    const items = [
        { icon: 'dashboard', label: 'Dashboard', page: 'admin-dashboard' },
        { icon: 'group', label: 'Usuários', page: 'admin-users' },
        { icon: 'percent', label: 'PLR Diário', page: 'admin-plr' },
        { icon: 'payments', label: 'Saques', page: 'admin-withdrawals' },
        { icon: 'database', label: 'Banco de Dados', page: 'admin-database' }
    ];
    return `
        <aside class="hidden lg:flex w-64 flex-col border-r border-surface-highlight bg-background-dark-2">
            <div class="flex h-16 items-center gap-3 px-6 border-b border-surface-highlight">
                <div class="rounded-lg bg-danger/20 p-2 text-danger"><span class="material-symbols-outlined">admin_panel_settings</span></div>
                <div><h1 class="text-lg font-bold">WEM ADMIN</h1><p class="text-xs text-text-secondary">Painel Administrativo</p></div>
            </div>
            <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                ${items.slice(0, 4).map(i => `<button onclick="navigate('${i.page}')" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 ${active === i.page.split('-')[1] ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-highlight hover:text-white'}"><span class="material-symbols-outlined">${i.icon}</span><span class="text-sm font-medium">${i.label}</span></button>`).join('')}
                <div class="my-4 border-t border-surface-highlight"></div>
                ${items.slice(4).map(i => `<button onclick="navigate('${i.page}')" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 ${active === i.page.split('-')[1] ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-highlight hover:text-white'}"><span class="material-symbols-outlined">${i.icon}</span><span class="text-sm font-medium">${i.label}</span></button>`).join('')}
            </nav>
            <div class="p-4 border-t border-surface-highlight"><button onclick="navigate('landing')" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-text-secondary hover:bg-danger/10 hover:text-danger"><span class="material-symbols-outlined">logout</span><span class="text-sm">Sair</span></button></div>
        </aside>
    `;
}

function adminHeader() {
    return `
        <header class="flex h-16 items-center justify-between border-b border-surface-highlight bg-background-dark-2/80 px-6 backdrop-blur-md">
            <div class="flex items-center gap-2"><span class="text-xs px-2 py-1 rounded bg-danger/20 text-danger font-bold uppercase">Admin</span><span class="text-sm text-text-secondary hidden sm:inline">Modo Administrativo</span></div>
            <div class="flex items-center gap-4">
                <button class="h-10 w-10 rounded-lg bg-surface-highlight flex items-center justify-center text-text-secondary hover:text-white"><span class="material-symbols-outlined">notifications</span></button>
                <div class="flex items-center gap-3 pl-4 border-l border-surface-highlight"><div class="text-right hidden md:block"><p class="text-sm font-bold">Admin</p><p class="text-xs text-danger">Administrador</p></div><div class="w-10 h-10 rounded-full bg-gradient-to-br from-danger to-red-400 flex items-center justify-center font-bold">AD</div></div>
            </div>
        </header>
    `;
}

function initAdminCharts() {
    const ctx1 = document.getElementById('admin-growth-chart');
    if (ctx1 && typeof Chart !== 'undefined') {
        new Chart(ctx1, { type: 'line', data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ data: [150000, 280000, 420000, 550000, 720000, 847500], borderColor: '#135bec', backgroundColor: 'rgba(19, 91, 236, 0.1)', fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#92a4c9' } }, y: { grid: { color: 'rgba(50, 68, 103, 0.3)' }, ticks: { color: '#92a4c9', callback: v => 'R$ ' + (v / 1000) + 'k' } } } } });
    }
    const ctx2 = document.getElementById('admin-dist-chart');
    if (ctx2 && typeof Chart !== 'undefined') {
        new Chart(ctx2, { type: 'doughnut', data: { labels: ['< R$1k', 'R$1k-5k', 'R$5k-20k', 'R$20k-100k', '> R$100k'], datasets: [{ data: [15, 45, 60, 28, 8], backgroundColor: ['rgba(146, 164, 201, 0.8)', 'rgba(19, 91, 236, 0.8)', 'rgba(11, 218, 94, 0.8)', 'rgba(212, 175, 55, 0.8)', 'rgba(239, 68, 68, 0.8)'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#92a4c9', padding: 15 } } } } });
    }
}
