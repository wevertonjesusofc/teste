/**
 * WEM CONSULTANCY - Static User Investment Page
 */

function renderUserInvestment() {
    const state = stateService.getState();
    const investments = state.investments || [];

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('investment')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div><h2 class="text-2xl md:text-3xl font-bold">Investimentos</h2><p class="text-text-secondary">Gerencie suas aplicações.</p></div>
                            <button onclick="openModal('invest-modal')" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover"><span class="material-symbols-outlined">add</span>Nova Aplicação</button>
                        </div>
                        
                        <div class="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-6 relative overflow-hidden">
                            <div class="absolute right-4 top-4 text-primary/20"><span class="material-symbols-outlined text-8xl">pix</span></div>
                            <div class="relative z-10">
                                <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-primary">info</span>Informações para Investimento</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><p class="text-sm text-text-secondary mb-1">Chave PIX</p><div class="flex items-center gap-3"><p class="text-xl font-bold text-primary">wemconsultancy@gmail.com</p><button onclick="copyToClipboard('wemconsultancy@gmail.com')" class="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-white"><span class="material-symbols-outlined">content_copy</span></button></div></div>
                                    <div><p class="text-sm text-text-secondary mb-1">Investimento Mínimo</p><p class="text-xl font-bold text-gold">R$ 500,00</p></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight"><h3 class="text-lg font-bold">Seus Investimentos</h3></div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm font-medium text-text-secondary">Valor</th><th class="px-6 py-4 text-sm font-medium text-text-secondary">Data</th><th class="px-6 py-4 text-sm font-medium text-text-secondary">Status</th><th class="px-6 py-4 text-sm font-medium text-text-secondary">Indicação</th></tr></thead>
                                    <tbody>
                                        ${investments.length > 0 ? investments.map(inv => `
                                            <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                                <td class="px-6 py-4 font-bold">${formatCurrency(inv.amount)}</td>
                                                <td class="px-6 py-4 text-text-secondary">${formatDate(inv.createdAt)}</td>
                                                <td class="px-6 py-4">
                                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${inv.status === 'active' ? 'bg-success/10 text-success' : (inv.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger')}">
                                                        ${inv.status === 'active' ? 'Ativo' : (inv.status === 'pending' ? 'Pendente' : 'Rejeitado')}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-text-secondary">${inv.referralCode || '-'}</td>
                                            </tr>
                                        `).join('') : `
                                            <tr><td colspan="4" class="px-6 py-8 text-center text-text-secondary">Nenhum investimento encontrado.</td></tr>
                                        `}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        
        <div id="invest-modal" class="hidden fixed inset-0 z-50">
            <div class="modal-backdrop absolute inset-0" onclick="closeModal('invest-modal')"></div>
            <div class="relative flex items-center justify-center min-h-screen p-4">
                <div class="max-w-md w-full bg-surface-dark border border-border-dark rounded-2xl shadow-2xl fade-in p-6">
                    <div class="flex items-center justify-between mb-6"><h3 class="text-xl font-bold">Nova Aplicação</h3><button onclick="closeModal('invest-modal')" class="text-text-secondary hover:text-white"><span class="material-symbols-outlined">close</span></button></div>
                    <div class="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6"><p class="text-sm text-text-secondary mb-1">Realize o PIX para:</p><p class="font-bold text-primary text-lg">wemconsultancy@gmail.com</p></div>
                    <form class="space-y-4" onsubmit="handleInvestmentSubmit(event)">
                        <div>
                            <label class="text-sm font-medium">Valor (R$)</label>
                            <input type="number" id="invest-amount" required min="500" placeholder="500,00" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" />
                        </div>
                        ${state.systemConfig.referralEnabled ? `
                        <div>
                            <label class="text-sm font-medium">Código de Indicação (opcional)</label>
                            <input type="text" id="invest-referral" placeholder="Código" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" />
                        </div>
                        ` : ''}
                        <div>
                            <label class="text-sm font-medium">Comprovante PIX</label>
                            <input type="file" id="invest-proof" required class="w-full mt-2 text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:font-semibold" />
                        </div>
                        <button type="submit" id="invest-submit-btn" class="w-full h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined">send</span>Enviar Comprovante
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

async function handleInvestmentSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('invest-submit-btn');
    const amount = document.getElementById('invest-amount').value;
    const proofFile = document.getElementById('invest-proof').files[0];
    const referral = document.getElementById('invest-referral').value;

    if (!amount || !proofFile) {
        showToast('Por favor, preencha o valor e anexe o comprovante.', 'warning');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Enviando...';

        await apiService.createInvestment(amount, proofFile, referral);

        closeModal('invest-modal');
        showToast('Investimento enviado para análise!', 'success');

        // Refresh dashboard and page
        await stateService.loadUserData(stateService.getState().user.userId);
        renderUserInvestment();
    } catch (error) {
        showToast('Erro ao enviar investimento: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">send</span>Enviar Comprovante';
    }
}

