// JUNÇÃO FUNCIONAL DO SCRIPT PRINCIPAL COM CONTROLE DE ETAPAS

let carrinho = [];
let adicionaisPorLanche = {};
const precosAdicionais = {
  'cheddar': 2.00,
  'bacon': 3.00,
  'mussarela': 2.50
};

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const resumoTotal = document.getElementById('resumo-total');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    let adicionais = adicionaisPorLanche[index] || [];
    let adicionaisHtml = '';
    let totalAdicionais = 0;
    adicionais.forEach(ad => {
      const nomeFormatado = ad.toLowerCase(); // padroniza para minúsculo
      const precoAd = precosAdicionais[nomeFormatado] || 0;
      adicionaisHtml += `<li style="margin-left: 20px; font-size: 0.9em">+ ${ad} - R$ ${precoAd.toFixed(2)}</li>`;
      totalAdicionais += precoAd;
    });

    const li = document.createElement('li');
    li.innerHTML = `<strong>#${index + 1}</strong> - ${item.nome} - R$ ${(item.preco + totalAdicionais).toFixed(2)}
                    <button onclick="removerLanchePorIndex(${index})">×</button>
                    <ul>${adicionaisHtml}</ul>`;
    lista.appendChild(li);
    total += item.preco + totalAdicionais;
  });

  resumoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function adicionarLanche(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerLanche(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index > -1) {
    carrinho.splice(index, 1);
    delete adicionaisPorLanche[index];
    atualizarCarrinho();
  }
}

function removerLanchePorIndex(index) {
  carrinho.splice(index, 1);
  delete adicionaisPorLanche[index];
  atualizarCarrinho();
}

function adicionarAdicional(nome) {
  const id = parseInt(document.getElementById('idLancheAdicional').value) - 1;
  if (!carrinho[id]) return alert('Lanche não encontrado!');
  adicionaisPorLanche[id] = adicionaisPorLanche[id] || [];
  adicionaisPorLanche[id].push(nome);
  atualizarCarrinho();
}

function removerAdicional(nome) {
  const id = parseInt(document.getElementById('idLancheAdicional').value) - 1;
  if (!carrinho[id] || !adicionaisPorLanche[id]) return;
  const index = adicionaisPorLanche[id].indexOf(nome);
  if (index > -1) adicionaisPorLanche[id].splice(index, 1);
  atualizarCarrinho();
}

// Event Listeners para Adicionais
Array.from(document.getElementsByClassName('add-adicional')).forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.parentElement.dataset.nome;
    adicionarAdicional(nome);
  });
});

Array.from(document.getElementsByClassName('remove-adicional')).forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.parentElement.dataset.nome;
    removerAdicional(nome);
  });
});

// CONTROLE DE ETAPAS
function mostrarEtapa(id) {
  document.querySelectorAll('.etapa').forEach(etapa => etapa.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Etapas - avançar e voltar
document.getElementById('avancar1').addEventListener('click', () => mostrarEtapa('etapaAdicionais'));
document.getElementById('voltarAdicionais').addEventListener('click', () => mostrarEtapa('etapa1'));
document.getElementById('avancarAdicionais').addEventListener('click', () => mostrarEtapa('etapa2'));
document.getElementById('voltar1').addEventListener('click', () => mostrarEtapa('etapaAdicionais'));
document.getElementById('avancar2').addEventListener('click', () => mostrarEtapa('etapa3'));
document.getElementById('voltar2').addEventListener('click', () => mostrarEtapa('etapa2'));
document.getElementById('avancar3').addEventListener('click', () => mostrarEtapa('etapa4'));
document.getElementById('voltar3').addEventListener('click', () => mostrarEtapa('etapa3'));

// Finalizar
function finalizarPedido() {
  let mensagem = '🍔 *Pedido Meta Burguer* 🍔\n\n';
  let total = 0;

  carrinho.forEach((item, index) => {
    const adicionais = adicionaisPorLanche[index] || [];
    let totalAdicionais = 0;
    mensagem += `🔸 *#${index + 1}* - ${item.nome}\n`;
    adicionais.forEach(ad => {
      const nomeFormatado = ad.toLowerCase();
      const precoAd = precosAdicionais[nomeFormatado] || 0;
      mensagem += `   ➕ ${ad} - R$ ${precoAd.toFixed(2)}\n`;
      totalAdicionais += precoAd;
    });
    total += item.preco + totalAdicionais;
  });

  mensagem += `\n💵 *Total:* R$ ${total.toFixed(2)}\n`;

  mensagem += '\n📍 *Endereço:*\n';
  mensagem += `🏠 Rua: ${document.getElementById('rua').value}\n`;
  mensagem += `🏡 Número: ${document.getElementById('numero').value}\n`;
  mensagem += `🏙️ Bairro: ${document.getElementById('bairro').value}\n`;
  mensagem += `📝 Complemento: ${document.getElementById('complemento').value}\n`;

  mensagem += `\n💳 *Pagamento:* ${document.getElementById('pagamento').value}\n`;

  const url = `https://wa.me/5531995080787?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

document.getElementById('finalizar').addEventListener('click', finalizarPedido);
