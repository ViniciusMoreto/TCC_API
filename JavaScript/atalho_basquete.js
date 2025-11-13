// DADOS DOS PRODUTOS 
const products = [
  { id: 1, 
      name: "Aro de Basquete Tamanho Oficial 45cm Vollo", 
      price: 259.90, 
      image: "imagem/atalho_basquete/Aro de Basquete Tamanho Oficial 45cm Vollo.png", 
      alt: "Aro de Basquete Tamanho Oficial 45cm Vollo" },

  { id: 2, 
      name: "Regata Basquete Plus Size M10 Classic Chicago", 
      price: 99.90, 
      gender: "male", 
      image: "imagem/atalho_basquete/Masculino/Regata Basquete Plus Size M10 Classic Chicago.png", 
      alt: "Regata Basquete Plus Size M10 Classic Chicago" },

  { id: 3, 
      name: "Bola Basquete Adidas All Court 3.0", 
      price: 279.90, 
      image: "imagem/atalho_basquete/Bola Basquete Adidas All Court 3.0.png", 
      alt: "Bola Basquete Adidas All Court 3.0" },

  { id: 4, 
      name: "Tênis Puma NBA Love", 
      price: 1109.90, 
      gender: "female", 
      image: "imagem/atalho_basquete/Masculino/Tênis Puma NBA Love.png", 
      alt: "Tênis Puma NBA Love" },

  { id: 5, 
      name: "Tênis NBA Puma MB.03 Be You", 
      price: 1109.90, 
      gender: "male", 
      image: "imagem/atalho_basquete/Masculino/Tênis NBA Puma MB.03 Be You.png", 
      alt: "Tênis NBA Puma MB.03 Be You" },

  { id: 6,
      name: "Tabela de basquete adulto 110 x 75cm de parede modelo fixo", 
      price: 998.90, 
      image: "imagem/atalho_basquete/Tabela de basquete adulto 110 x 75cm de parede modelo fixo.png", 
      alt: "Tabela de basquete adulto 110 x 75cm de parede modelo fixo" }
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
