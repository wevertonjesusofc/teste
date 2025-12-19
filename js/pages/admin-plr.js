/**
 * WEM CONSULTANCY - Static Admin PLR Page
 */

function renderAdminPLR() {
    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${adminSidebar('plr')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${adminHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">PLR Diário</h2><p class="text-text-secondary">Configure o rendimento diário da plataforma.</p></div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div class="rounded-2xl border border-surface-highlight bg-surface-dark p-6">
                                <h3 class="text-lg font-bold mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-primary">percent</span>Aplicar PLR Diário</h3>
                                <form class="space-y-4" onsubmit="event.preventDefault(); showToast('PLR de ' + document.getElementById('plr-input').value + '% aplicado!', 'success');">
                                    <div><label class="text-sm font-medium">Percentual (%)</label><input type="number" id="plr-input" step="0.01" min="0" max="5" value="0.20" class="w-full h-14 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-2xl font-bold text-white" /></div>
                                    <div class="flex gap-2">
                                        <button type="button" onclick="document.getElementById('plr-input').value='0.15'" class="px-4 py-2 rounded-lg bg-surface-highlight text-sm hover:bg-border-dark">0.15%</button>
                                        <button type="button" onclick="document.getElementById('plr-input').value='0.20'" class="px-4 py-2 rounded-lg bg-surface-highlight text-sm hover:bg-border-dark">0.20%</button>
                                        <button type="button" onclick="document.getElementById('plr-input').value='0.25'" class="px-4 py-2 rounded-lg bg-surface-highlight text-sm hover:bg-border-dark">0.25%</button>
                                        <button type="button" onclick="document.getElementById('plr-input').value='0.30'" class="px-4 py-2 rounded-lg bg-surface-highlight text-sm hover:bg-border-dark">0.30%</button>
                                    </div>
                                    <button type="submit" class="w-full h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover flex items-center justify-center gap-2"><span class="material-symbols-outlined">publish</span>Aplicar PLR</button>
                                </form>
                            </div>
                            
                            <div class="rounded-2xl border border-success/30 bg-gradient-to-br from-surface-dark to-success/10 p-6">
                                <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-success">savings</span>Liberar Rendimentos</h3>
                                <p class="text-sm text-text-secondary mb-4">Calcula e credita o PLR do dia em todas as contas ativas.</p>
                                <div class="bg-surface-dark/50 rounded-xl p-4 mb-6"><ul class="text-sm text-text-secondary space-y-1">
                                    <li class="flex items-center gap-2"><span class="material-symbols-outlined text-success text-sm">check</span>Calcular PLR sobre saldos ativos</li>
                                    <li class="flex items-center gap-2"><span class="material-symbols-outlined text-success text-sm">check</span>Creditar nas contas dos usuários</li>
                                    <li class="flex items-center gap-2"><span class="material-symbols-outlined text-success text-sm">check</span>Registrar transações</li>
                                </ul></div>
                                <button onclick="showToast('Rendimentos liberados! Total: R$ 1.695,00', 'success')" class="w-full h-12 rounded-lg bg-success text-white font-bold hover:bg-green-600 flex items-center justify-center gap-2"><span class="material-symbols-outlined">publish</span>Liberar Rendimentos</button>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight"><h3 class="text-lg font-bold">Histórico de PLR</h3></div>
                            <table class="w-full"><thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Data</th><th class="px-6 py-4 text-sm text-text-secondary">Percentual</th><th class="px-6 py-4 text-sm text-text-secondary">Por</th></tr></thead>
                            <tbody>
                                ${['18/12/2024|0.21', '17/12/2024|0.19', '16/12/2024|0.22', '15/12/2024|0.20', '14/12/2024|0.18', '13/12/2024|0.23', '12/12/2024|0.20'].map(i => {
        const [date, pct] = i.split('|');
        return `<tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30"><td class="px-6 py-4">${date}</td><td class="px-6 py-4 text-success font-bold text-2xl">${pct}%</td><td class="px-6 py-4 text-text-secondary">Admin</td></tr>`;
    }).join('')}
                            </tbody></table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
}
