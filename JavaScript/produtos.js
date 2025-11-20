// Dados dos produtos
const products = [
    { id: 1, 
        name: "Aro de Basquete Tamanho Oficial 45cm Vollo", 
        price: 259.90, 
        image: "imagem/atalho_basquete/Aro de Basquete Tamanho Oficial 45cm Vollo.png", 
        alt: "Aro de Basquete Tamanho Oficial 45cm Vollo" },

    { id: 2, 
        name: "Tênis Puma NBA Love", 
        price: 1109.90, 
        gender: "female", 
        image: "imagem/atalho_basquete/Masculino/Tênis Puma NBA Love.png", 
        alt: "Tênis Puma NBA Love" },

    { id: 3, 
        name: "Tênis NBA Puma MB.03 Be You", 
        price: 1109.90, 
        gender: "male", 
        image: "imagem/atalho_basquete/Masculino/Tênis NBA Puma MB.03 Be You.png", 
        alt: "Tênis NBA Puma MB.03 Be You" },

    { id: 4,
        name: "Tabela de basquete adulto 110 x 75cm de parede modelo fixo", 
        price: 998.90, 
        image: "imagem/atalho_basquete/Tabela de basquete adulto 110 x 75cm de parede modelo fixo.png", 
        alt: "Tabela de basquete adulto 110 x 75cm de parede modelo fixo" },

    { id: 5, 
      name: "Tênis de Corrida Deviate NITRO 3", 
      price: 899.90, 
      gender: "male", 
      image: "imagem/puma/deviate_nitro_branco/imagem1.png", 
      alt: "Tênis de Corrida Deviate NITRO 3 Masculino" },

    { id: 6, 
      name: "Tênis adidas Eclyptix 2000", 
      price: 399.90, 
      gender: "female", 
      image: "imagem/atalho_calcado/Feminino/Tênis adidas Eclyptix 2000.png", 
      alt: "Tênis adidas Eclyptix 2000" },

    { id: 7, 
      name: "Tênis Asics Patriot 14", 
      price: 449.90, 
      gender: "male", 
      image: "imagem/atalho_calcado/Masculino/Tênis Asics Patriot 14.png", 
      alt: "Tênis Asics Patriot 14Tênis Asics Patriot 14" },

    { id: 8, 
      name: "Tênis adidas Switch Move", 
      price: 198.90, 
      gender: "female",  
      image: "imagem/atalho_calcado/Feminino/Tênis adidas Switch Move.png", 
      alt: "Tênis adidas Switch Move" },

    { id: 9, 
      name: "Tênis nike Revolution 8", 
      price: 399.90, 
      gender: "male", 
      image: "imagem/atalho_calcado/Masculino/Tênis nike Revolution 8.png", 
      alt: "Tênis nike Revolution 8" },

    { id: 10, 
      name: "Tênis Mizuno Space 5", 
      price: 349.90, 
      gender: "female", 
      image: "imagem/atalho_calcado/Feminino/Tênis Mizuno Space 5.png", 
      alt: "Tênis Mizuno Space 5" },

    { id: 11, 
    name: "Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Original", 
    price: 239.90, 
    image: "imagem/atalho_corrida/Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Origial.png", 
    alt: "Relógio Smartwatch w29 Pro Series 9 Lançamento 2024 Nfc Gps Gpt Origial" },

  { id: 12, 
    name: "Tênis Mizuno Cometa 2", 
    price: 349.90, 
    gender: "male", 
    image: "imagem/atalho_corrida/Masculino/Tênis Mizuno Cometa 2.png", 
    alt: "Tênis Mizuno Cometa 2" },

  { id: 13, 
    name: "Short Com Bolso Para Corrida, Caminhada Academia Feminino Compresão Running", 
    price: 129.90, 
    gender: "female", 
    image: "imagem/atalho_corrida/Feminino/Short Com Bolso Para Corrida, Caminhada Academia Feminino Compresão Running.png", 
    alt: "Short Com Bolso Para Corrida" },

  { id: 14, 
    name: "Camiseta Mizuno Run Spark 2", 
    price: 119.90, 
    gender: "male", 
    image: "imagem/atalho_corrida/Masculino/Camiseta Mizuno Run Spark 2.png", 
    alt: "Camiseta Mizuno Run Spark 2" },

  { id: 15, 
    name: "Tênis Fila Progress Lite", 
    price: 229.90, 
    gender: "female", 
    image: "imagem/atalho_corrida/Feminino/Tênis Fila Progress Lite.png", 
    alt: "Tênis Fila Progress Lite" },

    { id: 16, 
    name: "Bicicleta Speed Swift Enduravox Evo Disc 2025 Shimano 105", 
    price: 14990.90, 
    image: "imagem/atalho_esporte/Bicicleta Speed Swift Enduravox Evo Disc 2025 Shimano 105.png", 
    alt: "Bicicleta Speed Swift Enduravox Evo Disc 2025 Shimano 105" },

  { id: 17, 
    name: "Bola Basquete Adidas All Court 3.0", 
    price: 279.90, 
    image: "imagem/atalho_esporte/Bola Basquete Adidas All Court 3.0.png", 
    alt: "Bola Basquete Adidas All Court 3.0" },

  { id: 18, 
    name: "Bola de Tênis Wilson Championship", 
    price: 51.90, 
    image: "imagem/atalho_esporte/Bola de Tênis Wilson Championship.png", 
    alt: "Bola de Tênis Wilson Championship" },

  { id: 19,
    name: "Raquete de Tênis Wilson Aggressor", 
    price: 269.90, 
    image: "imagem/atalho_esporte/Raquete de Tênis Wilson Aggressor.png", 
    alt: "Raquete de Tênis Wilson Aggressor" },

    { id: 20, 
    name: "Mini Trave Profissional Goool90 Master Fácil Esporte Contém 1 Trava + 1 Rede de Nylon - Tam. 90x60", 
    price: 399.90, 
    image: "imagem/atalho_futebol/Mini-Trave-Profissional.png", 
    alt: "Mini Trave Profissional Goool90 Master Fácil Esporte Contém 1 Trava + 1 Rede de Nylon - Tam. 90x60" },

  { id: 21, 
    name: "Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0", 
    price: 179.90, 
    image: "imagem/atalho_futebol/Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0.png", 
    alt: "Rede(Par) Para Mini Gol Travinha Malha 10x10 Fio 3 - Spitter - Ref 987-0" },

  { id: 22, 
    name: "Bola UCL Pro Sala 24 25 Eliminatórias", 
    price: 399.90, 
    image: "imagem/atalho_esporte/Bola UCL Pro Sala 24 25 Eliminatórias.png", 
    alt: "Bola UCL Pro Sala 24 25 Eliminatórias" },

  { id: 23, 
    name: "Bola Nike CBF Society", 
    price: 112.90, 
    image: "imagem/atalho_esporte/Bola Nike CBF Society.png", 
    alt: "Bola Nike CBF Society" },

  { id: 24, 
    name: "Chuteira Nike Vapor 16 Club Futsal", 
    price: 499.90, 
    gender: "male", 
    image: "imagem/atalho_futebol/Masculino/Chuteira Nike Vapor 16 Club Futsal.png", 
    alt: "Chuteira Nike Vapor 16 Club Futsal" },

  { id: 25,
    name: "Chuteira Society Cronos Futebol Grama Sintética", 
    price: 99.90, 
    gender: "female", 
    image: "imagem/atalho_futebol/Feminino/Chuteira Society Cronos Futebol Grama Sintética.png", 
    alt: "Chuteira Society Cronos Futebol Grama Sintética" },

    { id: 26, 
    name: "Camiseta Mizuno Energy 2.0", 
    price: 109.90, 
    gender: "female",
    image: "imagem/atalho_roupa/Feminino/Camiseta Mizuno Energy 2.0.png", 
    alt: "Camiseta Mizuno Energy 2.0" },

  { id: 27, 
    name: "Regata Basquete Plus Size M10 Classic Chicago", 
    price: 99.90, 
    gender: "male",
    image: "imagem/atalho_roupa/Masculino/Regata Basquete Plus Size M10 Classic Chicago.png", 
    alt: "Regata Basquete Plus Size M10 Classic Chicago" },

  { id: 28, 
    name: "Legging Dri-FIT One", 
    price: 349.90, 
    gender: "female",
    image: "imagem/atalho_roupa/Feminino/legging_Dri-FIT_One_fem.png", 
    alt: "Legging Dri-FIT One" },

  { id: 29, 
    name: "Short Challenger", 
    price: 249.90, 
    gender: "male",
    image: "imagem/atalho_roupa/Masculino/shorts_challenger.png", 
    alt: "Short Challenger" },

  { id: 30,
    name: "Short Murigú For All Sport", 
    price: 139.90, 
    gender: "male", 
    image: "imagem/atalho_roupa/Masculino/shorts-masculino-Murigú For All Sport.png", 
    alt: "Short Murigú For All Sport" }
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
