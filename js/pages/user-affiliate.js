/**
 * WEM CONSULTANCY - Static User Affiliate Page
 */

function renderUserAffiliate() {
    const state = stateService.getState();
    const user = state.user;

    if (!user) return;

    // Get real referrals from DB
    const referrals = window.db.users.getReferrals(user.referralCode) || [];

    // Calculate stats
    const totalReferralInvestments = referrals.reduce((sum, ref) => {
        const invs = window.db.investments.findByUserId(ref.userId)
            .filter(i => i.status === 'active');
        return sum + invs.reduce((s, i) => s + i.amount, 0);
    }, 0);

    const bonusAmount = totalReferralInvestments * 0.05;

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('affiliate')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">Programa de Afiliados</h2><p class="text-text-secondary">Compartilhe e ganhe com seus indicados.</p></div>
                        
                        <div class="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6 relative overflow-hidden">
                            <div class="absolute right-4 top-4 text-gold/20"><span class="material-symbols-outlined text-8xl">diversity_3</span></div>
                            <div class="relative z-10">
                                <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-gold">card_giftcard</span>Seu Código de Indicação</h3>
                                <div class="flex items-center gap-4 mb-4">
                                    <div class="bg-surface-dark rounded-xl px-6 py-4 border border-border-dark"><p class="text-2xl font-bold gold-shimmer">${user.referralCode}</p></div>
                                    <button onclick="copyToClipboard('${user.referralCode}')" class="p-3 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-black"><span class="material-symbols-outlined">content_copy</span></button>
                                    <button onclick="showToast('Link de indicação copiado!', 'info')" class="p-3 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-black"><span class="material-symbols-outlined">share</span></button>
                                </div>
                                <p class="text-sm text-text-secondary"><span class="text-gold font-bold">Bônus de 5%</span> sobre investimentos de quem você indicar!</p>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><span class="material-symbols-outlined text-3xl text-primary">workspace_premium</span></div>
                                <div><h3 class="text-xl font-bold">Torne-se um Afiliado Premium</h3><p class="text-text-secondary">Desbloqueie benefícios exclusivos</p></div>
                            </div>
                            <div class="mb-6">
                                <div class="flex justify-between text-sm mb-2"><span class="text-text-secondary">Volume do Time</span><span class="font-bold">${formatCurrency(totalReferralInvestments)} / R$ 500.000,00</span></div>
                                <div class="h-3 bg-surface-highlight rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-primary to-gold rounded-full" style="width: ${(totalReferralInvestments / 500000 * 100).toFixed(1)}%"></div></div>
                                <p class="text-xs text-text-secondary mt-2">Faltam ${formatCurrency(500000 - totalReferralInvestments)} para desbloquear o próximo nível</p>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-surface-highlight/50 rounded-lg p-4 text-center"><span class="material-symbols-outlined text-gold text-2xl mb-2">percent</span><p class="text-sm font-bold">0.10% de Participação</p><p class="text-xs text-text-secondary">Sobre lucros de indicados</p></div>
                                <div class="bg-surface-highlight/50 rounded-lg p-4 text-center"><span class="material-symbols-outlined text-gold text-2xl mb-2">group_add</span><p class="text-sm font-bold">Cadastre Usuários</p><p class="text-xs text-text-secondary">Diretamente sob você</p></div>
                                <div class="bg-surface-highlight/50 rounded-lg p-4 text-center"><span class="material-symbols-outlined text-gold text-2xl mb-2">analytics</span><p class="text-sm font-bold">Dashboard Exclusivo</p><p class="text-xs text-text-secondary">Métricas detalhadas</p></div>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight flex justify-between items-center">
                                <h3 class="text-lg font-bold">Seus Indicados</h3>
                                <span class="text-sm text-text-secondary">${referrals.length} pessoa(s)</span>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Indicado</th><th class="px-6 py-4 text-sm text-text-secondary">Data</th><th class="px-6 py-4 text-sm text-text-secondary">Investido</th><th class="px-6 py-4 text-sm text-text-secondary">Seu Bônus (5%)</th></tr></thead>
                                    <tbody>
                                        ${referrals.length > 0 ? referrals.map(ref => {
        const invs = window.db.investments.findByUserId(ref.userId).filter(i => i.status === 'active');
        const totalInv = invs.reduce((s, i) => s + i.amount, 0);
        const initials = ref.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        return `
                                                <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                                    <td class="px-6 py-4 text-sm">
                                                        <div class="flex items-center gap-3">
                                                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-xs text-white">${initials}</div>
                                                            <span>${ref.fullName}</span>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 text-text-secondary text-sm">${formatDate(ref.createdAt)}</td>
                                                    <td class="px-6 py-4 text-sm">${formatCurrency(totalInv)}</td>
                                                    <td class="px-6 py-4 text-success font-medium text-sm">${formatCurrency(totalInv * 0.05)}</td>
                                                </tr>
                                            `;
    }).join('') : `
                                            <tr><td colspan="4" class="px-6 py-8 text-center text-text-secondary">Você ainda não possui indicados.</td></tr>
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

