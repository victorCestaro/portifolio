// MENU HAMBURGER
const menuHamburger = document.getElementById('menuHamburger');
const navMobile = document.getElementById('navMobile');

if (menuHamburger) {
    menuHamburger.addEventListener('click', function() {
        menuHamburger.classList.toggle('ativo');
        navMobile.classList.toggle('ativo');
    });
}

// Fechar menu mobile ao clicar em um link
const linksMobile = document.querySelectorAll('.link-menu-mobile');
linksMobile.forEach(link => {
    link.addEventListener('click', function() {
        menuHamburger.classList.remove('ativo');
        navMobile.classList.remove('ativo');
    });
});

// Destacar link ativo no menu
function ativarLinkMenu() {
    const links = document.querySelectorAll('.link-menu');
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
            link.style.color = '#137FEC';
            link.style.fontWeight = '700';
        } else {
            link.style.color = '#CBD4E1';
            link.style.fontWeight = '400';
        }
    });
}

// ==========================
// FILTRO DE SERVIÇOS
// ==========================

document.addEventListener('DOMContentLoaded', function () {

    const abasServico = document.querySelectorAll('.aba-servico');
    const cardsServico = document.querySelectorAll('.card-servico');

    function filtrarServicos(servico) {

        cardsServico.forEach(card => {
            if (card.dataset.servico === servico) {
                card.classList.add('ativo');
            } else {
                card.classList.remove('ativo');
            }
        });

        sessionStorage.setItem('selectedServico', servico);
    }

    abasServico.forEach(aba => {
        aba.addEventListener('click', function () {

            abasServico.forEach(a => a.classList.remove('aba-servico-ativo'));
            this.classList.add('aba-servico-ativo');

            const servico = this.dataset.servico;
            filtrarServicos(servico);
        });
    });

    // Estado inicial
    const servicoSalvo = sessionStorage.getItem('selectedServico') || 'sites';

    const abaInicial = document.querySelector(`.aba-servico[data-servico="${servicoSalvo}"]`);
    if (abaInicial) {
        abaInicial.classList.add('aba-servico-ativo');
        filtrarServicos(servicoSalvo);
    }

});
// Botão "Carregar Mais Projetos" - navega para página do portfólio com a categoria selecionada
const btnCarregarMais = document.querySelector('.btn-carregar-mais');
if (btnCarregarMais) {
    btnCarregarMais.addEventListener('click', function() {
        const categoryAtiva = document.querySelector('.aba-ativo')?.getAttribute('data-category') || 'todos';
        window.location.href = `portfolio.html?category=${categoryAtiva}`;
    });
}

// Função para mapear categorias da index para da galeria
function mapearCategoria(categoria) {
    const mapa = {
        'websites': 'web-estoque',
        'jogos': 'demos',
        'aplicativos': 'apps'
    };
    return mapa[categoria] || 'todos';
}

// Filtro de categorias da galeria (portfolio.html)
document.querySelectorAll('.aba-filtro').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove a classe ativa de todos os botões
        document.querySelectorAll('.aba-filtro').forEach(b => b.classList.remove('aba-filtro-ativo'));
        
        // Adiciona a classe ativa ao botão clicado
        this.classList.add('aba-filtro-ativo');
        
        // Filtra os cards da galeria
        document.querySelectorAll('.card-galeria').forEach(card => {
            if (filter === 'todos') {
                card.style.display = 'flex';
            } else if (card.getAttribute('data-filter') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Aplicar filtro ao carregar a página do portfólio
function aplicarFiltroInicial() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        const categoryMapeada = mapearCategoria(categoryParam);
        
        // Encontra o botão de filtro correspondente
        const botaoFiltro = document.querySelector(`[data-filter="${categoryMapeada}"]`);
        
        if (botaoFiltro) {
            // Simula clique no botão de filtro
            botaoFiltro.click();
        }
    }
}

// Chamar ao carregar a página do portfólio
if (document.querySelectorAll('.aba-filtro').length > 0) {
    document.addEventListener('DOMContentLoaded', aplicarFiltroInicial);
}

// Botão voltar na galeria
const btnVoltar = document.querySelector('.btn-voltar');
if (btnVoltar) {
    btnVoltar.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// Filtro de Serviços (index.html)
document.querySelectorAll('.aba-servico').forEach(btn => {
    btn.addEventListener('click', function() {
        const servico = this.getAttribute('data-servico');
        
        // Remove a classe ativa de todos os botões
        document.querySelectorAll('.aba-servico').forEach(b => b.classList.remove('aba-servico-ativo'));
        
        // Adiciona a classe ativa ao botão clicado
        this.classList.add('aba-servico-ativo');
        
        // Filtra os cards de serviços
        document.querySelectorAll('.card-servico').forEach(card => {
            if (card.getAttribute('data-servico') === servico) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Armazena o serviço selecionado
        sessionStorage.setItem('selectedServico', servico);
    });
});
