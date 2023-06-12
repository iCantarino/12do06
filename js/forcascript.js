var sPerguntas=[["CARAMBOLA","FRUTA"],["JABOTICABA","FRUTA"],
                ["JAMBO", "FRUTA"],["CUPUAÇU","FRUTA"],
                ["PITOMBA", "FRUTA"],["FORTALEZA","CIDADE"],
                ["HOLAMBRA","CIDADE"],["TERESÓPOLIS","CIDADE"],
                ["HORTOLÂNDIA","CIDADE"],["CARAPICUIBA","CIDADE"],
                ["ALICATE","FERRAMENTA"],["MARTELO","FERRAMENTA"],
                ["SERRA TICO-TICO", "FERRAMENTA"],["FORMÂO", "FERRAMENTA"],
                ["CHAVE DE FENDA","FERRAMENTA"],["ALMOFADA","OBJETO"],
                ["JORNAL", "OBJETO"],["BOLSA","OBJETO"],
                ["PALITO DE DENTE","OBJETO"],["CHURRASQUEIRA","OBJETO"],
                ["STROGONOFF","COMIDA"],["LASANHA", "COMIDA"],
                ["MACARRONADA", "COMIDA"],["FRANGO XADREZ", "COMIDA"],
                ["CANELONE", "COMIDA"],["AEROWILLYS", "CARRO"],
                ["SANTANA", "CARRO"],["VARIANT", "CARRO"],
                ["RENEGATE","CARRO"],["VIRTUS","CARRO"],
                ["ROSA","FLOR"],["GÉRBERA","FLOR"],
                ["CALANCHUÉ","FLOR"],["ORQUÌDEA","FLOR"],
                ["LÍRIO", "FLOR"],
                ["VIOLÃO", "INSTRUMENTO MUSICAL"],
                ["SAXOFONE", "INSTRUMENTO MUSICAL"],
                ["UKULELÊ", "INSTRUMENTO MUSICAL"],
                ["ESCALETA", "INSTRUMENTO MUSICAL"],
                ["TROMBONE", "INSTRUMENTO MUSICAL"],
                ["ADAM SANDLER", "ATOR"], ["WILL SMITH", "ATOR"],
                ["JOHNNY DEEP", "ATOR"], ["BRAD PITT", "ATOR"],
                ["DWAYNE JOHNSON", "ATOR"], ["JULIA ROBERTS", "ATRIZ"],
                ["MERYL STEEP", "ATRIZ"], ["BRIE LARRSON", "ATRIZ"],
                ["SCARLETT JOHANSSON", "ATRIZ"], ["ZOE SALDANA", "ATRIZ"],
                ["PATO DONALD", "PERSONAGEM"], ["HOMEM DE FERRO", "PERSONAGEM"],
                ["CAPITÂO AMERICA","PERSONAGEM"],["CORINGA","PERSONAGEM"],
                ["AQUAMAN", "PERSONAGEM"], ["SPACE INVADRS", "JOGOS"],
                ["PAC-MAN", "JOGOS"],["HALF-LIFE", "JOGOS"],
                ["CALL OF DUTY", "JOGOS"], ["MINECRAFT", "JOGOS"]];

var iSorteados = [];

var iJogada = 0;

var sPalavraSorteada;

var iAcertos = 0;

var iErro = 0;

var cLetraClicada = "";

var sLetras= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
              'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-'];

var iCertas = 0, iErradas = 0;

// *********************************

function criaLetras(sPalavra) {
    var formula = document.getElementById("tenta");
    var j = 0;
    console.log("PALAVRA: " + sPalavra);

    for(var i = 0; i < sPalavra.length; i++) {
        if(sPalavra[i].charCodeAt(0)!=32){
            var letra = document.createElement('input');

            letra.setAttribute("type", "text");

            letra.setAttribute("name", "tenta"+j);

            letra.setAttribute("id", "tenta"+j);

            letra.setAttribute("maxlength",1);

            letra.setAttribute("size", 1);

            letra.setAttribute("disabled", true);

            formula.appendChild(letra);
            j++;
        } else {
            document.getElementById("tenta"+(j-1)).style.margin = "0px 20px 0px 1px";
        }
    }

    sPalavraSorteada = limpa(sPalavra);

    document.getElementById("tema").innerHTML = sPerguntas[iSorteados[iJogada]][1]+ " - " + sPalavraSorteada.length + " letras"
}

function sorteia() {
    for(var m = 0; m < sPerguntas.length; m++) {
        iSorteados.push(m);
    }

    iSorteados = shuffleArray(iSorteados);

    criaLetras(sPerguntas[iSorteados[iJogada]][0]);
}

function Confere(cLetra) {
    cLetraClicada = cLetra;

    var lAchou = false;

    for(var i = 0; i < sPalavraSorteada.length; i++) {
        if(cLetra==sPalavraSorteada.charAt(i)){
            document.getElementById("tenta"+i).value = cLetra;

            iAcertos++;

            document.getElementById("acerto").innerHTML = "ACERTOS: " + iAcertos;

            lAchou = true;
        }
    }

    if(lAchou==false) {
        iErro++;

        document.getElementById("imagem").src = "../images/forca/forca"+(iErro+1)+".png"
    }
}

function acabou() {

    var lAcabou = false;

    if(iAcertos == sPalavraSorteada.length) {
        lAcabou = true;

        alert("PARABÉNS, VOCÊ CONSEGUIU!!");
        iCertas++;
    } else if(iErro == 6) {
        lAcabou = true;

        alert("ENFORCADO!!");

        iErradas++;
    }

    document.getElementById(cLetraClicada).disabled = true;

    if(lAcabou) {
        for(var i = 0; i < sPalavraSorteada.length; i++) {
            document.getElementById("tenta" + i).remove();
        }

        iJogada++;

        document.getElementById("palcerta").innerHTML = "PALAVRAS CERTAS:  " + iCertas + "<br/>PALAVRAS ERRADAS: " + iErradas;

        criaLetras(sPerguntas[iSorteados[iJogada]][0]);

        iAcertos = 0;
        iErro = 0;
        document.getElementById("acerto").innerHTML = "ACERTOS: " + iAcertos;

        document.getElementById("imagem").src="../images/forca/forca"+(iErro+1)+".png"

        for(var i = 0; i < sLetras.length; i++) {
            document.getElementById(sLetras[i]).disabled = false
        }
    }
}

function shuffleArray(d) {
    for (var c = d.length -1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d;
}

function limpa(sItem) {
    var sResultado = sItem;

    sResultado = replaceAll(sResultado, " ", "");


    sResultado = sResultado.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    return sResultado;
}

function replaceAll(str, de, para) {

    var pos = str.indexOf(de);

    while (pos > -1) {
        str = str.replace(de, para);

        pos = str.indexOf(de);
    }

    return (str);
}

// ******************

function shake(e, oncomplete, distance, time) {
    var time = 500;
    var distance = 5;

    var start = (new Date()).getTime();
    animate();

    function animate() {
        var now = (new Date()).getTime()

        var elapsed = now = start;

        var fraction = elapsed / time;

        if(fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";

            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            if (oncomplete) oncomplete(e);
        }
    }
}

function shakeme(event1) {
    shake(event1.target);
}