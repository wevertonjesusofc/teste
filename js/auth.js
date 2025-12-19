/**
 * WEM CONSULTANCY - Authentication System
 * Supports: Google OAuth, Admin Login, Role-based Access
 * Ready for: Firebase Auth, Supabase Auth, Custom OAuth
 */

// ==================== AUTH CONFIG ====================

const AUTH_CONFIG = {
    // Google OAuth Client ID (replace with actual)
    googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',

    // Approved admin emails (controlled by system owner)
    approvedAdmins: [
        { email: 'admin@wemconsultancy.com', password: 'WemAdmin2024' },
        { email: 'admin@wem.com.br', password: 'WemAdmin2024' }
    ],

    // Session storage key
    sessionKey: 'wem_user_session'
};

// ==================== AUTH STATE ====================

const authState = {
    isAuthenticated: false,
    currentUser: null,
    role: null, // 'investor' | 'admin' | 'admin_master'
    token: null
};

// ==================== AUTH SYSTEM ====================

const auth = {
    // Check if user is authenticated
    isAuthenticated: () => authState.isAuthenticated,

    // Get current user
    getCurrentUser: () => authState.currentUser,

    // Get user role
    getRole: () => authState.role,

    // Check if user is admin
    isAdmin: () => authState.role?.startsWith('admin'),

    // Check if user is admin master
    isAdminMaster: () => authState.role === 'admin_master',

    // ==================== GOOGLE AUTH ====================

    /**
     * Initialize Google Sign-In
     * Call this when the app loads
     */
    initGoogleAuth: async () => {
        // In production, load Google Sign-In SDK
        console.log('[Auth] Google Sign-In initialized (mock mode)');
    },

    /**
     * Sign in with Google
     * Returns user data on success
     */
    signInWithGoogle: async () => {
        try {
            // In production, this would trigger Google's OAuth flow
            // For now, simulate with mock data

            // Simulate Google OAuth popup
            const mockGoogleUser = await auth._simulateGoogleSignIn();

            if (!mockGoogleUser) {
                return { success: false, error: 'Google sign-in cancelled' };
            }

            // Call API to authenticate
            const response = await api.auth.loginWithGoogle({
                googleUID: mockGoogleUser.uid,
                email: mockGoogleUser.email,
                fullName: mockGoogleUser.displayName
            });

            if (response.success) {
                const { user, token, migrated } = response.data;

                // Update auth state
                authState.isAuthenticated = true;
                authState.currentUser = user;
                authState.role = user.role;
                authState.token = token;

                // Save session
                auth._saveSession();

                // Set API token
                api.setToken(token);

                return {
                    success: true,
                    user,
                    migrated,
                    message: migrated ? 'Conta migrada com sucesso!' : 'Login realizado!'
                };
            }

            return response;

        } catch (error) {
            console.error('[Auth] Google sign-in error:', error);
            return { success: false, error: 'Erro ao fazer login com Google' };
        }
    },

    /**
     * Simulate Google Sign-In (for demo)
     * In production, replace with actual Google SDK
     */
    _simulateGoogleSignIn: () => {
        return new Promise((resolve) => {
            // Create mock Google sign-in modal
            const modal = document.createElement('div');
            modal.id = 'mock-google-signin';
            modal.className = 'fixed inset-0 z-50 flex items-center justify-center';
            modal.innerHTML = `
                <div class="modal-backdrop absolute inset-0" onclick="document.getElementById('mock-google-signin').remove()"></div>
                <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 fade-in">
                    <div class="text-center mb-6">
                        <svg class="w-12 h-12 mx-auto" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        <h2 class="text-xl font-bold text-gray-800 mt-4">Escolha uma conta</h2>
                        <p class="text-sm text-gray-500">para continuar no WEM CONSULTANCY</p>
                    </div>
                    <div class="space-y-3">
                        <button onclick="window._resolveGoogleSignIn({ uid: 'google_001', email: 'joao@email.com', displayName: 'João Silva' })" 
                                class="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 text-left">
                            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JS</div>
                            <div>
                                <p class="font-medium text-gray-800">João Silva</p>
                                <p class="text-sm text-gray-500">joao@email.com</p>
                            </div>
                        </button>
                        <button onclick="window._resolveGoogleSignIn({ uid: 'google_002', email: 'maria@email.com', displayName: 'Maria Santos' })" 
                                class="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 text-left">
                            <div class="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">MS</div>
                            <div>
                                <p class="font-medium text-gray-800">Maria Santos</p>
                                <p class="text-sm text-gray-500">maria@email.com</p>
                            </div>
                        </button>
                        <button onclick="window._resolveGoogleSignIn({ uid: 'google_new', email: 'novo@email.com', displayName: 'Novo Usuário' })" 
                                class="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 text-left border-t border-gray-200">
                            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <span class="material-symbols-outlined">add</span>
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">Usar outra conta</p>
                                <p class="text-sm text-gray-500">novo@email.com</p>
                            </div>
                        </button>
                    </div>
                    <button onclick="window._resolveGoogleSignIn(null)" class="w-full mt-6 text-sm text-gray-500 hover:text-gray-700">Cancelar</button>
                </div>
            `;
            document.body.appendChild(modal);

            // Set up resolver
            window._resolveGoogleSignIn = (user) => {
                document.getElementById('mock-google-signin')?.remove();
                resolve(user);
            };
        });
    },

    // ==================== ADMIN AUTH ====================

    /**
     * Admin login with email/password
     */
    adminLogin: async (email, password) => {
        const normalizedEmail = email.toLowerCase().trim();

        // Check approved admin list
        const approvedAdmin = AUTH_CONFIG.approvedAdmins.find(
            a => a.email.toLowerCase() === normalizedEmail && a.password === password
        );

        if (!approvedAdmin) {
            return {
                success: false,
                error: 'Credenciais inválidas ou conta não autorizada'
            };
        }

        // Find or create admin user
        let user = db.users.findByEmail(normalizedEmail);

        if (!user) {
            user = db.users.create({
                email: normalizedEmail,
                fullName: 'Administrador WEM',
                role: 'admin_master'
            });
        }

        // Update auth state
        authState.isAuthenticated = true;
        authState.currentUser = user;
        authState.role = user.role;
        authState.token = 'admin_token_' + user.userId;

        // Update global app state
        appState.isAdminAuthenticated = true;
        appState.viewMode = 'admin';

        mockDatabase.currentUser = user;

        // Save session
        auth._saveSession();

        return {
            success: true,
            user,
            message: 'Bem-vindo, Administrador!'
        };
    },

    // ==================== INVESTOR AUTH ====================

    /**
     * Investor login with email/password (demo)
     */
    investorLogin: async (email, password) => {
        // For demo, accept any email/password
        let user = db.users.findByEmail(email);

        if (!user) {
            // Check for legacy migration
            const legacyUser = db.migration.findLegacyUser(email);

            // Create new user
            user = db.users.create({
                email,
                fullName: email.split('@')[0],
                role: 'investor'
            });

            // Migrate if legacy user found
            if (legacyUser) {
                db.migration.migrateUser(user.userId, legacyUser);
                user.migrated = true;
            }
        }

        // Update auth state
        authState.isAuthenticated = true;
        authState.currentUser = user;
        authState.role = user.role;
        authState.token = 'investor_token_' + user.userId;

        mockDatabase.currentUser = user;

        // Save session
        auth._saveSession();

        return {
            success: true,
            user,
            migrated: user.migrated,
            message: user.migrated ? 'Conta migrada com sucesso!' : 'Bem-vindo ao WEM CONSULTANCY!'
        };
    },

    // ==================== SESSION MANAGEMENT ====================

    /**
     * Save session to localStorage
     */
    _saveSession: () => {
        const session = {
            userId: authState.currentUser?.userId,
            role: authState.role,
            token: authState.token,
            timestamp: Date.now()
        };
        localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
    },

    /**
     * Restore session from localStorage
     */
    restoreSession: async () => {
        try {
            const sessionStr = localStorage.getItem(AUTH_CONFIG.sessionKey);
            if (!sessionStr) return false;

            const session = JSON.parse(sessionStr);

            // Check session expiry (24 hours)
            if (Date.now() - session.timestamp > 24 * 60 * 60 * 1000) {
                auth.logout();
                return false;
            }

            // Restore user
            const user = db.users.findById(session.userId);
            if (!user) return false;

            authState.isAuthenticated = true;
            authState.currentUser = user;
            authState.role = user.role;
            authState.token = session.token;

            mockDatabase.currentUser = user;

            // Update global app state if admin
            if (user.role?.startsWith('admin')) {
                appState.isAdminAuthenticated = true;
            }

            return true;

        } catch (error) {
            console.error('[Auth] Session restore error:', error);
            return false;
        }
    },

    /**
     * Logout
     */
    logout: async () => {
        // Clear auth state
        authState.isAuthenticated = false;
        authState.currentUser = null;
        authState.role = null;
        authState.token = null;

        // Clear database state
        mockDatabase.currentUser = null;

        // Clear app state
        appState.isAdminAuthenticated = false;
        appState.viewMode = 'admin';

        // Clear session
        localStorage.removeItem(AUTH_CONFIG.sessionKey);
        api.clearToken();

        return { success: true };
    },

    // ==================== PERMISSIONS ====================

    /**
     * Check if user can access route
     */
    canAccess: (route) => {
        if (!authState.isAuthenticated) {
            return ['landing', 'login', 'signup'].includes(route);
        }

        if (route.startsWith('admin')) {
            return auth.isAdmin();
        }

        if (route.startsWith('user')) {
            return authState.role === 'investor' || auth.isAdmin();
        }

        return true;
    },

    /**
     * Check if user can perform action
     */
    canPerform: (action) => {
        const permissions = {
            // Investor actions
            'create_investment': () => authState.isAuthenticated,
            'request_withdrawal': () => authState.isAuthenticated,
            'view_history': () => authState.isAuthenticated,

            // Admin actions
            'approve_investment': () => auth.isAdmin(),
            'reject_investment': () => auth.isAdmin(),
            'approve_withdrawal': () => auth.isAdmin(),
            'reject_withdrawal': () => auth.isAdmin(),
            'apply_plr': () => auth.isAdmin(),
            'release_plr': () => auth.isAdmin(),
            'view_all_users': () => auth.isAdmin(),

            // Admin Master actions
            'manage_admins': () => auth.isAdminMaster(),
            'system_settings': () => auth.isAdminMaster()
        };

        return permissions[action] ? permissions[action]() : false;
    }
};

// Export for use in other modules
window.auth = auth;
window.authState = authState;
window.AUTH_CONFIG = AUTH_CONFIG;
