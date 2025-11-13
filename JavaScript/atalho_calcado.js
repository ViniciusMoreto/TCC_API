// Dados dos produtos
const products = [
    { id: 1, 
      name: "Tênis de Corrida Deviate NITRO 3", 
      price: 899.90, 
      gender: "male", 
      image: "imagem/puma/deviate_nitro_branco/imagem1.png", 
      alt: "Tênis de Corrida Deviate NITRO 3 Masculino" },

    { id: 2, 
      name: "Tênis adidas Eclyptix 2000", 
      price: 399.90, 
      gender: "female", 
      image: "imagem/atalho_calcado/Feminino/Tênis adidas Eclyptix 2000.png", 
      alt: "Tênis adidas Eclyptix 2000" },

    { id: 3, 
      name: "Tênis Asics Patriot 14", 
      price: 449.90, 
      gender: "male", 
      image: "imagem/atalho_calcado/Masculino/Tênis Asics Patriot 14.png", 
      alt: "Tênis Asics Patriot 14Tênis Asics Patriot 14" },

    { id: 4, 
      name: "Tênis adidas Switch Move", 
      price: 198.90, 
      gender: "female",  
      image: "imagem/atalho_calcado/Feminino/Tênis adidas Switch Move.png", 
      alt: "Tênis adidas Switch Move" },

    { id: 5, 
      name: "Tênis nike Revolution 8", 
      price: 399.90, 
      gender: "male", 
      image: "imagem/atalho_calcado/Masculino/Tênis nike Revolution 8.png", 
      alt: "Tênis nike Revolution 8" },

    { id: 6, 
      name: "Tênis Mizuno Space 5", 
      price: 349.90, 
      gender: "female", 
      image: "imagem/atalho_calcado/Feminino/Tênis Mizuno Space 5.png", 
      alt: "Tênis Mizuno Space 5" }
  ];

// CONFIGURAÇÕES
const originalOrder = [...products];
let currentGender = "all";
let currentSort = null;

// FAVORITOS 
function inicializarFavoritos() {
  const coracoes = document.querySelectorAll(".imagem__favorito i");

  coracoes.forEach(coracao => {
    const card = coracao.closest(".product-card");
    const nomeProduto = card.querySelector("h3").innerText;

    let listaFav = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Marca corações já favoritados
    if (listaFav.some(p => p.nome === nomeProduto)) {
      coracao.classList.remove("far");
      coracao.classList.add("fa-solid");
    }

    // Clique no coração
    coracao.addEventListener("click", e => {
      e.stopPropagation();

      const produto = {
        nome: card.querySelector("h3").innerText,
        preco: card.querySelector("span").innerText,
        imagem: card.querySelector("img").src
      };

      let lista = JSON.parse(localStorage.getItem("favoritos")) || [];
      const index = lista.findIndex(p => p.nome === produto.nome);

      if (index > -1) {
        // remover
        lista.splice(index, 1);
        coracao.classList.remove("fa-solid");
        coracao.classList.add("far");
        alert("Produto removido dos favoritos!");
      } else {
        // adicionar
        lista.push(produto);
        coracao.classList.remove("far");
        coracao.classList.add("fa-solid");
        alert("Produto adicionado aos favoritos!");
      }

      localStorage.setItem("favoritos", JSON.stringify(lista));
    });
  });
}

// MOSTRAR PRODUTOS
function displayProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  let filtered = [...products];

  // Filtro de gênero
  if (currentGender !== "all") {
    filtered = filtered.filter(p => p.gender === currentGender);
  }

  // Ordenação
  if (currentSort === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (currentSort === "za") filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (currentSort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (currentSort === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  if (!currentSort) {
    filtered = filtered.sort((a, b) => 
      originalOrder.findIndex(p => p.id === a.id) - 
      originalOrder.findIndex(p => p.id === b.id)
    );
  }

  // Exibir produtos
  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = "product-card";
    div.innerHTML = `
      <div class="imagem__favorito">
        <img src="${product.image}" alt="${product.alt}">
        <i class="far fa-heart" aria-hidden="true"></i>
      </div>
      <div class="p-4">
        <h3>${product.name}</h3>
        <p>${product.gender ? (product.gender === 'male' ? 'Masculino' : 'Feminino') : ''}</p>
        <span>R$ ${product.price.toFixed(2)}</span>
        <div class="btn-card">
          <button class="btn-carrinho">Adicionar ao carrinho</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  // Ativa os corações após renderizar os produtos
  inicializarFavoritos();
}

// FILTROS
function filterProducts(gender) {
  const buttons = document.querySelectorAll("#gender-buttons .filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  currentGender = gender;
  displayProducts();
}

// ORDENAÇÃO 
function sortAlphabet(type) {
  const buttons = document.querySelectorAll("#alphabet-filter .filter-btn");
  const isActive = event.target.classList.contains("active");

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll("#price-filter .filter-btn").forEach(btn => btn.classList.remove("active"));

  currentSort = isActive ? null : type;
  if (!isActive) event.target.classList.add("active");

  displayProducts();
}

function sortPrice(type) {
  const buttons = document.querySelectorAll("#price-filter .filter-btn");
  const isActive = event.target.classList.contains("active");

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll("#alphabet-filter .filter-btn").forEach(btn => btn.classList.remove("active"));

  currentSort = isActive ? null : type;
  if (!isActive) event.target.classList.add("active");

  displayProducts();
}

// INICIAR 
document.addEventListener('DOMContentLoaded', displayProducts);
