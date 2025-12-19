/**
 * WEM CONSULTANCY - Static User Settings Page
 */

function renderUserSettings() {
    const user = stateService.getState().user;
    if (!user) return;

    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    document.getElementById('app').innerHTML = `
        <div class="flex h-screen w-full overflow-hidden">
            ${userSidebar('settings')}
            <div class="flex flex-1 flex-col h-full overflow-hidden">
                ${userHeader()}
                <main class="flex-1 overflow-y-auto bg-background-dark p-4 md:p-6 lg:p-8">
                    <div class="mx-auto max-w-3xl space-y-8 fade-in">
                        <div><h2 class="text-2xl md:text-3xl font-bold">Configurações</h2><p class="text-text-secondary">Gerencie seu perfil e preferências.</p></div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                            <h3 class="text-lg font-bold mb-6">Perfil</h3>
                            <div class="flex flex-col md:flex-row gap-6 items-start">
                                <div class="flex flex-col items-center">
                                    <div class="relative group">
                                        <div class="w-24 h-24 rounded-full border-4 border-border-dark bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-2xl font-bold text-white">${initials}</div>
                                        <label class="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"><span class="material-symbols-outlined text-white">camera_alt</span><input type="file" class="hidden" /></label>
                                    </div>
                                    <p class="text-xs text-text-secondary mt-2">Clique para alterar</p>
                                </div>
                                <form class="flex-1 space-y-4" id="profile-form">
                                    <div><label class="text-sm font-medium">Nome Completo</label><input type="text" id="settings-name" value="${user.fullName}" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" /></div>
                                    <div><label class="text-sm font-medium">E-mail</label><input type="email" value="${user.email}" disabled class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight/50 border border-border-dark text-text-secondary cursor-not-allowed" /><p class="text-xs text-text-secondary mt-1">O e-mail não pode ser alterado</p></div>
                                    <div><label class="text-sm font-medium">Telefone</label><input type="tel" id="settings-phone" value="${user.phone || ''}" placeholder="(11) 99999-9999" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" /></div>
                                    <button type="button" onclick="handleProfileUpdate()" id="save-profile-btn" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover">
                                        <span class="material-symbols-outlined">save</span>Salvar Alterações
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6">
                            <div class="flex items-center justify-between">
                                <div><h3 class="text-lg font-bold mb-2">Seu Código de Indicação</h3><p class="text-3xl font-bold gold-shimmer">${user.referralCode}</p><p class="text-sm text-text-secondary mt-2">Use para indicar amigos</p></div>
                                <button onclick="copyToClipboard('${user.referralCode}')" class="p-4 rounded-xl bg-gold/20 text-gold hover:bg-gold hover:text-black"><span class="material-symbols-outlined text-2xl">content_copy</span></button>
                            </div>
                        </div>
                        
                        <div class="rounded-xl border border-surface-highlight bg-surface-dark p-6">
                            <h3 class="text-lg font-bold mb-6">Segurança</h3>
                            <form class="space-y-4 max-w-md" id="password-form">
                                <div><label class="text-sm font-medium">Senha Atual</label><input type="password" id="current-pwd" placeholder="••••••••" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" /></div>
                                <div><label class="text-sm font-medium">Nova Senha</label><input type="password" id="new-pwd" placeholder="••••••••" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" /></div>
                                <div><label class="text-sm font-medium">Confirmar Nova Senha</label><input type="password" id="confirm-pwd" placeholder="••••••••" class="w-full h-12 mt-2 px-4 rounded-lg bg-surface-highlight border border-border-dark text-white" /></div>
                                <button type="button" onclick="handlePasswordChange()" id="change-pwd-btn" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-highlight text-white font-bold hover:bg-border-dark">
                                    <span class="material-symbols-outlined">key</span>Alterar Senha
                                </button>
                            </form>
                        </div>
                        
                        <div class="rounded-xl bg-success/10 border border-success/30 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center"><span class="material-symbols-outlined text-success text-2xl">support_agent</span></div>
                                <div class="flex-1"><h3 class="font-bold">Suporte</h3><p class="text-sm text-text-secondary">Precisa de ajuda?</p></div>
                                <button onclick="openWhatsAppSupport()" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white font-bold hover:bg-green-600">WhatsApp</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
}

async function handleProfileUpdate() {
    const name = document.getElementById('settings-name').value;
    const phone = document.getElementById('settings-phone').value;
    const btn = document.getElementById('save-profile-btn');

    if (!name) {
        showToast('O nome é obrigatório!', 'warning');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Salvando...';

        // Use apiService to update profile (mocked)
        await apiService.updateProfile({ fullName: name, phone: phone });

        // Refresh state
        await stateService.loadUserData();
        showToast('Perfil atualizado com sucesso!', 'success');
        renderUserSettings();
    } catch (error) {
        showToast('Erro ao atualizar perfil: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">save</span>Salvar Alterações';
    }
}

async function handlePasswordChange() {
    const currentPwd = document.getElementById('current-pwd').value;
    const newPwd = document.getElementById('new-pwd').value;
    const confirmPwd = document.getElementById('confirm-pwd').value;
    const btn = document.getElementById('change-pwd-btn');

    if (!currentPwd || !newPwd || !confirmPwd) {
        showToast('Preencha todos os campos!', 'warning');
        return;
    }

    if (newPwd !== confirmPwd) {
        showToast('As senhas não coincidem!', 'error');
        return;
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Alterando...';

        await apiService.changePassword(currentPwd, newPwd);

        showToast('Senha alterada com sucesso!', 'success');
        document.getElementById('password-form').reset();
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">key</span>Alterar Senha';
    }
}

