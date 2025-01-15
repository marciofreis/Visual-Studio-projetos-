// Inicialização do sistema
function inicializarSistema() {
    const usuarioLogado = JSON.parse(
        localStorage.getItem('usuarioLogado') || 
        sessionStorage.getItem('usuarioLogado')
    );

    // Atualiza informações do usuário
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = usuarioLogado.nome;
    }
    if (document.getElementById('userRole')) {
        document.getElementById('userRole').textContent = usuarioLogado.cargo;
    }

    // Inicializa eventos do menu
    inicializarMenu();
    
    // Carrega conteúdo inicial
    carregarConteudo('dashboard');
}

// Inicialização do menu
function inicializarMenu() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Atualiza classes ativas
            document.querySelectorAll('.nav-link').forEach(l => 
                l.classList.remove('active'));
            this.classList.add('active');
            
            // Carrega conteúdo
            const pagina = this.dataset.page;
            carregarConteudo(pagina);
        });
    });
}

// Carregamento de conteúdo
function carregarConteudo(pagina) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Atualiza título
    if (document.getElementById('pageTitle')) {
        document.getElementById('pageTitle').textContent = getTituloPagina(pagina);
    }

    // Carrega conteúdo específico
    switch(pagina) {
        case 'dashboard':
            mainContent.innerHTML = criarDashboard();
            break;
        case 'nfe':
            window.location.href = 'PainelDocs.html?tipo=NFE';
            break;
        case 'cte':
            window.location.href = 'PainelDocs.html?tipo=CTE';
            break;
        default:
            mainContent.innerHTML = `
                <div class="content-page">
                    <h2>${getTituloPagina(pagina)}</h2>
                    <p>Página em desenvolvimento...</p>
                </div>
            `;
    }
}

// Funções auxiliares
function getTituloPagina(pagina) {
    const titulos = {
        'dashboard': 'Dashboard',
        'nfe': 'Notas Fiscais Eletrônicas',
        'cte': 'Conhecimentos de Transporte',
        'upload': 'Upload de Arquivos',
        'gerenciar': 'Gerenciar Arquivos',
        'perfil': 'Meu Perfil',
        'config': 'Configurações'
    };
    return titulos[pagina] || 'Página não encontrada';
}

function criarDashboard() {
    return `
        <div class="dashboard">
            <h2>Bem-vindo ao DocFiscal</h2>
            <div class="dashboard-content">
                <!-- Conteúdo do dashboard -->
            </div>
        </div>
    `;
}

// Funções de UI
function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) menu.classList.toggle('show');
}

// Função de logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('usuarioLogado');
    window.location.replace('login.html');
}

// Inicializa o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarSistema);

