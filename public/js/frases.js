$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


// Busca as frases disponiveis no servidor
function fraseAleatoria() {
	$("#spinner").toggle(); // Exibe a rodinha de carregamento

	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function(){
		// Exibibe o erro em caso de falhas por 2 segundos
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		}, 2000);
	})
	.always(function(){ // Esconde o sppiner após finalizar a requisição
		$("#spinner").toggle();
	});
}


// Seleciona uma frase aleatória conforme as que estão disponíveis no servidor
// Após atualiza os dados da mesma na página
function trocaFraseAleatoria(data) {
	var frase = $(".frase");

	// Math.random: gera um numero aleatorio 0.XXXXXXXX
	// Math.floor: arredonda o número para baixo e em decimal
	var numeroAleatorio = Math.floor(Math.random() * data.length);

	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}


// Busca somente a frase conforme o id passado no input
function buscaFrase() {
	$("#spinner").toggle(); // Exibe a rodinha de carregamento

	var fraseId = $("#frase-id").val();
	var dados = { id: fraseId };

	// Passa os dados como parametro
	$.get("http://localhost:3000/frases", dados, trocaFrase)
	.fail(function(){
		// Exibibe o erro em caso de falhas por 2 segundos
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		}, 2000);
	})
	.always(function(){ // Esconde o sppiner após finalizar a requisição
		$("#spinner").toggle();
	});

}


// Atualiza os dados da frase na página
function trocaFrase(data) {
	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);
}
