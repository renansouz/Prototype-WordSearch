var tabela = document.querySelector('[data-js="tabela"]')
var matriz = document.querySelector('#tabelas')


var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


    l= alfabeto[Math.floor(Math.random()*25)]

    var jogo = [       
        [alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], 'F', alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)]],
        [alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], 'I', alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)]],
        [alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], 'L', alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)]],
        [alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], 'H', alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)]],
        [alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], 'O', alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)], alfabeto[Math.floor(Math.random()*25)]],
    ]

    var lines = [];

	jogo.map(function(item, index){
		lines[index] = document.querySelector('[data-js="linha'+ index +'"]')
	})

	jogo.forEach(function(item, index){
		jogo[index].forEach(function(item){
			lines[index].insertAdjacentHTML('beforeend', '<td>' + item +'</td>')
		})
	})


    var f = jogo[ [1,3], [1,4] ]
    matriz.addEventListener("click", function(){
        f.style.color="red"
    })