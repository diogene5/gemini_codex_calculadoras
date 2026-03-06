# Biblioteca de Calculadoras Clinicas

Projeto React + Vite para criar calculadoras interativas com foco em emergencia pediatrica.

## Rodando localmente

```bash
npm install
npm run dev
```

Para testar no celular dentro da mesma rede:

```bash
npm run dev -- --host 0.0.0.0
ipconfig getifaddr en0
```

Depois abra `http://SEU-IP:5173` no celular.

## Estrutura

- `src/App.jsx`: catálogo lateral e seleção da calculadora ativa.
- `src/calculators/PediatricHydrationCalculator.jsx`: exemplo completo com Holiday-Segar e VIG.
- `src/calculators/PediatricShockCalculator.jsx`: bolus de choque com leitura rápida por peso.
- `src/calculators/PediatricCardiacArrestCalculator.jsx`: choque elétrico e epinefrina IV/IO.
- `src/calculators/PediatricTachycardiaCalculator.jsx`: cardioversão sincronizada e adenosina.
- `src/calculators/CalculatorBlueprint.jsx`: guia visual com princípios para duplicar a estrutura.
- `src/calculators/shared.js`: helpers reutilizados entre os módulos.
- `src/styles.css`: sistema visual compartilhado entre as calculadoras.

## Como adicionar outra calculadora

1. Crie um novo componente em `src/calculators/`.
2. Reaproveite a estrutura `panel-hero`, `workspace-grid`, `metric-card`, `field` e `status-banner`.
3. Registre o novo componente no array `calculators` em `src/App.jsx`.

## Observacao

As telas foram desenhadas como apoio educacional e checklist visual. Em contexto real, ajuste doses, limites e textos conforme protocolo local.

## Deploy no Netlify

O projeto ja inclui `netlify.toml`. Quando a CLI estiver autenticada:

```bash
npx netlify init
npx netlify deploy --prod
```
