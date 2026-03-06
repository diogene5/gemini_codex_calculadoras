import { useState } from 'react';
import { Calculator, Gauge, Milestone, Waves } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

const vasoactiveAgents = {
  epinephrine: {
    name: 'Epinefrina',
    target: 0.05,
    range: 'Inicio oficial CPS: 0,05 mcg/kg/min',
  },
  norepinephrine: {
    name: 'Norepinefrina',
    target: 0.05,
    range: 'Inicio oficial CPS: 0,05 mcg/kg/min',
  },
  dopamine: {
    name: 'Dopamina',
    target: 10,
    range: 'Alternativa inicial CPS: 10 mcg/kg/min',
  },
};

export function VasoactiveInfusionCalculator() {
  const [weight, setWeight] = useState(18);
  const [agent, setAgent] = useState('epinephrine');
  const [drugMg, setDrugMg] = useState(4);
  const [volumeMl, setVolumeMl] = useState(50);
  const [rateMlH, setRateMlH] = useState(2.7);

  const currentAgent = vasoactiveAgents[agent];
  const concentrationMcgMl = volumeMl > 0 ? (drugMg * 1000) / volumeMl : 0;
  const deliveredMcgMin = (concentrationMcgMl * rateMlH) / 60;
  const doseMcgKgMin = weight > 0 ? deliveredMcgMin / weight : 0;
  const targetRateMlH =
    concentrationMcgMl > 0 ? (currentAgent.target * weight * 60) / concentrationMcgMl : 0;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-graphite">
        <div className="panel-hero-copy">
          <span className="kicker">Vasoativos</span>
          <h3>Conversor de infusao em mcg/kg/min</h3>
          <p>
            Este modulo evita erro de conversao: voce informa a diluicao local e a bomba e a
            tela devolve mcg/kg/min. Tambem mostra uma taxa inicial de referencia quando ela
            aparece nas diretrizes oficiais.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Concentracao</span>
            <strong>{formatNumber(concentrationMcgMl, 1)} mcg/mL</strong>
            <p>Calculada a partir da ampola e do volume final.</p>
          </article>
          <article className="metric-card">
            <span>Dose atual</span>
            <strong>{formatNumber(doseMcgKgMin, 3)} mcg/kg/min</strong>
            <p>Resultado da diluicao local e da taxa programada.</p>
          </article>
          <article className="metric-card">
            <span>Taxa alvo inicial</span>
            <strong>{formatNumber(targetRateMlH, 2)} mL/h</strong>
            <p>Equivale ao alvo inicial oficial para o agente selecionado, se houver.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Diluicao e bomba</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="2"
                max="150"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 2, 150))}
              />
            </label>

            <label className="field">
              <span>Agente</span>
              <select className="input" value={agent} onChange={(event) => setAgent(event.target.value)}>
                {Object.entries(vasoactiveAgents).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Quantidade da droga (mg)</span>
              <input
                className="input"
                type="number"
                min="0.1"
                step="0.1"
                value={drugMg}
                onChange={(event) => setDrugMg(Math.max(0.1, Number(event.target.value) || 0.1))}
              />
            </label>

            <label className="field">
              <span>Volume final (mL)</span>
              <input
                className="input"
                type="number"
                min="1"
                step="1"
                value={volumeMl}
                onChange={(event) => setVolumeMl(Math.max(1, Number(event.target.value) || 1))}
              />
            </label>

            <label className="field">
              <span>Taxa na bomba (mL/h)</span>
              <input
                className="input"
                type="number"
                min="0"
                step="0.1"
                value={rateMlH}
                onChange={(event) => setRateMlH(Math.max(0, Number(event.target.value) || 0))}
              />
            </label>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Saida principal</span>
                <h3>{formatNumber(doseMcgKgMin, 3)} mcg/kg/min</h3>
                <p>Conversao direta a partir da sua diluicao local. Nao assume um preparo padrao unico.</p>
              </div>
              <div className="result-badge result-badge-graphite">
                <Gauge size={18} />
                {currentAgent.name}
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Regra pratica</span>
                <strong>{currentAgent.range}</strong>
                <p>Referencia oficial de ponto de partida para sepse, quando aplicavel.</p>
              </article>
              <article className="metric-card">
                <span>Taxa correspondente</span>
                <strong>{formatNumber(targetRateMlH, 2)} mL/h</strong>
                <p>Quanto programar na bomba para bater o alvo inicial com essa mesma diluicao.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Formula usada</h4>
              <ul className="plain-list">
                <li>Concentracao = mg totais x 1000 / volume final</li>
                <li>mcg/min = concentracao x mL/h / 60</li>
                <li>mcg/kg/min = mcg/min / peso</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Uso clinico</span>
                <h4>Conversor + referencia inicial</h4>
                <p>
                  O modulo usa a matematica universal da infusao e ancora os alvos iniciais em
                  epinefrina, norepinefrina e dopamina nas referencias pediátricas de sepse.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.sepsisGuideline} target="_blank" rel="noreferrer">
                  Guia CPS
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Calculator size={18} />
              <p>Concentracao e volume final variam entre protocolos locais. O conversor serve justamente para nao assumir um preparo errado.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
