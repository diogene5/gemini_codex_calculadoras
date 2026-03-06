import { useState } from 'react';
import { AlertTriangle, Gauge, Stethoscope, Wind } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricBronchiolitisCalculator() {
  const [weight, setWeight] = useState(8);
  const [preferredFlow, setPreferredFlow] = useState(2);

  const flowConservative = weight * 1.5;
  const flowStandard = weight * 2;
  const selectedFlow = preferredFlow === 1.5 ? flowConservative : flowStandard;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ocean">
        <div className="panel-hero-copy">
          <span className="kicker">Respiratório</span>
          <h3>Bronquiolite: faixa inicial de HFNC</h3>
          <p>
            Ferramenta curta para transformar peso em fluxo inicial de alto fluxo nasal,
            comparando uma abordagem mais conservadora com a faixa mais usada nos estudos.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>1,5 L/kg/min</span>
            <strong>{formatNumber(flowConservative, 1)} L/min</strong>
            <p>Faixa moderada para iniciar sem superdimensionar o fluxo.</p>
          </article>
          <article className="metric-card">
            <span>2 L/kg/min</span>
            <strong>{formatNumber(flowStandard, 1)} L/min</strong>
            <p>Faixa mais usada como ponto de partida em protocolos e estudos.</p>
          </article>
          <article className="metric-card">
            <span>Fluxo selecionado</span>
            <strong>{formatNumber(selectedFlow, 1)} L/min</strong>
            <p>Escolha rápida para conversar com a equipe e ajustar no dispositivo.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e estratégia</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="2"
                max="25"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 2, 25))}
              />
            </label>

            <label className="field">
              <span>Ajuste rápido do peso</span>
              <input
                className="range"
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={Math.min(weight, 20)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <div className="toggle-grid">
              <button
                type="button"
                className={`choice-card ${preferredFlow === 1.5 ? 'active' : ''}`}
                onClick={() => setPreferredFlow(1.5)}
              >
                <strong>1,5 L/kg/min</strong>
                <span>Início conservador</span>
              </button>
              <button
                type="button"
                className={`choice-card ${preferredFlow === 2 ? 'active' : ''}`}
                onClick={() => setPreferredFlow(2)}
              >
                <strong>2 L/kg/min</strong>
                <span>Faixa mais usual</span>
              </button>
            </div>

            <div className="status-banner compact-banner tone-info">
              <Wind size={18} />
              <div>
                <strong>Uso como apoio respiratório</strong>
                <p>HFNC reduz esforço respiratório, mas a decisão de iniciar e escalar continua clínica.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Fluxo inicial</span>
                <h3>{formatNumber(selectedFlow, 1)} L/min</h3>
                <p>Faixa baseada em peso para bronquiolite moderada a grave.</p>
              </div>
              <div className="result-badge">
                <Gauge size={18} />
                {formatNumber(preferredFlow, 1)} L/kg/min
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Janela de inicio</span>
                <strong>
                  {formatNumber(flowConservative, 1)} a {formatNumber(flowStandard, 1)} L/min
                </strong>
                <p>Boa faixa para presets de dispositivo e comunicação com enfermagem/RT.</p>
              </article>
              <article className="metric-card">
                <span>Ponto de cautela</span>
                <strong>Reavaliar cedo</strong>
                <p>Esforço respiratório, hidratação, apneia e necessidade de escalonamento mandam mais que a conta.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>O que esta por tras do numero</h4>
              <ul className="plain-list">
                <li>{formatNumber(weight, 1)} kg x 1,5 L/kg/min = {formatNumber(flowConservative, 1)} L/min</li>
                <li>{formatNumber(weight, 1)} kg x 2 L/kg/min = {formatNumber(flowStandard, 1)} L/min</li>
                <li>Use a faixa como inicio, nao como meta fixa</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Base de evidencia</span>
                <h4>HFNC em bronquiolite</h4>
                <p>
                  Estudos randomizados compararam 1 a 2 L/kg/min e uma revisao Cochrane recente
                  resume o uso de HFNC na faixa de 2 a 3 L/kg/min. Aqui optei por expor a
                  janela de 1,5 a 2 L/kg/min para manter um ponto de partida conservador.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.bronchiolitisFlowTrial} target="_blank" rel="noreferrer">
                  Trial de fluxo inicial
                </a>
                <a href={sourceLinks.bronchiolitisHFNCReview} target="_blank" rel="noreferrer">
                  Revisao Cochrane
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Persistencia de exaustao, hipoxemia, apneia ou desidratacao exige reavaliacao imediata e possivel escalonamento.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
