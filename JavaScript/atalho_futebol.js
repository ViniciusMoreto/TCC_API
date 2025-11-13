// Dados dos produtos
const products = [
  { id: 1, 
    name: "Mini Trave Profissional Goool90 Master Fácil Esporte Contém 1 Trava + 1 Rede de Nylon - Tam. 90x60", 
    price: 399.90, 
    image: "imagem/atalho_futebol/Mini Trave Profissional Goool90 Master Fácil Esporte Contém 1 Trava + 1 Rede de Nylon - Tam. 90x60.png", 
    alt: "Mini Trave Profissional Goool90 Master Fácil Esporte Contém 1 Trava + 1 Rede de Nylon - Tam. 90x60" },

  { id: 2, 
    name: "Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0", 
    price: 179.90, 
    image: "imagem/atalho_futebol/Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0.png", 
    alt: "Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0" },

  { id: 3, 
    name: "Bola UCL Pro Sala 24 25 Eliminatórias", 
    price: 399.90, 
    image: "imagem/atalho_esporte/Bola UCL Pro Sala 24 25 Eliminatórias.png", 
    alt: "Bola UCL Pro Sala 24 25 Eliminatórias" },

  { id: 4, 
    name: "Bola Nike CBF Society", 
    price: 112.90, 
    image: "imagem/atalho_esporte/Bola Nike CBF Society.png", 
    alt: "Bola Nike CBF Society" },

  { id: 5, 
    name: "Chuteira Nike Vapor 16 Club Futsal", 
    price: 499.90, 
    gender: "male", 
    image: "imagem/atalho_futebol/Masculino/Chuteira Nike Vapor 16 Club Futsal.png", 
    alt: "Chuteira Nike Vapor 16 Club Futsal" },

  { id: 6,
    name: "Chuteira Society Cronos Futebol Grama Sintética", 
    price: 99.90, 
    gender: "female", 
    image: "imagem/atalho_futebol/Feminino/Chuteira Society Cronos Futebol Grama Sintética.png", 
    alt: "Chuteira Society Cronos Futebol Grama Sintética" }
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
