/**
 * WEM CONSULTANCY - Migration Service
 */

class MigrationService {
    constructor() { }

    async checkAndMigrate(user) {
        if (user.migrated) return false;

        const legacyData = window.db.migration.findLegacyUser(user.email);
        if (legacyData) {
            const success = window.db.migration.migrateUser(user.userId, legacyData);
            if (success) {
                console.log('MigrationService: Automatic migration successful for', user.email);
                return true;
            }
        }
        return false;
    }

    // Manual migration trigger if needed
    async manualMigrate(email) {
        // Implementation for manual migration flow if email differs
    }
}

window.migrationService = new MigrationService();
