/**
 * WEM CONSULTANCY - Static User Withdrawal Page
 */

function renderUserWithdrawal() {
    const state = stateService.getState();
    const user = state.user;
    const history = state.withdrawals || [];

    // Calculate balances
    const investments = state.investments || [];
    const transactions = state.transactions || [];

    const totalInvested = investments
        .filter(i => i.status === 'active')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalWithdrawn = transactions
        .filter(t => t.type === 'withdraw')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalYield = transactions
        .filter(t => t.type === 'yield')
        .reduce((sum, t) => sum + t.amount, 0);

    const availableYield = totalYield - transactions
        .filter(t => t.type === 'withdraw' && t.description.toLowerCase().includes('rendimento'))
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const availablePrincipal = totalInvested - transactions
        .filter(t => t.type === 'withdraw' && t.description.toLowerCase().includes('principal'))
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const isFriday = new Date().getDay() === 5;

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('withdrawal')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">Saques</h2><p class="text-text-secondary">Gerencie suas retiradas de forma segura.</p></div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                                <div class="flex items-center gap-3 mb-6">
                                    <div class="rounded-lg bg-primary/10 p-3 text-primary"><span class="material-symbols-outlined">account_balance</span></div>
                                    <div><h3 class="text-lg font-bold">Saque do Principal</h3><p class="text-sm text-text-secondary">Retire parte do seu capital</p></div>
                                </div>
                                <div class="bg-surface-highlight/50 rounded-xl p-4 mb-6"><p class="text-sm text-text-secondary">Saldo disponível</p><p class="text-2xl font-bold">${formatCurrency(availablePrincipal)}</p></div>
                                <form class="space-y-4" onsubmit="handleWithdrawalSubmit(event, 'principal')">
                                    <div>
                                        <label class="text-sm font-medium">Valor (R$)</label>
                                        <input type="number" id="withdraw-amount-principal" required step="0.01" max="${availablePrincipal}" placeholder="0,00" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" />
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium">Chave PIX</label>
                                        <input type="text" id="withdraw-pix-principal" required placeholder="CPF, e-mail ou telefone" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" />
                                    </div>
                                    <div class="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-2">
                                        <span class="material-symbols-outlined text-warning text-sm">schedule</span>
                                        <p class="text-xs text-text-secondary">Aviso prévio de 3 dias úteis necessário para o principal.</p>
                                    </div>
                                    <button type="submit" id="withdraw-btn-principal" class="w-full h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover flex items-center justify-center gap-2">
                                        <span class="material-symbols-outlined">arrow_outward</span>Solicitar Saque
                                    </button>
                                </form>
                            </div>
                            
                            <div class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                                <div class="flex items-center gap-3 mb-6">
                                    <div class="rounded-lg bg-success/10 p-3 text-success"><span class="material-symbols-outlined">trending_up</span></div>
                                    <div><h3 class="text-lg font-bold">Saque de Rendimentos</h3><p class="text-sm text-text-secondary">Retire seus lucros acumulados</p></div>
                                </div>
                                <div class="bg-surface-highlight/50 rounded-xl p-4 mb-6"><p class="text-sm text-text-secondary">Rendimentos disponíveis</p><p class="text-2xl font-bold text-success">${formatCurrency(availableYield)}</p></div>
                                
                                ${!isFriday ? `
                                    <div class="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                                        <span class="material-symbols-outlined text-warning">event_busy</span>
                                        <div>
                                            <p class="text-sm font-medium text-warning">Disponível apenas às sextas-feiras</p>
                                            <p class="text-xs text-text-secondary mt-1">Hoje não é sexta-feira. O botão de saque está desativado.</p>
                                        </div>
                                    </div>
                                ` : ''}

                                <form class="space-y-4" onsubmit="handleWithdrawalSubmit(event, 'rendimento')">
                                    <div>
                                        <label class="text-sm font-medium">Valor (R$)</label>
                                        <input type="number" id="withdraw-amount-yield" ${!isFriday ? 'disabled' : ''} required step="0.01" max="${availableYield}" placeholder="0,00" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white ${!isFriday ? 'opacity-50 cursor-not-allowed' : ''}" />
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium">Chave PIX</label>
                                        <input type="text" id="withdraw-pix-yield" ${!isFriday ? 'disabled' : ''} required placeholder="CPF, e-mail ou telefone" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white ${!isFriday ? 'opacity-50 cursor-not-allowed' : ''}" />
                                    </div>
                                    <button type="submit" id="withdraw-btn-yield" ${!isFriday ? 'disabled' : 'class="w-full h-12 rounded-lg bg-success text-white font-bold hover:bg-success-hover flex items-center justify-center gap-2"'} class="w-full h-12 rounded-lg ${!isFriday ? 'bg-success/30 cursor-not-allowed' : 'bg-success hover:bg-success-hover'} text-white font-bold flex items-center justify-center gap-2">
                                        <span class="material-symbols-outlined">arrow_outward</span>Solicitar Saque
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight"><h3 class="text-lg font-bold">Histórico de Saques</h3></div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-surface-highlight text-left">
                                            <th class="px-6 py-4 text-sm text-text-secondary">Tipo</th>
                                            <th class="px-6 py-4 text-sm text-text-secondary">Valor</th>
                                            <th class="px-6 py-4 text-sm text-text-secondary">Data</th>
                                            <th class="px-6 py-4 text-sm text-text-secondary">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${history.length > 0 ? history.map(w => `
                                            <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                                <td class="px-6 py-4 uppercase text-xs font-bold text-text-secondary">${w.type}</td>
                                                <td class="px-6 py-4 font-bold">${formatCurrency(w.amount)}</td>
                                                <td class="px-6 py-4 text-text-secondary">${formatDate(w.createdAt)}</td>
                                                <td class="px-6 py-4">
                                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${w.status === 'approved' ? 'bg-success/10 text-success' : (w.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger')}">
                                                        ${w.status === 'approved' ? 'Aprovado' : (w.status === 'pending' ? 'Pendente' : 'Rejeitado')}
                                                    </span>
                                                </td>
                                            </tr>
                                        `).join('') : `
                                            <tr><td colspan="4" class="px-6 py-8 text-center text-text-secondary">Nenhum saque encontrado.</td></tr>
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
}

async function handleWithdrawalSubmit(event, type) {
    event.preventDefault();
    const isFriday = new Date().getDay() === 5;

    if (type === 'rendimento' && !isFriday) {
        showToast('Saques de rendimento estão disponíveis apenas às sextas-feiras.', 'warning');
        return;
    }

    const amountId = type === 'principal' ? 'withdraw-amount-principal' : 'withdraw-amount-yield';
    const pixId = type === 'principal' ? 'withdraw-pix-principal' : 'withdraw-pix-yield';
    const btnId = type === 'principal' ? 'withdraw-btn-principal' : 'withdraw-btn-yield';

    const amount = document.getElementById(amountId).value;
    const pixKey = document.getElementById(pixId).value;
    const btn = document.getElementById(btnId);

    if (!amount || !pixKey) {
        showToast('Por favor, preencha todos os campos.', 'warning');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Solicitando...';

        await apiService.requestWithdrawal({
            amount,
            pixKey,
            type
        });

        showToast('Solicitação de saque enviada com sucesso!', 'success');

        // Refresh data and page
        await stateService.loadUserData(stateService.getState().user.userId);
        renderUserWithdrawal();
    } catch (error) {
        showToast('Erro ao solicitar saque: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">arrow_outward</span>Solicitar Saque';
    }
}

