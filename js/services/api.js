import { supabase } from './supabase-client.js';

export class ApiService {
    constructor() { }

    getBaseUrl() {
        if (typeof window !== 'undefined') {
            const isLocal = window.location.hostname === 'localhost';
            return isLocal ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_BASE_URL || window.location.origin);
        }
        return process.env.NEXT_PUBLIC_BASE_URL || '';
    }

    // ---- USER API ----
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

    // ---- INVESTMENT API ----
    async getInvestments() {
        const { data, error } = await supabase
            .from('investments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async createInvestment(amount, proofFile) {
        console.log('API: Supabase INSERT /investments', { amount });

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Não autenticado');

        // Note: For a real app, proofFile would be uploaded to Supabase Storage first.
        const proofUrl = proofFile ? URL.createObjectURL(proofFile) : null;

        const { data, error } = await supabase
            .from('investments')
            .insert({
                user_id: user.id,
                amount: parseFloat(amount),
                proof_url: proofUrl,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // ---- WITHDRAWAL API ----
    async requestWithdrawal(data) {
        console.log('API: Supabase INSERT /withdrawals', data);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Não autenticado');

        const { data: result, error } = await supabase
            .from('withdrawals')
            .insert({
                user_id: user.id,
                amount: parseFloat(data.amount),
                pix_key: data.pixKey,
                type: data.type,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;
        return result;
    }

    // ---- PLR API ----
    async getPLRHistory() {
        const { data, error } = await supabase
            .from('plr_history')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;
        return data;
    }

    // ---- ADMIN API ----
    async adminApplyPLR(percentage) {
        console.log('API: Supabase Trigger /apply-plr', { percentage });

        const { data: { user: admin } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('plr_history')
            .insert({
                percentage,
                applied_by_admin_id: admin.id
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async adminApproveWithdrawal(id) {
        console.log('API: Supabase UPDATE /withdrawals', { id });

        const { data, error } = await supabase
            .from('withdrawals')
            .update({ status: 'completed' })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async adminApproveInvestment(id) {
        console.log('API: Supabase UPDATE /investments', { id });

        const { data: { user: admin } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('investments')
            .update({
                status: 'active',
                approved_at: new Date().toISOString(),
                approved_by: admin.id
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // ---- SYSTEM CONFIG API ----
    async getSystemConfig() {
        const { data, error } = await supabase
            .from('system_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) throw error;
        return data;
    }

    async adminUpdateSystemConfig(updates) {
        console.log('API: Supabase UPDATE /system_settings', updates);

        const { data, error } = await supabase
            .from('system_settings')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}

export const apiService = new ApiService();
window.apiService = apiService;
