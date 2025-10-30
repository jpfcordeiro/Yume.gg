# Yume.gg ✨🎌

<p align="center">
  <img src="https://cdn3.emoji.gg/emojis/12609.png" alt="sparkles" width="64" height="64" style="vertical-align: middle; margin-right: 8px;" />
  <strong style="font-size: 1.6rem; vertical-align: middle;">Yume.gg</strong>
  <img src="https://cdn3.emoji.gg/emojis/6561.png" alt="kawaii" width="64" height="64" style="vertical-align: middle; margin-left: 8px;" />
</p>

> Um cantinho online kawaii / egirl / otaku — dashboard aesthetic que reúne ferramentas fofas, GIFs, gerador de ícones e muito amor por gatinhos. 🐱💖

---

## ✨ Visão rápida

Yume.gg é uma aplicação frontend feita com React + Vite que agrega micro-experiências para fãs da cultura pop digital:
- Explorador de animes com sinopses e imagens.
- Galeria de GIFs temáticos.
- Gerador de ícones estilo anime com filtros e exportação.
- Cantinho dos gatinhos (fotos + curiosidades traduzidas).
- Widget musical com integração ao Spotify.

Deploy recomendado: Vercel

---

## 🎯 Funcionalidades principais

- 🎌 Explorar Animes: pesquisa com detalhes, imagens e avaliações.
- ✨ Galeria de GIFs: pesquisa e curadoria aesthetic.
- 🎨 Gerador de Ícones: filtros (brilho, contraste, saturação, blur, sépia), exporta em PNG/JPG/WEBP.
- 🐱 Momento Fofura: fotos aleatórias de gatos + curiosidades.
- 👹 Galeria de Vilões: personagens antagônicos e frases icônicas.
- 🔒 Favoritos & Preferências: salvos no localStorage.
- ⚡ Performance: lazy loading, memoization, otimizações com Framer Motion.

---

## 🧩 Tecnologias

- React 18+, Vite  
- Animações: Framer Motion  
- 3D / Extras: three.js, @react-three/fiber, @react-three/drei  
- Ícones: react-icons, tabler-icons-react  
- Build/Dev: Vite

Scripts úteis (ver também `package.json`):
```bash
npm run dev     # desenvolvimento
npm run build   # build para produção
npm run preview # preview do build
```

---

## 🚀 Como rodar localmente

Clone e rode:

```bash
git clone https://github.com/jpfcordeiro/Yume.gg.git
cd Yume.gg
npm install
npm run dev
```

Build para produção:

```bash
npm run build
npm run preview
```

---

## 🔗 APIs usadas

- Jikan (animes) — https://jikan.moe  
- GIPHY (GIFs) — https://developers.giphy.com  
- waifu.pics (imagens waifu) — https://waifu.pics/docs  
- TheCatAPI (fotos de gatos) — https://thecatapi.com  
- Catfact.ninja (curiosidades sobre gatos) — https://catfact.ninja  
- LibreTranslate (tradução) — https://libretranslate.com/docs  
- Spotify Web API — https://developer.spotify.com

---

Exemplo Markdown:

```md
![kawaii-heart](https://cdn3.emoji.gg/emojis/{slug}.png)
```

Dicas:
- Visite https://emoji.gg para procurar emojis e copiar o slug desejado.
- Prefira PNGs pequenos (64x64 ou 128x128) para ícones inline.
- Use `<img>` no JSX/HTML quando precisar controlar tamanho, alt e layout.

---

## 🫶 Créditos

- Emojis e ícones decorativos: emoji.gg — https://emoji.gg (CDN: https://cdn3.emoji.gg). Obrigado pela biblioteca de assets que ajudou a dar personalidade ao projeto.

Observação: verifique os termos de uso do emoji.gg se pretende redistribuir assets em outros contextos ou builds comerciais.

---

## 🧰 Sugestões visuais para o repositório

- Adicionar screenshots em `public/assets/screenshots/` e referenciá-las no topo do README.
- Incluir um badge de versão (ex.: GitHub release), CI (se existir), e tempo de deploy do Vercel.
- Gif curto no topo mostrando o gerador de ícones em ação.

---

## 🤝 Como contribuir

Contribuições são bem-vindas!
1. Abra uma issue descrevendo a ideia.
2. Faça um fork e um branch com nome descritivo.
3. Envie um pull request com mudanças pequenas e ativas.
4. Documente mudanças importantes no README ou em `docs/`.

---

## 📜 Licença

Projeto licenciado conforme o arquivo `LICENSE` no repositório.

---

## 📬 Contato

Criado por jpfcordeiro — para sugestões, designs ou assets, abra uma issue ou me marque no GitHub.

---

Feito com carinho ✨
