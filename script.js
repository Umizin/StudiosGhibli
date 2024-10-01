function favoritos(filmes) {
    const icons = document.querySelectorAll('.coracao'); 
    const abafavoritos = document.getElementById('abaFavoritos');
    

    const favoritosSalvos = Object.keys(localStorage);
    favoritosSalvos.forEach(nomeFilme => {
        const nomeElement = document.createElement("p");
        nomeElement.innerText = localStorage.getItem(nomeFilme)
        abafavoritos.appendChild(nomeElement);
    });

    icons.forEach((core, idc) => {
        const nomeFilme = filmes[idc].title;


        if (favoritosSalvos.includes(nomeFilme)) {
            core.classList.add('clicado');
        }

        core.addEventListener('click', () => {
            core.classList.toggle('clicado');

            if (core.classList.contains('clicado')) {

                localStorage.setItem(nomeFilme, nomeFilme);
                const nomeElement = document.createElement("p");
                nomeElement.innerText = nomeFilme;
                abafavoritos.appendChild(nomeElement);
            } else {
                localStorage.removeItem(nomeFilme);
                const nomesNaAba = abafavoritos.querySelectorAll('p');
                nomesNaAba.forEach(p => {
                    if (p.innerText === nomeFilme) {
                        abafavoritos.removeChild(p);
                    }
                });
            }
        });
    });
}


function menuLateral() {
    const botaoMenu = document.getElementById('botaoMenu');
    const menuLateral = document.getElementById('menuLateral');
    const botaoFiltro = document.getElementById('botaoFiltro');
    const menuzinho = document.getElementById('menuzinho');

    botaoMenu.addEventListener('click', () => {
        menuLateral.classList.toggle('visivel');
        menuLateral.classList.remove('escondido');
        if(menuzinho.classList.contains('visivel')){
            menuzinho.classList.toggle('visivel')
        }
    });

    botaoFiltro.addEventListener('click', () =>{
        menuzinho.classList.toggle('visivel');
        menuzinho.classList.remove('escondido');
    });
};

fetch("https://ghibliapi.vercel.app/films/")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const secao = document.getElementById('containerSection');

        
        function exibirFilmes(filmes) {
            secao.innerHTML = ''; 
            filmes.forEach(filme => {
                const div = document.createElement("div");
                div.className = `containerfilmes`;
                const p = document.createElement("p");
                const h1 = document.createElement("h1");
                const h3 = document.createElement("h3");
                const img = document.createElement("img");
                const spanInfo = document.createElement("span");
                spanInfo.className = "material-symbols-outlined setinha"; 
                spanInfo.innerHTML = "arrow_downward_alt"
                spanInfo.className = "material-symbols-outlined setinha";
                const span = document.createElement("span");
                span.className = "material-symbols-outlined coracao";
                span.innerHTML = "favorite";
            

                p.innerText = filme.description; 
                h1.innerText = filme.title;
                h1.appendChild(span);
                h1.appendChild(spanInfo); 
                h3.innerText = filme.release_date;  
                img.src = filme.image; 

                div.appendChild(h1);

                let ogtitle;

                spanInfo.addEventListener('click', ()=>{
                    if(!ogtitle){    
                        ogtitle = document.createElement('p');
                        ogtitle.innerHTML = 'Título original: '+ filme.original_title;
                        div.insertBefore(ogtitle,h3);
                    } else{
                        div.removeChild(ogtitle);
                        ogtitle = null
                }
            });
                
                div.appendChild(h3);
                div.appendChild(p);  
                div.appendChild(img);  

                h1.style.marginBottom = '0.5em';
                p.style.marginBottom = '0.4em';
                h3.style.marginBottom = '0.3em';


                secao.appendChild(div);
            });
            favoritos(filmes);
        };

        exibirFilmes(data);
        menuLateral();


        const botaodefault = document.getElementById('filtrarDefault');
        const botaoalfabetico = document.getElementById('filtrarAlfabetico');

        botaodefault.addEventListener('click', ()=>{
            exibirFilmes(data);
        });

        botaoalfabetico.addEventListener('click', () =>{
            const filmesordem = [...data];
            filmesordem.sort((a, b) => {
                if (a.title < b.title) {
                    return -1; 
                }
                if (a.title > b.title) {
                    return 1;  
                }
                return 0;   
            });
            exibirFilmes(filmesordem);
        });
});






