import { useState } from 'react';
import {
  AlarmSmoke,
  Layers3,
  MonitorSmartphone,
  MoonStar,
} from 'lucide-react';

const variants = {
  triage: {
    name: 'Triage Board',
    subtitle: 'Urgência legível em 2 segundos',
    icon: AlarmSmoke,
    toneClass: 'preview-triage',
    why: 'Faz sentido quando a decisão precisa ser quase reflexa e a equipe está em movimento.',
    bestFor: 'Salas de emergência, protocolos vermelhos, telas vistas de longe.',
    learning:
      'Hierarquia extrema, cores de risco e blocos grandes ajudam quando a atenção do usuário está fragmentada.',
    principles: [
      'Contraste alto entre alerta e fundo',
      'Poucos dados por bloco',
      'Ação principal sempre visível',
    ],
  },
  protocol: {
    name: 'Protocol Console',
    subtitle: 'Fluxo clínico em camadas',
    icon: Layers3,
    toneClass: 'preview-protocol',
    why: 'Ideal quando a calculadora precisa ensinar junto com a conta e manter contexto clínico perto.',
    bestFor: 'Sedação, sepse, DKA, telas com checklist e múltiplos passos.',
    learning:
      'Quando existe risco de esquecer etapa, vale mostrar a sequência do raciocínio junto da fórmula.',
    principles: [
      'Agrupar por etapa e não por tipo de componente',
      'Mostrar premissas ao lado do resultado',
      'Usar microcopys de segurança',
    ],
  },
  night: {
    name: 'Night Shift',
    subtitle: 'Baixa luz, foco e menos fadiga',
    icon: MoonStar,
    toneClass: 'preview-night',
    why: 'Boa opção para plantão noturno, principalmente quando a tela fica aberta por muito tempo.',
    bestFor: 'UTI, posto de enfermagem, uso em ambientes escuros.',
    learning:
      'Tema escuro só funciona bem quando mantém contraste real e hierarquia clara, sem virar decoração.',
    principles: [
      'Brilho controlado e texto forte',
      'Destaque por temperatura de cor',
      'Menos ruído visual contínuo',
    ],
  },
};

const newIdeas = [
  'Modo checagem rápida com apenas peso e três ações críticas.',
  'Gerador de fichas imprimíveis por cenário clínico.',
  'URL compartilhável que salva o estado da calculadora.',
  'Modo ensino com tooltip para cada fórmula e cada droga.',
  'Atalho de teclado e layout otimizado para tablet.',
  'Tema institucional por hospital, curso ou residência.',
];

const reusablePatterns = [
  'Hero com contexto clínico e métrica principal.',
  'Painel esquerdo para entrada, painel direito para decisão.',
  'Fontes oficiais visíveis dentro do próprio módulo.',
  'Sistema de tons para risco, atenção, alvo e confirmação.',
];

export function DesignAlternativesLab() {
  const [activeVariant, setActiveVariant] = useState('triage');

  const currentVariant = variants[activeVariant];
  const VariantIcon = currentVariant.icon;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-graphite">
        <div className="panel-hero-copy">
          <span className="kicker">Lab de design</span>
          <h3>Três direções visuais para evoluir o produto</h3>
          <p>
            Em vez de um único visual fixo, aqui você enxerga como o mesmo problema pode ganhar
            três linguagens diferentes conforme contexto, urgência e ambiente de uso.
          </p>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Alternativas</span>
            <h3>Escolha uma direção</h3>
          </div>

          <div className="field-group">
            {Object.entries(variants).map(([key, variant]) => {
              const Icon = variant.icon;

              return (
                <button
                  key={key}
                  type="button"
                  className={`choice-card choice-card-wide ${activeVariant === key ? 'active' : ''}`}
                  onClick={() => setActiveVariant(key)}
                >
                  <div className="choice-card-header">
                    <span className="icon-chip">
                      <Icon size={16} />
                    </span>
                    <strong>{variant.name}</strong>
                  </div>
                  <span>{variant.subtitle}</span>
                  <p>{variant.bestFor}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Preview ativo</span>
                <h3>{currentVariant.name}</h3>
                <p>{currentVariant.why}</p>
              </div>
              <div className="result-badge result-badge-graphite">
                <VariantIcon size={18} />
                {currentVariant.subtitle}
              </div>
            </div>

            <div className={`preview-canvas ${currentVariant.toneClass}`}>
              <div className="preview-topbar">
                <span>Choque pediátrico</span>
                <span>18 kg</span>
              </div>
              <div className="preview-headline">
                <strong>Bolus imediato: 360 mL</strong>
                <span>Reavaliar perfusão após cada alíquota</span>
              </div>
              <div className="preview-metrics">
                <div>
                  <small>Próxima ação</small>
                  <strong>20 mL/kg</strong>
                </div>
                <div>
                  <small>Faixa inicial</small>
                  <strong>40 a 60 mL/kg</strong>
                </div>
                <div>
                  <small>Alerta</small>
                  <strong>Sobrecarga</strong>
                </div>
              </div>
              <button type="button" className="preview-cta">
                Abrir checklist
              </button>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Melhor uso</span>
                <strong>{currentVariant.bestFor}</strong>
                <p>É aqui que a linguagem visual dessa alternativa faz mais sentido.</p>
              </article>
              <article className="metric-card">
                <span>Aprendizado central</span>
                <strong>{currentVariant.learning}</strong>
                <p>Princípio que vale reaproveitar em outros produtos digitais.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Princípios da direção escolhida</h4>
              <ul className="plain-list">
                {currentVariant.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="section-heading">
          <span className="kicker">Como usar em novos projetos</span>
          <h3>O raciocínio que se reaproveita</h3>
        </div>

        <div className="metric-grid three-columns">
          {reusablePatterns.map((pattern) => (
            <article key={pattern} className="panel mini-panel">
              <span className="icon-chip">
                <MonitorSmartphone size={16} />
              </span>
              <p>{pattern}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <span className="kicker">Próximas ideias</span>
          <h3>O que ainda vale explorar</h3>
        </div>

        <div className="idea-grid">
          {newIdeas.map((idea, index) => (
            <article key={idea} className="idea-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{idea}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
