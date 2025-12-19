import { apiService } from './api.js';

/**
 * WEM CONSULTANCY - Global State Management Service
 */
export class StateService {
    constructor() {
        this.state = {
            user: null,
            investments: [],
            transactions: [],
            withdrawals: [],
            stats: {
                totalInvested: 0,
                totalYield: 0,
                pendingInvestments: 0,
                pendingWithdrawals: 0,
                releasedEarnings: 0,
                dailyPLR: 0.21
            },
            viewMode: localStorage.getItem('wem_view_mode') || 'investor',
            systemConfig: {
                referralEnabled: true,
                withdrawalsEnabled: true
            }
        };
        this.listeners = [];
    }

    // Initialize state from existing storage or db
    async init() {
        // Load system config from Supabase
        try {
            const config = await apiService.getSystemConfig();
            if (config) {
                this.state.systemConfig = {
                    referralEnabled: config.referral_enabled,
                    withdrawalsEnabled: config.withdrawals_enabled
                };
            }
        } catch (e) {
            console.error('StateService: Error loading system config:', e);
        }

        // Load global stats
        this.updateStats();
        this.notify();
    }

    async loadUserData(userId) {
        if (!userId) return;

        try {
            // Fetch all user specific data from Supabase via ApiService
            const investments = await apiService.getInvestments();
            this.state.investments = investments || [];

            this.updateStats();
            this.notify();
        } catch (error) {
            console.error('StateService: Error loading user data:', error);
        }
    }

    updateStats() {
        if (!this.state.investments.length) return;

        const active = this.state.investments.filter(i => i.status === 'active');
        this.state.stats.totalInvested = active.reduce((sum, i) => sum + Number(i.amount), 0);
        this.state.stats.totalYield = this.state.stats.totalInvested * 0.12; // Placeholder
    }

    setUser(user) {
        console.log('State: Setting User', user);
        this.state.user = user;
        if (user) {
            this.loadUserData(user.userId);
        } else {
            this.state.investments = [];
            this.state.transactions = [];
            this.state.withdrawals = [];
            this.state.stats = { totalInvested: 0, totalYield: 0, dailyPLR: 0.21 };
        }
        this.notify();
    }

    setViewMode(mode) {
        this.state.viewMode = mode;
        localStorage.setItem('wem_view_mode', mode);
        this.notify();
    }

    setSystemConfig(config) {
        this.state.systemConfig = { ...this.state.systemConfig, ...config };
        this.notify();
    }

    // Observable pattern
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));

        // Update global window for quick access in legacy pages if needed
        window.activeUser = this.state.user;
    }

    getState() {
        return this.state;
    }
}

export const stateService = new StateService();
window.stateService = stateService;
