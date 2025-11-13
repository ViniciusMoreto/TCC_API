// Carrinho

let cart = [];

// Seletores
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// FUNÇÕES PRINCIPAIS 

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
}

function updateCartDisplay() {
    const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');

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
}

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
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function checkout() {
    saveCart();
    window.location.href = "aba_pagamento.html";
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
});

//EVENTO GLOBAL (FUNCIONA EM TODAS AS PÁGINAS)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-carrinho')) {
        const button = e.target;
        const card = button.closest('.card');
        if (!card) return;

        const name = card.querySelector('h1')?.textContent?.trim() || 'Produto';
        const priceText = card.querySelector('span')?.textContent || '0';
        const price = parseFloat(priceText.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0;
        const image = card.querySelector('img')?.src || '';

        // ANIMAÇÃO DA IMAGEM 
        const flyingImg = document.createElement('img');
        flyingImg.src = image;
        flyingImg.classList.add('imagem-voadora');
        document.body.appendChild(flyingImg);

        const rect = card.querySelector('img').getBoundingClientRect();
        flyingImg.style.left = rect.left + 'px';
        flyingImg.style.top = rect.top + 'px';
        flyingImg.style.opacity = '1';
        flyingImg.style.transform = 'scale(1)';
        flyingImg.getBoundingClientRect();

        const cartIcon = document.querySelector('.fa-cart-shopping');
        const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 50, top: 20 };

        flyingImg.style.left = cartRect.left + 'px';
        flyingImg.style.top = cartRect.top + 'px';
        flyingImg.style.transform = 'scale(0.4) rotate(15deg)';
        flyingImg.style.transition = 'all 0.8s ease-in-out';
        flyingImg.addEventListener('transitionend', () => flyingImg.remove());

        // Adicionar ao carrinho
        const existing = cart.find(item => item.name === name && item.price === price);
        if (existing) {
            existing.quantity = Number(existing.quantity) + 1;
        } else {
            cart.push({ id: Date.now(), name, price, image, quantity: 1 });
        }

        saveCart();
        updateCartDisplay();

        // Pequena animação no ícone do carrinho
        if (cartIcon) {
            cartIcon.classList.add('bounce');
            setTimeout(() => cartIcon.classList.remove('bounce'), 600);
        }
    }
});

// ADICIONAR VIA SCRIPT
function adicionarAoCarrinho(produto) {
    const { nome, preco, imagem } = produto;

    const existing = cart.find(item => item.name === nome && item.price === preco);
    if (existing) {
        existing.quantity = Number(existing.quantity) + 1;
    } else {
        cart.push({
            id: Date.now(),
            name: nome,
            price: preco,
            image: imagem,
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

// Atualiza o carrinho na inicialização
updateCartDisplay();
