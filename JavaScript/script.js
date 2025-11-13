const coracoes = document.querySelectorAll(".imagem__favorito i");
coracoes.forEach(coracao => {
    const card = coracao.closest(".card");
    const nomeProduto = card.querySelector("h1").innerText;

    let listaFav = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(listaFav.some(p => p.nome === nomeProduto)){
        coracao.classList.remove("far");
        coracao.classList.add("fa-solid");
    }

    coracao.addEventListener("click", e => {
        e.stopPropagation();
        const produto = {
            nome: card.querySelector("h1").innerText,
            preco: card.querySelector("span").innerText,
            imagem: card.querySelector("img").src
        };
        let lista = JSON.parse(localStorage.getItem("favoritos")) || [];
        const index = lista.findIndex(p => p.nome === produto.nome);

        if(index > -1){
            lista.splice(index, 1);
            coracao.classList.remove("fa-solid");
            coracao.classList.add("far");
            alert("Produto removido dos favoritos!");
        } else {
            lista.push(produto);
            coracao.classList.remove("far");
            coracao.classList.add("fa-solid");
            alert("Produto adicionado aos favoritos!");
        }
        localStorage.setItem("favoritos", JSON.stringify(lista));
        // NUNCA chamar carregarFavoritos() aqui
    });
});
