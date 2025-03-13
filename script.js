const musicPlayer = document.getElementById('music-player');
const musicaAtual = document.getElementById('musica-atual');
const playerCapa = document.getElementById('player-capa');
const tituloMusica = document.getElementById('titulo-musica');
const artistaMusica = document.getElementById('artista-musica');
const btnPausar = document.getElementById('btn-pausar');
const btnVoltar = document.getElementById('btn-voltar');
const btnProximo = document.getElementById('btn-proximo');
const btnAleatorio = document.getElementById('btn-aleatorio');
const audio = document.getElementById('audio');
const listaMusicas = document.getElementById('lista-musicas');

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
        titulo: 'Me beija com raiva',
        artista: 'Jão',
        src: 'musicas/mebeijacomraiva.mp3',
        capa: 'musicas/mebeijacomraiva.jpg'
    },
    {
        titulo: 'Cruel Summer',
        artista: 'Tailor Swift',
        src: 'musicas/cruelsummer.mp3',
        capa: 'musicas/lover.jpg'
    },
    {
        titulo: 'Taste',
        artista: 'Sabrina Carpenter',
        src: 'musicas/taste.mp3',
        capa: 'musicas/please.jpg'
    },
    {
        titulo: 'Espresso',
        artista: 'Saprina Carpenter',
        src: 'musicas/espresso.mp3',
        capa: 'musicas/espresso.jpg'
    },
    {
        titulo: 'Please Please Please',
        artista: 'Saprina Carpenter',
        src: 'musicas/please.mp3',
        capa: 'musicas/please.jpg'
    },
    {
        titulo: 'Nonsense',
        artista: 'Saprina Carpenter',
        src: 'musicas/nosense.mp3',
        capa: 'musicas/nosense.jpg'
    },
    {
        titulo: 'to bem',
        artista: 'Jovem Dionisio',
        src: 'musicas/mearrumei.mp3',
        capa: 'musicas/tobem.jpg'
    },
    {
        titulo: 'ACORDA PEDRINHO',
        artista: 'Jovem Dionisio',
        src: 'musicas/acordapedro.mp3',
        capa: 'musicas/acordapedro.jpg'
    },
    {
        titulo: 'Pontos de Exclamação',
        artista: 'Jovem Dionisio',
        src: 'musicas/!!!.mp3',
        capa: 'musicas/!!!.jpg'
    },
    {
        titulo: 'i like the way you kiss me',
        artista: 'artemas',
        src: 'musicas/iliketheway.mp3',
        capa: 'musicas/ilike.jpg'
    },
];

function obterDuracaoMusica(src) {
    return new Promise((resolve) => {
        const audioTemp = new Audio(src);
        audioTemp.addEventListener('loadedmetadata', () => {
            resolve(audioTemp.duration);
        });
    });
}

async function calcularTempoTotal(playlist) {
    let tempoTotalSegundos = 0;
    for (let i = 0; i < playlist.length; i++) {
        const duracao = await obterDuracaoMusica(playlist[i].src);
        tempoTotalSegundos += duracao;
    }

    const horas = Math.floor(tempoTotalSegundos / 3600);
    const minutos = Math.floor((tempoTotalSegundos % 3600) / 60);

    return { horas, minutos };
}

const infos = document.querySelector('.infos p:last-child');

async function atualizarInfos() {
    const tempoTotal = await calcularTempoTotal(playlist);
    infos.textContent = `${playlist.length} músicas, ${tempoTotal.horas}h ${tempoTotal.minutos}min`;
}

atualizarInfos(); // Exibe as informações iniciais

// Exemplo de como adicionar uma música à playlist
async function adicionarMusica(musica) {
    playlist.push(musica);
    await atualizarInfos(); // Atualiza as informações após adicionar a música
}

// Exemplo de como remover uma música da playlist
async function removerMusica(indice) {
    playlist.splice(indice, 1);
    await atualizarInfos(); // Atualiza as informações após remover a música
}


let aleatorioAtivo = false;

function atualizarPlayer(musica) {
    tituloMusica.textContent = musica.titulo;
    artistaMusica.textContent = musica.artista;
    playerCapa.src = musica.capa;
}

function tocarMusicaAnterior() {
    musicaIndex = musicaIndex === 0 ? playlist.length - 1 : musicaIndex - 1;
    const musica = playlist[musicaIndex];
    atualizarPlayer(musica);
    audio.src = musica.src;
    audio.play();
}

let playlistEmbaralhada = []; // Inicialmente vazia

function alternarAleatorio() {
    aleatorioAtivo = !aleatorioAtivo;
    btnAleatorio.classList.toggle('active', aleatorioAtivo);

    if (aleatorioAtivo) {
        // Embaralha a playlist quando o modo aleatório é ativado
        playlistEmbaralhada = [...playlist];
        embaralharPlaylist(playlistEmbaralhada);
        musicaIndex = 0; // Reinicia o índice para a primeira música embaralhada
    }
}

function tocarProximaMusica() {
    if (aleatorioAtivo) {
        // Modo aleatório ligado: toca a próxima música na ordem embaralhada
        musicaIndex = (musicaIndex + 1) % playlistEmbaralhada.length;
    } else {
        // Modo aleatório desligado: toca a próxima música na ordem original
        musicaIndex = (musicaIndex + 1) % playlist.length;
    }
    const musica = aleatorioAtivo ? playlistEmbaralhada[musicaIndex] : playlist[musicaIndex];
    atualizarPlayer(musica);
    audio.src = musica.src;
    audio.play();
}

for (let i = 0; i < playlist.length; i++) {
    const musica = playlist[i];
    const itemLista = document.createElement('li');

    const capaImg = document.createElement('img');
    capaImg.src = musica.capa;
    capaImg.style.width = '50px';
    capaImg.style.marginRight = '10px';

    const textoContainer = document.createElement('div');
    textoContainer.classList.add('texto-musica');

    const nomeMusica = document.createElement('p');
    nomeMusica.textContent = musica.titulo;
    nomeMusica.classList.add('titulo-musica');

    const nomeArtista = document.createElement('p');
    nomeArtista.textContent = musica.artista;
    nomeArtista.classList.add('nome-artista');

    textoContainer.appendChild(nomeMusica);
    textoContainer.appendChild(nomeArtista);

    itemLista.appendChild(capaImg);
    itemLista.appendChild(textoContainer);

    const playIcon = document.createElement('i');
    playIcon.classList.add('fas', 'fa-play');
    playIcon.classList.add('play-icon');
    itemLista.appendChild(playIcon);

    itemLista.addEventListener('click', () => {
        musicaIndex = i;
        const musica = playlist[musicaIndex];
        atualizarPlayer(musica);
        audio.src = musica.src;
        audio.play();

        // Atualiza o ícone do botão de play/pause
        btnPausar.innerHTML = '<span class="material-icons">pause</span>';

        musicPlayer.classList.remove('hidden');
        setTimeout(() => musicPlayer.classList.add('visible'), 10);
    });

    listaMusicas.appendChild(itemLista);
}

btnVoltar.addEventListener('click', tocarMusicaAnterior);
btnProximo.addEventListener('click', tocarProximaMusica);
btnAleatorio.addEventListener('click', alternarAleatorio);

btnPausar.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPausar.innerHTML = '<span class="material-icons">pause</span>';
    } else {
        audio.pause();
        btnPausar.innerHTML = '<span class="material-icons">play_arrow</span>';
    }
});

function embaralharPlaylist(playlist) {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
    return playlist;
}