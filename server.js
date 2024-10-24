const express = require("express");
const app = express();

// Função que gera um número inteiro aleatório entre 1 e 3
function getRandomInt() {
  return Math.floor(Math.random() * 3) + 1;
}

// Função que retorna 'pedra', 'papel' ou 'tesoura' com base no número gerado
function jogadaAleatoria() {
  const jogadas = ['pedra', 'papel', 'tesoura'];
  const index = getRandomInt() - 1; // Índice entre 0 e 2
  return jogadas[index];
}

// Função que determina o vencedor
function determinarVencedor(jogador, servidor) {
  if (jogador === servidor) {
    return "Empate!";
  }

  if (
    (jogador === 'pedra' && servidor === 'tesoura') ||
    (jogador === 'papel' && servidor === 'pedra') ||
    (jogador === 'tesoura' && servidor === 'papel')
  ) {
    return "Você ganhou!";
  }

  return "Servidor ganhou!";
}

// Rota para o jogo Pedra, Papel, Tesoura
app.get("/PedraPapelTesoura/", function (req, res) {
  var jogada = req.query["jogada"]?.toLowerCase(); // Captura a jogada do usuário e converte para minúsculo

  // Verifica se a jogada é válida
  if (jogada && ['pedra', 'papel', 'tesoura'].includes(jogada)) {
    const jogadaServidor = jogadaAleatoria(); // Jogada aleatória do servidor
    const resultado = determinarVencedor(jogada, jogadaServidor); // Determina o vencedor

    res.send(`Você jogou: ${jogada}. Servidor jogou: ${jogadaServidor}. Resultado: ${resultado}`);
  } else {
    res.send("Preencha sua jogada corretamente como 'pedra', 'papel' ou 'tesoura'.");
  }
});

// Inicializa o servidor
app.listen(3000, function (erro) {
  if (erro) {
    console.log("Erro ao iniciar o servidor");
  } else {
    console.log("Servidor iniciado na porta 3000");
  }
});
