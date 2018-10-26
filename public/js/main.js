// Guarda o tempo inicial do jogo
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();

	$("#usuarios").selectize({
		create: true,
		sortField: 'text'
	});

	$(".tooltip").tooltipster({
		trigger: "custom"
	});
})


// Atualiza o tamanho da frase a ser digitada durante o jogo
// Divide a frase em espaços para saber a quantidade de palavras,
// Após atualiza na página quantas palavras possuem a frase
function atualizaTamanhoFrase() {
	// Contar palavras de um determinado texto utilizando o length:
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanhoFrase"); 
	tamanhoFrase.text(numPalavras);
}


// Atualiza na página qual o tempo de digitação (em segundos)
function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
}


//Quando for inserido dados no campo irá efetuar algum evento
function inicializaContadores() {
	campo.on("input", function() {
		// .val() busca o valor que o usuário digitou
		var conteudo = campo.val();

		// Pega o conteudo e separa por algum espaco
		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);

	});
}


// Calcula o tempo restante de digitacao, 
// após entrar no campo de digitacao (quando ele é selecionado de alguma maneira)
function inicializaCronometro() {
	campo.one("focus", function(){
		var tempoRestante = $("#tempo-digitacao").text();
		var cronometroId = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			// attr = atributo
			if (tempoRestante < 1) {
				clearInterval(cronometroId);
				finalizaJogo();
			}
		}, 1000);
	});
}


function finalizaJogo() {
	campo.attr("disabled", true);
	campo.toggleClass("campo-desativado");
	inserePlacar();
}


// Marca o campo com a cor correta, conforme o que for digitado 
function inicializaMarcadores() {
	var frase = $(".frase").text();
	campo.on("input", function(){
		digitado = campo.val(); // pega o valor sendo digitado no momento
		var comparavel = frase.substr(0 , digitado.length); // compara o que foi digitado com a frase
		if (digitado == comparavel) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		} else {
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}


// Reinicia o jogo
function reiniciaJogo() {
	// Habilita o campo para ser digitado novamente
	campo.attr("disabled", false);
	// Limpa os dados que foram inseridos no campo
	campo.val("");
	// Zera os valores dos contadores
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass("campo-desativado");
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
}
