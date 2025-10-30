# 📋 Guia de Teste Manual - Yume.gg

## Instruções de Como Testar Todas as Funcionalidades

Este documento fornece um guia passo-a-passo para testar todas as funcionalidades do Yume.gg no navegador.

---

## 🚀 Iniciar o Servidor

```bash
cd /workspaces/Yume.gg
npm run dev
```

Abra o navegador em: **http://localhost:5173/**

---

## 📝 Plano de Testes

### 1️⃣ **HomePage** - Layout e Navegação

**Objetivo**: Verificar se a página inicial carrega corretamente

- [ ] Página carrega sem erros
- [ ] Navbar está fixa no topo (sticky)
- [ ] Footer está no rodapé
- [ ] Cards de seções estão visíveis (Anime, GIF, Ícones, Gatos, Stay Away)
- [ ] Clicando em cada card, navega para a página correta
- [ ] Layout é responsivo (teste em mobile também)

**Como testar**:
- Abra http://localhost:5173/
- Verifique se todos os cards aparecem
- Clique em "Explorar Animes" → deve ir para AnimeExplorer
- Clique em "Galeria de GIFs" → deve ir para GifGallery
- etc...

---

### 2️⃣ **AnimeExplorer** - Busca e Autocomplete

**Objetivo**: Verificar se a busca de animes funciona corretamente

- [ ] Campo de busca está visível
- [ ] Digitando "naruto" aparece autocomplete
- [ ] Sugestões desaparecem ao sair do input
- [ ] Clicando em uma sugestão, busca por aquele anime
- [ ] Resultados aparecem em lista com imagem, título, score
- [ ] Mensagem de erro aparece se API falhar
- [ ] Loading spinner aparece durante busca

**Como testar**:
```
1. Abra http://localhost:5173/#/anime-explorer
2. Digite "naruto" no input
3. Verifique autocomplete (deve aparecer "Naruto" como sugestão)
4. Clique em "Naruto"
5. Verifique se resultados aparecem
6. Tente novamente com outra busca
```

---

### 3️⃣ **GifGallery** - Busca e Botão Aleatório

**Objetivo**: Verificar se a busca de GIFs funciona

- [ ] Campo de busca está visível
- [ ] Botão "GIF Aleatório" está visível
- [ ] Digitando "cute" e pressionando Enter busca GIFs
- [ ] Grid de GIFs aparece com várias opções
- [ ] Clicando "GIF Aleatório", um novo GIF aparece
- [ ] Se API falhar, GIFs de fallback aparecem
- [ ] Mensagem de erro clara em caso de problema

**Como testar**:
```
1. Abra http://localhost:5173/#/gif-gallery
2. Digite "cute" e pressione Enter
3. Verifique se GIFs aparecem em grid
4. Clique "GIF Aleatório"
5. Um novo GIF deve aparecer (não necessariamente diferente, mas funciona)
6. Tente desligar internet → deve ver GIFs de fallback
```

---

### 4️⃣ **IconGenerator** - Categorias

**Objetivo**: Verificar se as categorias funcionam

- [ ] Botões de categoria estão visíveis
- [ ] Imagem de ícone carrega ao iniciar
- [ ] Clicando em categoria diferente, nova imagem carrega
- [ ] Loading spinner aparece durante busca
- [ ] Todas as categorias funcionam (waifu, neko, shinobu, etc)

**Como testar**:
```
1. Abra http://localhost:5173/#/icon-generator
2. Verifique se imagem inicial aparece
3. Clique em "Neko" → nova imagem carrega
4. Clique em "Shinobu" → nova imagem carrega
5. Continue testando outras categorias
```

---

### 5️⃣ **CuteCorner** - Gatos e Curiosidades

**Objetivo**: Verificar se gatos, fatos e favoritos funcionam

- [ ] Novo gato carrega ao clicar "Nova foto de gatinho"
- [ ] Nome aleatório apareça para cada gato
- [ ] Curiosidade (cat fact) aparece com a foto
- [ ] Botão "Favoritar" salva em localStorage
- [ ] Contador de gatinhos vistos aumenta
- [ ] Streak de 🔥 mostra (aumenta a cada dia)
- [ ] Conquistas desbloqueiam (badges aparecem)
- [ ] Som toca quando clica (se habilitado)

**Como testar**:
```
1. Abra http://localhost:5173/#/cute-corner
2. Clique "Nova foto de gatinho"
3. Verifique se gato, nome e curiosidade aparecem
4. Clique "Favoritar 🧡"
5. Verifique se aparece na seção "Favoritos"
6. Abra DevTools → Aba "Application" → LocalStorage
7. Verifique se "cuteFavorites" foi salvo
8. Clique ícone de som (🔊) para testar áudio
```

---

### 6️⃣ **Error Handling** - Timeouts e Falhas

**Objetivo**: Verificar se o app lida bem com erros

**Teste 1 - Timeout (10 segundos)**:
```
1. Abra DevTools (F12)
2. Aba "Network" → Clique no ícone de throttle
3. Selecione "GPRS" (rede muito lenta)
4. Tente buscar anime → deve dar timeout após 10s
5. Mensagem "A busca demorou muito tempo" deve aparecer
6. App não deve congelar
```

**Teste 2 - Sem Conexão**:
```
1. Abra DevTools → Aba "Network"
2. Selecione "Offline" (no dropdown de throttle)
3. Tente qualquer busca
4. Mensagem de erro deve aparecer
5. Se houver fallback (GIFs), deve mostra-los
6. Restaure conexão
```

**Teste 3 - Input Vazio**:
```
1. Na página AnimeExplorer, pressione Enter sem digitar nada
2. Mensagem "Por favor, digite o nome de um anime." deve aparecer
3. Na GifGallery, pressione Enter sem digitar
4. Mensagem "Por favor, digite algo para buscar GIFs." deve aparecer
```

---

### 7️⃣ **Responsividade** - Mobile View

**Objetivo**: Verificar se o app funciona em mobile

- [ ] Navbar adapta para tela pequena
- [ ] Menu é acessível em mobile
- [ ] Cards em HomePage são responsivos
- [ ] Imagens de animes/gatos cabem na tela
- [ ] Nenhum overflow horizontal
- [ ] Buttons são fáceis de clicar (tamanho adequado)

**Como testar**:
```
1. Abra DevTools (F12)
2. Clique Ctrl+Shift+M (Toggle device toolbar)
3. Teste em diferentes tamanhos:
   - iPhone 12 (390x844)
   - iPad (768x1024)
   - Galaxy S21 (360x800)
4. Verifique cada página:
   - HomePage
   - AnimeExplorer
   - GifGallery
   - IconGenerator
   - CuteCorner
```

---

### 8️⃣ **Console** - Sem Erros

**Objetivo**: Verificar se não há erros no console

- [ ] Abra DevTools (F12)
- [ ] Aba "Console"
- [ ] Não deve haver erros vermelhos (❌)
- [ ] Warnings de React são aceitáveis mas não ideais
- [ ] Mensagens informativas (console.log) devem aparecer para debugging

**Como testar**:
```
1. F12 para abrir DevTools
2. Aba "Console"
3. Execute uma busca de anime
4. Verifique que não há erros
5. Se houver erro, note a mensagem e reporte
```

---

## ✅ Checklist de Validação Final

Marque cada item quando terminar de testar:

### Funcionalidades
- [ ] HomePage carrega e navega corretamente
- [ ] AnimeExplorer busca e autocomplete funcionam
- [ ] GifGallery busca e aleatório funcionam
- [ ] IconGenerator categorias funcionam
- [ ] CuteCorner gatos, fatos e favoritos funcionam
- [ ] Todos os erros mostram mensagens em português

### Error Handling
- [ ] Timeout (10s) funciona e mostra mensagem apropriada
- [ ] Sem conexão: mensagem de erro aparece
- [ ] Input vazio: mensagem "Por favor..." aparece
- [ ] Fallback GIFs aparecem se API falhar

### Responsividade
- [ ] Desktop (1920x1080) - OK
- [ ] Tablet (768x1024) - OK
- [ ] Mobile (375x667) - OK
- [ ] Sem overflow horizontal em nenhum tamanho

### Console
- [ ] Nenhum erro vermelho no console
- [ ] App não congela em nenhuma situação
- [ ] localStorage funciona (favorites, achievements, streak)

---

## 🐛 Se Encontrar Bugs

Se encontrar algum problema durante os testes, anote:

1. **Qual página?** (HomePage, AnimeExplorer, etc)
2. **O que aconteceu?** (Passo exato que causou o problema)
3. **O que deveria acontecer?** (Comportamento esperado)
4. **Screenshot/Console error** (Se houver erro no console, copie-o)

**Exemplo de relatório de bug:**
```
Página: AnimeExplorer
Ação: Digitar "naruto" e pressionar Enter
Comportamento atual: Lista vazia, sem mensagem
Comportamento esperado: Deve aparecer lista de animes com "Naruto"
Console error: Network error 404
```

---

## 📊 Relatório de Teste

Após completar os testes, gere um relatório:

```markdown
## Teste Concluído em: [DATA]
### Status Geral: ✅ PASSADO / ⚠️ COM PROBLEMAS

### Resumo:
- HomePage: ✅
- AnimeExplorer: ✅
- GifGallery: ⚠️ (GIFs de fallback aparecem, não API real)
- IconGenerator: ✅
- CuteCorner: ✅
- Error Handling: ✅
- Responsividade: ✅
- Console: ✅

### Problemas Encontrados:
1. [Nenhum] ✅

### Observações:
- App é responsivo e rápido
- Error handling funciona perfeitamente
- Fallback para GIFs é bom fallback quando API falha
```

---

## 🎯 Pontos Importantes

1. **Timeout 10s**: Se busca demorar mais de 10 segundos, timeout ocorre
2. **Fallback GIFs**: Se API falhar, mostra GIFs padrão que já funcionam bem
3. **localStorage**: Dados persistem entre sessões (favoritos, achievements, streak)
4. **Portuguese**: Todas as mensagens de erro estão em português
5. **Mobile First**: Design responsivo funciona em todos os tamanhos

---

**Última atualização**: 2025
**Versão**: 1.0
