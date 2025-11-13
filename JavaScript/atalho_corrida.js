// Dados dos produtos
const products = [
  { id: 1, 
    name: "Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Original", 
    price: 239.90, 
    image: "imagem/atalho_corrida/Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Origial.png", 
    alt: "Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Origial" },

  { id: 2, 
    name: "Tênis Mizuno Cometa 2", 
    price: 349.90, 
    gender: "male", 
    image: "imagem/atalho_corrida/Masculino/Tênis Mizuno Cometa 2.png", 
    alt: "Tênis Mizuno Cometa 2" },

  { id: 3, 
    name: "Short Com Bolso Para Corrida, Caminhada Academia Feminino Compresão Running", 
    price: 129.90, 
    gender: "female", 
    image: "imagem/atalho_corrida/Feminino/Short Com Bolso Para Corrida, Caminhada Academia Feminino Compresão Running.png", 
    alt: "Short Com Bolso Para Corrida" },

  { id: 4, 
    name: "Camiseta Mizuno Run Spark 2", 
    price: 119.90, 
    gender: "male", 
    image: "imagem/atalho_corrida/Masculino/Camiseta Mizuno Run Spark 2.png", 
    alt: "Camiseta Mizuno Run Spark 2" },

  { id: 5, 
    name: "Tênis Fila Progress Lite", 
    price: 229.90, 
    gender: "female", 
    image: "imagem/atalho_corrida/Feminino/Tênis Fila Progress Lite.png", 
    alt: "Tênis Fila Progress Lite" },

  { id: 6,
    name: "Camiseta Mizuno Energy 2.0", 
    price: 109.90, 
    gender: "female", 
    image: "imagem/atalho_corrida/Feminino/Camiseta Mizuno Energy 2.0.png", 
    alt: "Camiseta Mizuno Energy 2.0" }
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
