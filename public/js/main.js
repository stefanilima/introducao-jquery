// Contar palavras de um determinado texto:
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanhoFrase"); 
tamanhoFrase.text(numPalavras);



var campo = $(".campo-digitacao");
//Quando for inserido dados no campo irá efetuar algum evento
campo.on("input", function() {
	// .val() busca o valor que o usuário digitou
	var conteudo = campo.val();

	var qtdPalavras = conteudo.split(" ").length;
	$("#contador-palavras").text(qtdPalavras);

	var qtdCaracteres = conteudo.length;
	$("#contador-caracteres").text(qtdCaracteres);

});