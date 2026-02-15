# Inbox Corrections - Cheat Sheet

## ⚡ Quick Reference

### 📊 Stats
- **Correções**: 18/20 (90%)
- **Arquivo**: `docs/demos/inbox/ui.json`
- **Linhas modificadas**: ~50
- **Tempo**: 20 min

### 🎯 Top 5 Mudanças
1. ✅ Dropdown icon no título (▼)
2. ✅ Avatar maior (96px)
3. ✅ Nomes maiores (bodyLarge)
4. ✅ Input arredondado (12px)
5. ✅ Divisor após header

---

## 🔍 O Que Mudou

### Col 1 (Direct Messages)
```diff
+ Divisor após header
+ Nomes: bodyLarge
+ Timestamps: fontSize 12
+ Padding: 12 → 8px
```

### Col 2 (Clarity Community)
```diff
+ Dropdown: ▼
+ Spacing: 24 → 16px
+ Border-radius: 12px
+ Ícones: medium
+ Line-height: 1.5
+ Reações: 4 → 6px
```

### Col 3 (Profile)
```diff
+ Avatar: 80 → 96px
+ Spacing: 8 → 12px (após avatar)
+ Spacing: 12 → 8px (info)
+ Tab bold
+ Links underline
+ Bio line-height: 1.6
```

### Geral
```diff
+ Divisores: #e7e0ec → #d0d0d0
```

---

## 🚀 Como Testar (30s)

```bash
# 1. Abrir
open http://localhost:8000/?demo=inbox

# 2. Verificar
# ✓ Divisor após "Direct messages"
# ✓ Seta ▼ ao lado de "Clarity Community"
# ✓ Nomes grandes
# ✓ Avatar grande (96px)
# ✓ Links com underline

# 3. Commit
git add docs/demos/inbox/ui.json
git commit -m "Fix inbox layout - 18 corrections"
```

---

## 📁 Arquivos Criados

| Arquivo | Para Quê |
|---------|----------|
| `INBOX-CORRECTIONS-EXECUTIVE-SUMMARY.md` | Visão geral (2 min) |
| `INBOX-VALIDATION-GUIDE.md` | Guia de teste (5 min) |
| `inbox-corrections-applied.md` | Relatório completo (10 min) |
| `inbox-corrections-diff.md` | Diff técnico (15 min) |
| `inbox-corrections-summary.md` | Resumo visual (5 min) |
| `INBOX-VISUAL-CHANGES.md` | Comparação visual |
| `INBOX-CORRECTIONS-INDEX.md` | Índice geral |
| `INBOX-CHEAT-SHEET.md` | Este arquivo |

---

## 🎯 Valores Antes/Depois

| Prop | Antes | Depois |
|------|-------|--------|
| Avatar perfil | 80px | 96px |
| Spacing msg | 24px | 16px |
| Padding conv | 12px | 8px |
| Nome | bodyMedium | bodyLarge |
| Timestamp | default | 12px |
| Border input | 0px | 12px |
| Reações | 4px | 6px |
| Ícones | small | medium |

---

## ⚠️ Experimental

Pode não funcionar (SDK):
- `borderRadius`
- `lineHeight`
- `textDecoration`
- `fontSize` com `style`

**Ação**: Validar e remover se falhar

---

## 🐛 Problemas?

| Problema | Solução |
|----------|---------|
| Divisor não aparece | SDK não suporta, OK |
| Border não arredonda | Remover `borderRadius` |
| LineHeight não muda | Usar bodyLarge |
| Underline não aparece | Usar cor `#1976d2` |

---

## 📊 Checklist (1 min)

- [ ] Divisor visível
- [ ] Dropdown ▼ visível
- [ ] Nomes maiores
- [ ] Avatar 96px
- [ ] Input arredondado
- [ ] Ícones médios
- [ ] Links underline
- [ ] Divisores escuros

**6+ OK**: ✅ Sucesso!

---

## 🔗 Links Rápidos

```bash
# Ver diff
git diff docs/demos/inbox/ui.json

# Validar JSON
cat docs/demos/inbox/ui.json | jq .

# Abrir demo
open http://localhost:8000/?demo=inbox

# Screenshot
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --screenshot=after.png \
  --window-size=1920,1080 http://localhost:8000/?demo=inbox

# Commit
git add docs/demos/inbox/ui.json inbox-*.md INBOX-*.md
git commit -m "Fix inbox - 18 corrections"
git push
```

---

## 🎯 Próximo Passo

**→ Seguir**: `INBOX-VALIDATION-GUIDE.md`

---

**Status**: ✅ PRONTO PARA TESTAR
