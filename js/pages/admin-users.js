/**
 * WEM CONSULTANCY - Static Admin Users Page
 */

function renderAdminUsers() {
    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${adminSidebar('users')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${adminHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div><h2 class="text-2xl md:text-3xl font-bold">Usuários</h2><p class="text-text-secondary">Gerencie usuários e aprove investimentos.</p></div>
                            <button onclick="showToast('Modal criar usuário', 'info')" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover"><span class="material-symbols-outlined">person_add</span>Criar Usuário Manual</button>
                        </div>
                        
                        <div class="rounded-xl bg-warning/10 border border-warning/30 p-6">
                            <h3 class="text-lg font-bold text-warning mb-4 flex items-center gap-2"><span class="material-symbols-outlined">pending_actions</span>Investimentos Pendentes (3)</h3>
                            <div class="space-y-3">
                                ${['João Silva|R$ 5.000,00|18/12/2024', 'Maria Santos|R$ 2.500,00|17/12/2024', 'Pedro Oliveira|R$ 1.000,00|17/12/2024'].map(i => {
        const [name, amount, date] = i.split('|');
        const initials = name.split(' ').map(n => n[0]).join('');
        return `
                                    <div class="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-dark">
                                        <div class="flex items-center gap-4">
                                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold">${initials}</div>
                                            <div><p class="font-medium">${name}</p><p class="text-sm text-text-secondary">${amount} • ${date}</p></div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <button onclick="showToast('Ver comprovante', 'info')" class="p-2 rounded-lg bg-surface-highlight text-text-secondary hover:text-white"><span class="material-symbols-outlined">description</span></button>
                                            <button onclick="showToast('Investimento aprovado!', 'success')" class="px-4 py-2 rounded-lg bg-success text-white text-sm font-bold hover:bg-green-600">Aprovar</button>
                                            <button onclick="showToast('Investimento rejeitado', 'error')" class="px-4 py-2 rounded-lg bg-danger text-white text-sm font-bold hover:bg-red-600">Rejeitar</button>
                                        </div>
                                    </div>`;
    }).join('')}
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight flex justify-between">
                                <h3 class="text-lg font-bold">Todos os Usuários (156)</h3>
                                <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span><input type="text" placeholder="Buscar..." class="h-10 w-64 rounded-lg bg-surface-highlight pl-10 pr-4 text-sm text-white border-none" /></div>
                            </div>
                            <table class="w-full"><thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Usuário</th><th class="px-6 py-4 text-sm text-text-secondary">ID</th><th class="px-6 py-4 text-sm text-text-secondary">Investido</th><th class="px-6 py-4 text-sm text-text-secondary">Rendimentos</th><th class="px-6 py-4 text-sm text-text-secondary">Ativos</th><th class="px-6 py-4 text-sm text-text-secondary">Cadastro</th><th class="px-6 py-4"></th></tr></thead>
                            <tbody>
                                ${[
            ['João Silva', 'joao@email.com', 'JS', 'AB12CD34JOAO', '15.000,00', '1.850,50', '2', '18/12/2024'],
            ['Maria Santos', 'maria@email.com', 'MS', 'XY56ZW78MARI', '8.500,00', '920,00', '1', '17/12/2024'],
            ['Pedro Oliveira', 'pedro@email.com', 'PO', 'QR90ST12PEDR', '25.000,00', '3.120,00', '3', '15/12/2024'],
            ['Ana Costa', 'ana@email.com', 'AC', 'UV34WX56ANAC', '50.000,00', '6.250,00', '2', '10/12/2024'],
            ['Carlos Lima', 'carlos@email.com', 'CL', 'YZ78AB90CARL', '12.000,00', '1.440,00', '1', '05/12/2024']
        ].map(([name, email, initials, id, invested, yield_, active, date]) => `
                                    <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30 cursor-pointer">
                                        <td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center font-bold text-sm">${initials}</div><div><p class="font-medium">${name}</p><p class="text-xs text-text-secondary">${email}</p></div></div></td>
                                        <td class="px-6 py-4 font-mono text-primary">${id}</td>
                                        <td class="px-6 py-4 font-medium">R$ ${invested}</td>
                                        <td class="px-6 py-4 text-success">R$ ${yield_}</td>
                                        <td class="px-6 py-4 text-text-secondary">${active}</td>
                                        <td class="px-6 py-4 text-text-secondary">${date}</td>
                                        <td class="px-6 py-4"><button class="text-primary hover:text-primary/80"><span class="material-symbols-outlined">visibility</span></button></td>
                                    </tr>`).join('')}
                            </tbody></table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
}
