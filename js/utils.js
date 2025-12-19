/**
 * WEM CONSULTANCY - Utility Functions
 */

// Internationalization
const i18n = {
    currentLang: localStorage.getItem('wem_lang') || 'pt-BR',

    translations: {
        'pt-BR': {
            // Common
            'app.name': 'WEM CONSULTANCY',
            'app.tagline': 'Investment Consulting System',
            'common.login': 'Entrar',
            'common.logout': 'Sair',
            'common.signup': 'Criar Conta',
            'common.email': 'E-mail',
            'common.password': 'Senha',
            'common.name': 'Nome Completo',
            'common.save': 'Salvar',
            'common.cancel': 'Cancelar',
            'common.confirm': 'Confirmar',
            'common.loading': 'Carregando...',
            'common.success': 'Sucesso!',
            'common.error': 'Erro',
            'common.pending': 'Pendente',
            'common.approved': 'Aprovado',
            'common.rejected': 'Rejeitado',
            'common.active': 'Ativo',
            'common.paid': 'Pago',

            // Dashboard
            'dashboard.title': 'Visão Geral',
            'dashboard.welcome': 'Bem-vindo de volta',
            'dashboard.totalInvested': 'Total Investido',
            'dashboard.currentBalance': 'Saldo Atual',
            'dashboard.dailyYield': 'Rendimento Diário',
            'dashboard.accumulatedYield': 'Rendimento Acumulado',
            'dashboard.lastDayPerformance': 'Performance Último Dia',
            'dashboard.yourId': 'Seu ID',

            // Investment
            'investment.new': 'Nova Aplicação',
            'investment.pixKey': 'Chave PIX',
            'investment.minAmount': 'Investimento Mínimo',
            'investment.uploadProof': 'Enviar Comprovante',
            'investment.referralCode': 'Código de Indicação',

            // Withdrawals
            'withdrawal.title': 'Saques',
            'withdrawal.principal': 'Saque de Principal',
            'withdrawal.earnings': 'Saque de Rendimentos',
            'withdrawal.pixKey': 'Chave PIX para Recebimento',
            'withdrawal.amount': 'Valor',
            'withdrawal.fridayOnly': 'Disponível apenas às sextas-feiras',
            'withdrawal.advanceNotice': 'Solicitação com 3 dias de antecedência',

            // PLR
            'plr.title': 'Histórico de PLR Diário',
            'plr.date': 'Data',
            'plr.percentage': 'Percentual',

            // Admin
            'admin.dashboard': 'Painel Administrativo',
            'admin.users': 'Gestão de Usuários',
            'admin.plr': 'Gestão de PLR',
            'admin.withdrawals': 'Gestão de Saques',
            'admin.database': 'Banco de Dados',
            'admin.totalInvested': 'Total Investido na Plataforma',
            'admin.activeUsers': 'Usuários Ativos',
            'admin.pendingWithdrawals': 'Saques Pendentes',
            'admin.platformProfit': 'Lucro da Plataforma',
            'admin.applyPLR': 'Aplicar PLR',
            'admin.releaseEarnings': 'Liberar Rendimentos',

            // Auth
            'auth.welcomeBack': 'Bem-vindo de volta',
            'auth.accessDashboard': 'Acesse o seu dashboard financeiro',
            'auth.createAccount': 'Crie sua conta',
            'auth.joinUs': 'Junte-se à WEM CONSULTANCY',
            'auth.rememberMe': 'Lembrar de mim',
            'auth.forgotPassword': 'Esqueceu a senha?',
            'auth.hasAccount': 'Já tem uma conta?',
            'auth.noAccount': 'Não tem uma conta?',
            'auth.restricted': 'Restrito',
            'auth.adminAccess': 'Acesso Administrativo',
            'auth.googleLogin': 'Continuar com Google',
            'auth.terms': 'Termos de Uso',
            'auth.privacy': 'Política de Privacidade',

            // Support
            'support.title': 'Suporte',
            'support.whatsapp': 'Falar via WhatsApp'
        },
        'en': {
            // Common
            'app.name': 'WEM CONSULTANCY',
            'app.tagline': 'Investment Consulting System',
            'common.login': 'Login',
            'common.logout': 'Logout',
            'common.signup': 'Sign Up',
            'common.email': 'Email',
            'common.password': 'Password',
            'common.name': 'Full Name',
            'common.save': 'Save',
            'common.cancel': 'Cancel',
            'common.confirm': 'Confirm',
            'common.loading': 'Loading...',
            'common.success': 'Success!',
            'common.error': 'Error',
            'common.pending': 'Pending',
            'common.approved': 'Approved',
            'common.rejected': 'Rejected',
            'common.active': 'Active',
            'common.paid': 'Paid',

            // Dashboard
            'dashboard.title': 'Overview',
            'dashboard.welcome': 'Welcome back',
            'dashboard.totalInvested': 'Total Invested',
            'dashboard.currentBalance': 'Current Balance',
            'dashboard.dailyYield': 'Daily Yield',
            'dashboard.accumulatedYield': 'Accumulated Yield',
            'dashboard.lastDayPerformance': 'Last Day Performance',
            'dashboard.yourId': 'Your ID',

            // Investment
            'investment.new': 'New Investment',
            'investment.pixKey': 'PIX Key',
            'investment.minAmount': 'Minimum Investment',
            'investment.uploadProof': 'Upload Proof',
            'investment.referralCode': 'Referral Code',

            // Withdrawals
            'withdrawal.title': 'Withdrawals',
            'withdrawal.principal': 'Principal Withdrawal',
            'withdrawal.earnings': 'Earnings Withdrawal',
            'withdrawal.pixKey': 'PIX Key for Receiving',
            'withdrawal.amount': 'Amount',
            'withdrawal.fridayOnly': 'Available only on Fridays',
            'withdrawal.advanceNotice': '3 days advance notice required',

            // PLR
            'plr.title': 'Daily PLR History',
            'plr.date': 'Date',
            'plr.percentage': 'Percentage',

            // Admin
            'admin.dashboard': 'Admin Panel',
            'admin.users': 'User Management',
            'admin.plr': 'PLR Management',
            'admin.withdrawals': 'Withdrawal Management',
            'admin.database': 'Database',
            'admin.totalInvested': 'Total Platform Investment',
            'admin.activeUsers': 'Active Users',
            'admin.pendingWithdrawals': 'Pending Withdrawals',
            'admin.platformProfit': 'Platform Profit',
            'admin.applyPLR': 'Apply PLR',
            'admin.releaseEarnings': 'Release Earnings',

            // Auth
            'auth.welcomeBack': 'Welcome back',
            'auth.accessDashboard': 'Access your financial dashboard',
            'auth.createAccount': 'Create your account',
            'auth.joinUs': 'Join WEM CONSULTANCY',
            'auth.rememberMe': 'Remember me',
            'auth.forgotPassword': 'Forgot password?',
            'auth.hasAccount': 'Already have an account?',
            'auth.noAccount': "Don't have an account?",
            'auth.restricted': 'Restricted',
            'auth.adminAccess': 'Admin Access',
            'auth.googleLogin': 'Continue with Google',
            'auth.terms': 'Terms of Service',
            'auth.privacy': 'Privacy Policy',

            // Support
            'support.title': 'Support',
            'support.whatsapp': 'Chat via WhatsApp'
        }
    },

    t(key) {
        return this.translations[this.currentLang][key] || key;
    },

    setLang(lang) {
        this.currentLang = lang;
        localStorage.setItem('wem_lang', lang);
    },

    toggleLang() {
        this.setLang(this.currentLang === 'pt-BR' ? 'en' : 'pt-BR');
        router.refresh();
    }
};

// Format currency
function formatCurrency(value, currency = 'BRL') {
    return new Intl.NumberFormat(i18n.currentLang, {
        style: 'currency',
        currency: currency
    }).format(value);
}

// Format date
function formatDate(date, format = 'short') {
    const d = new Date(date);
    const options = format === 'short'
        ? { day: '2-digit', month: 'short', year: 'numeric' }
        : { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString(i18n.currentLang, options);
}

// Format percentage
function formatPercentage(value, decimals = 2) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

// Generate UUID
function generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

// Check if today is Friday
function isFriday() {
    return new Date().getDay() === 5;
}

// Get days until Friday
function daysUntilFriday() {
    const today = new Date().getDay();
    const daysUntil = (5 - today + 7) % 7;
    return daysUntil === 0 ? 7 : daysUntil;
}

// Check if date is at least 3 days from now
function isAtLeast3DaysAhead(date) {
    const target = new Date(date);
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return target >= threeDaysFromNow;
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate password strength
function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength; // 0-5
}

// Toast notifications
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    const colors = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-primary'
    };

    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };

    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 fade-in`;
    toast.innerHTML = `
        <span class="material-symbols-outlined">${icons[type]}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// File to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// WhatsApp support link
function openWhatsAppSupport() {
    window.open('https://wa.me/5511967230327', '_blank');
}
