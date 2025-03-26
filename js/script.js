let numMesas = []; // todas as mesas
let produtosLista = []; //produtosCadastrados
let precoLista = []; //Valor dessa lista
let numMesasHTML;
let numeroMesas = 1; //variavel para fazer os botões da mesa
let contadorProdutos = 0; //Variavel contadora para toda vez que abrir 'comandar'verificar se foi adicionado mais coisa
let contadorComandar = 0; //Comparar com a contadorProdutos 
let buttonPintar; // Para pintar as mesas que tem algo cadastrado

//Variável do financeiro
let extratoGeral = 0; //Receita do restaurante

//Contadora da taxa 10%
let pagouTaxa = 0;
let naoPagouTaxa = 0;

//Contador de cada metodo de pagamento
let contDinheiro = 0;
let contCred = 0;
let contDeb = 0;
let contPix = 0;
let contCheque = 0;
//quanto cada método arrecadou total
let valDinheiro = 0;
let valCred = 0;
let valDeb = 0;
let valPix = 0;
let valCheque = 0;
//Audio
let audioDinheiro = new Audio('sons/dinheiro.wav');
let audioConfirmLancar = new Audio('sons/audioConfirmLancar.wav');
let audioError = new Audio('sons/error.wav');
let fecharMesaSOM = new Audio('sons/fecharMesa.wav');
let addProduto = new Audio('sons/addProduto.wav');
let mudarAba = new Audio('sons/change.wav');
let vazia = new Audio('sons/vazia.wav');
//Função para saber quantas mesas serão adicionadas
function qntMesas() {
    //elementos HTML que quero manipular (mostrar,não mostrar...)
    numMesasHTML = document.getElementById("numMesas").value;
    let mesas = document.querySelector(".mesas");
    let todasAsMesas = document.querySelector(".todasAsMesas");
    let produtos = document.querySelector(".produtos");

    let tipoEstab = document.getElementById("tipoEstab").value;
    let nomeEstab = document.getElementById("nomeEstab").value;
    let artigo = document.getElementById("artigo").value;

    //se o valor for entre 0 e 50
    if (numMesasHTML > 0 && numMesasHTML <= 50 && tipoEstab !== "" && nomeEstab !== "") {
        mesas.style.display = "none";  //Apenas para alterar html(3)
        todasAsMesas.style.display = "none";
        produtos.style.display = "block";
        //Criar lista vazias até o número que o usuário colocou
        for (let i = 1; i <= numMesasHTML; i++) {
            numMesas.unshift([]);
        }
        //enquanto o numeroMesas(começa com 1) não for igual a números de mesas total,faça
        while (numeroMesas <= numMesas.length) {
            btn = document.createElement("button"); //cria um botão

            btn.innerHTML = numeroMesas; //numero da mesa
            btn.value = numeroMesas;
            btn.type = "submit";
            btn.name = "button";
            btn.id = "mesa" + numeroMesas; //dar id no button (USAR MAIS PARA FRENTE)
            // btn.addEventListener("click", verificarButton);
            document.querySelector('.todasAsMesas').appendChild(btn); //Definindo classe pai e filha
            if (numeroMesas % 5 == 0) { //quando der 5 mesas,ele vai quebrar linha com <br>
                let br = document.createElement("br");
                document.querySelector('.todasAsMesas').appendChild(br);
            }
            numeroMesas++; // adicionando +1 nessa variavel

            let titulo = document.getElementById("tituloRestaurante");
            titulo.textContent = `${tipoEstab} ${artigo} ${nomeEstab}`;
        }
    } else {
        audioError.play();
        alert("Entre 0 e 50 mesas! ou nomes vazio"); //Valor incorreto
    }

}

//Para adicionar produtos do restaurante(HTML)
function irProdutos() {
    mudarAba.play();
    let todasAsMesas = document.querySelector(".todasAsMesas"); //Somente manipulando css e html
    let comandar = document.querySelector(".comandar");//no javascript (mostrar uma classe e tiras as outras)
    let produtos = document.querySelector(".produtos");
    let extrato = document.querySelector(".extrato");
    let informacoes = document.querySelector(".informacoes");

    comandar.style.display = "none";
    todasAsMesas.style.display = "none";
    extrato.style.display = "none";
    informacoes.style.display = "none";
    produtos.style.display = "block";
}

//Adicionando produtos na lista
function adicionarProdutos() {
    //Variáveis a serem pegar
    let nomeProduto = document.getElementById("nomeProduto").value;
    let precoProduto = document.getElementById("precoProduto").value;

    //Para o produto ser válido,precisa dessas condições
    var validacaoProdutos = nomeProduto !== null && nomeProduto !== undefined && nomeProduto !== ""
        && precoProduto > 0;

    if (validacaoProdutos) { //se as condições forem verdadeiras,adicionar
        document.getElementById("nomeProduto").value = ""; //Esvaziar textos quando cadastrar
        document.getElementById("precoProduto").value = ""; //deixando ele vazio
        nomeProduto = nomeProduto.toUpperCase(); //Convertendo para tudo maiusculo

        produtosLista.push([nomeProduto]); //Adicionamento nome do produto em uma lista
        precoLista.push([precoProduto]);//Adicionamento valor do produto em outra lista

        //Criando td e tr dentro da tabela(#tabela) já criada no html
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let td2 = document.createElement('td');

        tr.appendChild(td); // quem vai ser em cima do outro
        tr.appendChild(td2);

        document.getElementById('tabela').appendChild(tr);

        td.textContent = td.textContent + `${nomeProduto} ` //adicionando e adicionando sempre o anterior
        td2.textContent = td2.textContent + `R$ ${precoProduto} ` // para não apagar
        contadorProdutos = produtosLista.length;
        addProduto.play();
        alert("Cadastrado");
    } else {
        audioError.play();
        alert("Cadastrado errado!");

    }

}

//Apenas mostrar no html e adicionar botão para mesa
function irMesas() {
    mudarAba.play();
    let numMesasHTML = document.querySelector(".todasAsMesas");
    let mesas = document.querySelector(".mesas");
    let produtos = document.querySelector(".produtos");
    let comandar = document.querySelector(".comandar");
    let extrato = document.querySelector(".extrato");
    let informacoes = document.querySelector(".informacoes");

    extrato.style.display = "none";
    comandar.style.display = "none";
    mesas.style.display = "none";
    produtos.style.display = "none";
    informacoes.style.display = "none";
    numMesasHTML.style.display = "block"; //Mostrar essa div e apagar as anteriores

}

function fecharMesa() {
    let numMesa = document.getElementById("numMesa").value; //pegar valor num mesa no html
    numMesa = Number(numMesa);
    let taxa = document.getElementById("taxa").value;
    let addValorExtrato;
    if (numMesas[numMesa - 1].length === 0) {
        vazia.play();
        alert("Mesa Vazia!");
        return;
    }

    if (numMesa >= 1 && numMesa <= numMesas.length) { //Verificar se a mesa é válida (entre 1 e o máximo)
        //Se for válido...
        fecharMesaSOM.play();
        numMesa = numMesa - 1; // converter número e tirar 1 porque a lista começa com 0
        for (let produtos = 0; produtos < numMesas[numMesa].length; produtos++) { //percorer lista de mesas dentro da mesa
            addValorExtrato = Number(numMesas[numMesa][produtos]);//variável local para armazenar uma por uma

            if (taxa === "com") { // se tiver taxa de serviço
                let gorgetaValor = addValorExtrato * 0.1; // faz valor vezes 0,1
                addValorExtrato = addValorExtrato + gorgetaValor; // soma o valor total com valor multiplicado por 0,1
                extratoGeral = extratoGeral + addValorExtrato;  // adicionando  na variavel global

            } else {
                extratoGeral = extratoGeral + addValorExtrato;   // adicionando  na variavel global
            }

        }
        if (taxa === "com") {
            pagouTaxa = pagouTaxa + 1;

        } else {
            naoPagouTaxa = naoPagouTaxa + 1;

        }

        verificarPagamento(extratoGeral); //Verificar tipo de pagamento para contagem de cada método de pagamento e valor total
        consultarMesa(); // Para consultar mesa e retornar vazia
        alert("Mesa paga !");

        for (let produtos = 0; produtos <= numMesas[numMesa].length; produtos++) {//For para removar todos os produtos da mesa e fechar conta
            numMesas[numMesa].shift();
        }
        document.getElementById("consultar").textContent = `CONTA DA MESA ${numMesa + 1}`;
        document.getElementById("consumo").textContent = "Mesa vazia";
        document.getElementById("gorgeta").textContent = "";
        document.getElementById("total").textContent = "";
        let nomeButton = "mesa" + (numMesa + 1); //Criar botao com nome mesaX
        buttonPintar = document.getElementById(nomeButton); //aonde X é o numero da mesa

        buttonPintar.style.backgroundColor = "aliceblue"; //pintar o button da mesa em si
    } else {
        vazia.play();
        alert("Mesa invalida!");
    }

}
//Contador de método de pagamento e valor total por pagamento
function verificarPagamento(extratoGeral) {
    let pagamento = document.getElementById("pagamento").value;
    if (pagamento == 1) {
        contDinheiro = contDinheiro + 1; // Aumentador contador dinheiro
        valDinheiro = extratoGeral - valCred - valDeb - valPix - valCheque; // extrato geral - todos(menos dinheiro)
    } else if (pagamento == 2) {
        contCred = contCred + 1;
        valCred = extratoGeral - valDinheiro - valDeb - valPix - valCheque;
    } else if (pagamento == 3) {
        contDeb = contDeb + 1;
        valDeb = extratoGeral - valDinheiro - valCred - valPix - valCheque;
    } else if (pagamento == 4) {
        contPix = contPix + 1;
        valPix = extratoGeral - valDinheiro - valDeb - valCred - valCheque;
    } else if (pagamento == 5) {
        contCheque = contCheque + 1;
        valCheque = extratoGeral - valDinheiro - valDeb - valCred - valPix;
    }
}
//Ver consumo da mesa
function consultarMesa() {
    let numMesa = document.getElementById("numMesa").value;
    let consumo = document.getElementById("consumo");
    let gorgeta = document.getElementById("gorgeta");
    let consultar = document.getElementById("consultar");
    let total = document.getElementById("total");
    let valorTotal = 0; //inicializando como 0 para interpretar como Number
    let gorgetaValor = 0;
    numMesa = Number(numMesa); //Converter o valor input em number


    if (numMesa > 1 && numMesa <= numMesas.length) { //Se ela for entre 2 e ultima mesa
        numMesa = numMesa - 1;  // tirar -1 para comparar com a lista que começa com 0

        if (numMesas[numMesa].length === 0) {
            vazia.play();
            alert("Mesa vazia!"); //Nenhum produto comandado na mesa
            document.getElementById("consultar").textContent = `CONTA DA MESA ${numMesa + 1}`;
            document.getElementById("consumo").textContent = "Mesa vazia";
            document.getElementById("gorgeta").textContent = "";
            document.getElementById("total").textContent = "";

        } else {
            //percorer todas as listar dentro da lista da mesa
            for (let percorrendoMessas = 0; percorrendoMessas < numMesas[numMesa].length; percorrendoMessas++) {
                let numeroDaVez = Number(numMesas[numMesa][percorrendoMessas]); //converter em  number
                valorTotal = valorTotal + numeroDaVez; // adicionando preço da conta
            }

            consultar.textContent = `CONTA DA MESA ${numMesa + 1}`;
            //Adicionando valor total
            consumo.textContent = `CONSUMO: R$ ${valorTotal}`;
            //Adicionando valor do 10%
            gorgetaValor = valorTotal * 0.1;
            gorgeta.textContent = `TAXA DE SERVIÇO: R$ ${gorgetaValor.toFixed(2)}`;
            valorTotal = valorTotal + gorgetaValor;
            //Adicionando valor do Total com 10%
            total.textContent = `TOTAL: R$ ${valorTotal.toFixed(2)}`;

            //Mesma coisa se repete se mesa for 1
        }
    } else if (numMesa == 1) {
        if (numMesas[numMesa - 1].length === 0) {
            vazia.play();
            alert("Mesa vazia 1");
            document.getElementById("consultar").textContent = `CONTA DA MESA ${numMesa}`;
            document.getElementById("consumo").textContent = "Mesa vazia";
            document.getElementById("gorgeta").textContent = "";
            document.getElementById("total").textContent = "";
        } else {
            numMesa = 0;
            for (let percorrendoMessas = 0; percorrendoMessas < numMesas[numMesa].length; percorrendoMessas++) {
                let numeroDaVez = Number(numMesas[numMesa][percorrendoMessas]);
                valorTotal = valorTotal + numeroDaVez;
            }
            numMesa = numMesa + 1;
            consultar.textContent = `CONTA DA MESA ${numMesa}`;
            consumo.textContent = `CONSUMO: R$ ${valorTotal}`;
            gorgetaValor = valorTotal * 0.1;
            gorgeta.textContent = `TAXA DE SERVIÇO: R$ ${gorgetaValor.toFixed(2)}`;
            valorTotal = valorTotal + gorgetaValor;
            total.textContent = `TOTAL: R$ ${valorTotal.toFixed(2)}`;

        }
    } else {
        audioError.play();
        alert("Mesa invalida!");
    }

}


//Abrir HTML E MONTAR OPTION CONFORME OS PRODUTOS
function comandar() {
    if (contadorProdutos === 0) {
        audioError.play();
        alert("Nenhum produto cadastrado");

    }
    if (contadorProdutos !== 0) {
        mudarAba.play();
        let numMesasHTML = document.querySelector(".todasAsMesas");
        let mesas = document.querySelector(".mesas");
        let produtos = document.querySelector(".produtos");
        let comandar = document.querySelector(".comandar");
        let extrato = document.querySelector(".extrato");
        let idProdutoNaLista = document.getElementById("produtoNaLista");
        let informacoes = document.querySelector(".informacoes");

        numMesasHTML.style.display = "none";
        mesas.style.display = "none";
        extrato.style.display = "none";
        produtos.style.display = "none";
        informacoes.style.display = "none";
        comandar.style.display = "block";

        if (contadorProdutos !== contadorComandar && contadorProdutos > contadorComandar) {
            //Criar option em todos os produtos que cadastramos
            //Verificar se ele cadastrou algo novo tambem com 'contadorComandar'
            for (let produto = contadorComandar; produto < produtosLista.length; produto++) {
                let option = document.createElement("option");
                option.text = produtosLista[produto];
                option.value = precoLista[produto];
                idProdutoNaLista.add(option);
                contadorComandar = contadorProdutos;
            }
        }

    }
    //Verificar se ele cadastrou algo
    if (contadorProdutos > contadorComandar) {
        let numMesasHTML = document.querySelector(".todasAsMesas");
        let mesas = document.querySelector(".mesas");
        let produtos = document.querySelector(".produtos");
        let comandar = document.querySelector(".comandar");
        let extrato = document.querySelector(".extrato");
        let idProdutoNaLista = document.getElementById("produtoNaLista");

        numMesasHTML.style.display = "none";
        mesas.style.display = "none";
        extrato.style.display = "none";
        produtos.style.display = "none";
        comandar.style.display = "block";
        for (let produto = contadorComandar; produto < contadorProdutos; produto++) {
            let option = document.createElement("option");
            option.text = produtosLista[produto];
            option.value = precoLista[produto];
            idProdutoNaLista.add(option);
            contadorComandar = contadorProdutos;
        }
    }

}

//Lançar produtos na mesa desejada
function lancarProduto() {
    let mesaComandar = document.getElementById("mesaComandar").value;
    let produtoNaLista = document.getElementById("produtoNaLista").value;
    mesaComandar = Number(mesaComandar);

    if (mesaComandar > 0 && mesaComandar < numMesas.length) {
        alert("Produto comandado");
        let nomeButton = "mesa" + mesaComandar; //Criar botao com nome mesaX
        buttonPintar = document.getElementById(nomeButton); //aonde X é o numero da mesa

        buttonPintar.style.backgroundColor = "#fa4"; //pintar o button da mesa em si
        mesaComandar = mesaComandar - 1; //CORRIGIR
        numMesas[mesaComandar].push(produtoNaLista); //Adicionamento produtos na mesa em si
        audioConfirmLancar.play();
    } else if (mesaComandar === numMesas.length) { //Para adicionar produto novo
        alert("Produto comandado");
        let nomeButton = "mesa" + mesaComandar;
        buttonPintar = document.getElementById(nomeButton);

        buttonPintar.style.backgroundColor = "#fa4";

        mesaComandar = mesaComandar - 1;
        numMesas[mesaComandar].push(produtoNaLista); //adicionar produto novo

        audioConfirmLancar.play();
    } else {
        audioError.play();
        alert("Não existe essa mesa!");

    }

}
//Abrir Controle Financeiro
function extrato() {
    audioDinheiro.play();
    let numMesasHTML = document.querySelector(".todasAsMesas");
    let mesas = document.querySelector(".mesas");
    let produtos = document.querySelector(".produtos");
    let comandar = document.querySelector(".comandar");
    let extrato = document.querySelector(".extrato");
    let informacoes = document.querySelector(".informacoes");

    let valorTotal = document.getElementById("valorArrecadado");

    let dinheiroQnt = document.getElementById("dinheiroQnt");
    let qntCredito = document.getElementById("qntCredito");
    let qntDebito = document.getElementById("qntDebito");
    let pix = document.getElementById("pix");
    let cheque = document.getElementById("cheque");

    let valorDinheiroVar = document.getElementById("valorDinheiro");
    let valorCreditoVar = document.getElementById("valorCredito");
    let valorDebitoVar = document.getElementById("valorDebito");
    let valorPixVar = document.getElementById("valorPix");
    let valorChequeVar = document.getElementById("valorCheque");

    comandar.style.display = "none";
    mesas.style.display = "none";
    produtos.style.display = "none";
    numMesasHTML.style.display = "none";
    informacoes.style.display = "none";
    extrato.style.display = "block";

    //Inserir a variável valor total no htmk
    valorTotal.textContent = `Valor bruto gerado :  R$ ${extratoGeral.toFixed(2)} Reais`;
    dinheiroQnt.textContent = `${contDinheiro}`;
    qntCredito.textContent = `${contCred}`;
    qntDebito.textContent = `${contDeb}`;
    pix.textContent = `${contPix}`;
    cheque.textContent = `${contCheque}`;

    valorDinheiroVar.textContent = `R$${valDinheiro.toFixed(2)}`;
    valorCreditoVar.textContent = `R$${valCred.toFixed(2)}`;
    valorDebitoVar.textContent = `R$${valDeb.toFixed(2)}`;
    valorPixVar.textContent = `R$${valPix.toFixed(2)}`;
    valorChequeVar.textContent = `R$${valCheque.toFixed(2)}`;

}

//Abrir informações gerais
function infGeral() {
    mudarAba.play();
    let numMesasHTML = document.querySelector(".todasAsMesas");
    let mesas = document.querySelector(".mesas");
    let produtos = document.querySelector(".produtos");
    let comandar = document.querySelector(".comandar");
    let extrato = document.querySelector(".extrato");

    let ticketMedio = document.getElementById("ticketMedio");
    let qntCom10 = document.getElementById("qntCom10");
    let qntSem10 = document.getElementById("qntSem10");
    let porcCom10 = document.getElementById("porcCom10");
    let porcSem10 = document.getElementById("porcSem10");

    let mesasFechadas = document.getElementById("mesasFechadas");
    mudarAba
    let tm; //ticket médio

    let informacoes = document.querySelector(".informacoes");
    informacoes.style.display = "block";
    comandar.style.display = "none";
    mesas.style.display = "none";
    produtos.style.display = "none";
    numMesasHTML.style.display = "none";
    extrato.style.display = "none";

    //Ticket médio calculo somar tudo e dividir
    tm = extratoGeral / (contDinheiro + contCred + contDeb + contPix + contCheque);
    ticketMedio.textContent = `R$ ${tm.toFixed(2)}`;

    //se for NOT A NUMBER, INSERIR 0
    if (isNaN(tm)) {
        ticketMedio.textContent = "R$ 0";
    }

    let mesasTotal = pagouTaxa + naoPagouTaxa;
    mesasFechadas.textContent = `${mesasTotal}`


    qntCom10.textContent = `${pagouTaxa} mesas pagaram a taxa`;
    qntSem10.textContent = `${naoPagouTaxa} mesas NÃO pagaram a taxa`;


    let calculo = 100 / mesasTotal;
    let porcentagemCom = calculo * pagouTaxa;
    let porcentagemSem = calculo * naoPagouTaxa;

    if (isNaN(porcentagemCom)) {
        console.log("É nulo");
        porcentagemCom = 0;

    }
    if (isNaN(porcentagemSem)) {
        console.log("É nulo");
        porcentagemSem = 0;

    }
    porcCom10.textContent = `${porcentagemCom.toFixed(2)}% Gostaram do atendimento`;
    porcSem10.textContent = `${porcentagemSem.toFixed(2)}% Não gostaram do atendimento`;

    

}