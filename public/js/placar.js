$("#botao-placar").click(mostrar);
$("#botao-sync").click(sincronizaPlacar);

function mostrar () {
	// Realiza a alteracao de hide ou show do elemento, de forma mais agradavel, utilizando um slide
	$(".placar").stop().slideToggle();
}

function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500); // Exibe o placar no final do jogo
    scrollPlacar();
}


function scrollPlacar() {
	var posicaoPlacar = $(".placar").offset().top;
	$("body").animate({
		scrollTop: posicaoPlacar+"px"
	}, 1000);
}


function novaLinha(usuario,palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Ícone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}


function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(); // Insere um display none e vai esmaecendo o elemento
    setTimeout(function(){
    	// O fadeOut nào faz a remocao, então é necessário esperar ele executar, para depois dar um remove no elemento
    	linha.remove();
    }, 1000); 
}


function sincronizaPlacar() {
	var placar = [];
	var linhas = $("tbody>tr");
	
	linhas.each(function(){
		// Seleciona o primeiro td do tr
		var usuario = $(this).find("td:nth-child(1)").text();
		// Seleciona o segundo td do tr
		var palavras = $(this).find("td:nth-child(2)").text();
		
		// Cria o objeto com os dados a serem gravados
		var score  = {
			usuario: usuario,
			pontos: palavras,
		};

		// Vincula os dados no array
		placar.push(score);
    });

    var dados = {
		placar: placar
	};

	//Enviando os dados por post para o servidor
	$.post("http://localhost:3000/placar", dados, function(){
		console.log("Salvou o placar");
		$(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar");
	}).fail(function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
	}).always(function(){
		setTimeout(function(){
			$(".tooltip").tooltipster("close");
		}, 1200);
	});
}


function atualizaPlacar() {
	$.get("http://localhost:3000/placar", function(data){
		// Criando as linhas - tr
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			//modificado aqui
            linha.find(".botao-remover").click(removeLinha);
			$("tbody").append(linha);
		});
	});
}