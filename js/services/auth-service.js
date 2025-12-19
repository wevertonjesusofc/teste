import { supabase } from './supabase-client.js';
import { apiService } from './api.js';

export class AuthService {
    constructor() { }

    async init() {
        console.log('AuthService: Initializing Supabase Auth...');

        // Listen for auth changes
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (session?.user) {
                    await this.syncUserProfile(session.user);
                }
            } else if (event === 'SIGNED_OUT') {
                if (window.stateService) {
                    window.stateService.setUser(null);
                    window.stateService.setViewMode('investor');
                }
            }
        });

        // Initial session check
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await this.syncUserProfile(session.user);
        }
    }

    async syncUserProfile(supabaseUser) {
        try {
            // Fetch profile data (role, full_name, etc.)
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', supabaseUser.id)
                .single();

            if (error) throw error;

            if (profile) {
                const user = {
                    userId: profile.id,
                    email: profile.email,
                    fullName: profile.full_name,
                    role: profile.role,
                    migrated: profile.migrated
                };

                if (window.stateService) {
                    window.stateService.setUser(user);
                    // If it's the master admin, ensure admin mode
                    if (user.email === 'wevertonjesusofc@gmail.com') {
                        window.stateService.setViewMode('admin');
                    }
                }
            }
        } catch (error) {
            console.error('AuthService: Error syncing profile:', error.message);
            if (window.showToast) window.showToast('Erro ao sincronizar perfil: ' + error.message, 'error');
        }
    }

    async loginWithGoogle() {
        console.log('AuthService: loginWithGoogle triggered via Supabase');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: apiService.getBaseUrl()
            }
        });

        if (error) throw error;
    }

    async loginWithEmail(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data.user;
    }

    async adminLogin(email, password) {
        const user = await this.loginWithEmail(email, password);

        // Fetch profile to check role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile && profile.role.includes('admin')) {
            if (window.stateService) window.stateService.setViewMode('admin');
            return user;
        }

        await this.logout();
        throw new Error('Acesso restrito: Esta conta não tem privilégios administrativos.');
    }

    async signup(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) throw error;
        return data.user;
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error.message);

        if (window.stateService) {
            window.stateService.setUser(null);
            window.stateService.setViewMode('investor');
        }
        if (window.navigate) window.navigate('landing');
    }

    isAuthenticated() {
        return !!window.stateService?.getState().user;
    }

    isAdmin() {
        const user = window.stateService?.getState().user;
        return user && user.role.includes('admin');
    }
}

export const authService = new AuthService();
window.authService = authService;
