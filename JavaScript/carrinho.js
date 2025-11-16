// carrinho.js - completo
// Mantive nomes em português pra facilitar integração com seu código

// ===== Variáveis e seletores =====
let cart = [];

// Elementos do carrinho (assume que esses IDs existem no HTML, conforme seu snippet)
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Badge do contador no header
let cartCountEl = document.getElementById('cartCount');
// se não existir no HTML, cria e insere dentro do .container-direita
if (!cartCountEl) {
    const containerDireita = document.querySelector('.container-direita');
    if (containerDireita) {
        const linkCarrinho = containerDireita.querySelector('.link-carrinho') || containerDireita.querySelector('a[onclick*="toggleCart"]');
        if (linkCarrinho) {
            cartCountEl = document.createElement('span');
            cartCountEl.id = 'cartCount';
            cartCountEl.className = 'cart-count hidden';
            cartCountEl.textContent = '0';
            linkCarrinho.appendChild(cartCountEl);
        }
    }
}

// ===== Funções de persistência =====
function loadCart() {
    const raw = localStorage.getItem('carrinho');
    if (!raw) {
        cart = [];
        return;
    }
    try {
        const parsed = JSON.parse(raw);
        cart = Array.isArray(parsed)
            ? parsed.map(it => ({
                id: it.id ?? Date.now() + Math.floor(Math.random() * 1000),
                name: it.name ?? it.nome ?? 'Produto',
                price: Number(it.price ?? it.preco ?? it.valor ?? 0) || 0,
                image: it.image ?? it.imagem ?? '',
                quantity: Number(it.quantity ?? it.quantidade ?? it.qty ?? 1) || 1
            }))
            : [];
    } catch (e) {
        console.warn('Erro ao parsear carrinho no localStorage:', e);
        cart = [];
    }
}
loadCart();

function saveCart() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    updateCartCount(); // sempre atualiza o contador ao salvar
}

// ===== Atualizações visuais =====
function updateCartDisplay() {
    // total em valor monetário
    const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2).replace('.', ',');
    }

    // itens do carrinho na sidebar
    if (!cartItems) return;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="item-carrinho">
                <img src="${item.image}" alt="${item.name}" class="carrinho-item-image">
                <div class="carrinho-item-info">
                    <div class="carrinho-item-nome">${item.name}</div>
                    <div class="carrinho-item-preco">R$ ${Number(item.price).toFixed(2).replace('.', ',')}</div>
                    <div class="controle-quantidade">
                        <button class="quantidade-btn" onclick="updateQuantityCart(${item.id}, -1)">-</button>
                        <span class="quantidade">${item.quantity}</span>
                        <button class="quantidade-btn" onclick="updateQuantityCart(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartCount();
}

// atualiza o número do badge com total de unidades (soma das quantities)
function updateCartCount() {
    if (!cartCountEl) return;
    const totalCount = cart.reduce((s, i) => s + Number(i.quantity || 0), 0);

    // atualiza texto
    cartCountEl.textContent = totalCount;

    // acessibilidade
    cartCountEl.setAttribute('aria-hidden', totalCount === 0 ? 'true' : 'false');

    // classes visuais
    if (totalCount === 0) {
        cartCountEl.classList.add('hidden');
    } else {
        // mostrar e animar um pulse simples
        cartCountEl.classList.remove('hidden');
        cartCountEl.classList.add('pulse');
        // remove pulse depois de 200ms
        setTimeout(() => cartCountEl && cartCountEl.classList.remove('pulse'), 200);
    }
}

// ===== Manipulação de itens =====
function updateQuantityCart(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity = Number(item.quantity) + change;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

function toggleCart() {
    if (!cartSidebar || !cartOverlay) return;
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function checkout() {
    saveCart();
    window.location.href = "aba_pagamento.html";
}

// ===== Eventos =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
});

// Evento global para botões 'Adicionar ao carrinho' (sua classe .btn-carrinho)
document.addEventListener('click', (e) => {
    // aceita se o elemento clicado ou qualquer pai tem a classe .btn-carrinho
    const targetBtn = e.target.closest && e.target.closest('.btn-carrinho');
    if (!targetBtn) return;

    const button = targetBtn;
    const card = button.closest('.card');
    if (!card) return;

    const name = card.querySelector('h1')?.textContent?.trim() || 'Produto';
    const priceText = card.querySelector('span')?.textContent || '0';
    // tenta extrair número robustamente
    const price = parseFloat(
        priceText
            .replace(/[^\d,.\-]/g, '')
            .replace(/\.(?=\d{3,})/g, '') // remove pontos de milhar
            .replace(',', '.')
    ) || 0;
    const image = card.querySelector('img')?.src || '';

    // Animação da imagem voadora (se quiser manter)
    try {
        const imgEl = card.querySelector('img');
        if (imgEl) {
            const flyingImg = document.createElement('img');
            flyingImg.src = image;
            flyingImg.classList.add('imagem-voadora');
            document.body.appendChild(flyingImg);

            const rect = imgEl.getBoundingClientRect();
            flyingImg.style.left = rect.left + 'px';
            flyingImg.style.top = rect.top + 'px';
            flyingImg.style.opacity = '1';
            flyingImg.style.transform = 'scale(1)';
            flyingImg.getBoundingClientRect();

            const cartIcon = document.querySelector('.fa-cart-shopping');
            const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 50, top: 20 };

            // anima para o ícone
            setTimeout(() => {
                flyingImg.style.left = (cartRect.left) + 'px';
                flyingImg.style.top = (cartRect.top) + 'px';
                flyingImg.style.transform = 'scale(0.4) rotate(15deg)';
                flyingImg.style.transition = 'all 0.8s ease-in-out';
            }, 0);

            flyingImg.addEventListener('transitionend', () => flyingImg.remove());
        }
    } catch (err) {
        // não bloquear se animação falhar
        console.warn('erro animação voadora', err);
    }

    // Adicionar ao carrinho (por nome+preço)
    const existing = cart.find(item => item.name === name && Number(item.price) === Number(price));
    if (existing) {
        existing.quantity = Number(existing.quantity) + 1;
    } else {
        cart.push({ id: Date.now() + Math.floor(Math.random()*1000), name, price, image, quantity: 1 });
    }

    saveCart();
    updateCartDisplay();

    // animação visual do ícone
    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 600);
    }
});

// função para adicionar via script (compatível com seu uso anterior)
function adicionarAoCarrinho(produto) {
    const { nome, preco, imagem } = produto;

    // se o produto vier com strings/formatos inconsistentes, normalize
    const price = Number(preco) || 0;
    const existing = cart.find(item => item.name === nome && Number(item.price) === Number(price));
    if (existing) {
        existing.quantity = Number(existing.quantity) + 1;
    } else {
        cart.push({
            id: Date.now() + Math.floor(Math.random()*1000),
            name: nome,
            price: price,
            image: imagem || '',
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();

    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 600);
    }
}

// ===== Inicialização =====
/* expõe funções ao escopo global porque seu HTML usa onclick inline */
window.updateQuantityCart = updateQuantityCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.adicionarAoCarrinho = adicionarAoCarrinho;

// Atualiza display ao carregar o script
updateCartDisplay();
