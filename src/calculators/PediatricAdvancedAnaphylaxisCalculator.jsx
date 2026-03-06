import { useState } from 'react';
import { AlertTriangle, Droplets, Syringe, Wind } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

const infusionProtocols = {
  rch: {
    name: 'RCH 1 mcg/mL',
    ratePerKgHour: 5,
    concentration: '1 mcg/mL',
    equivalence: '0,08 mcg/kg/min',
    note: 'RCH descreve 1 mcg/mL a 5 mL/kg/h como ponto de partida.',
  },
  qld: {
    name: 'Queensland 20 mcg/mL',
    ratePerKgHour: 0.3,
    concentration: '20 mcg/mL',
    equivalence: '0,10 mcg/kg/min',
    note: 'Queensland usa 1 mg em 50 mL e comeca em 0,3 mL/kg/h.',
  },
};

export function PediatricAdvancedAnaphylaxisCalculator() {
  const [weight, setWeight] = useState(24);
  const [protocolId, setProtocolId] = useState('rch');

  const protocol = infusionProtocols[protocolId];
  const imDoseMg = Math.min(weight * 0.01, 0.5);
  const imDoseMl = imDoseMg;
  const fluidBolusMl = weight * 20;
  const infusionRateMlH = weight * protocol.ratePerKgHour;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ruby">
        <div className="panel-hero-copy">
          <span className="kicker">Anafilaxia avancada</span>
          <h3>Choque, via aerea e infusao de adrenalina</h3>
          <p>
            Este modulo entra quando a primeira adrenalina IM ja nao basta: persistencia de
            hipotensao, piora respiratoria ou necessidade de escalar para infusao.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Adrenalina IM de resgate</span>
            <strong>{formatNumber(imDoseMg, 2)} mg</strong>
            <p>0,01 mg/kg IM enquanto o preparo da infusao corre em paralelo.</p>
          </article>
          <article className="metric-card">
            <span>Bolus SF 0,9%</span>
            <strong>{formatNumber(fluidBolusMl)} mL</strong>
            <p>20 mL/kg rapido se houver hipotensao ou perfusao ruim.</p>
          </article>
          <article className="metric-card">
            <span>Infusao inicial</span>
            <strong>{formatNumber(infusionRateMlH, 1)} mL/h</strong>
            <p>{protocol.name}</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e protocolo</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="5"
                max="120"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 5, 120))}
              />
            </label>

            <div className="toggle-grid">
              {Object.entries(infusionProtocols).map(([id, infusionProtocol]) => (
                <button
                  key={id}
                  type="button"
                  className={`choice-card ${protocolId === id ? 'active' : ''}`}
                  onClick={() => setProtocolId(id)}
                >
                  <strong>{infusionProtocol.name}</strong>
                  <span>{infusionProtocol.concentration}</span>
                </button>
              ))}
            </div>

            <div className="status-banner compact-banner tone-danger">
              <AlertTriangle size={18} />
              <div>
                <strong>Quando usar</strong>
                <p>Persistencia de choque, piora de via aerea ou respiracao apos adrenalina IM e suporte inicial.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Infusao de adrenalina</span>
                <h3>{formatNumber(infusionRateMlH, 1)} mL/h</h3>
                <p>
                  {protocol.concentration} com equivalencia aproximada de {protocol.equivalence}.
                </p>
              </div>
              <div className="result-badge result-badge-ruby">
                <Syringe size={18} />
                {formatNumber(imDoseMl, 2)} mL IM
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Bolus inicial</span>
                <strong>{formatNumber(fluidBolusMl)} mL</strong>
                <p>Pode ser repetido se a hipotensao persistir e nao houver sinais de sobrecarga.</p>
              </article>
              <article className="metric-card">
                <span>Adrenalina nebulizada</span>
                <strong>5 mL</strong>
                <p>Solucao 1:1000 nao diluida se houver edema/estridor de via aerea superior.</p>
              </article>
              <article className="metric-card">
                <span>Concentracao</span>
                <strong>{protocol.concentration}</strong>
                <p>{protocol.note}</p>
              </article>
              <article className="metric-card">
                <span>Leitura operacional</span>
                <strong>Infundir e titular</strong>
                <p>Neste ponto, monitorizacao continua e ajuda senior deixam de ser opcionais.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Escalada pratica</h4>
              <ul className="plain-list">
                <li>A dose IM continua valendo enquanto acesso, monitorizacao e infusao sao montados</li>
                <li>Posicionamento supino, O2, cristaloide e preparo de via aerea caminham em paralelo</li>
                <li>Se a evolucao vira peri-arrest, a logica deixa de ser ambulatory anaphylaxis e passa a ser reanimacao avancada</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>RCH + Queensland + eCAT</h4>
                <p>
                  RCH resume a infusao 1 mcg/mL a 5 mL/kg/h e bolus de 20 mL/kg. Queensland
                  descreve a preparacao 1 mg em 50 mL com inicio em 0,3 mL/kg/h. eCAT reforca
                  repeticao de adrenalina IM a cada 5 minutos se necessario.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.advancedAnaphylaxisRch} target="_blank" rel="noreferrer">
                  RCH anafilaxia
                </a>
                <a href={sourceLinks.advancedAnaphylaxisQld} target="_blank" rel="noreferrer">
                  Queensland flowchart
                </a>
                <a href={sourceLinks.anaphylaxisEcat} target="_blank" rel="noreferrer">
                  eCAT anafilaxia
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Droplets size={18} />
              <p>Se a hipotensao nao responde rapido, a prioridade e manter perfusao e oxigenacao; antihistaminico e corticoide continuam adjuntos, nao salvam a janela critica.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
