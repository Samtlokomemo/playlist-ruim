const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const anteriorBtn = document.getElementById('anterior');
const proximaBtn = document.getElementById('proxima');
const progresso = document.getElementById('progresso');
const titulo = document.querySelector('.titulo');
const artista = document.querySelector('.artista');
const capa = document.querySelector('.capa');

function embaralharPlaylist(playlist) {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]]; // Troca os elementos
    }
    return playlist;
}

let playlist = [
    {
        titulo: 'Idiota',
        artista: 'Jão',
        src: 'musicas/idiota.mp3',
        capa: 'musicas/idiota.jfif'
    },
    {
        titulo: 'Olhos Vermelhos',
        artista: 'Jão',
        src: 'musicas/olhosvermelhos.mp3',
        capa: 'musicas/idiota.jfif'
    },
    {
        titulo: 'Verão Cruel',
        artista: 'Teilor Suifiti',
        src: 'musicas/cruelsummer.mp3',
        capa: 'musicas/lover.jpg'
    },
    {
        titulo: 'Oruam 3',
        artista: 'Oruam',
        src: 'olhosvermelhos.mp3',
        capa: 'capa2.jpg'
    },
    {
        titulo: 'Dedos Vermelhos',
        artista: 'Jão',
        src: 'dedosvermelhos.mp3',
        capa: 'capa2.jpg'
    },
];

const listaMusicas = document.getElementById('lista-musicas');
for (let i = 0; i < playlist.length; i++) {
    const musica = playlist[i];
    const itemLista = document.createElement('li');
    itemLista.textContent = `${musica.titulo} - ${musica.artista}`;
    itemLista.addEventListener('click', () => {
        musicaIndex = i; // Define o índice da música clicada
        carregarMusica(playlist[musicaIndex]); // Carrega a música
        tocarMusica(); // Toca a música
    });
    listaMusicas.appendChild(itemLista);
}

let musicaIndex = 0;

function carregarMusica(musica) {
    audio.src = musica.src;
    titulo.textContent = musica.titulo;
    artista.textContent = musica.artista;
    capa.src = musica.capa;
}

function tocarMusica() {
    audio.play();
    playBtn.textContent = 'Pause';
}

function pausarMusica() {
    audio.pause();
    playBtn.textContent = 'Play';
}

const aleatorioBtn = document.getElementById('aleatorio');
let modoAleatorio = false;
const musicasTocadasRecentemente = []; // Lista para armazenar as músicas tocadas recentemente
const maxMusicasTocadasRecentemente = 2; // Número máximo de músicas na lista

aleatorioBtn.addEventListener('click', () => {
    modoAleatorio = !modoAleatorio;
    if (modoAleatorio) {
        aleatorioBtn.textContent = 'Aleatório (Ligado)';
    } else {
        aleatorioBtn.textContent = 'Aleatório (Desligado)';
    }
});

function proximaMusica() {
    if (modoAleatorio) {
        // Modo aleatório ligado: toca uma música aleatória, evitando repetições recentes
        let proximaIndex;
        let tentativas = 0;
        do {
            proximaIndex = Math.floor(Math.random() * playlist.length);
            tentativas++;
            // Se tentou muitas vezes, toca uma música repetida
            if (tentativas > playlist.length) {
                proximaIndex = Math.floor(Math.random() * playlist.length);
                break;
            }
        } while (musicasTocadasRecentemente.includes(proximaIndex) && musicasTocadasRecentemente.length < playlist.length);

        musicaIndex = proximaIndex;

        // Adiciona a música à lista de músicas tocadas recentemente
        musicasTocadasRecentemente.push(musicaIndex);
        if (musicasTocadasRecentemente.length > maxMusicasTocadasRecentemente) {
            musicasTocadasRecentemente.shift(); // Remove a música mais antiga
        }
    } else {
        // Modo aleatório desligado: toca a próxima música na ordem
        musicaIndex = (musicaIndex + 1) % playlist.length;
    }
    carregarMusica(playlist[musicaIndex]);
    tocarMusica();
}

function musicaAnterior() {
    musicaIndex = (musicaIndex - 1 + playlist.length) % playlist.length;
    carregarMusica(playlist[musicaIndex]);
    tocarMusica();
}

function atualizarProgresso() {
    progresso.value = audio.currentTime;
}

function musicaAleatoria(){
    
}

audio.addEventListener('loadeddata', () => {
    progresso.max = audio.duration;
});

audio.addEventListener('timeupdate', atualizarProgresso);

progresso.addEventListener('input', () => {
    audio.currentTime = progresso.value;
});

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        tocarMusica();
    } else {
        pausarMusica();
    }
});

proximaBtn.addEventListener('click', proximaMusica);
anteriorBtn.addEventListener('click', musicaAnterior);

carregarMusica(playlist[musicaIndex]);
