let carrinho = [];
let adicionaisPorLanche = {};

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const resumoTotal = document.getElementById('resumo-total');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const adicionais = adicionaisPorLanche[index] || [];
    let adicionaisHtml = '';
    let totalAdicionais = 0;

    adicionais.forEach(ad => {
      const preco = ad.preco;
      adicionaisHtml += `<li style="margin-left:20px;">+ ${ad.nome} - R$ ${preco.toFixed(2)}</li>`;
      totalAdicionais += preco;
    });

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>#${index + 1}</strong> - ${item.nome} - R$ ${(item.preco + totalAdicionais).toFixed(2)}
      <button onclick="removerLanchePorIndex(${index})">×</button>
      ${adicionais.length > 0 ? `<ul>${adicionaisHtml}</ul>` : ''}
    `;
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

  // 🚫 Bloquear adicionais em bebidas
  const nomeLanche = carrinho[id].nome.toLowerCase();
  if (nomeLanche.includes('coca') || nomeLanche.includes('guaraná')) {
    alert('❌ Não é possível adicionar adicionais a bebidas.');
    return;
  }

  adicionaisPorLanche[id] = adicionaisPorLanche[id] || [];
  const preco = {
    bacon: 5.00,
    queijo: 2.00,
    calabresa: 3.00,
    vinagrete: 3.00,
    tomate: 2.00,
    milho: 3.00,
    cheddar: 5.00,
    'frango desfiado': 5.00,
    salsicha: 2.00
  }[nome.toLowerCase()] || 0;
  adicionaisPorLanche[id].push({ nome, preco });
  atualizarCarrinho();
}

function removerAdicional(nome) {
  const id = parseInt(document.getElementById('idLancheAdicional').value) - 1;
  if (!carrinho[id] || !adicionaisPorLanche[id]) return;
  const index = adicionaisPorLanche[id].findIndex(a => a.nome === nome);
  if (index > -1) adicionaisPorLanche[id].splice(index, 1);
  atualizarCarrinho();
}

// Bebidas são itens normais
function adicionarBebidaDireta(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerBebidaDireta(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index > -1) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }
}

// BOTÕES
document.querySelectorAll('.add-adicional').forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.closest('.adicional').dataset.nome;
    adicionarAdicional(nome);
  });
});

document.querySelectorAll('.remove-adicional').forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.closest('.adicional').dataset.nome;
    removerAdicional(nome);
  });
});

// ETAPAS
function mostrarEtapa(id) {
  document.querySelectorAll('.etapa').forEach(e => e.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

document.getElementById('avancar1').onclick = () => mostrarEtapa('etapaAdicionais');
document.getElementById('voltarAdicionais').onclick = () => mostrarEtapa('etapa1');
document.getElementById('avancarAdicionais').onclick = () => mostrarEtapa('etapaBebidas');
document.getElementById('voltarBebidas').onclick = () => mostrarEtapa('etapaAdicionais');
document.getElementById('avancarBebidas').onclick = () => mostrarEtapa('etapa2');
document.getElementById('voltar1').onclick = () => mostrarEtapa('etapaBebidas');
document.getElementById('avancar2').onclick = () => mostrarEtapa('etapa3');
document.getElementById('voltar2').onclick = () => mostrarEtapa('etapa2');
document.getElementById('avancar3').onclick = () => mostrarEtapa('etapa4');
document.getElementById('voltar3').onclick = () => mostrarEtapa('etapa3');

// FINALIZAR
document.getElementById('finalizar').onclick = () => {
  let mensagem = '*🍔 Pedido Meta Burguer 🍔*\n\n';
  let total = 0;

  carrinho.forEach((item, index) => {
    const adicionais = adicionaisPorLanche[index] || [];
    let totalAd = 0;

    mensagem += `#${index + 1} - ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;

    adicionais.forEach(ad => {
      mensagem += `   ➕ ${ad.nome} - R$ ${ad.preco.toFixed(2)}\n`;
      totalAd += ad.preco;
    });

    total += item.preco + totalAd;
  });

  mensagem += `\n💵 Total: R$ ${total.toFixed(2)}\n\n📍 *Endereço:*\n`;
  mensagem += `Rua: ${document.getElementById('rua').value}\n`;
  mensagem += `Número: ${document.getElementById('numero').value}\n`;
  mensagem += `Bairro: ${document.getElementById('bairro').value}\n`;
  mensagem += `Complemento: ${document.getElementById('complemento').value}\n`;
  mensagem += `\n💳 Pagamento: ${document.getElementById('pagamento').value}`;

  const link = "https://wa.me/5531995080787?text=" + encodeURIComponent(mensagem);
  window.open(link, '_blank');
};
