const express = require("express");
const app = express();


function getRandomInt() {
  return Math.floor(Math.random() * 3) + 1;
}

function jogadaAleatoria() {
  const jogadas = ['pedra', 'papel', 'tesoura'];
  const index = getRandomInt() - 1;
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

app.get("/PedraPapelTesoura/", function (req, res) {
  var jogada = req.query["jogada"];


  if (jogada && ['pedra', 'papel', 'tesoura'].includes(jogada)) {
    const jogadaServidor = jogadaAleatoria(); 
    const resultado = determinarVencedor(jogada, jogadaServidor); 

    res.send(`Você jogou: ${jogada}. Servidor jogou: ${jogadaServidor}. Resultado: ${resultado}`);
  } else {
    res.send("Preencha sua jogada corretamente como 'pedra', 'papel' ou 'tesoura'.");
  }
});


app.listen(3000, function (erro) {
  if (erro) {
    console.log("Erro ao iniciar o servidor");
  } else {
    console.log("Servidor iniciado");
  }
});
