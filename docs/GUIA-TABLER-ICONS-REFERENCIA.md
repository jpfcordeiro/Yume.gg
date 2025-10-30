# 📚 Guia de Referência - Tabler Icons em Yume.gg

## 🎯 Visão Geral

Este documento serve como referência rápida para entender como os Tabler Icons foram integrados no Yume.gg e como adicionar novos ícones no futuro.

---

## 1️⃣ Instalação

```bash
npm install tabler-icons-react
```

**Versão Mínima:** React 16.8+
**Tamanho:** ~50KB (não compactado)
**Total de Ícones:** 4,850+ disponíveis

---

## 2️⃣ Padrão de Importação

```jsx
// Importe apenas os ícones que precisa
import { Home, Heart, Download } from 'tabler-icons-react';
```

**Vantagem:** Tree-shakeable - só o que importa é incluído no bundle

---

## 3️⃣ Padrão de Uso Básico

### Ícone Simples
```jsx
<Home size={20} color="var(--pastel-blue)" />
```

### Com Botão
```jsx
<motion.button 
  onClick={handleClick}
  title="Descrição para acessibilidade"
>
  <Home size={20} color="var(--pastel-blue)" />
  <span>Label Opcional</span>
</motion.button>
```

### Dinâmico (ex: Heart favorito)
```jsx
<Heart 
  size={24} 
  fill={isFavorited ? '#F72585' : 'none'}
  stroke={2}
  color={isFavorited ? '#F72585' : 'var(--pastel-blue)'}
/>
```

---

## 4️⃣ Props Mais Comuns

| Prop | Tipo | Default | Exemplo |
|------|------|---------|---------|
| `size` | number | 24 | `size={20}` |
| `color` | string | currentColor | `color="var(--pastel-blue)"` |
| `fill` | string | none | `fill="#F72585"` |
| `stroke` | number | 2 | `stroke={1.5}` |
| `strokeLinecap` | string | round | `strokeLinecap="square"` |

---

## 5️⃣ Tabela de Ícones Yume.gg

### Ícones Implementados

| Ícone | Componente | Tamanho | Cor | Uso |
|-------|-----------|--------|-----|-----|
| Home | Navbar | 20px | pastel-blue | Navegação |
| Flame | Navbar | 20px | pastel-blue | Trending |
| Image | Navbar | 20px | pastel-blue | Galeria |
| Wand2 | Navbar | 20px | pastel-blue | Gerador |
| PawPrint | Navbar, Footer | 20px | pastel-blue | Decorativo |
| AlertCircle | Navbar | 20px | red | Aviso |
| Heart | 4 componentes | 24px | Dinâmico | Favoritos |
| Scale | AnimeExplorer | 20px | pastel-blue | Comparação |
| Dice5 | AnimeExplorer, IconGen | 24px, 20px | pastel-blue | Random |
| Share2 | GifGallery | 20px | pastel-blue | Compartilhar |
| Palette | ThemeSelector, IconGen | 20px | pastel-blue | Temas |
| X | ThemeSelector | 20px | pastel-blue | Fechar |
| RotateCcw | IconGenerator | 18px | pastel-blue | Reset |
| Download | IconGenerator | 18-16px | pastel-blue | Export |
| Sparkles | IconGenerator, Footer | 24px, 20px | neon-pink | Título |

### Ícones Importados (Não Usados Ainda)

```jsx
// Disponível em: IconGenerator.jsx
import { Settings, Copy } from 'tabler-icons-react';
```

---

## 6️⃣ Paleta de Cores

### CSS Variables Yume.gg

```css
:root {
  --neon-pink: #F72585;      /* Heart favorito, destaques */
  --pastel-blue: #90A8ED;    /* Ícones de ação padrão */
  --ghost-white: #E0D3F0;    /* Fallback, texto */
}
```

### Uso no Código

```jsx
// Referência à variável CSS
color="var(--pastel-blue)"

// Hex direto
color="#F72585"
```

---

## 7️⃣ Exemplos de Implementação

### Exemplo 1: Botão Simples (Navbar)

```jsx
import { Home } from 'tabler-icons-react';
import { motion } from 'framer-motion';

<motion.button
  className="navbar-link"
  whileHover={{ scale: 1.1 }}
>
  <Home size={20} color="var(--pastel-blue)" />
  <span>Home</span>
</motion.button>
```

### Exemplo 2: Ícone Dinâmico (Heart)

```jsx
import { Heart } from 'tabler-icons-react';

<Heart 
  size={24}
  fill={isFavorited ? '#F72585' : 'none'}
  stroke={2}
  color={isFavorited ? '#F72585' : 'var(--pastel-blue)'}
  title={isFavorited ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
/>
```

### Exemplo 3: Ícone com Texto (Exportar)

```jsx
import { Download } from 'tabler-icons-react';

<motion.button 
  onClick={() => exportIcon('png')}
  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
>
  <Download size={16} color="var(--pastel-blue)" />
  <span>Exportar</span>
</motion.button>
```

### Exemplo 4: Ícone Decorativo (Footer)

```jsx
import { Sparkles } from 'tabler-icons-react';

<Sparkles 
  size={20} 
  color="var(--neon-pink)" 
  aria-hidden="true"
/>
```

---

## 8️⃣ Tamanhos Recomendados

### Por Contexto

| Contexto | Tamanho | Exemplo |
|----------|---------|---------|
| Dentro de botão | 16px | Download em "Exportar" |
| Reset/Settings | 18px | RotateCcw em filtros |
| Navegação/Ação | 20px | Home, Flame, Scale, Palette |
| Destaque/Prominente | 24px | Heart, Dice5, Sparkles |

### Responsividade

```jsx
// Desktop
<Icon size={20} />

// Mobile (via CSS ou inline)
@media (max-width: 480px) {
  <Icon size={18} />
}
```

---

## 9️⃣ Acessibilidade

### Title Attribute (Obrigatório)
```jsx
<Heart 
  title="Adicionar aos favoritos"
/>
```

### ARIA Hidden (Decorativo)
```jsx
<Sparkles aria-hidden="true" />
```

### Contrast
- ✅ Pastel Blue (#90A8ED): WCAG AA
- ✅ Neon Pink (#F72585): WCAG AA
- ✅ Ghost White (#E0D3F0): WCAG AAA

---

## 🔟 Como Adicionar Novo Ícone

### Passo 1: Encontre o Ícone

Visite [tabler-icons.io](https://tabler-icons.io) e procure pelo ícone

### Passo 2: Importe

```jsx
import { NomeDoIcone } from 'tabler-icons-react';
```

### Passo 3: Use

```jsx
<NomeDoIcone 
  size={20} 
  color="var(--pastel-blue)"
  title="Descrição"
/>
```

### Passo 4: Valide

```bash
npm run dev
# Verifique em http://localhost:5173
```

---

## 1️⃣1️⃣ Ícones Sugeridos para Futuro

Caso precise expandir:

| Ícone | Tabler | Uso Sugerido |
|-------|--------|-------------|
| Moon | `Moon` | Tema escuro |
| Sun | `Sun` | Tema claro |
| Settings | `Settings` | Configurações |
| Copy | `Copy` | Copiar para clipboard |
| Share | `Share2` | Já implementado |
| BookMark | `Bookmark` | Salvar |
| Clock | `Clock` | Histórico |
| Search | `Search` | Busca |
| Filter | `Filter` | Filtros |
| Check | `Check` | Confirmação |

---

## 1️⃣2️⃣ Performance

### Otimizações Implementadas

✅ **Tree-shakeable:** Apenas ícones importados são inclusos
✅ **SVG Inline:** Sem HTTP requests adicionais
✅ **Leve:** ~50KB para toda a biblioteca
✅ **Sem Dependências:** Apenas React necessário

### Bundle Impact

```
Tabler Icons React: ~50KB (não compactado)
Por ícone médio: ~2-3KB
Gzip: ~15KB (altamente comprimível)
```

---

## 1️⃣3️⃣ Troubleshooting

### Ícone não aparece

```jsx
// ❌ Errado
<Icon size={20} />

// ✅ Correto (especifique a cor)
<Icon size={20} color="var(--pastel-blue)" />
```

### Ícone distorcido

```jsx
// ❌ Errado
<div style={{ width: '100%' }}>
  <Icon size={20} />
</div>

// ✅ Correto (flex parent)
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Icon size={20} />
</div>
```

### Animação estranha

```jsx
// Use Framer Motion
<motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity }}
>
  <Icon />
</motion.div>
```

---

## 📚 Recursos Úteis

- **Documentação Oficial:** https://tabler-icons.io
- **GitHub:** https://github.com/tabler/tabler-icons
- **React Package:** https://www.npmjs.com/package/tabler-icons-react
- **Yume.gg CSS Variables:** `src/index.css`

---

## ✅ Checklist para Novo Ícone

- [ ] Ícone existe em tabler-icons.io
- [ ] Importado corretamente
- [ ] Tamanho apropriado (16-24px)
- [ ] Cor consistente com paleta
- [ ] Title attribute adicionado
- [ ] Testado em desktop/mobile
- [ ] Sem erros de compilação
- [ ] Acessibilidade validada

---

## 📝 Notas

- Todos os ícones do Tabler têm stroke width de 2px por padrão
- Para um look mais fino, use `stroke={1.5}`
- Heart é o único ícone com `fill` dinâmico baseado em estado
- Responsive behavior é tratado via CSS media queries

---

**Última Atualização:** Implementação Completa - 100% dos componentes principais
**Status:** ✅ Pronto para Produção
**Manutenção:** Simples - apenas adicione novos ícones quando necessário
