const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

var pontuacao = 0;

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch === true){
		disableCards()
    pontuacao = pontuacao + 10;
		setTimeout(() => {
      pontos();
      mensagem();
    }, 500);
    resetBoard()
    
  } else{
    unflipCards()
    pontuacao = pontuacao - 3;
    setTimeout(() => {
      pontos();
    }, 400);
  }
}

function pontos (){
	document.getElementById("pontos").innerHTML = pontuacao;
}

function mensagem(){
  var primeiraCarta = firstCard.dataset.framework;
  if(primeiraCarta === "casa"){
    alert("Fique em casa\nSe você está com sintomas de gripe, fique em casa por 14 dias e siga as orientações do Ministério da Saúde para o isolamento domiciliar. Só procure um médico caso tenha falta de ar!\n\nPor quê? Assim você evita a superlotação dos hospitais e ajuda no combate ao Coronavírus.");
  }  else if(primeiraCarta === "distanciamento"){
    alert("Mantenha uma distância segura de 2 metros\nMantenha pelo menos 2 metros de distância entre você e qualquer pessoa que esteja tossindo ou espirrando.\n\nPor quê? Quando alguém tosse ou espirra, pulveriza pequenas gotas líquidas do nariz ou da boca, que podem conter vírus.");
  }  else if(primeiraCarta === "mascara"){
    alert("Use mascara ao sair de casa\nUsando a máscara você protege o outro e pratica o cuidado genuíno com o próximo, se todos usarmos à máscara estaremos protegendo uns aos outros.");
  }  else if(primeiraCarta === "lavar_maos"){
    alert("Lave suas mãos frequentemente\nLave com cuidado as mãos antes e depois das refeições com água e sabão, envolvendo os dedos, as palmas e costas das mãos até a altura dos punhos, ou então higienize com álcool em gel 70%.\n\nPor quê? Higienizando corretamente as mãos você mata os vírus que causam resfriado, gripe e COVID-19.");
  }  else if(primeiraCarta === "aglomeracao"){
    alert("Evite aglomerações\nEvite aglomerações e mantenha os ambientes limpos e bem ventilados.\n\nPor quê? A propagação do vírus é mais fácil em ambientes fechados com grande número de pessoas.");
  }  else if(primeiraCarta === "espirro"){
    alert("Cuidados ao tossir ou espirrar\nVocê deve cobrir a boca e o nariz com o cotovelo ou\num tecido dobrado quando tossir ou espirrar. Em seguida, descarte o tecido usado imediatamente.\n\nPor quê? Gotas espalham vírus. Ao seguir uma boa\nhigiene respiratória, você protege as pessoas ao seu redor contra resfriado, gripe e COVID-19.");
  }  else if(primeiraCarta === "tocar_rosto"){
    alert("Não toque o rosto\nEvite tocar o rosto com as mãos não lavadas.\n\nPor quê? O vírus entra no organismo por meio do nariz, boca e olhos. Evitar levar o vírus da mão para essas mucosas é uma das melhores medidas para não ficar doente.");
  }  else if(primeiraCarta === "brinquedos"){
    alert("Higienize o ceular e os brinquedos\nHigienize com frequência o celular, tablet e os brinquedos das crianças.\n\nPor quê? O vírus causador do COVID-19 consegue sobreviver por um tempo em algumas superfícies.");
  }  else{
    alert("Erro na carta:" + primeiraCarta);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));