/**
 * WEM CONSULTANCY - Static Admin Withdrawals Page
 */

function renderAdminWithdrawals() {
    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${adminSidebar('withdrawals')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${adminHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">Saques</h2><p class="text-text-secondary">Gerencie solicitações de saque.</p></div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${statCard('Pendentes', '2', 'pending', 'warning')}
                            ${statCard('Volume Pendente', 'R$ 3.500,00', 'payments', 'primary')}
                            ${statCard('Processados Hoje', '5', 'check_circle', 'success')}
                        </div>
                        
                        <div class="rounded-xl border border-warning/30 bg-warning/5 overflow-hidden">
                            <div class="px-6 py-5 border-b border-warning/30"><h3 class="text-lg font-bold text-warning flex items-center gap-2"><span class="material-symbols-outlined">pending_actions</span>Saques Pendentes (2)</h3></div>
                            <div class="p-4 space-y-3">
                                ${[
            ['João Silva', 'JS', 'Rendimentos', '1.500,00', '11999999999'],
            ['Pedro Oliveira', 'PO', 'Principal', '2.000,00', 'pedro@email.com']
        ].map(([name, initials, type, amount, pix]) => `
                                    <div class="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-dark">
                                        <div class="flex items-center gap-4">
                                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold">${initials}</div>
                                            <div><p class="font-medium">${name}</p><p class="text-sm text-text-secondary">${type} • R$ ${amount}</p><p class="text-xs text-text-secondary mt-1">PIX: ${pix}</p></div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <button onclick="showToast('Saque aprovado!', 'success')" class="px-4 py-2 rounded-lg bg-success text-white text-sm font-bold hover:bg-green-600">Aprovar</button>
                                            <button onclick="showToast('Saque rejeitado', 'error')" class="px-4 py-2 rounded-lg bg-danger text-white text-sm font-bold hover:bg-red-600">Rejeitar</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight"><h3 class="text-lg font-bold">Histórico</h3></div>
                            <table class="w-full"><thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Usuário</th><th class="px-6 py-4 text-sm text-text-secondary">Tipo</th><th class="px-6 py-4 text-sm text-text-secondary">Valor</th><th class="px-6 py-4 text-sm text-text-secondary">PIX</th><th class="px-6 py-4 text-sm text-text-secondary">Status</th><th class="px-6 py-4 text-sm text-text-secondary">Data</th></tr></thead>
                            <tbody>
                                ${[
            ['Maria Santos', 'Rendimentos', '500,00', 'maria@email.com', 'approved', '17/12/2024'],
            ['Ana Costa', 'Principal', '5.000,00', '98765432100', 'approved', '16/12/2024'],
            ['Carlos Lima', 'Rendimentos', '800,00', '11988887777', 'approved', '15/12/2024'],
            ['João Silva', 'Principal', '2.000,00', '11999999999', 'rejected', '14/12/2024']
        ].map(([name, type, amount, pix, status, date]) => `
                                    <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                        <td class="px-6 py-4">${name}</td>
                                        <td class="px-6 py-4">${type}</td>
                                        <td class="px-6 py-4 font-bold">R$ ${amount}</td>
                                        <td class="px-6 py-4 text-xs text-text-secondary">${pix}</td>
                                        <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-xs font-bold ${status === 'approved' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}">${status === 'approved' ? 'Aprovado' : 'Rejeitado'}</span></td>
                                        <td class="px-6 py-4 text-text-secondary">${date}</td>
                                    </tr>`).join('')}
                            </tbody></table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
}
