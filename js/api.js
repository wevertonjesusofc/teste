/**
 * WEM CONSULTANCY - API Service Layer
 * Prepared for backend integration (REST API / Firebase / AWS)
 */

// ==================== API CONFIGURATION ====================

const API_CONFIG = {
    baseUrl: 'https://api.wemconsultancy.com/v1', // Replace with actual API URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// ==================== API SERVICE ====================

const api = {
    // Token storage
    _token: null,

    // Set auth token
    setToken: (token) => {
        api._token = token;
        localStorage.setItem('wem_auth_token', token);
    },

    // Get auth token
    getToken: () => {
        if (!api._token) {
            api._token = localStorage.getItem('wem_auth_token');
        }
        return api._token;
    },

    // Clear auth token
    clearToken: () => {
        api._token = null;
        localStorage.removeItem('wem_auth_token');
    },

    // Generic request handler (mock implementation)
    _request: async (method, endpoint, data = null) => {
        console.log(`[API] ${method} ${endpoint}`, data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock response based on endpoint
        return api._mockResponse(method, endpoint, data);
    },

    // Mock response generator
    _mockResponse: (method, endpoint, data) => {
        // Route to appropriate mock handler
        const routes = {
            'POST /auth/google': () => api._mocks.authGoogle(data),
            'POST /auth/logout': () => api._mocks.logout(),
            'GET /users/me': () => api._mocks.getMe(),
            'PUT /users/me': () => api._mocks.updateMe(data),
            'GET /investments': () => api._mocks.getInvestments(),
            'POST /investments/new': () => api._mocks.createInvestment(data),
            'GET /transactions': () => api._mocks.getTransactions(),
            'POST /withdraw/request': () => api._mocks.requestWithdraw(data),
            'GET /admin/users': () => api._mocks.adminGetUsers(),
            'GET /admin/investments/pending': () => api._mocks.adminGetPendingInvestments(),
            'POST /admin/investments/approve': () => api._mocks.adminApproveInvestment(data),
            'POST /admin/investments/reject': () => api._mocks.adminRejectInvestment(data),
            'GET /admin/withdrawals/pending': () => api._mocks.adminGetPendingWithdrawals(),
            'POST /admin/withdrawals/approve': () => api._mocks.adminApproveWithdrawal(data),
            'POST /admin/withdrawals/reject': () => api._mocks.adminRejectWithdrawal(data),
            'POST /admin/plr/apply': () => api._mocks.adminApplyPLR(data),
            'POST /admin/plr/release': () => api._mocks.adminReleasePLR(),
            'GET /admin/stats': () => api._mocks.adminGetStats()
        };

        const routeKey = `${method} ${endpoint}`;
        if (routes[routeKey]) {
            return routes[routeKey]();
        }

        return { success: false, error: 'Endpoint not found' };
    },

    // ==================== MOCK HANDLERS ====================
    _mocks: {
        // Auth: Google Login
        authGoogle: (data) => {
            const { googleUID, email, fullName } = data;

            // Check if user exists
            let user = db.users.findByEmail(email);

            if (user) {
                // Update Google UID if not set
                if (!user.googleUID) {
                    db.users.update(user.userId, { googleUID });
                }
            } else {
                // Check for legacy migration
                const legacyUser = db.migration.findLegacyUser(email);

                // Create new user
                user = db.users.create({ googleUID, email, fullName });

                // Migrate if legacy user found
                if (legacyUser) {
                    db.migration.migrateUser(user.userId, legacyUser);
                    user.migrated = true;
                }
            }

            mockDatabase.currentUser = user;

            return {
                success: true,
                data: {
                    user,
                    token: 'mock_jwt_token_' + user.userId,
                    migrated: user.migrated
                }
            };
        },

        // Auth: Logout
        logout: () => {
            mockDatabase.currentUser = null;
            return { success: true };
        },

        // Users: Get current user
        getMe: () => {
            const user = mockDatabase.currentUser;
            if (!user) {
                return { success: false, error: 'Not authenticated' };
            }

            const investments = db.investments.findByUserId(user.userId);
            const totalInvested = investments.filter(i => i.status === 'active').reduce((sum, i) => sum + i.amount, 0);
            const transactions = db.transactions.findByUserId(user.userId);
            const totalYield = transactions.filter(t => t.type === 'yield').reduce((sum, t) => sum + t.amount, 0);
            const totalWithdrawn = transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + t.amount, 0);
            const totalBonus = transactions.filter(t => t.type === 'bonus').reduce((sum, t) => sum + t.amount, 0);

            return {
                success: true,
                data: {
                    ...user,
                    balance: {
                        principal: totalInvested,
                        yield: totalYield,
                        bonus: totalBonus,
                        withdrawn: totalWithdrawn,
                        available: totalInvested + totalYield + totalBonus - totalWithdrawn
                    }
                }
            };
        },

        // Users: Update profile
        updateMe: (data) => {
            const user = mockDatabase.currentUser;
            if (!user) return { success: false, error: 'Not authenticated' };

            const updated = db.users.update(user.userId, data);
            mockDatabase.currentUser = updated;

            return { success: true, data: updated };
        },

        // Investments: Get user investments
        getInvestments: () => {
            const user = mockDatabase.currentUser;
            if (!user) return { success: false, error: 'Not authenticated' };

            return {
                success: true,
                data: db.investments.findByUserId(user.userId)
            };
        },

        // Investments: Create new
        createInvestment: (data) => {
            const user = mockDatabase.currentUser;
            if (!user) return { success: false, error: 'Not authenticated' };

            const investment = db.investments.create({
                userId: user.userId,
                amount: data.amount,
                proofUrl: data.proofUrl
            });

            return { success: true, data: investment };
        },

        // Transactions: Get history
        getTransactions: () => {
            const user = mockDatabase.currentUser;
            if (!user) return { success: false, error: 'Not authenticated' };

            return {
                success: true,
                data: db.transactions.getRecent(user.userId, 50)
            };
        },

        // Withdraw: Request
        requestWithdraw: (data) => {
            const user = mockDatabase.currentUser;
            if (!user) return { success: false, error: 'Not authenticated' };

            const withdrawal = db.withdrawals.create({
                userId: user.userId,
                amount: data.amount,
                pixKey: data.pixKey,
                type: data.type
            });

            return { success: true, data: withdrawal };
        },

        // Admin: Get all users
        adminGetUsers: () => {
            return { success: true, data: db.users.getAll() };
        },

        // Admin: Get pending investments
        adminGetPendingInvestments: () => {
            const pending = db.investments.findPending();
            const enriched = pending.map(inv => ({
                ...inv,
                user: db.users.findById(inv.userId)
            }));
            return { success: true, data: enriched };
        },

        // Admin: Approve investment
        adminApproveInvestment: (data) => {
            const admin = mockDatabase.currentUser;
            const investment = db.investments.approve(data.investmentId, admin?.userId);

            if (investment) {
                // Create transaction
                db.transactions.create({
                    userId: investment.userId,
                    type: 'deposit',
                    amount: investment.amount,
                    status: 'completed',
                    description: 'Investimento aprovado'
                });

                // Log action
                db.adminLogs.log(admin?.userId, 'APPROVE_INVESTMENT', investment.userId, { investmentId: data.investmentId });
            }

            return { success: !!investment, data: investment };
        },

        // Admin: Reject investment
        adminRejectInvestment: (data) => {
            const admin = mockDatabase.currentUser;
            const result = db.investments.reject(data.investmentId);

            if (result) {
                db.adminLogs.log(admin?.userId, 'REJECT_INVESTMENT', null, { investmentId: data.investmentId });
            }

            return { success: result };
        },

        // Admin: Get pending withdrawals
        adminGetPendingWithdrawals: () => {
            const pending = db.withdrawals.findPending();
            const enriched = pending.map(wd => ({
                ...wd,
                user: db.users.findById(wd.userId)
            }));
            return { success: true, data: enriched };
        },

        // Admin: Approve withdrawal
        adminApproveWithdrawal: (data) => {
            const admin = mockDatabase.currentUser;
            const withdrawal = db.withdrawals.approve(data.withdrawalId, admin?.userId);

            if (withdrawal) {
                db.transactions.create({
                    userId: withdrawal.userId,
                    type: 'withdraw',
                    amount: withdrawal.amount,
                    status: 'completed',
                    description: `Saque ${withdrawal.type} - PIX`
                });

                db.adminLogs.log(admin?.userId, 'APPROVE_WITHDRAWAL', withdrawal.userId, { withdrawalId: data.withdrawalId });
            }

            return { success: !!withdrawal, data: withdrawal };
        },

        // Admin: Reject withdrawal
        adminRejectWithdrawal: (data) => {
            const admin = mockDatabase.currentUser;
            const withdrawal = db.withdrawals.reject(data.withdrawalId);

            if (withdrawal) {
                db.adminLogs.log(admin?.userId, 'REJECT_WITHDRAWAL', withdrawal.userId, { withdrawalId: data.withdrawalId });
            }

            return { success: !!withdrawal };
        },

        // Admin: Apply PLR
        adminApplyPLR: (data) => {
            const admin = mockDatabase.currentUser;
            const record = db.plr.apply(data.percentage, admin?.userId);

            db.adminLogs.log(admin?.userId, 'APPLY_PLR', null, { percentage: data.percentage });

            return { success: true, data: record };
        },

        // Admin: Release PLR (create yield transactions)
        adminReleasePLR: () => {
            const admin = mockDatabase.currentUser;
            const latestPLR = db.plr.getLatest();

            if (!latestPLR) return { success: false, error: 'No PLR to release' };

            // Create yield transactions for all active investors
            const activeInvestments = db.investments.findActive();
            const userTotals = {};

            activeInvestments.forEach(inv => {
                userTotals[inv.userId] = (userTotals[inv.userId] || 0) + inv.amount;
            });

            Object.entries(userTotals).forEach(([userId, total]) => {
                const yieldAmount = total * (latestPLR.percentage / 100);
                db.transactions.create({
                    userId,
                    type: 'yield',
                    amount: yieldAmount,
                    status: 'completed',
                    description: `PLR Diário ${latestPLR.percentage.toFixed(2)}%`
                });
            });

            db.adminLogs.log(admin?.userId, 'RELEASE_PLR', null, { plrId: latestPLR.id });

            return { success: true, data: { distributed: latestPLR.totalDistributed } };
        },

        // Admin: Get platform stats
        adminGetStats: () => {
            const totalInvested = db.investments.getTotalActive();
            const pendingInvestments = db.investments.findPending().length;
            const pendingWithdrawals = db.withdrawals.findPending().length;
            const latestPLR = db.plr.getLatest();
            const totalReleased = mockDatabase.plrHistory.reduce((sum, p) => sum + p.totalDistributed, 0);

            return {
                success: true,
                data: {
                    totalInvested,
                    dailyPLR: latestPLR?.percentage || 0,
                    pendingInvestments,
                    pendingWithdrawals,
                    releasedEarnings: totalReleased,
                    totalUsers: db.users.getAll().length
                }
            };
        }
    },

    // ==================== PUBLIC API METHODS ====================

    // Authentication
    auth: {
        loginWithGoogle: (googleData) => api._request('POST', '/auth/google', googleData),
        logout: () => api._request('POST', '/auth/logout')
    },

    // User
    user: {
        getProfile: () => api._request('GET', '/users/me'),
        updateProfile: (data) => api._request('PUT', '/users/me', data)
    },

    // Investments
    investments: {
        getAll: () => api._request('GET', '/investments'),
        create: (data) => api._request('POST', '/investments/new', data)
    },

    // Transactions
    transactions: {
        getHistory: () => api._request('GET', '/transactions')
    },

    // Withdrawals
    withdraw: {
        request: (data) => api._request('POST', '/withdraw/request', data)
    },

    // Admin
    admin: {
        getStats: () => api._request('GET', '/admin/stats'),
        getUsers: () => api._request('GET', '/admin/users'),
        getPendingInvestments: () => api._request('GET', '/admin/investments/pending'),
        approveInvestment: (investmentId) => api._request('POST', '/admin/investments/approve', { investmentId }),
        rejectInvestment: (investmentId) => api._request('POST', '/admin/investments/reject', { investmentId }),
        getPendingWithdrawals: () => api._request('GET', '/admin/withdrawals/pending'),
        approveWithdrawal: (withdrawalId) => api._request('POST', '/admin/withdrawals/approve', { withdrawalId }),
        rejectWithdrawal: (withdrawalId) => api._request('POST', '/admin/withdrawals/reject', { withdrawalId }),
        applyPLR: (percentage) => api._request('POST', '/admin/plr/apply', { percentage }),
        releasePLR: () => api._request('POST', '/admin/plr/release')
    }
};

// Export for use in other modules
window.api = api;
window.API_CONFIG = API_CONFIG;
