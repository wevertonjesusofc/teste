import { authService } from './services/auth-service.js';
import { stateService } from './services/state.js';
import { apiService } from './services/api.js';

/**
 * WEM CONSULTANCY - Application Controller
 * Centralized service-based application logic
 */

// ================== ROUTING ==================
let currentPage = 'landing';

const PROTECTED_ROUTES = [
    'user-dashboard', 'user-investment', 'user-plr',
    'user-withdrawal', 'user-affiliate', 'user-settings'
];

const ADMIN_ROUTES = ['admin-panel', 'admin-database'];

export function navigate(page) {
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    // Route Guards
    if (PROTECTED_ROUTES.includes(page) && !isAuthenticated) {
        showToast('Acesso restrito. Faça login para continuar.', 'warning');
        navigate('login');
        return;
    }

    if (ADMIN_ROUTES.includes(page) && !isAdmin) {
        showToast('Acesso negado. Apenas administradores.', 'error');
        navigate(isAuthenticated ? 'user-dashboard' : 'login');
        return;
    }

    currentPage = page;
    window.location.hash = page;
    renderPage();
}
window.navigate = navigate;

export function renderPage() {
    const pages = {
        'landing': window.renderLanding,
        'login': window.renderLogin,
        'signup': window.renderSignup,
        'user-dashboard': window.renderUserDashboard,
        'user-investment': window.renderUserInvestment,
        'user-plr': window.renderUserPLR,
        'user-withdrawal': window.renderUserWithdrawal,
        'user-affiliate': window.renderUserAffiliate,
        'user-settings': window.renderUserSettings,
        'admin-panel': window.renderAdminPanel,
        'admin-database': window.renderAdminDatabase
    };

    const render = pages[currentPage] || window.renderLanding;
    if (render) render();
}

// ================== MODE SWITCH ==================
export function toggleViewMode() {
    const currentMode = stateService.getState().viewMode;
    const newMode = currentMode === 'admin' ? 'investor' : 'admin';
    setViewMode(newMode);
}
window.toggleViewMode = toggleViewMode;

export function getModeSwitchButton() {
    if (!authService.isAdmin()) return '';

    const isAdminMode = stateService.getState().viewMode === 'admin';

    return `
        <div class="relative">
            <button onclick="toggleModeDropdown()" id="mode-switch-btn"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${isAdminMode ? 'bg-danger/20 text-danger hover:bg-danger/30' : 'bg-primary/20 text-primary hover:bg-primary/30'}">
                <span class="material-symbols-outlined text-lg">${isAdminMode ? 'admin_panel_settings' : 'person'}</span>
                <span class="text-sm font-bold">${isAdminMode ? 'ADM' : 'INV'}</span>
                <span class="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <div id="mode-dropdown" class="hidden absolute right-0 top-full mt-2 w-48 bg-surface-dark border border-border-dark rounded-xl shadow-2xl z-50 overflow-hidden fade-in">
                <div class="p-2 border-b border-border-dark">
                    <p class="text-xs text-text-secondary px-2">Modo de Visualização</p>
                </div>
                <button onclick="setViewMode('admin')" 
                        class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-highlight transition-colors ${isAdminMode ? 'bg-danger/10 text-danger' : 'text-text-secondary'}">
                    <span class="material-symbols-outlined">admin_panel_settings</span>
                    <div>
                        <p class="font-medium">Modo Admin</p>
                        <p class="text-xs text-text-secondary">Controles administrativos</p>
                    </div>
                ${isAdminMode ? '<span class="material-symbols-outlined ml-auto text-success">check_circle</span>' : ''}
                </button>
                <button onclick="setViewMode('investor')" 
                        class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-highlight transition-colors ${!isAdminMode ? 'bg-primary/10 text-primary' : 'text-text-secondary'}">
                    <span class="material-symbols-outlined">person</span>
                    <div>
                        <p class="font-medium">Modo Investidor</p>
                        <p class="text-xs text-text-secondary">Visão do usuário</p>
                    </div>
                ${!isAdminMode ? '<span class="material-symbols-outlined ml-auto text-success">check_circle</span>' : ''}
                </button>
            </div>
        </div>
    `;
}
window.getModeSwitchButton = getModeSwitchButton;

window.toggleModeDropdown = function () {
    const dropdown = document.getElementById('mode-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
        if (!dropdown.classList.contains('hidden')) {
            setTimeout(() => {
                document.addEventListener('click', closeModeDropdownOnOutsideClick);
            }, 10);
        }
    }
}

function closeModeDropdownOnOutsideClick(e) {
    const dropdown = document.getElementById('mode-dropdown');
    const btn = document.getElementById('mode-switch-btn');
    if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeModeDropdownOnOutsideClick);
    }
}

window.setViewMode = function (mode) {
    stateService.setViewMode(mode);
    document.getElementById('mode-dropdown')?.classList.add('hidden');
    navigate(mode === 'admin' ? 'admin-panel' : 'user-dashboard');
    showToast(`Modo ${mode === 'admin' ? 'Administrador' : 'Investidor'} ativado`, 'info');
}

// ================== TOAST NOTIFICATIONS ==================
export function showToast(message, type = 'info') {
    const colors = { success: 'bg-success', error: 'bg-danger', warning: 'bg-warning', info: 'bg-primary' };
    const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };

    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg fade-in flex items-center gap-2 mb-2`;
    toast.innerHTML = `<span class="material-symbols-outlined text-lg">${icons[type]}</span>${message}`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
window.showToast = showToast;

// ================== UTILITY FUNCTIONS ==================
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
window.formatCurrency = formatCurrency;

export function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}
window.formatDate = formatDate;

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast('Copiado para a área de transferência!', 'success');
}
window.copyToClipboard = copyToClipboard;

export function openWhatsAppSupport() {
    window.open('https://wa.me/5511967230327', '_blank');
}
window.openWhatsAppSupport = openWhatsAppSupport;

export function openModal(id) {
    document.getElementById(id)?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
window.openModal = openModal;

export function closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
    document.body.style.overflow = '';
}
window.closeModal = closeModal;

export async function toggleReferralSystem() {
    const currentState = stateService.getState().systemConfig.referralEnabled;
    const newState = !currentState;

    try {
        await apiService.adminUpdateSystemConfig({ referral_enabled: newState });
        stateService.setSystemConfig({ referralEnabled: newState });
        showToast(`Sistema de indicação ${newState ? 'ATIVADO' : 'DESATIVADO'}`, newState ? 'success' : 'warning');
        renderPage();
    } catch (error) {
        showToast('Erro ao atualizar configuração: ' + error.message, 'error');
    }
}
window.toggleReferralSystem = toggleReferralSystem;

// ================== INITIALIZE ==================
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize services
    await stateService.init();
    await authService.init();

    const hash = window.location.hash.slice(1);
    currentPage = hash || 'landing';

    // Route Safety on Init
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    if (PROTECTED_ROUTES.includes(currentPage) && !isAuthenticated) {
        currentPage = 'landing';
    }
    if (ADMIN_ROUTES.includes(currentPage) && !isAdmin) {
        currentPage = isAuthenticated ? 'user-dashboard' : 'landing';
    }

    renderPage();
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'landing';
    navigate(hash);
});

