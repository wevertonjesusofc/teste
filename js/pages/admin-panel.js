/**
 * WEM CONSULTANCY - Unified Admin Panel
 * Single control area for all admin functions
 */

function renderAdminPanel() {
    if (!stateService.isAdmin()) {
        navigate('landing');
        return;
    }

    const state = stateService.getState();
    const pendingInvestments = window.db.investments.listPending() || [];
    const pendingWithdrawals = window.db.withdrawals.listPending() || [];
    const allInvestments = window.db.investments.listAll() || [];
    const allWithdrawals = window.db.withdrawals.listAll() || [];
    const latestPLR = window.db.plr.getLatest();

    // Calculate Platform Stats
    const totalInvestedValue = allInvestments
        .filter(i => i.status === 'active')
        .reduce((sum, i) => sum + i.amount, 0);

    const releasedEarningsValue = allWithdrawals
        .filter(w => w.status === 'approved')
        .reduce((sum, w) => sum + w.amount, 0);

    const stats = {
        totalInvested: totalInvestedValue,
        dailyPLR: latestPLR?.percentage || 0,
        pendingInvestments: pendingInvestments.length,
        pendingWithdrawals: pendingWithdrawals.length,
        releasedEarnings: releasedEarningsValue
    };

    document.getElementById('app').innerHTML = `
        <div class="min-h-screen bg-background-dark">
            <!-- Admin Header -->
            <header class="sticky top-0 z-40 bg-background-dark-2/95 backdrop-blur-md border-b border-danger/30">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-danger">admin_panel_settings</span>
                            <span class="font-bold text-lg">WEM ADMIN</span>
                        </div>
                        <span class="px-2 py-1 rounded bg-danger/20 text-danger text-xs font-bold uppercase">Painel Administrativo</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <button onclick="navigate('admin-database')" class="flex items-center gap-2 px-4 py-2 rounded-lg text-text-secondary hover:text-white font-bold transition-colors">
                            <span class="material-symbols-outlined">database</span>
                            Banco de Dados
                        </button>
                        ${getModeSwitchButton()}
                        <button onclick="authService.logout()" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger/20 text-danger hover:bg-danger hover:text-white font-bold">
                            <span class="material-symbols-outlined">logout</span>
                            Sair
                        </button>
                    </div>
                </div>
            </header>
            
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <!-- Dashboard Stats -->
                <section>
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">dashboard</span>
                        Dashboard Administrativo
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        ${adminStatCard('Total Investido', formatCurrency(stats.totalInvested), 'account_balance', 'primary')}
                        ${adminStatCard('PLR Atual', stats.dailyPLR.toFixed(2) + '%', 'percent', 'success')}
                        ${adminStatCard('Invest. Pendentes', stats.pendingInvestments.toString(), 'pending_actions', stats.pendingInvestments > 0 ? 'warning' : 'primary')}
                        ${adminStatCard('Saques Pendentes', stats.pendingWithdrawals.toString(), 'payments', stats.pendingWithdrawals > 0 ? 'warning' : 'primary')}
                        ${adminStatCard('Saques Pagos', formatCurrency(stats.releasedEarnings), 'savings', 'gold')}
                    </div>
                </section>
                
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <!-- PLR MANAGEMENT -->
                    <section class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                            <span class="material-symbols-outlined text-success">percent</span>
                            Gerenciamento de PLR
                        </h3>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="text-sm font-medium text-text-secondary">Percentual do PLR Diário</label>
                                <div class="flex gap-3 mt-2">
                                    <input type="number" id="plr-input-admin" step="0.01" min="0" max="5" value="${stats.dailyPLR.toFixed(2)}"
                                           class="flex-1 h-14 px-4 rounded-lg bg-surface-highlight border border-border-dark text-2xl font-bold text-white" />
                                    <span class="h-14 flex items-center px-4 text-2xl text-text-secondary">%</span>
                                </div>
                                <div class="flex gap-2 mt-3">
                                    <button onclick="document.getElementById('plr-input-admin').value='0.15'" class="px-3 py-1.5 rounded bg-surface-highlight text-sm hover:bg-border-dark">0.15%</button>
                                    <button onclick="document.getElementById('plr-input-admin').value='0.20'" class="px-3 py-1.5 rounded bg-surface-highlight text-sm hover:bg-border-dark">0.20%</button>
                                    <button onclick="document.getElementById('plr-input-admin').value='0.25'" class="px-3 py-1.5 rounded bg-surface-highlight text-sm hover:bg-border-dark">0.25%</button>
                                    <button onclick="document.getElementById('plr-input-admin').value='0.30'" class="px-3 py-1.5 rounded bg-surface-highlight text-sm hover:bg-border-dark">0.30%</button>
                                </div>
                            </div>
                            
                            <button onclick="handleAdminApplyPLR()" id="apply-plr-btn" class="w-full h-14 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined">check_circle</span>
                                Aplicar PLR Diário
                            </button>
                        </div>
                    </section>
                    
                    <!-- REFERRAL TOGGLE -->
                    <section class="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-dark to-gold/5 p-6">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                            <span class="material-symbols-outlined text-gold">group_add</span>
                            Controle de Indicação
                        </h3>
                        
                        <div class="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-dark">
                            <div>
                                <p class="font-bold">Sistema de Indicação</p>
                                <p class="text-sm text-text-secondary">Ativar/desativar para todos os investidores</p>
                            </div>
                            <button onclick="toggleReferralSystem()" class="relative w-20 h-10 rounded-full transition-all duration-300 ${state.systemConfig.referralEnabled ? 'bg-success' : 'bg-surface-highlight'}">
                                <div class="absolute top-1 ${state.systemConfig.referralEnabled ? 'right-1' : 'left-1'} w-8 h-8 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-sm ${state.systemConfig.referralEnabled ? 'text-success' : 'text-text-secondary'}">${state.systemConfig.referralEnabled ? 'check' : 'close'}</span>
                                </div>
                            </button>
                        </div>
                        <p class="mt-4 text-sm ${state.systemConfig.referralEnabled ? 'text-success' : 'text-warning'}">
                            <span class="material-symbols-outlined text-sm align-middle">${state.systemConfig.referralEnabled ? 'check_circle' : 'warning'}</span>
                            Status: ${state.systemConfig.referralEnabled ? 'ATIVADO - Investidores podem indicar' : 'DESATIVADO - Indicações bloqueadas'}
                        </p>
                    </section>
                </div>
                
                <!-- INVESTMENT APPROVAL -->
                <section class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                    <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">verified</span>
                        Aprovação de Investimentos
                        ${stats.pendingInvestments > 0 ? `<span class="px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-bold">${stats.pendingInvestments} pendente(s)</span>` : ''}
                    </h3>
                    
                    ${stats.pendingInvestments > 0 ? `
                    <div class="space-y-4">
                        ${pendingInvestments.map(inv => {
        const user = window.db.users.getById(inv.userId);
        const initials = user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || '??';
        return renderPendingInvestmentAdmin(user?.fullName || 'Usuário Desconhecido', initials, inv.amount, inv.createdAt, inv.id);
    }).join('')}
                    </div>
                    ` : `
                    <div class="text-center py-8">
                        <span class="material-symbols-outlined text-success text-4xl">check_circle</span>
                        <p class="mt-2 text-success font-medium">Nenhum investimento pendente</p>
                    </div>
                    `}
                </section>
                
                <!-- WITHDRAWAL MANAGEMENT -->
                <section class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                    <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <span class="material-symbols-outlined text-warning">payments</span>
                        Gerenciamento de Saques
                        ${stats.pendingWithdrawals > 0 ? `<span class="px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-bold">${stats.pendingWithdrawals} pendente(s)</span>` : ''}
                    </h3>
                    
                    ${stats.pendingWithdrawals > 0 ? `
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-surface-highlight text-left">
                                    <th class="px-4 py-3 text-sm text-text-secondary">Usuário</th>
                                    <th class="px-4 py-3 text-sm text-text-secondary">Valor</th>
                                    <th class="px-4 py-3 text-sm text-text-secondary">Chave PIX</th>
                                    <th class="px-4 py-3 text-sm text-text-secondary">Tipo</th>
                                    <th class="px-4 py-3 text-sm text-text-secondary text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${pendingWithdrawals.map(w => {
        const user = window.db.users.getById(w.userId);
        const initials = user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || '??';
        return renderWithdrawalRowAdmin(user?.fullName || 'Desconhecido', initials, w.amount, w.pixKey, w.type, w.id);
    }).join('')}
                            </tbody>
                        </table>
                    </div>
                    ` : `
                    <div class="text-center py-8">
                        <span class="material-symbols-outlined text-success text-4xl">check_circle</span>
                        <p class="mt-2 text-success font-medium">Nenhum saque pendente</p>
                    </div>
                    `}
                </section>
            </main>
        </div>
    `;
}

// Action Handlers
async function handleAdminApplyPLR() {
    const percentage = parseFloat(document.getElementById('plr-input-admin').value);
    const btn = document.getElementById('apply-plr-btn');

    if (isNaN(percentage) || percentage < 0) {
        showToast('Percentual inválido!', 'warning');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Aplicando...';

        await apiService.adminApplyPLR(percentage);
        showToast(`PLR de ${percentage}% aplicado com sucesso!`, 'success');
        renderAdminPanel();
    } catch (error) {
        showToast('Erro ao aplicar PLR: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Aplicar PLR Diário';
    }
}

async function handleAction(action, type, id) {
    try {
        if (type === 'investment') {
            if (action === 'approve') await apiService.adminApproveInvestment(id);
            else await apiService.adminRejectInvestment(id);
        } else {
            if (action === 'approve') await apiService.adminApproveWithdrawal(id);
            else await apiService.adminRejectWithdrawal(id);
        }

        showToast(`Ação concluída com sucesso!`, 'success');
        renderAdminPanel();
    } catch (error) {
        showToast('Erro ao realizar ação: ' + error.message, 'error');
    }
}

function adminStatCard(label, value, icon, color) {
    const colors = {
        primary: 'bg-primary/10 text-primary border-primary/30',
        success: 'bg-success/10 text-success border-success/30',
        warning: 'bg-warning/10 text-warning border-warning/30',
        gold: 'bg-gold/10 text-gold border-gold/30'
    };
    const iconColors = { primary: 'text-primary', success: 'text-success', warning: 'text-warning', gold: 'text-gold' };

    return `
        <div class="rounded-xl border ${colors[color]} bg-surface-dark p-5">
            <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined ${iconColors[color]}">${icon}</span>
                <span class="text-xs text-text-secondary uppercase">${label}</span>
            </div>
            <p class="text-2xl font-bold">${value}</p>
        </div>
    `;
}

function renderPendingInvestmentAdmin(name, initials, amount, date, id) {
    return `
        <div class="flex items-center justify-between p-4 bg-surface-highlight/30 rounded-xl border border-border-dark hover:border-primary/30 transition-all">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-white">${initials}</div>
                <div>
                    <p class="font-bold">${name}</p>
                    <p class="text-sm text-text-secondary">${formatCurrency(amount)} • ${formatDate(date)}</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="showToast('Visualizando comprovante...', 'info')" class="p-3 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-border-dark" title="Ver Comprovante">
                    <span class="material-symbols-outlined">description</span>
                </button>
                <button onclick="handleAction('approve', 'investment', '${id}')" class="px-5 py-2.5 rounded-lg bg-success text-white font-bold hover:bg-green-600 flex items-center gap-2">
                    <span class="material-symbols-outlined">check</span>
                    Aprovar
                </button>
                <button onclick="handleAction('reject', 'investment', '${id}')" class="px-5 py-2.5 rounded-lg bg-danger text-white font-bold hover:bg-red-600 flex items-center gap-2">
                    <span class="material-symbols-outlined">close</span>
                    Rejeitar
                </button>
            </div>
        </div>
    `;
}

function renderWithdrawalRowAdmin(name, initials, amount, pix, type, id) {
    const typeLabel = type === 'principal' ? 'Principal' : 'Rendimentos';
    const typeColor = type === 'principal' ? 'text-primary' : 'text-success';
    return `
        <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
            <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-sm text-white">${initials}</div>
                    <span class="font-medium">${name}</span>
                </div>
            </td>
            <td class="px-4 py-4 font-bold">${formatCurrency(amount)}</td>
            <td class="px-4 py-4 text-text-secondary text-xs font-mono">${pix}</td>
            <td class="px-4 py-4"><span class="${typeColor} font-medium text-xs uppercase">${typeLabel}</span></td>
            <td class="px-4 py-4">
                <div class="flex gap-2 justify-end">
                    <button onclick="handleAction('approve', 'withdrawal', '${id}')" class="px-4 py-2 rounded-lg bg-success text-white text-sm font-bold hover:bg-green-600">Aprovar</button>
                    <button onclick="handleAction('reject', 'withdrawal', '${id}')" class="px-4 py-2 rounded-lg bg-danger text-white text-sm font-bold hover:bg-red-600">Rejeitar</button>
                </div>
            </td>
        </tr>
    `;
}

