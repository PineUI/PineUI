# Instruções de Correção: Inbox Demo - Passo a Passo

**Arquivo a modificar**: `/Users/davidruiz/Projects/PineUI/docs/demos/inbox/ui.json`

Este guia fornece instruções EXATAS e NUMERADAS para corrigir cada problema identificado na análise. Execute as mudanças na ordem apresentada.

---

## FASE 1: CORREÇÕES CRÍTICAS (P0)

### P0-1: Mover campo de busca para ANTES das tabs

**Localização**: Linhas 65-68 e 70-132

**Passo 1.1**: Localize o objeto do campo de busca (linhas 65-68):
```json
{
  "type": "input.text",
  "placeholder": "🔍 Search for a name"
},
```

**Passo 1.2**: Corte este objeto (delete temporariamente)

**Passo 1.3**: Localize o início do objeto tabs (linha 70):
```json
{
  "type": "tabs",
  "tabs": [
```

**Passo 1.4**: Cole o objeto do campo de busca ANTES do objeto tabs

**Passo 1.5**: Adicione uma vírgula após o campo de busca

**Resultado esperado**: A estrutura deve ficar:
```json
"children": [
  {
    "type": "layout.row",
    "mainAxisAlignment": "spaceBetween",
    "crossAxisAlignment": "center",
    "children": [
      {
        "type": "text",
        "content": "Direct messages",
        "style": "titleMedium",
        "fontWeight": "bold"
      },
      {
        "type": "button.icon",
        "icon": "✕",
        "size": "small"
      }
    ]
  },
  {
    "type": "input.text",
    "placeholder": "🔍 Search for a name"
  },
  {
    "type": "tabs",
    "tabs": [
```

---

### P0-2: Adicionar divisor horizontal após título "Direct messages"

**Localização**: Após linha 64

**Passo 2.1**: Localize o fechamento do layout.row do título (linha 64):
```json
      }
    ]
  },
```

**Passo 2.2**: Após a vírgula da linha 64, adicione:
```json
  {
    "type": "divider"
  },
```

**Resultado esperado**:
```json
      {
        "type": "button.icon",
        "icon": "✕",
        "size": "small"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "input.text",
    "placeholder": "🔍 Search for a name"
  },
```

---

### P0-3: Adicionar ícone dropdown ao título "Clarity Community 🔥"

**Localização**: Linhas 144-161

**Passo 3.1**: Localize o header da coluna 2 (linha 145):
```json
{
  "type": "layout.row",
  "padding": 16,
  "mainAxisAlignment": "spaceBetween",
  "crossAxisAlignment": "center",
  "children": [
```

**Passo 3.2**: SUBSTITUA todo o conteúdo do children (linhas 149-160) por:
```json
  "children": [
    {
      "type": "layout.row",
      "spacing": 8,
      "crossAxisAlignment": "center",
      "children": [
        {
          "type": "text",
          "content": "Clarity Community 🔥",
          "style": "titleMedium",
          "fontWeight": "bold"
        },
        {
          "type": "button.icon",
          "icon": "▼",
          "size": "small"
        }
      ]
    },
    {
      "type": "button.icon",
      "icon": "⋮",
      "size": "small"
    }
  ]
```

**Resultado esperado**: O título agora tem um layout.row interno com o texto e o ícone dropdown, seguido pelo ícone de menu.

---

## FASE 2: CORREÇÕES IMPORTANTES (P1)

### P1-4: Reduzir espaçamento entre mensagens

**Localização**: Linha 170

**Passo 4.1**: Localize a linha:
```json
"spacing": 24,
```

**Passo 4.2**: Altere para:
```json
"spacing": 16,
```

---

### P1-5: Ajustar padding dos items de conversa

**Localização**: Linha 267 (pattern.conversationItem)

**Passo 5.1**: Localize:
```json
"padding": 12,
```

**Passo 5.2**: SUBSTITUA por (usando padding assimétrico):
```json
"paddingVertical": 8,
"paddingHorizontal": 12,
```

**NOTA**: Se o SDK não suportar paddingVertical/paddingHorizontal, use:
```json
"padding": 8,
```

---

### P1-6: Aumentar avatar do perfil

**Localização**: Linha 431 (pattern.profilePanel)

**Passo 6.1**: Localize:
```json
"size": 80
```

**Passo 6.2**: Altere para:
```json
"size": 96
```

---

### P1-7: Ajustar padding superior do perfil

**Localização**: Linha 414

**Passo 7.1**: Localize:
```json
"padding": 16,
```

**Passo 7.2**: SUBSTITUA por:
```json
"paddingTop": 24,
"paddingHorizontal": 16,
"paddingBottom": 16,
```

**NOTA**: Se o SDK não suportar padding assimétrico, mantenha `"padding": 16` e adicione um spacer no topo.

---

### P1-8: Melhorar indicador de tab ativa (Verificação)

**Localização**: Linhas 70-132 (componente tabs)

**Passo 8.1**: Verifique se o componente tabs está renderizando corretamente o estado ativo

**Passo 8.2**: Se não estiver, adicione estilo customizado. Procure por propriedades como:
- `activeTabColor`
- `activeTabIndicatorColor`
- `activeTabStyle`

**Passo 8.3**: Se disponível, adicione após linha 131:
```json
"activeTabIndicatorColor": "#6750a4",
"activeTabTextStyle": {
  "fontWeight": "bold"
}
```

---

### P1-9: Melhorar badge da tab Unread

**Localização**: Linha 94

**Passo 9.1**: Localize:
```json
"badge": 3,
```

**Passo 9.2**: Se o SDK suportar, adicione após esta linha:
```json
"badgeColor": "#d32f2f",
"badgeBackgroundColor": "#ffebee",
```

**NOTA**: Verificar documentação do componente tabs para propriedades de badge.

---

### P1-10: Aumentar tamanho da fonte dos nomes nas conversas

**Localização**: Linha 292 (pattern.conversationItem)

**Passo 10.1**: Localize:
```json
"style": "bodyMedium",
```

**Passo 10.2**: Altere para:
```json
"style": "bodyLarge",
```

---

## FASE 3: CORREÇÕES MENORES (P2)

### P2-11: Revisar cor do preview das conversas

**Localização**: Linha 307

**Passo 11.1**: Localize:
```json
"color": "onSurfaceVariant"
```

**Passo 11.2**: Se a cor não parecer adequada, substitua por valor hexadecimal:
```json
"color": "#666666"
```

---

### P2-12: Adicionar border-radius ao campo de input

**Localização**: Linha 220

**Passo 12.1**: Localize:
```json
{
  "type": "input.text",
  "placeholder": "Send a message...",
  "flex": 1
},
```

**Passo 12.2**: Adicione a propriedade borderRadius:
```json
{
  "type": "input.text",
  "placeholder": "Send a message...",
  "flex": 1,
  "borderRadius": 12
},
```

**NOTA**: Verificar se SDK suporta esta propriedade.

---

### P2-13: Aumentar spacing das reações

**Localização**: Linhas 370 e 389

**Passo 13.1**: Localize a primeira ocorrência (linha 370):
```json
"spacing": 4,
```

**Passo 13.2**: Altere para:
```json
"spacing": 6,
```

**Passo 13.3**: Repita para a linha 389

---

### P2-14: Aumentar tamanho dos ícones do input

**Localização**: Linhas 216, 226, 230

**Passo 14.1**: Localize a primeira ocorrência (linha 216):
```json
{
  "type": "button.icon",
  "icon": "📎",
  "size": "small"
},
```

**Passo 14.2**: Altere `"size": "small"` para `"size": "medium"`

**Passo 14.3**: Repita para linhas 226 e 230

---

### P2-15: Adicionar line-height ao texto das mensagens

**Localização**: Linha 361

**Passo 15.1**: Localize:
```json
{
  "type": "text",
  "content": "{{props.message.content}}",
  "style": "bodyMedium"
},
```

**Passo 15.2**: Adicione a propriedade lineHeight:
```json
{
  "type": "text",
  "content": "{{props.message.content}}",
  "style": "bodyMedium",
  "lineHeight": 1.5
},
```

**NOTA**: Verificar se SDK suporta esta propriedade.

---

### P2-16: Reduzir spacing entre informações do perfil

**Localização**: Linha 491

**Passo 16.1**: Localize:
```json
"spacing": 12,
```

**Passo 16.2**: Altere para:
```json
"spacing": 8,
```

---

### P2-17: Adicionar padding aos chips

**Localização**: Linhas 567-579

**Passo 17.1**: Localize o primeiro chip (linha 567):
```json
{
  "type": "chip",
  "label": "Exiter",
  "selected": false
},
```

**Passo 17.2**: Adicione propriedades de padding:
```json
{
  "type": "chip",
  "label": "Exiter",
  "selected": false,
  "paddingVertical": 8,
  "paddingHorizontal": 16
},
```

**Passo 17.3**: Repita para os chips "Pro" e "Creator"

**NOTA**: Se SDK não suportar estas propriedades, pular este passo.

---

### P2-18: Adicionar underline aos links

**Localização**: Linhas 625, 631, 637

**Passo 18.1**: Localize o primeiro link (linha 625):
```json
{
  "type": "text",
  "content": "{{props.profile.links.website}}",
  "style": "bodySmall",
  "color": "primary"
},
```

**Passo 18.2**: Adicione textDecoration:
```json
{
  "type": "text",
  "content": "{{props.profile.links.website}}",
  "style": "bodySmall",
  "color": "primary",
  "textDecoration": "underline"
},
```

**Passo 18.3**: Repita para linhas 631 e 637

**NOTA**: Verificar se SDK suporta esta propriedade.

---

### P2-19: Ajustar tamanho do timestamp

**Localização**: Linha 298

**Passo 19.1**: Localize:
```json
{
  "type": "text",
  "content": "{{props.conversation.time}}",
  "style": "bodySmall",
  "color": "onSurfaceVariant"
}
```

**Passo 19.2**: Adicione fontSize:
```json
{
  "type": "text",
  "content": "{{props.conversation.time}}",
  "style": "bodySmall",
  "color": "onSurfaceVariant",
  "fontSize": 12
}
```

---

### P2-20: Escurecer divisores entre colunas

**Localização**: Linhas 40 e 142

**Passo 20.1**: Localize a primeira ocorrência (linha 40):
```json
"borderRight": "1px solid #e7e0ec",
```

**Passo 20.2**: Altere para:
```json
"borderRight": "1px solid #d0d0d0",
```

**Passo 20.3**: Repita para linha 142

---

## FASE 4: AJUSTES ADICIONAIS

### Ajuste Extra 1: Aumentar spacing após avatar do perfil

**Localização**: Linha 425

**Passo extra 1.1**: Localize:
```json
"spacing": 8,
```

**Passo extra 1.2**: Altere para:
```json
"spacing": 12,
```

---

### Ajuste Extra 2: Adicionar fontWeight à tab ativa no About

**Localização**: Linha 467

**Passo extra 2.1**: Localize:
```json
{
  "type": "text",
  "content": "Posts",
  "style": "bodySmall",
  "color": "primary"
},
```

**Passo extra 2.2**: Adicione fontWeight:
```json
{
  "type": "text",
  "content": "Posts",
  "style": "bodySmall",
  "color": "primary",
  "fontWeight": "bold"
},
```

---

### Ajuste Extra 3: Aumentar line-height da bio

**Localização**: Linha 600

**Passo extra 3.1**: Localize:
```json
{
  "type": "text",
  "content": "{{props.profile.bio}}",
  "style": "bodySmall",
  "color": "onSurfaceVariant"
}
```

**Passo extra 3.2**: Adicione lineHeight:
```json
{
  "type": "text",
  "content": "{{props.profile.bio}}",
  "style": "bodySmall",
  "color": "onSurfaceVariant",
  "lineHeight": 1.6
}
```

---

## VALIDAÇÃO APÓS CORREÇÕES

### Checklist de Validação Visual

Após implementar todas as correções, valide visualmente:

#### Coluna 1 - Direct messages
- [ ] Título "Direct messages" está no topo com botão X à direita
- [ ] Há um divisor horizontal sutil após o título
- [ ] Campo de busca aparece ANTES das tabs
- [ ] Tabs (Inbox, Unread, Agents) aparecem com indicador claro da tab ativa
- [ ] Badge "3" na tab Unread está visível e destacado
- [ ] Items de conversa têm espaçamento confortável (não muito apertado)
- [ ] Nomes das conversas são destacados em negrito
- [ ] Timestamps estão legíveis no canto direito
- [ ] Avatares têm 40px de tamanho

#### Coluna 2 - Clarity Community
- [ ] Título "Clarity Community 🔥" tem ícone dropdown (▼) ao lado
- [ ] Ícone de menu (⋮) está no canto direito
- [ ] Há divisor horizontal após o header
- [ ] Data "MONDAY, OCTOBER 28TH" está centralizada
- [ ] Mensagens têm espaçamento adequado (16px entre elas)
- [ ] Avatares das mensagens têm 40px
- [ ] Nomes dos autores são destacados
- [ ] Conteúdo das mensagens é legível com line-height adequado
- [ ] Reações (👍, 💬) têm espaçamento claro entre ícone e número
- [ ] Campo "Send a message..." tem bordas arredondadas
- [ ] Ícones de ação (📎, 😊, 🖼️) são clicáveis (tamanho médio)

#### Coluna 3 - Profile
- [ ] Título "Profile" tem espaçamento superior adequado
- [ ] Avatar grande tem 96px e está centralizado
- [ ] Nome "Robert Fox" está centralizado e em negrito
- [ ] Subtítulo "Business Coach" está abaixo do nome
- [ ] Tabs (About, Posts, Comments, Spaces) têm indicador de ativa
- [ ] Informações de contato (email, location, memberSince) são legíveis
- [ ] Ícones de informação estão alinhados
- [ ] Tags (Exiter, Pro, Creator) têm padding adequado
- [ ] Bio tem line-height confortável para leitura
- [ ] Links têm cor azul e underline

#### Geral
- [ ] Bordas verticais entre colunas são visíveis mas sutis
- [ ] Proporções das colunas parecem corretas (28% / 47% / 25%)
- [ ] Não há elementos cortados ou sobrepostos
- [ ] Scroll funciona em todas as colunas quando necessário
- [ ] Layout geral parece balanceado e profissional

---

## TESTES APÓS IMPLEMENTAÇÃO

### Teste 1: Comparação Visual
1. Abra http://localhost:8000/?demo=inbox no navegador
2. Tire um novo screenshot
3. Compare lado a lado com demo-inbox-message.png
4. Marque itens corrigidos na checklist

### Teste 2: Interatividade
1. Clique em diferentes conversas - deve atualizar a coluna 2
2. Clique em tabs (Inbox/Unread/Agents) - deve filtrar conversas
3. Clique em avatares nas mensagens - deve atualizar o perfil (coluna 3)
4. Teste o scroll em cada coluna

### Teste 3: Responsividade (se aplicável)
1. Redimensione a janela do navegador
2. Verifique se as proporções das colunas se mantêm
3. Verifique se não há quebras de layout

---

## PROBLEMAS CONHECIDOS E WORKAROUNDS

### Problema 1: SDK não suporta paddingVertical/paddingHorizontal
**Workaround**: Use apenas `padding` com valor único mais próximo

### Problema 2: SDK não suporta lineHeight
**Workaround**: Ajuste o style para um que tenha line-height maior (ex: bodyLarge)

### Problema 3: SDK não suporta textDecoration
**Workaround**: Altere apenas a cor dos links para um azul mais claro (#1976d2)

### Problema 4: SDK não suporta borderRadius no input
**Workaround**: Aceitar o border-radius padrão por enquanto

### Problema 5: Tabs não suportam badgeColor
**Workaround**: Aceitar a cor padrão do badge, ou usar um componente custom

---

## REGISTRO DE MUDANÇAS

Após implementar, preencha:

| ID | Descrição | Status | Notas |
|----|-----------|--------|-------|
| P0-1 | Mover busca antes das tabs | ⬜ | |
| P0-2 | Adicionar divisor após título | ⬜ | |
| P0-3 | Adicionar dropdown icon | ⬜ | |
| P1-4 | Reduzir spacing mensagens | ⬜ | |
| P1-5 | Ajustar padding conversas | ⬜ | |
| P1-6 | Aumentar avatar perfil | ⬜ | |
| P1-7 | Ajustar padding perfil | ⬜ | |
| P1-8 | Verificar tabs ativas | ⬜ | |
| P1-9 | Melhorar badge | ⬜ | |
| P1-10 | Aumentar fonte nomes | ⬜ | |
| P2-11 | Cor preview | ⬜ | |
| P2-12 | Border-radius input | ⬜ | |
| P2-13 | Spacing reações | ⬜ | |
| P2-14 | Tamanho ícones input | ⬜ | |
| P2-15 | Line-height mensagens | ⬜ | |
| P2-16 | Spacing info perfil | ⬜ | |
| P2-17 | Padding chips | ⬜ | |
| P2-18 | Underline links | ⬜ | |
| P2-19 | Tamanho timestamp | ⬜ | |
| P2-20 | Cor divisores | ⬜ | |

**Legenda**:
- ⬜ Não iniciado
- 🔄 Em andamento
- ✅ Concluído
- ❌ Bloqueado/Não suportado

---

## CONCLUSÃO

Este guia fornece instruções exatas para cada correção necessária. Recomenda-se:

1. Fazer backup do arquivo ui.json antes de começar
2. Implementar as fases em ordem (P0 → P1 → P2)
3. Validar visualmente após cada fase
4. Documentar problemas encontrados
5. Atualizar o checklist conforme avança

Se encontrar problemas não documentados, registre-os na seção "Problemas Conhecidos" para referência futura.
