/**
 * WEM CONSULTANCY - Reusable UI Components
 */

const Components = {
    // Logo Component
    logo(size = 'md') {
        const sizes = {
            sm: 'w-8 h-8 text-lg',
            md: 'w-10 h-10 text-xl',
            lg: 'w-14 h-14 text-2xl'
        };
        return `
            <div class="flex items-center gap-3">
                <div class="${sizes[size]} bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                    W
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-white tracking-tight">WEM CONSULTANCY</span>
                    <span class="text-xs text-text-secondary">Investment Consulting System</span>
                </div>
            </div>
        `;
    },

    // Button Component
    button(text, options = {}) {
        const {
            type = 'primary',
            size = 'md',
            icon = '',
            iconRight = '',
            onClick = '',
            disabled = false,
            fullWidth = false,
            id = ''
        } = options;

        const types = {
            primary: 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30',
            secondary: 'bg-surface-highlight hover:bg-border-dark text-white',
            outline: 'border border-border-dark hover:border-primary text-white hover:text-primary bg-transparent',
            ghost: 'text-text-secondary hover:text-white hover:bg-surface-highlight',
            danger: 'bg-danger hover:bg-red-600 text-white',
            success: 'bg-success hover:bg-green-600 text-white'
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2.5 text-sm',
            lg: 'px-6 py-3 text-base',
            xl: 'px-8 py-4 text-lg'
        };

        return `
            <button 
                ${id ? `id="${id}"` : ''}
                class="${types[type]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} 
                       rounded-lg font-bold flex items-center justify-center gap-2 
                       transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                ${onClick ? `onclick="${onClick}"` : ''}
                ${disabled ? 'disabled' : ''}
            >
                ${icon ? `<span class="material-symbols-outlined text-lg">${icon}</span>` : ''}
                <span>${text}</span>
                ${iconRight ? `<span class="material-symbols-outlined text-lg">${iconRight}</span>` : ''}
            </button>
        `;
    },

    // Input Component
    input(options = {}) {
        const {
            type = 'text',
            name = '',
            id = '',
            label = '',
            placeholder = '',
            value = '',
            icon = '',
            required = false,
            disabled = false,
            error = '',
            hint = ''
        } = options;

        return `
            <div class="flex flex-col gap-2">
                ${label ? `<label class="text-sm font-medium text-white" for="${id}">${label}${required ? ' <span class="text-danger">*</span>' : ''}</label>` : ''}
                <div class="relative">
                    ${icon ? `
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xl">${icon}</span>
                    ` : ''}
                    <input 
                        type="${type}"
                        ${name ? `name="${name}"` : ''}
                        ${id ? `id="${id}"` : ''}
                        placeholder="${placeholder}"
                        value="${value}"
                        class="w-full h-12 ${icon ? 'pl-11' : 'pl-4'} pr-4 rounded-lg 
                               bg-surface-highlight border ${error ? 'border-danger' : 'border-border-dark'} 
                               text-white placeholder-text-secondary
                               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                               transition-all disabled:opacity-50"
                        ${required ? 'required' : ''}
                        ${disabled ? 'disabled' : ''}
                    />
                </div>
                ${error ? `<span class="text-xs text-danger">${error}</span>` : ''}
                ${hint && !error ? `<span class="text-xs text-text-secondary">${hint}</span>` : ''}
            </div>
        `;
    },

    // Card Component
    card(content, options = {}) {
        const {
            title = '',
            subtitle = '',
            icon = '',
            badge = '',
            badgeColor = 'primary',
            onClick = '',
            className = ''
        } = options;

        const badgeColors = {
            primary: 'bg-primary/20 text-primary',
            success: 'bg-success/20 text-success',
            danger: 'bg-danger/20 text-danger',
            warning: 'bg-warning/20 text-warning'
        };

        return `
            <div class="rounded-2xl border border-surface-highlight bg-surface-dark p-6 
                        hover:border-primary/30 transition-all ${onClick ? 'cursor-pointer' : ''} ${className}"
                 ${onClick ? `onclick="${onClick}"` : ''}>
                ${title || icon ? `
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            ${icon ? `
                                <div class="rounded-lg bg-primary/10 p-2 text-primary">
                                    <span class="material-symbols-outlined">${icon}</span>
                                </div>
                            ` : ''}
                            ${title ? `
                                <div>
                                    <h3 class="font-bold text-white">${title}</h3>
                                    ${subtitle ? `<p class="text-xs text-text-secondary">${subtitle}</p>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        ${badge ? `
                            <span class="text-xs font-bold px-2 py-1 rounded-full ${badgeColors[badgeColor]}">${badge}</span>
                        ` : ''}
                    </div>
                ` : ''}
                ${content}
            </div>
        `;
    },

    // Stat Card Component
    statCard(options = {}) {
        const {
            label = '',
            value = '',
            change = null,
            icon = '',
            color = 'primary'
        } = options;

        const colors = {
            primary: 'text-primary bg-primary/10',
            success: 'text-success bg-success/10',
            danger: 'text-danger bg-danger/10',
            gold: 'text-gold bg-gold/10'
        };

        return `
            <div class="rounded-xl border border-surface-highlight bg-surface-dark p-5 hover:border-primary/30 transition-all">
                <div class="flex items-start justify-between mb-4">
                    <div class="rounded-lg ${colors[color]} p-2">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    ${change !== null ? `
                        <span class="text-xs font-bold px-2 py-0.5 rounded-full ${change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}">
                            ${change >= 0 ? '+' : ''}${change}%
                        </span>
                    ` : ''}
                </div>
                <p class="text-sm font-medium text-text-secondary">${label}</p>
                <p class="mt-1 text-xl font-bold text-white">${value}</p>
            </div>
        `;
    },

    // Modal Component
    modal(id, title, content, options = {}) {
        const {
            size = 'md',
            showClose = true,
            footer = ''
        } = options;

        const sizes = {
            sm: 'max-w-md',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl'
        };

        return `
            <div id="${id}" class="hidden fixed inset-0 z-50">
                <div class="modal-backdrop absolute inset-0" onclick="closeModal('${id}')"></div>
                <div class="relative flex items-center justify-center min-h-screen p-4">
                    <div class="${sizes[size]} w-full bg-surface-dark border border-border-dark rounded-2xl shadow-2xl fade-in">
                        <div class="flex items-center justify-between p-6 border-b border-border-dark">
                            <h2 class="text-xl font-bold text-white">${title}</h2>
                            ${showClose ? `
                                <button onclick="closeModal('${id}')" class="text-text-secondary hover:text-white transition-colors">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            ` : ''}
                        </div>
                        <div class="p-6">
                            ${content}
                        </div>
                        ${footer ? `
                            <div class="flex items-center justify-end gap-3 p-6 border-t border-border-dark">
                                ${footer}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    // Table Component
    table(headers, rows, options = {}) {
        const { emptyText = 'Nenhum registro encontrado' } = options;

        return `
            <div class="overflow-x-auto rounded-xl border border-surface-highlight">
                <table class="w-full text-left text-sm">
                    <thead class="bg-surface-highlight/50 text-text-secondary">
                        <tr>
                            ${headers.map(h => `<th class="px-6 py-4 font-medium">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-highlight text-text-secondary">
                        ${rows.length > 0 ? rows.join('') : `
                            <tr>
                                <td colspan="${headers.length}" class="px-6 py-8 text-center">${emptyText}</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        `;
    },

    // Status Badge
    statusBadge(status) {
        const config = {
            pending: { color: 'bg-warning/10 text-warning border-warning/20', text: 'Pendente' },
            approved: { color: 'bg-success/10 text-success border-success/20', text: 'Aprovado' },
            active: { color: 'bg-primary/10 text-primary border-primary/20', text: 'Ativo' },
            rejected: { color: 'bg-danger/10 text-danger border-danger/20', text: 'Rejeitado' },
            paid: { color: 'bg-success/10 text-success border-success/20', text: 'Pago' },
            cancelled: { color: 'bg-danger/10 text-danger border-danger/20', text: 'Cancelado' }
        };

        const { color, text } = config[status] || config.pending;
        return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color} border">${text}</span>`;
    },

    // File Upload Component
    fileUpload(id, options = {}) {
        const {
            label = 'Enviar arquivo',
            accept = 'image/*,.pdf',
            hint = 'PNG, JPG ou PDF até 5MB'
        } = options;

        return `
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-white">${label}</label>
                <label for="${id}" class="cursor-pointer">
                    <div class="border-2 border-dashed border-border-dark rounded-xl p-8 text-center 
                                hover:border-primary transition-colors group">
                        <span class="material-symbols-outlined text-4xl text-text-secondary group-hover:text-primary transition-colors">cloud_upload</span>
                        <p class="mt-2 text-sm text-text-secondary group-hover:text-white transition-colors">
                            Clique para selecionar ou arraste o arquivo
                        </p>
                        <p class="mt-1 text-xs text-text-secondary">${hint}</p>
                    </div>
                    <input type="file" id="${id}" accept="${accept}" class="hidden" />
                </label>
                <div id="${id}-preview" class="hidden">
                    <div class="flex items-center gap-3 p-3 bg-surface-highlight rounded-lg">
                        <span class="material-symbols-outlined text-primary">description</span>
                        <span id="${id}-filename" class="text-sm text-white flex-1"></span>
                        <button onclick="clearFileUpload('${id}')" class="text-text-secondary hover:text-danger">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Sidebar Navigation Item
    navItem(icon, label, route, active = false) {
        return `
            <a href="#${route}" 
               class="group flex items-center gap-3 rounded-xl px-4 py-3 
                      ${active ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-highlight hover:text-white'} 
                      transition-all">
                <span class="material-symbols-outlined" ${active ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>${icon}</span>
                <span class="text-sm font-medium">${label}</span>
            </a>
        `;
    },

    // User Avatar
    avatar(user, size = 'md') {
        const sizes = {
            sm: 'w-8 h-8 text-xs',
            md: 'w-10 h-10 text-sm',
            lg: 'w-14 h-14 text-lg'
        };

        if (user.photo) {
            return `
                <img src="${user.photo}" alt="${user.name}" 
                     class="${sizes[size]} rounded-full object-cover border-2 border-border-dark" />
            `;
        }

        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        return `
            <div class="${sizes[size]} rounded-full bg-gradient-to-br from-primary to-blue-400 
                         flex items-center justify-center text-white font-bold border-2 border-border-dark">
                ${initials}
            </div>
        `;
    },

    // Empty State
    emptyState(icon, title, description, action = '') {
        return `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="w-20 h-20 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-4xl text-text-secondary">${icon}</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">${title}</h3>
                <p class="text-sm text-text-secondary max-w-md mb-6">${description}</p>
                ${action}
            </div>
        `;
    },

    // Loading Spinner
    loading(text = 'Carregando...') {
        return `
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 border-4 border-surface-highlight border-t-primary rounded-full animate-spin mb-4"></div>
                <p class="text-sm text-text-secondary">${text}</p>
            </div>
        `;
    }
};

// Modal helper functions
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = '';
}

// File upload helper
function clearFileUpload(id) {
    document.getElementById(id).value = '';
    document.getElementById(`${id}-preview`).classList.add('hidden');
}

function handleFileSelect(id) {
    const input = document.getElementById(id);
    const preview = document.getElementById(`${id}-preview`);
    const filename = document.getElementById(`${id}-filename`);

    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            filename.textContent = e.target.files[0].name;
            preview.classList.remove('hidden');
        }
    });
}
