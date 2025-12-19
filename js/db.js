/**
 * WEM CONSULTANCY - Database Models & Mock Data Layer
 * Prepared for backend integration (Firebase/Supabase/AWS)
 */

// ==================== DATA MODELS ====================

/**
 * User Model
 * @typedef {Object} User
 * @property {string} userId - Unique identifier
 * @property {string} googleUID - Google OAuth UID
 * @property {string} email - User email (unique identifier)
 * @property {string} fullName - Full name
 * @property {'investor'|'admin'|'admin_master'} role - User role
 * @property {boolean} approved - Account approved status
 * @property {boolean} migrated - Was migrated from legacy platform
 * @property {string|null} legacyUserId - Legacy platform user ID
 * @property {Date} createdAt - Account creation date
 */

/**
 * Investment Model
 * @typedef {Object} Investment
 * @property {string} investmentId - Unique identifier
 * @property {string} userId - Owner user ID
 * @property {number} amount - Investment amount
 * @property {'pending'|'active'|'withdrawn'} status - Investment status
 * @property {string|null} proofUrl - Payment proof URL
 * @property {Date} createdAt - Creation date
 * @property {Date|null} approvedAt - Approval date
 * @property {string|null} approvedBy - Admin who approved
 */

/**
 * PLR History Model
 * @typedef {Object} PLRRecord
 * @property {string} id - Unique identifier
 * @property {Date} date - Application date
 * @property {number} percentage - PLR percentage applied
 * @property {string} appliedByAdminId - Admin who applied
 * @property {number} totalDistributed - Total amount distributed
 */

/**
 * Transaction Model
 * @typedef {Object} Transaction
 * @property {string} transactionId - Unique identifier
 * @property {string} userId - Owner user ID
 * @property {'deposit'|'withdraw'|'yield'|'bonus'} type - Transaction type
 * @property {number} amount - Transaction amount
 * @property {Date} date - Transaction date
 * @property {'pending'|'completed'|'rejected'} status - Transaction status
 * @property {string|null} description - Transaction description
 */

/**
 * Admin Action Log Model
 * @typedef {Object} AdminActionLog
 * @property {string} logId - Unique identifier
 * @property {string} adminId - Admin who performed action
 * @property {string} actionType - Type of action
 * @property {string|null} targetUserId - Target user (if applicable)
 * @property {Object|null} metadata - Additional data
 * @property {Date} timestamp - Action timestamp
 */

// ==================== MOCK DATABASE ====================

const mockDatabase = {
    // Current authenticated user
    currentUser: null,

    // Users collection
    users: [
        {
            userId: 'user_001',
            googleUID: null,
            email: 'joao@email.com',
            fullName: 'João Silva',
            role: 'investor',
            approved: true,
            migrated: false,
            legacyUserId: null,
            referralCode: 'JOAO1234',
            referredBy: null,
            phone: '(11) 99999-9999',
            createdAt: new Date('2024-06-15')
        },
        {
            userId: 'user_002',
            googleUID: null,
            email: 'maria@email.com',
            fullName: 'Maria Santos',
            role: 'investor',
            approved: true,
            migrated: true,
            legacyUserId: 'legacy_1234',
            referralCode: 'MARI5678',
            referredBy: 'JOAO1234',
            phone: '(11) 88888-8888',
            createdAt: new Date('2024-04-20')
        },
        {
            userId: 'admin_001',
            googleUID: null,
            email: 'admin@wemconsultancy.com',
            fullName: 'Administrador WEM',
            role: 'admin_master',
            approved: true,
            migrated: false,
            legacyUserId: null,
            referralCode: 'WEMADMIN',
            referredBy: null,
            createdAt: new Date('2024-01-01')
        }
    ],

    // Investments collection
    investments: [
        { investmentId: 'inv_001', userId: 'user_001', amount: 10000, status: 'active', proofUrl: null, createdAt: new Date('2024-06-20'), approvedAt: new Date('2024-06-21'), approvedBy: 'admin_001' },
        { investmentId: 'inv_002', userId: 'user_001', amount: 5000, status: 'active', proofUrl: null, createdAt: new Date('2024-10-15'), approvedAt: new Date('2024-10-16'), approvedBy: 'admin_001' },
        { investmentId: 'inv_003', userId: 'user_002', amount: 8000, status: 'active', proofUrl: null, createdAt: new Date('2024-05-01'), approvedAt: new Date('2024-05-02'), approvedBy: 'admin_001' },
        { investmentId: 'inv_004', userId: 'user_003', amount: 5000, status: 'pending', proofUrl: '/proofs/inv_004.jpg', createdAt: new Date('2024-12-17'), approvedAt: null, approvedBy: null },
        { investmentId: 'inv_005', userId: 'user_004', amount: 2500, status: 'pending', proofUrl: '/proofs/inv_005.jpg', createdAt: new Date('2024-12-17'), approvedAt: null, approvedBy: null },
        { investmentId: 'inv_006', userId: 'user_005', amount: 1000, status: 'pending', proofUrl: '/proofs/inv_006.jpg', createdAt: new Date('2024-12-17'), approvedAt: null, approvedBy: null }
    ],

    // PLR History
    plrHistory: [
        { id: 'plr_001', date: new Date('2024-12-18'), percentage: 0.21, appliedByAdminId: 'admin_001', totalDistributed: 1779.75 },
        { id: 'plr_002', date: new Date('2024-12-17'), percentage: 0.19, appliedByAdminId: 'admin_001', totalDistributed: 1609.25 },
        { id: 'plr_003', date: new Date('2024-12-16'), percentage: 0.22, appliedByAdminId: 'admin_001', totalDistributed: 1863.50 },
        { id: 'plr_004', date: new Date('2024-12-15'), percentage: 0.20, appliedByAdminId: 'admin_001', totalDistributed: 1694.00 },
        { id: 'plr_005', date: new Date('2024-12-14'), percentage: 0.18, appliedByAdminId: 'admin_001', totalDistributed: 1524.60 }
    ],

    // Transactions
    transactions: [
        { transactionId: 'tx_001', userId: 'user_001', type: 'deposit', amount: 10000, date: new Date('2024-06-21'), status: 'completed', description: 'Investimento inicial' },
        { transactionId: 'tx_002', userId: 'user_001', type: 'deposit', amount: 5000, date: new Date('2024-10-16'), status: 'completed', description: 'Nova aplicação' },
        { transactionId: 'tx_003', userId: 'user_001', type: 'yield', amount: 32.45, date: new Date('2024-12-18'), status: 'completed', description: 'PLR Diário 0.21%' },
        { transactionId: 'tx_004', userId: 'user_001', type: 'yield', amount: 31.20, date: new Date('2024-12-17'), status: 'completed', description: 'PLR Diário 0.19%' },
        { transactionId: 'tx_005', userId: 'user_001', type: 'withdraw', amount: 500, date: new Date('2024-12-15'), status: 'completed', description: 'Saque de rendimentos - PIX' },
        { transactionId: 'tx_006', userId: 'user_001', type: 'bonus', amount: 150, date: new Date('2024-12-08'), status: 'completed', description: 'Bônus de indicação - Maria Santos' },
        { transactionId: 'tx_007', userId: 'user_001', type: 'bonus', amount: 250, date: new Date('2024-11-20'), status: 'completed', description: 'Bônus de indicação - Pedro Oliveira' }
    ],

    // Pending withdrawals
    withdrawals: [
        { id: 'wd_001', userId: 'user_001', amount: 1500, pixKey: '11999999999', type: 'yield', status: 'pending', requestedAt: new Date('2024-12-18') },
        { id: 'wd_002', userId: 'user_002', amount: 2000, pixKey: 'pedro@email.com', type: 'principal', status: 'pending', requestedAt: new Date('2024-12-17') }
    ],

    // Admin action logs
    adminLogs: [],

    // Legacy users for migration
    legacyUsers: [
        { email: 'legacy1@email.com', fullName: 'Carlos Souza', investmentAmount: 3000, balance: 3450, status: 'active' },
        { email: 'legacy2@email.com', fullName: 'Ana Lima', investmentAmount: 7500, balance: 8200, status: 'active' },
        { email: 'joao@email.com', fullName: 'João Silva', investmentAmount: 15000, balance: 16850.50, status: 'active' }
    ],

    // Global system configuration
    systemSettings: {
        referralEnabled: true,
        updatedByAdmin: 'admin_001',
        updatedAt: new Date()
    }
};

// ==================== DATABASE OPERATIONS ====================

const db = {
    // Generate unique ID
    generateId: (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

    // ---- USER OPERATIONS ----
    users: {
        findByEmail: (email) => mockDatabase.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
        findById: (userId) => mockDatabase.users.find(u => u.userId === userId),
        findByGoogleUID: (googleUID) => mockDatabase.users.find(u => u.googleUID === googleUID),

        create: (userData) => {
            const referralCode = (userData.fullName.substring(0, 4).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()).replace(/\s/g, 'X');
            const user = {
                userId: db.generateId('user'),
                googleUID: userData.googleUID || null,
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role || 'investor',
                approved: userData.role === 'investor',
                migrated: false,
                legacyUserId: null,
                referralCode: referralCode,
                referredBy: userData.referredBy || null,
                phone: userData.phone || '',
                createdAt: new Date()
            };
            mockDatabase.users.push(user);
            return user;
        },

        update: (userId, updates) => {
            const idx = mockDatabase.users.findIndex(u => u.userId === userId);
            if (idx !== -1) {
                mockDatabase.users[idx] = { ...mockDatabase.users[idx], ...updates };
                return mockDatabase.users[idx];
            }
            return null;
        },

        findByReferralCode: (code) => mockDatabase.users.find(u => u.referralCode === code),
        getReferrals: (referralCode) => mockDatabase.users.filter(u => u.referredBy === referralCode),

        getAll: () => mockDatabase.users.filter(u => u.role === 'investor'),
        getAdmins: () => mockDatabase.users.filter(u => u.role.startsWith('admin'))
    },

    // ---- INVESTMENT OPERATIONS ----
    investments: {
        findByUserId: (userId) => mockDatabase.investments.filter(i => i.userId === userId),
        findPending: () => mockDatabase.investments.filter(i => i.status === 'pending'),
        findActive: () => mockDatabase.investments.filter(i => i.status === 'active'),

        create: (data) => {
            const investment = {
                investmentId: db.generateId('inv'),
                userId: data.userId,
                amount: data.amount,
                status: 'pending',
                proofUrl: data.proofUrl || null,
                createdAt: new Date(),
                approvedAt: null,
                approvedBy: null
            };
            mockDatabase.investments.push(investment);
            return investment;
        },

        approve: (investmentId, adminId) => {
            const idx = mockDatabase.investments.findIndex(i => i.investmentId === investmentId);
            if (idx !== -1) {
                mockDatabase.investments[idx].status = 'active';
                mockDatabase.investments[idx].approvedAt = new Date();
                mockDatabase.investments[idx].approvedBy = adminId;
                return mockDatabase.investments[idx];
            }
            return null;
        },

        reject: (investmentId) => {
            const idx = mockDatabase.investments.findIndex(i => i.investmentId === investmentId);
            if (idx !== -1) {
                mockDatabase.investments.splice(idx, 1);
                return true;
            }
            return false;
        },

        getTotalActive: () => mockDatabase.investments.filter(i => i.status === 'active').reduce((sum, i) => sum + i.amount, 0)
    },

    // ---- PLR OPERATIONS ----
    plr: {
        getHistory: () => mockDatabase.plrHistory,
        getLatest: () => mockDatabase.plrHistory[0] || null,

        apply: (percentage, adminId) => {
            const totalActive = db.investments.getTotalActive();
            const totalDistributed = totalActive * (percentage / 100);

            const record = {
                id: db.generateId('plr'),
                date: new Date(),
                percentage,
                appliedByAdminId: adminId,
                totalDistributed
            };
            mockDatabase.plrHistory.unshift(record);
            return record;
        }
    },

    // ---- TRANSACTION OPERATIONS ----
    transactions: {
        findByUserId: (userId) => mockDatabase.transactions.filter(t => t.userId === userId),

        create: (data) => {
            const tx = {
                transactionId: db.generateId('tx'),
                userId: data.userId,
                type: data.type,
                amount: data.amount,
                date: new Date(),
                status: data.status || 'pending',
                description: data.description || null
            };
            mockDatabase.transactions.push(tx);
            return tx;
        },

        getRecent: (userId, limit = 10) => {
            return mockDatabase.transactions
                .filter(t => t.userId === userId)
                .sort((a, b) => b.date - a.date)
                .slice(0, limit);
        }
    },

    // ---- WITHDRAWAL OPERATIONS ----
    withdrawals: {
        findPending: () => mockDatabase.withdrawals.filter(w => w.status === 'pending'),
        findByUserId: (userId) => mockDatabase.withdrawals.filter(w => w.userId === userId),

        create: (data) => {
            const wd = {
                id: db.generateId('wd'),
                userId: data.userId,
                amount: data.amount,
                pixKey: data.pixKey,
                type: data.type,
                status: 'pending',
                requestedAt: new Date()
            };
            mockDatabase.withdrawals.push(wd);
            return wd;
        },

        approve: (withdrawalId, adminId) => {
            const idx = mockDatabase.withdrawals.findIndex(w => w.id === withdrawalId);
            if (idx !== -1) {
                mockDatabase.withdrawals[idx].status = 'completed';
                return mockDatabase.withdrawals[idx];
            }
            return null;
        },

        reject: (withdrawalId) => {
            const idx = mockDatabase.withdrawals.findIndex(w => w.id === withdrawalId);
            if (idx !== -1) {
                mockDatabase.withdrawals[idx].status = 'rejected';
                return mockDatabase.withdrawals[idx];
            }
            return null;
        }
    },

    // ---- ADMIN LOG OPERATIONS ----
    adminLogs: {
        log: (adminId, actionType, targetUserId = null, metadata = null) => {
            const entry = {
                logId: db.generateId('log'),
                adminId,
                actionType,
                targetUserId,
                metadata,
                timestamp: new Date()
            };
            mockDatabase.adminLogs.push(entry);
            return entry;
        },

        getRecent: (limit = 50) => mockDatabase.adminLogs.slice(-limit).reverse()
    },

    // ---- MIGRATION OPERATIONS ----
    migration: {
        findLegacyUser: (email) => mockDatabase.legacyUsers.find(u => u.email.toLowerCase() === email.toLowerCase()),

        migrateUser: (userId, legacyData) => {
            const user = db.users.findById(userId);
            if (user && legacyData) {
                // Create investment from legacy data
                db.investments.create({
                    userId,
                    amount: legacyData.investmentAmount,
                    status: 'active'
                });

                // Update user as migrated
                db.users.update(userId, {
                    migrated: true,
                    legacyUserId: legacyData.email
                });

                return true;
            }
            return false;
        }
    },

    // ---- SYSTEM OPERATIONS ----
    system: {
        getConfig: () => ({ ...mockDatabase.systemSettings }),
        updateConfig: (updates, adminId) => {
            mockDatabase.systemSettings = {
                ...mockDatabase.systemSettings,
                ...updates,
                updatedByAdmin: adminId,
                updatedAt: new Date()
            };
            return mockDatabase.systemSettings;
        }
    }
};

// Export for use in other modules
window.db = db;
window.mockDatabase = mockDatabase;
