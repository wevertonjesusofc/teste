/**
 * WEM CONSULTANCY - Static User PLR Page
 */

function renderUserPLR() {
    const history = window.db.plr.getHistory();
    const latestPLR = window.db.plr.getLatest();

    // Calculate Stats
    const currentPLR = latestPLR?.percentage || 0;
    const avgPLR = history.length > 0
        ? history.reduce((sum, item) => sum + item.percentage, 0) / history.length
        : 0;

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('plr')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">PLR Diário</h2><p class="text-text-secondary">Histórico de rendimentos diários.</p></div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <div class="flex items-center gap-3 mb-4"><div class="rounded-lg bg-primary/10 p-2 text-primary"><span class="material-symbols-outlined">percent</span></div><h3 class="font-bold">PLR Atual</h3></div>
                                <p class="text-3xl font-bold text-primary">${currentPLR.toFixed(2)}%</p><p class="text-xs text-text-secondary mt-1">Taxa diária aplicada</p>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <div class="flex items-center gap-3 mb-4"><div class="rounded-lg bg-success/10 p-2 text-success"><span class="material-symbols-outlined">trending_up</span></div><h3 class="font-bold">Média do Período</h3></div>
                                <p class="text-3xl font-bold text-success">${avgPLR.toFixed(2)}%</p><p class="text-xs text-text-secondary mt-1">Baseado em ${history.length} registros</p>
                            </div>
                            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                                <div class="flex items-center gap-3 mb-4"><div class="rounded-lg bg-gold/10 p-2 text-gold"><span class="material-symbols-outlined">calendar_month</span></div><h3 class="font-bold">Total de Registros</h3></div>
                                <p class="text-3xl font-bold text-gold">${history.length}</p><p class="text-xs text-text-secondary mt-1">Dias com PLR</p>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                            <h3 class="text-lg font-bold mb-6">Gráfico de Performance (Últimos 14 registros)</h3>
                            <div class="h-[300px]"><canvas id="plr-chart"></canvas></div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark overflow-hidden">
                            <div class="px-6 py-5 border-b border-surface-highlight"><h3 class="text-lg font-bold">Histórico Detalhado</h3></div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead><tr class="border-b border-surface-highlight text-left"><th class="px-6 py-4 text-sm text-text-secondary">Data</th><th class="px-6 py-4 text-sm text-text-secondary">Percentual</th><th class="px-6 py-4 text-sm text-text-secondary text-right">Aplicado por</th></tr></thead>
                                    <tbody>
                                        ${history.length > 0 ? history.slice().reverse().map(item => `
                                            <tr class="border-b border-surface-highlight/50 hover:bg-surface-highlight/30">
                                                <td class="px-6 py-4">${formatDate(item.date)}</td>
                                                <td class="px-6 py-4 text-success font-bold">${item.percentage.toFixed(2)}%</td>
                                                <td class="px-6 py-4 text-text-secondary text-sm text-right">Administração</td>
                                            </tr>
                                        `).join('') : `
                                            <tr><td colspan="3" class="px-6 py-8 text-center text-text-secondary">Nenhum registro de PLR encontrado.</td></tr>
                                        `}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="rounded-xl bg-primary/5 border border-primary/20 p-6">
                            <div class="flex items-start gap-4"><span class="material-symbols-outlined text-primary text-2xl">info</span>
                            <div><h4 class="font-bold mb-2">Como funciona o PLR?</h4><p class="text-sm text-text-secondary">O PLR (Profit-Loss Ratio) é calculado diariamente sobre seu saldo investido. Os rendimentos são creditados automaticamente no seu saldo de rendimentos e podem ser sacados todas as sextas-feiras.</p></div></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
    initPLRChart(history);
}

function initPLRChart(history) {
    const ctx = document.getElementById('plr-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    // Take last 14 items for the chart
    const chartData = history.slice(-14);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(item => {
                const d = new Date(item.date);
                return `${d.getDate()}/${d.getMonth() + 1}`;
            }),
            datasets: [{
                data: chartData.map(item => item.percentage),
                backgroundColor: 'rgba(19, 91, 236, 0.5)',
                borderColor: '#135bec',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#92a4c9' } },
                y: { grid: { color: 'rgba(50,68,103,0.3)' }, ticks: { color: '#92a4c9', callback: v => v.toFixed(2) + '%' } }
            }
        }
    });
}

