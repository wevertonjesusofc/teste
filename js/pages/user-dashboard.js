/**
 * WEM CONSULTANCY - User Dashboard
 * Shows: Principal Balance, Withdrawals, Earnings, Transaction History (all visible)
 */

function renderUserDashboard() {
    const state = stateService.getState();
    const user = state.user;

    if (!user) {
        navigate('login');
        return;
    }

    // Calculate totals
    const investments = state.investments || [];
    const transactions = state.transactions || [];
    const withdrawals = state.withdrawals || [];

    const totalInvested = investments
        .filter(i => i.status === 'active')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalWithdrawn = transactions
        .filter(t => t.type === 'withdraw')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalYield = transactions
        .filter(t => t.type === 'yield')
        .reduce((sum, t) => sum + t.amount, 0);

    const latestPLR = window.db.plr.getLatest();
    const todayYield = totalInvested * ((latestPLR?.percentage || 0) / 100);
    const availableBalance = totalInvested + totalYield - totalWithdrawn;

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('dashboard')}
            
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-6 fade-in">
                        <!-- Header with Action Buttons -->
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 class="text-2xl md:text-3xl font-bold">Dashboard</h2>
                                <p class="text-text-secondary">Visão completa dos seus investimentos.</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <!-- New Application Button -->
                                <button onclick="navigate('user-investment')" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/20">
                                    <span class="material-symbols-outlined">add_circle</span>
                                    Nova Aplicação
                                </button>
                                
                                <!-- Referral / Identification Toggle Button -->
                                <button onclick="toggleReferralButton()" id="referral-toggle-btn" 
                                        class="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${window.appState.referralEnabled ? 'bg-gold text-black hover:bg-yellow-500' : 'bg-surface-highlight text-text-secondary cursor-not-allowed'}"
                                        ${!window.appState.referralEnabled ? 'disabled' : ''}>
                                    <span class="material-symbols-outlined ${window.appState.referralEnabled ? 'animate-pulse' : ''}">${window.appState.referralEnabled ? 'group_add' : 'group_off'}</span>
                                    Indicação / ID
                                    <div class="w-10 h-5 rounded-full ${window.appState.referralEnabled ? 'bg-black/20' : 'bg-surface-dark'} relative ml-2">
                                        <div class="absolute top-0.5 ${window.appState.referralEnabled ? 'right-0.5 bg-white' : 'left-0.5 bg-text-secondary'} w-4 h-4 rounded-full transition-all duration-300"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <!-- User ID Card -->
                        <div class="rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-4 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-gold text-2xl">badge</span>
                                <div>
                                    <p class="text-xs text-text-secondary">Seu ID Único</p>
                                    <p class="text-lg font-bold gold-shimmer">${user.userId.split('_')[1].toUpperCase()}</p>
                                </div>
                            </div>
                            <button onclick="copyToClipboard('${user.userId.split('_')[1].toUpperCase()}')" class="p-2 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-black">
                                <span class="material-symbols-outlined">content_copy</span>
                            </button>
                        </div>
                        
                        <!-- ALL 4 SECTIONS VISIBLE: Principal, Withdrawals, Earnings, History -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <!-- 1. Principal Balance -->
                            <div class="rounded-xl border border-primary/30 bg-gradient-to-br from-surface-dark to-primary/10 p-5">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
                                    <span class="text-sm text-text-secondary">Saldo Principal</span>
                                </div>
                                <p class="text-3xl font-bold">${formatCurrency(totalInvested)}</p>
                                <p class="text-xs text-text-secondary mt-2">Capital investido</p>
                            </div>
                            
                            <!-- 2. Withdrawals -->
                            <div class="rounded-xl border border-warning/30 bg-gradient-to-br from-surface-dark to-warning/10 p-5">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="material-symbols-outlined text-warning">payments</span>
                                    <span class="text-sm text-text-secondary">Saques</span>
                                </div>
                                <p class="text-3xl font-bold">${formatCurrency(totalWithdrawn)}</p>
                                <p class="text-xs text-text-secondary mt-2">Total sacado</p>
                            </div>
                            
                            <!-- 3. Earnings -->
                            <div class="rounded-xl border border-success/30 bg-gradient-to-br from-surface-dark to-success/10 p-5">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="material-symbols-outlined text-success">trending_up</span>
                                    <span class="text-sm text-text-secondary">Rendimentos</span>
                                </div>
                                <p class="text-3xl font-bold text-success">${formatCurrency(totalYield)}</p>
                                <p class="text-xs text-success mt-2">+${((totalYield / (totalInvested || 1)) * 100).toFixed(1)}% acumulado</p>
                            </div>
                            
                            <!-- 4. PLR Today -->
                            <div class="rounded-xl border border-gold/30 bg-gradient-to-br from-surface-dark to-gold/10 p-5">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="material-symbols-outlined text-gold">percent</span>
                                    <span class="text-sm text-text-secondary">PLR Hoje</span>
                                </div>
                                <p class="text-3xl font-bold">${latestPLR?.percentage.toFixed(2) || '0.00'}%</p>
                                <p class="text-xs text-text-secondary mt-2">+${formatCurrency(todayYield)} hoje</p>
                            </div>
                        </div>
                        
                        <!-- Saldo Atual Card -->
                        <div class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-text-secondary mb-1">Saldo Total Disponível</p>
                                    <p class="text-4xl font-bold">${formatCurrency(availableBalance)}</p>
                                    <p class="text-sm text-text-secondary mt-2">Principal + Rendimentos - Saques</p>
                                </div>
                                <div class="flex gap-3">
                                    <button onclick="navigate('user-withdrawal')" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-highlight text-white font-bold hover:bg-border-dark">
                                        <span class="material-symbols-outlined">arrow_outward</span>
                                        Sacar
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Chart + Quick Stats -->
                        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div class="xl:col-span-2 rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <h3 class="text-lg font-bold mb-4">Crescimento de Investimento</h3>
                                <div class="h-[250px]"><canvas id="growth-chart"></canvas></div>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <h3 class="text-lg font-bold mb-4">Resumo Rápido</h3>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center"><span class="text-text-secondary">Investimentos Ativos</span><span class="font-bold">${investments.filter(i => i.status === 'active').length}</span></div>
                                    <div class="flex justify-between items-center"><span class="text-text-secondary">Próximo Saque</span><span class="font-bold text-warning">Sexta-feira</span></div>
                                    <div class="flex justify-between items-center"><span class="text-text-secondary">Migrado</span><span class="font-bold ${user.migrated ? 'text-success' : 'text-text-secondary'}">${user.migrated ? 'Sim' : 'Não'}</span></div>
                                    <div class="flex justify-between items-center"><span class="text-text-secondary">Total Bruto</span><span class="font-bold text-success">${formatCurrency(totalInvested + totalYield)}</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Transaction History -->
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight flex justify-between items-center">
                                <h3 class="text-lg font-bold">Histórico de Transações</h3>
                                <span class="text-sm text-text-secondary">Últimas 10 movimentações</span>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Tipo</th><th class="px-6 py-4 text-sm text-text-secondary">Descrição</th><th class="px-6 py-4 text-sm text-text-secondary">Data</th><th class="px-6 py-4 text-sm text-text-secondary text-right">Valor</th></tr></thead>
                                    <tbody>
                                        ${transactions.length > 0 ? transactions.slice(0, 10).map(t => `
                                            <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center gap-2">
                                                        <div class="h-8 w-8 rounded-full ${t.type === 'withdraw' ? 'bg-warning/10 text-warning' : (t.type === 'yield' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary')} flex items-center justify-center">
                                                            <span class="material-symbols-outlined text-lg">${t.type === 'withdraw' ? 'arrow_outward' : (t.type === 'yield' ? 'trending_up' : 'add_circle')}</span>
                                                        </div>
                                                        <span>${t.type === 'yield' ? 'Rendimento' : (t.type === 'withdraw' ? 'Saque' : 'Investimento')}</span>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 text-text-secondary">${t.description || '-'}</td>
                                                <td class="px-6 py-4 text-text-secondary">${formatDate(t.date)}</td>
                                                <td class="px-6 py-4 text-right ${t.type === 'withdraw' ? 'text-warning' : 'text-success'} font-bold">
                                                    ${t.type === 'withdraw' ? '-' : '+'}${formatCurrency(Math.abs(t.amount))}
                                                </td>
                                            </tr>
                                        `).join('') : `
                                            <tr><td colspan="4" class="px-6 py-8 text-center text-text-secondary">Nenhuma transação encontrada.</td></tr>
                                        `}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;

    initDashboardChart();
}

function toggleReferralButton() {
    if (!appState.referralEnabled) {
        showToast('Sistema de indicação desativado pelo administrador', 'warning');
        return;
    }
    navigate('user-affiliate');
}

// Helper components
function userSidebar(active) {
    const items = [
        { icon: 'dashboard', label: 'Dashboard', page: 'user-dashboard' },
        { icon: 'account_balance_wallet', label: 'Investimentos', page: 'user-investment' },
        { icon: 'percent', label: 'PLR Diário', page: 'user-plr' },
        { icon: 'payments', label: 'Saques', page: 'user-withdrawal' },
        { icon: 'group', label: 'Afiliados', page: 'user-affiliate' },
        { icon: 'settings', label: 'Configurações', page: 'user-settings' }
    ];

    return `
        <aside class="hidden lg:flex w-64 flex-col border-r border-surface-highlight bg-background-dark-2">
            <div class="flex h-16 items-center gap-3 px-6 border-b border-surface-highlight">
                <div class="rounded-lg bg-primary/20 p-2 text-primary"><span class="material-symbols-outlined">candlestick_chart</span></div>
                <div><h1 class="text-lg font-bold">WEM</h1><p class="text-xs text-text-secondary">CONSULTANCY</p></div>
            </div>
            <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                ${items.slice(0, 4).map(i => `<button onclick="navigate('${i.page}')" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 ${active === i.page.split('-')[1] ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-highlight hover:text-white'}"><span class="material-symbols-outlined">${i.icon}</span><span class="text-sm font-medium">${i.label}</span></button>`).join('')}
                <div class="my-4 border-t border-surface-highlight"></div>
                ${items.slice(4).map(i => `<button onclick="navigate('${i.page}')" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 ${active === i.page.split('-')[1] ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-highlight hover:text-white'}"><span class="material-symbols-outlined">${i.icon}</span><span class="text-sm font-medium">${i.label}</span></button>`).join('')}
            </nav>
            <div class="p-4 border-t border-surface-highlight">
                <button onclick="openWhatsAppSupport()" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-text-secondary hover:bg-surface-highlight"><span class="material-symbols-outlined">support_agent</span><span class="text-sm">Suporte</span></button>
                <button onclick="authService.logout()" class="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-text-secondary hover:bg-danger/10 hover:text-danger"><span class="material-symbols-outlined">logout</span><span class="text-sm">Sair</span></button>
            </div>
        </aside>
    `;
}

function userHeader() {
    const state = stateService.getState();
    const user = state.user;

    if (!user) return '';

    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    return `
        <header class="flex h-16 items-center justify-between border-b border-surface-highlight bg-background-dark-2/80 px-6 backdrop-blur-md">
            <div class="relative w-full max-w-sm">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                <input type="text" placeholder="Buscar..." class="h-10 w-full rounded-lg bg-surface-highlight pl-10 pr-4 text-sm text-white placeholder-text-secondary border-none" />
            </div>
            <div class="flex items-center gap-4">
                ${getModeSwitchButton()}
                <button class="relative h-10 w-10 rounded-lg bg-surface-highlight flex items-center justify-center text-text-secondary hover:text-white">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger"></span>
                </button>
                <div class="flex items-center gap-3 pl-4 border-l border-surface-highlight">
                    <div class="text-right hidden md:block"><p class="text-sm font-bold">${user.fullName}</p><p class="text-xs text-text-secondary font-medium uppercase tracking-wider">${user.role === 'admin' || user.role === 'admin_master' ? 'Administrador' : 'Investidor'}</p></div>
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-white border-2 border-surface-highlight">${initials}</div>
                </div>
            </div>
        </header>
    `;
}


function statCard(label, value, icon, color, change = null) {
    const colors = { primary: 'bg-primary/10 text-primary', success: 'bg-success/10 text-success', gold: 'bg-gold/10 text-gold', danger: 'bg-danger/10 text-danger', warning: 'bg-warning/10 text-warning' };
    return `
        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-5">
            <div class="flex items-center justify-between mb-3">
                <div class="rounded-lg ${colors[color]} p-2"><span class="material-symbols-outlined">${icon}</span></div>
                ${change ? `<span class="text-xs font-bold ${color === 'danger' ? 'text-danger' : 'text-success'}">${change}</span>` : ''}
            </div>
            <p class="text-2xl font-bold">${value}</p>
            <p class="text-sm text-text-secondary mt-1">${label}</p>
        </div>
    `;
}

function initDashboardChart() {
    const ctx = document.getElementById('growth-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                data: [10000, 10600, 11236, 11910, 12624, 15000],
                borderColor: '#135bec',
                backgroundColor: 'rgba(19, 91, 236, 0.1)',
                fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#135bec'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(50, 68, 103, 0.3)' }, ticks: { color: '#92a4c9' } },
                y: { grid: { color: 'rgba(50, 68, 103, 0.3)' }, ticks: { color: '#92a4c9', callback: v => 'R$ ' + v.toLocaleString() } }
            }
        }
    });
}
