/**
 * WEM CONSULTANCY - Signup Page
 * Role selector with admin signup disabled
 */

let selectedSignupRole = 'investor'; // Default: investor

function renderSignup() {
    document.getElementById('app').innerHTML = `
        <div class="min-h-screen flex flex-col bg-background-dark relative overflow-hidden">
            <div class="fixed inset-0 z-0 pointer-events-none">
                <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]"></div>
            </div>
            
            <header class="relative z-10 w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
                <a href="#landing" class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-2xl">candlestick_chart</span>
                    <span class="font-bold text-lg">WEM CONSULTANCY</span>
                </a>
            </header>
            
            <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
                <div class="w-full max-w-[480px]">
                    <div class="bg-surface-dark/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl border border-border-dark">
                        
                        <!-- ROLE SELECTOR TABS -->
                        <div class="mb-8">
                            <div class="flex rounded-xl bg-surface-highlight p-1.5 gap-1">
                                <button onclick="switchSignupRole('investor')" id="signup-role-investor-btn"
                                        class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${selectedSignupRole === 'investor' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}">
                                    <span class="material-symbols-outlined">person</span>
                                    Investidor
                                </button>
                                <button onclick="switchSignupRole('admin')" id="signup-role-admin-btn"
                                        class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${selectedSignupRole === 'admin' ? 'bg-danger text-white shadow-lg' : 'text-text-secondary hover:text-white'}">
                                    <span class="material-symbols-outlined">admin_panel_settings</span>
                                    Administrador
                                </button>
                            </div>
                        </div>
                        
                        ${selectedSignupRole === 'investor' ? `
                            <!-- INVESTOR SIGNUP FORM -->
                            <div class="text-center mb-8">
                                <h1 class="text-3xl font-bold mb-2">Criar sua conta</h1>
                                <p class="text-text-secondary">Comece a investir com segurança</p>
                            </div>
                            
                            <form class="space-y-5" onsubmit="event.preventDefault(); handleSignup();">
                                <div class="flex flex-col gap-2">
                                    <label class="text-sm font-medium">Nome Completo</label>
                                    <div class="relative">
                                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">person</span>
                                        <input type="text" id="signup-name" placeholder="Seu nome completo" class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border border-border-dark text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent" />
                                    </div>
                                </div>
                                
                                <div class="flex flex-col gap-2">
                                    <label class="text-sm font-medium">E-mail</label>
                                    <div class="relative">
                                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">mail</span>
                                        <input type="email" id="signup-email" placeholder="exemplo@wem.com.br" class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border border-border-dark text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent" />
                                    </div>
                                </div>
                                
                                <div class="flex flex-col gap-2">
                                    <label class="text-sm font-medium">Senha</label>
                                    <div class="relative">
                                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">lock</span>
                                        <input type="password" id="signup-password" placeholder="Mínimo 8 caracteres" class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border border-border-dark text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent" />
                                    </div>
                                </div>
                                
                                ${stateService.getState().systemConfig.referralEnabled ? `
                                <div class="flex flex-col gap-2 scale-in">
                                    <label class="text-sm font-medium">Código de Indicação (opcional)</label>
                                    <div class="relative">
                                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">card_giftcard</span>
                                        <input type="text" id="signup-referral" placeholder="Ex: AB12CD34JOAO" class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border border-border-dark text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent" />
                                    </div>
                                </div>
                                ` : ''}
                                
                                <div class="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <input type="checkbox" id="signup-terms" class="h-5 w-5 mt-0.5 rounded border-border-dark bg-surface-dark text-primary" />
                                    <p class="text-sm text-text-secondary">
                                        Concordo com os <a href="#" class="text-primary font-bold">Termos de Uso</a> e <a href="#" class="text-primary font-bold">Política de Privacidade</a>
                                    </p>
                                </div>
                                
                                <button type="submit" id="signup-btn" class="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/20">
                                    Criar conta
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </form>
                            
                            <div class="relative flex items-center py-6">
                                <div class="flex-grow border-t border-border-dark"></div>
                                <span class="flex-shrink-0 mx-4 text-sm text-text-secondary">ou</span>
                                <div class="flex-grow border-t border-border-dark"></div>
                            </div>
                            
                            <button onclick="authService.loginWithGoogle()" class="flex w-full items-center justify-center gap-3 rounded-lg border border-border-dark bg-surface-highlight h-12 font-bold hover:bg-border-dark">
                                <svg class="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Continuar com Google
                            </button>
                            
                            <div class="mt-8 pt-6 border-t border-border-dark text-center">
                                <p class="text-sm text-text-secondary">
                                    Já tem conta? <a href="#login" class="font-bold text-primary hover:text-blue-400">Entrar</a>
                                </p>
                            </div>
                        ` : `
                            <!-- ADMIN SIGNUP BLOCKED -->
                            <div class="text-center py-8">
                                <div class="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-6">
                                    <span class="material-symbols-outlined text-danger text-4xl">block</span>
                                </div>
                                <h2 class="text-2xl font-bold text-danger mb-4">Cadastro Restrito</h2>
                                <p class="text-text-secondary mb-6">
                                    Contas administrativas <strong>não</strong> podem ser criadas por auto-registro.
                                </p>
                                
                                <div class="bg-surface-highlight rounded-xl p-6 text-left space-y-4">
                                    <div class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-warning">verified_user</span>
                                        <div>
                                            <p class="font-medium">Aprovação Manual</p>
                                            <p class="text-sm text-text-secondary">Administradores são aprovados exclusivamente pelo proprietário do sistema.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-primary">contact_support</span>
                                        <div>
                                            <p class="font-medium">Solicitar Acesso</p>
                                            <p class="text-sm text-text-secondary">Entre em contato: <span class="text-primary">suporte@wemconsultancy.com</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-8 space-y-3">
                                    <button onclick="switchSignupRole('investor')" class="w-full h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover flex items-center justify-center gap-2">
                                        <span class="material-symbols-outlined">person</span>
                                        Criar conta como Investidor
                                    </button>
                                    <a href="#login" class="block w-full h-12 rounded-lg bg-surface-highlight text-white font-bold hover:bg-border-dark flex items-center justify-center">
                                        Já sou Administrador
                                    </a>
                                </div>
                            </div>
                        `}
                    </div>
                </div>
            </main>
        </div>
    `;
}

function switchSignupRole(role) {
    selectedSignupRole = role;
    renderSignup();
}

async function handleSignup() {
    const btn = document.getElementById('signup-btn');
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const terms = document.getElementById('signup-terms').checked;

    if (!terms) {
        showToast('Você deve aceitar os termos de uso.', 'warning');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Criando...';

        await authService.signup(email, password, name);

        showToast('Conta criada! Verifique seu e-mail para confirmar.', 'success');
        navigate('login');
    } catch (error) {
        showToast('Erro ao criar conta: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Criar conta <span class="material-symbols-outlined">arrow_forward</span>';
    }
}
