const paymentOptions = document.querySelectorAll('input[name="payment"]');
const formContainer = document.getElementById('payment-form-container');
const paymentButton = document.querySelector('.btn-confirmar-pagamento');
const itensPedidoContainer = document.querySelector('.itens-pedido');
const totalPedidoContainer = document.querySelector('.total-pedido');

let selectedPayment = 'cartao';
let stage = 0;

// Carregar carrinho
function carregarCarrinho() {
    const raw = localStorage.getItem('carrinho');
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return parsed.map(item => ({
            id: item.id ?? Date.now() + Math.floor(Math.random() * 1000),
            nome: item.nome ?? item.name ?? "Produto sem nome",
            preco: Number(item.preco ?? item.price ?? 0),
            quantidade: Number(item.quantidade ?? item.quantity ?? 1),
            image: item.image ?? item.imagem ?? "./img/default.png"
        }));
    } catch (e) {
        console.warn("Erro ao carregar carrinho:", e);
        return [];
    }
}

// Atualiza produtos e total
function atualizarDetalhesPedido() {
    const carrinho = carregarCarrinho();
    if (carrinho.length === 0) {
        itensPedidoContainer.innerHTML = `<p>Seu carrinho está vazio.</p>`;
        totalPedidoContainer.textContent = '';
        return;
    }

    let total = 0;
    itensPedidoContainer.innerHTML = carrinho.map(item => {
        total += item.preco * item.quantidade;
        return `
            <div class="item-pedido" data-id="${item.id}">
                <img src="${item.image}" alt="${item.nome}">
                <div class="item-info">
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-detalhes">
                        <div class="item-preco">Preço unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                        <div class="item-quantidade">Quantidade: ${item.quantidade}</div>
                    </div>
                </div>
            </div>
        `}).join('');

    totalPedidoContainer.textContent = `Total a Pagar: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Inicializa
atualizarDetalhesPedido();

// Opções de pagamento
paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        selectedPayment = option.value;
        stage = 0;
        paymentButton.textContent = 'Continuar';
        formContainer.innerHTML = '';
    });
});

// Botão Continuar / Confirmar
paymentButton.addEventListener('click', () => {
    if(stage === 0){
        if(selectedPayment === 'cartao' || selectedPayment === 'debito'){
            formContainer.innerHTML = `
                <div class="card-info">
                    <input type="text" placeholder="Nome no cartão" required />
                    <input type="text" placeholder="Número do cartão" maxlength="16" required />
                    <input type="text" placeholder="Validade (MM/AA)" required />
                    <input type="text" placeholder="CVC" maxlength="3" required />
                    <input type="text" placeholder="CPF" required />
                </div>`;
        } else if(selectedPayment === 'pix'){
            formContainer.innerHTML = `
                <div class="pix-info">
                    <p>Escaneie o QR Code abaixo para pagar:</p>
                    <canvas id="qrcode"></canvas>
                </div>`;
            gerarQRCodePix();
        } else if(selectedPayment === 'boleto'){
            formContainer.innerHTML = `<p>O boleto será gerado após a confirmação do pagamento.</p>`;
        }
        paymentButton.textContent = 'Confirmar Pagamento';
        stage = 1;
    } else {
        confirmarPagamento();
    }
});

function confirmarPagamento(){
    const tipo = selectedPayment === 'cartao' ? 'Cartão de Crédito' :
                 selectedPayment === 'debito' ? 'Cartão de Débito' :
                 selectedPayment === 'pix' ? 'PIX' : 'Boleto Bancário';
    alert(`✅ Pagamento realizado com sucesso via ${tipo}!`);
    localStorage.removeItem('carrinho');
    window.location.href = "./obrigado.html";
}

function gerarQRCodePix(){
    const canvas = document.getElementById('qrcode');
    const pixText = "00020126580014BR.GOV.BCB.PIX0136524933328145204000053039865406399.905802BR5920Vinícius Modesto Moreto6009Piracicaba62070503***6304ABCD";
    QRCode.toCanvas(canvas, pixText, { width: 200 }, function(error){ if(error) console.error(error); });
}

//CEP AUTOMÁTICO

document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
    cepInput.addEventListener("input", () => {
        cepInput.value = cepInput.value.replace(/\D/g, "")
                                       .replace(/(\d{5})(\d)/, "$1-$2");
    });

    cepInput.addEventListener("blur", () => {
        const cep = cepInput.value.replace(/\D/g, "");
        if (cep.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(dados => {
                if (dados.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                document.getElementById("logradouro").value = dados.logradouro;
                document.getElementById("bairro").value = dados.bairro;
                document.getElementById("localidade").value = dados.localidade;
                document.getElementById("uf").value = dados.uf;
            })
            .catch(() => {
                alert("Erro ao buscar o CEP. Tente novamente.");
            });
    });
});

// --- COLOQUE ISSO APÓS AS SUAS DECLARAÇÕES EXISTENTES ---
const enderecoDiv = document.querySelector('.endereco');

// Esconder endereço ao iniciar (mantendo o CEP intacto)
if (enderecoDiv) {
    enderecoDiv.style.display = 'none';
}

// Ajusta comportamento do botão Continuar / Confirmar
paymentButton.addEventListener('click', () => {
    // 1) Se o endereço ainda estiver escondido: mostrar o endereço e parar aqui
    if (enderecoDiv && (enderecoDiv.style.display === 'none' || enderecoDiv.style.display === '')) {
        enderecoDiv.style.display = 'block';
        paymentButton.textContent = 'Continuar'; // mantém rótulo claro
        // opcional: rolar até o endereço para melhor UX
        enderecoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return; // só mostrar endereço nessa primeira ação
    }

    // 2) Se o endereço já está visível, seguir com o fluxo anterior:
    if (stage === 0) {
        // mostra o formulário conforme a opção de pagamento selecionada
        if (selectedPayment === 'cartao' || selectedPayment === 'debito') {
            formContainer.innerHTML = `
                <div class="card-info">
                    <input type="text" placeholder="Nome no cartão" required />
                    <input type="text" placeholder="Número do cartão" maxlength="16" required />
                    <input type="text" placeholder="Validade (MM/AA)" required />
                    <input type="text" placeholder="CVC" maxlength="3" required />
                    <input type="text" placeholder="CPF" required />
                </div>`;
        } else if (selectedPayment === 'pix') {
            formContainer.innerHTML = `
                <div class="pix-info">
                    <p>Escaneie o QR Code abaixo para pagar:</p>
                    <canvas id="qrcode"></canvas>
                </div>`;
            gerarQRCodePix();
        } else if (selectedPayment === 'boleto') {
            formContainer.innerHTML = `<p>O boleto será gerado após a confirmação do pagamento.</p>`;
        }
        paymentButton.textContent = 'Confirmar Pagamento';
        stage = 1;
    } else {
        // etapa de confirmação final
        confirmarPagamento();
    }
});

