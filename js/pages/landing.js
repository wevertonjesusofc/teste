/**
 * WEM CONSULTANCY - Static Landing Page
 */

function renderLanding() {
    document.getElementById('app').innerHTML = `
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-background-dark/90 backdrop-blur-md border-b border-border-dark">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-20 items-center">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center rounded-lg bg-primary/20 p-2 text-primary">
                            <span class="material-symbols-outlined text-2xl">candlestick_chart</span>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold tracking-tight">WEM</h1>
                            <p class="text-xs text-text-secondary -mt-1">CONSULTANCY</p>
                        </div>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-text-secondary">
                        <a href="#about" class="hover:text-white transition-colors">Sobre</a>
                        <a href="#services" class="hover:text-white transition-colors">Serviços</a>
                        <a href="#contact" class="hover:text-white transition-colors">Contato</a>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <a href="#login" class="hidden sm:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-white">
                            Entrar
                            <span class="material-symbols-outlined text-lg">login</span>
                        </a>
                        <button onclick="navigate('signup')" class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover">
                            Criar Conta
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div class="absolute inset-0 z-0">
                <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]"></div>
            </div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div class="lg:col-span-7">
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                            Invista com a <br/>
                            <span class="gold-shimmer">WEM CONSULTANCY</span>
                        </h1>
                        <p class="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
                            Planejamento personalizado para o seu futuro. Tenha acesso aos melhores produtos do mercado financeiro.
                        </p>
                        <p class="mt-4 text-base text-text-secondary/80">
                            Investment Consulting System - Escolha o plano mais adequado para o seu perfil.
                        </p>
                        
                        <div class="mt-10 flex flex-col sm:flex-row gap-4 items-start">
                            <button onclick="navigate('signup')" class="flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-hover shadow-lg shadow-primary/30">
                                Abra sua conta
                                <span class="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="lg:col-span-5 flex flex-col gap-6">
                        <!-- Simulate Card -->
                        <div class="bg-surface-dark/80 backdrop-blur-sm border border-border-dark p-6 rounded-2xl shadow-2xl hover:-translate-y-1 transition-transform">
                            <div class="flex items-start justify-between mb-2">
                                <h3 class="text-primary font-bold text-lg uppercase">Simule seus Ganhos</h3>
                                <span class="material-symbols-outlined text-text-secondary">trending_up</span>
                            </div>
                            <p class="text-text-secondary text-sm mb-4">Descubra quanto seu dinheiro pode render.</p>
                            <div class="relative mb-4">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">R$</span>
                                <input type="text" placeholder="10.000,00" class="w-full pl-10 pr-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder-text-secondary focus:border-primary" />
                            </div>
                            <button onclick="showToast('Em 30 dias: R$ 10.618,00 (lucro de R$ 618,00)', 'success')" class="group flex items-center text-sm font-semibold text-white hover:text-primary">
                                Simular agora
                                <span class="material-symbols-outlined ml-1 text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                        
                        <!-- Future Plan Card -->
                        <div class="bg-surface-dark/80 backdrop-blur-sm border border-border-dark p-6 rounded-2xl shadow-2xl hover:-translate-y-1 transition-transform">
                            <div class="flex items-start justify-between mb-2">
                                <h3 class="text-primary font-bold text-lg uppercase">Plano de Futuro WEM</h3>
                                <span class="material-symbols-outlined text-text-secondary">calendar_month</span>
                            </div>
                            <p class="text-text-secondary text-sm mb-6">Calcule o tempo para sua independência financeira.</p>
                            <button onclick="navigate('signup')" class="group flex items-center text-sm font-semibold text-white hover:text-primary">
                                Crie seu plano
                                <span class="material-symbols-outlined ml-1 text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Features -->
        <section class="bg-surface-dark py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-5xl font-bold mb-6">Produtos e Serviços</h2>
                    <p class="text-lg text-text-secondary max-w-3xl mx-auto">Tudo o que a WEM CONSULTANCY oferece para você.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-surface-highlight/30 rounded-2xl p-8 border border-border-dark hover:border-primary/50 transition-all group">
                        <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                            <span class="material-symbols-outlined text-2xl">monitoring</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Rendimento Diário</h3>
                        <p class="text-text-secondary">PLR diário aplicado sobre seu capital investido.</p>
                    </div>
                    
                    <div class="bg-surface-highlight/30 rounded-2xl p-8 border border-border-dark hover:border-gold/50 transition-all group">
                        <div class="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-black transition-all">
                            <span class="material-symbols-outlined text-2xl">verified_user</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Segurança Total</h3>
                        <p class="text-text-secondary">Investimentos protegidos com as melhores práticas.</p>
                    </div>
                    
                    <div class="bg-surface-highlight/30 rounded-2xl p-8 border border-border-dark hover:border-success/50 transition-all group">
                        <div class="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center text-success mb-6 group-hover:bg-success group-hover:text-white transition-all">
                            <span class="material-symbols-outlined text-2xl">group</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Programa de Indicação</h3>
                        <p class="text-text-secondary">Ganhe 5% sobre investimentos de indicados.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CTA -->
        <section class="py-24">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Pronto para começar?</h2>
                <p class="text-lg text-text-secondary mb-10">Abra sua conta agora e receba acompanhamento personalizado.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onclick="navigate('signup')" class="px-8 py-4 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover">Criar minha conta</button>
                    <button onclick="openWhatsAppSupport()" class="flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border-dark text-white font-bold hover:bg-surface-highlight">
                        <span class="material-symbols-outlined">support_agent</span>
                        Falar com consultor
                    </button>
                </div>
            </div>
        </section>
        
        <!-- Footer -->
        <footer class="bg-surface-dark border-t border-border-dark py-12">
            <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">candlestick_chart</span>
                    <span class="font-bold">WEM CONSULTANCY</span>
                </div>
                <p class="text-xs text-text-secondary">© 2024 WEM CONSULTANCY. Todos os direitos reservados.</p>
            </div>
        </footer>
        
        <!-- WhatsApp FAB -->
        <a href="https://wa.me/5511967230327" target="_blank" class="fixed bottom-6 right-6 w-14 h-14 bg-success hover:bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all z-50">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
    `;
}
