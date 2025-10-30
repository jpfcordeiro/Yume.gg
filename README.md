# Yume.gg

Yume.gg é um dashboard criado como um cantinho especial na internet para os amantes da cultura pop online, especialmente o universo egirl, kawaii e otaku. O objetivo do projeto é centralizar conteúdos e ferramentas divertidas, permitindo que o usuário explore informações sobre seus animes preferidos, encontre GIFs que combinem com sua estética, gere imagens de perfil e tenha uma pausa relaxante com fotos de gatinhos. Construído com React, Vite e um conjunto de APIs públicas, o Yume.gg é um projeto que celebra a cultura da internet.

---

## Features

Bem-vindo(a) ao Yume.gg, o seu novo portal aesthetic! Aqui você pode:

🎌 **Explorar Animes:** Mergulhe no universo otaku com um buscador completo de animes, com detalhes, sinopses e avaliações.

✨ **Galeria de GIFs:** Encontre o GIF perfeito para expressar seu humor, com temas de animes, Sanrio, e muito mais.

🎨 **Gerador de Ícones Avançado:** Cansou da sua foto de perfil? Gere uma nova imagem de personagem de anime com apenas um clique. Personalize com filtros (brilho, contraste, saturação, blur, sépia), adicione aos favoritos e exporte em PNG, JPG ou WEBP.

🐱 **Momento Fofura:** Receba uma dose de serotonina com uma nova foto de gatinho a cada visita.

👹 **Galeria de Vilões:** Explore personagens antagônicos icônicos com curiosidades e frases memoráveis.

## APIs Utilizadas

O Yume.gg utiliza as seguintes APIs públicas para alimentar suas principais funcionalidades:

- **Jikan API**  
	Utilidade: Busca todas as informações de animes (títulos, sinopses, imagens, etc.) para a seção AnimeExplorer.  
	[Documentação Jikan API](https://jikan.moe)

- **GIPHY API**  
	Utilidade: Pesquisa e exibe GIFs com a estética do site (kawaii, animes, Sanrio, etc.) na GifGallery.  
	[Documentação GIPHY API](https://developers.giphy.com)

- **Waifu.pics API**  
	Utilidade: Busca imagens aleatórias de personagens de anime para o IconGenerator.  
	[Documentação Waifu.pics API](https://waifu.pics/docs)


- **TheCatAPI**  
	Utilidade: Exibe uma foto fofa de um gatinho a cada visita na CuteCorner.  
	[Documentação TheCatAPI](https://thecatapi.com)

- **Catfact.ninja**  
	Utilidade: Fornece curiosidades aleatórias sobre gatos, usadas na CuteCorner.  
	[Documentação Catfact.ninja](https://catfact.ninja)


- **LibreTranslate**  
Utilidade: Traduz automaticamente as curiosidades de gatos para português.  
[Documentação LibreTranslate](https://libretranslate.com/docs/)

- **Spotify API**  
Utilidade: Permite autenticação, busca e reprodução de playlists pessoais, além de exibir playlists públicas no MusicWidget.  
[Documentação Spotify API](https://developer.spotify.com/documentation/web-api/)

- **Pixabay Sounds**  
Utilidade: Fornece efeitos sonoros online para conquistas, favoritos e interações (via URLs públicas).  
[Documentação Pixabay Sounds](https://pixabay.com/api/docs/)

## Tecnologias Utilizadas

- **Frontend:** React 18+, Vite, Framer Motion
- **Estilos:** CSS3 com animações avançadas, gradientes, backdrop filters
- **APIs:** Integração com múltiplas APIs REST públicas
- **Armazenamento:** localStorage para favoritos e preferências
- **Canvas API:** Processamento de imagens para filtros e exportação
- **Deploy:** Vercel

## Recursos Técnicos

- **Timeout Automático:** 10 segundos em todas as requisições de API
- **Tratamento de Erros:** Mensagens customizadas em português
- **Responsividade:** Mobile-first, otimizado para todos os tamanhos de tela
- **Performance:** Lazy loading, memoization, cleanup de efeitos
- **Acessibilidade:** ARIA labels, navegação por teclado

---

## Como Usar

### Instalação

```bash
git clone https://github.com/jpfcordeiro/Yume.gg.git
cd Yume.gg
npm install
npm run dev
```

### Build para Produção

```bash
npm run build
npm run preview
```
