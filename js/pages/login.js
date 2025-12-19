/**
 * WEM CONSULTANCY - Dual Login Page
 * Role selector: Investor (default) / Administrator (restricted)
 */

// Approved admin list (controlled by system owner only)
const approvedAdmins = [
    { email: 'admin@wemconsultancy.com', password: 'WemAdmin2024' },
    { email: 'admin@wem.com.br', password: 'WemAdmin2024' }
];

let selectedLoginRole = 'investor'; // Default: investor

function renderLogin() {
    document.getElementById('app').innerHTML = `
        <div class="min-h-screen flex flex-col bg-background-dark relative overflow-hidden">
            <div class="fixed inset-0 z-0 pointer-events-none">
                <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]"></div>
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
                                <button onclick="switchLoginRole('investor')" id="role-investor-btn"
                                        class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${selectedLoginRole === 'investor' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}">
                                    <span class="material-symbols-outlined">person</span>
                                    Investidor
                                </button>
                                <button onclick="switchLoginRole('admin')" id="role-admin-btn"
                                        class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${selectedLoginRole === 'admin' ? 'bg-danger text-white shadow-lg' : 'text-text-secondary hover:text-white'}">
                                    <span class="material-symbols-outlined">admin_panel_settings</span>
                                    Administrador
                                </button>
                            </div>
                        </div>
                        
                        <!-- Dynamic Header based on role -->
                        <div class="text-center mb-8" id="login-header">
                            ${selectedLoginRole === 'investor' ? `
                                <h1 class="text-3xl font-bold mb-2">Bem-vindo de volta</h1>
                                <p class="text-text-secondary">Acesse sua conta de investidor</p>
                            ` : `
                                <div class="flex items-center justify-center gap-3 mb-4">
                                    <div class="w-12 h-12 rounded-xl bg-danger/20 flex items-center justify-center">
                                        <span class="material-symbols-outlined text-danger text-2xl">shield</span>
                                    </div>
                                </div>
                                <h1 class="text-3xl font-bold mb-2 text-danger">Acesso Restrito</h1>
                                <p class="text-text-secondary">Apenas administradores autorizados</p>
                            `}
                        </div>
                        
                        <!-- Login Form -->
                        <form class="space-y-6" id="login-form" onsubmit="event.preventDefault(); handleLogin();">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium">${selectedLoginRole === 'admin' ? 'E-mail Administrativo' : 'E-mail'}</label>
                                <div class="relative">
                                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">mail</span>
                                    <input type="email" id="login-email" placeholder="${selectedLoginRole === 'admin' ? 'admin@wemconsultancy.com' : 'exemplo@wem.com.br'}" 
                                           class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border ${selectedLoginRole === 'admin' ? 'border-danger/30 focus:ring-danger' : 'border-border-dark focus:ring-primary'} text-white placeholder-text-secondary focus:ring-2 focus:border-transparent" />
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium">${selectedLoginRole === 'admin' ? 'Senha Administrativa' : 'Senha'}</label>
                                <div class="relative">
                                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">lock</span>
                                    <input type="password" id="login-password" placeholder="••••••••" 
                                           class="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-highlight border ${selectedLoginRole === 'admin' ? 'border-danger/30 focus:ring-danger' : 'border-border-dark focus:ring-primary'} text-white placeholder-text-secondary focus:ring-2 focus:border-transparent" />
                                </div>
                            </div>
                            
                            <!-- Admin Warning -->
                            ${selectedLoginRole === 'admin' ? `
                                <div class="bg-danger/10 border border-danger/30 rounded-xl p-4 flex items-start gap-3">
                                    <span class="material-symbols-outlined text-danger">warning</span>
                                    <div>
                                        <p class="text-sm font-medium text-danger">Acesso Restrito</p>
                                        <p class="text-xs text-text-secondary mt-1">Apenas contas administrativas aprovadas pelo proprietário do sistema podem acessar esta área.</p>
                                    </div>
                                </div>
                            ` : `
                                <div class="flex items-center justify-between">
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" class="h-4 w-4 rounded border-border-dark bg-surface-dark text-primary" />
                                        <span class="text-sm text-text-secondary">Lembrar-me</span>
                                    </label>
                                    <a href="#" class="text-sm font-semibold text-primary hover:text-blue-400">Esqueci minha senha</a>
                                </div>
                            `}
                            
                            <!-- Error Message -->
                            <div id="login-error" class="hidden p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm"></div>
                            
                            <button type="submit" class="w-full flex items-center justify-center gap-2 h-12 rounded-lg ${selectedLoginRole === 'admin' ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-primary-hover'} text-white font-bold">
                                ${selectedLoginRole === 'admin' ? '<span class="material-symbols-outlined">admin_panel_settings</span> Acessar Painel Admin' : 'Entrar <span class="material-symbols-outlined">arrow_forward</span>'}
                            </button>
                        </form>
                        
                        ${selectedLoginRole === 'investor' ? `
                            <div class="relative flex items-center py-6">
                                <div class="flex-grow border-t border-border-dark"></div>
                                <span class="flex-shrink-0 mx-4 text-sm text-text-secondary">ou</span>
                                <div class="flex-grow border-t border-border-dark"></div>
                            </div>
                            
                            <button onclick="handleGoogleLogin()" class="flex w-full items-center justify-center gap-3 rounded-lg border border-border-dark bg-surface-highlight h-12 font-bold hover:bg-border-dark">
                                <svg class="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Continuar com Google
                            </button>
                            
                            <div class="mt-8 pt-6 border-t border-border-dark text-center">
                                <p class="text-sm text-text-secondary">
                                    Não tem conta? <a href="#signup" class="font-bold text-primary hover:text-blue-400">Criar conta</a>
                                </p>
                            </div>
                        ` : `
                            <div class="mt-8 pt-6 border-t border-border-dark text-center">
                                <p class="text-xs text-text-secondary">
                                    Administradores são aprovados manualmente pelo proprietário do sistema. 
                                    <br>Contato: <span class="text-primary">suporte@wemconsultancy.com</span>
                                </p>
                            </div>
                        `}
                    </div>
                </div>
            </main>
            
            <!-- Fixed FAB Buttons at Bottom -->
            <div class="fixed bottom-6 left-6 z-50">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
                   class="group flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                   title="Download App">
                    <span class="material-symbols-outlined text-2xl">download</span>
                    <span class="text-sm font-bold hidden sm:inline group-hover:inline">Download App</span>
                </a>
            </div>
            
            <div class="fixed bottom-6 right-6 z-50">
                <a href="https://wa.me/5511967230327" target="_blank" rel="noopener noreferrer"
                   class="group flex items-center gap-3 px-4 py-3 rounded-full bg-success text-white shadow-lg shadow-success/30 hover:shadow-xl hover:shadow-success/40 hover:scale-105 transition-all duration-300"
                   title="Fale conosco no WhatsApp">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span class="text-sm font-bold hidden sm:inline group-hover:inline">WhatsApp</span>
                </a>
            </div>
        </div>
    `;
}

function switchLoginRole(role) {
    selectedLoginRole = role;
    renderLogin();
}

async function handleGoogleLogin() {
    try {
        await authService.loginWithGoogle();
        // Redirect will happen automatically, no need for immediate toast/navigate
    } catch (error) {
        showToast('Erro ao entrar com Google: ' + error.message, 'error');
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    // Clear previous errors
    errorDiv.classList.add('hidden');

    if (!email || !password) {
        errorDiv.textContent = '⚠️ Preencha todos os campos.';
        errorDiv.classList.remove('hidden');
        return;
    }

    try {
        if (selectedLoginRole === 'admin') {
            await authService.adminLogin(email, password);
            showToast('Bem-vindo, Administrador!', 'success');
            navigate('admin-panel');
        } else {
            await authService.loginWithEmail(email, password);
            showToast('Bem-vindo ao WEM CONSULTANCY!', 'success');
            navigate('user-dashboard');
        }
    } catch (error) {
        errorDiv.textContent = '⚠️ ' + error.message;
        errorDiv.classList.remove('hidden');
    }
}
