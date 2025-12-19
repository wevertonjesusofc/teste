/**
 * WEM CONSULTANCY - Router
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.beforeEachGuards = [];
    }

    register(path, handler, options = {}) {
        this.routes[path] = { handler, options };
    }

    beforeEach(guard) {
        this.beforeEachGuards.push(guard);
    }

    async navigate(path, params = {}) {
        // Store params for the route
        this.currentParams = params;

        // Run guards
        for (const guard of this.beforeEachGuards) {
            const result = await guard(path, this.currentRoute);
            if (result === false) return;
            if (typeof result === 'string') {
                path = result;
            }
        }

        const route = this.routes[path];
        if (!route) {
            console.warn(`Route not found: ${path}`);
            return this.navigate('landing');
        }

        this.currentRoute = path;
        window.location.hash = path;

        try {
            await route.handler(params);
        } catch (error) {
            console.error('Route handler error:', error);
            showToast('Erro ao carregar página', 'error');
        }
    }

    refresh() {
        if (this.currentRoute) {
            this.navigate(this.currentRoute, this.currentParams || {});
        }
    }

    getParam(key) {
        return this.currentParams ? this.currentParams[key] : null;
    }

    init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1) || 'landing';
            this.navigate(hash);
        });

        // Handle initial route
        const initialHash = window.location.hash.slice(1) || 'landing';
        this.navigate(initialHash);
    }
}

const router = new Router();

// Auth guard
router.beforeEach(async (to, from) => {
    const publicRoutes = ['landing', 'login', 'signup', 'admin-login'];
    const adminRoutes = ['admin-dashboard', 'admin-users', 'admin-plr', 'admin-withdrawals', 'admin-database'];

    if (publicRoutes.includes(to)) {
        return true;
    }

    if (!auth.isAuthenticated()) {
        showToast('Por favor, faça login para continuar', 'warning');
        return 'login';
    }

    if (adminRoutes.includes(to) && !auth.isAdmin()) {
        showToast('Acesso restrito a administradores', 'error');
        return 'user-dashboard';
    }

    return true;
});
