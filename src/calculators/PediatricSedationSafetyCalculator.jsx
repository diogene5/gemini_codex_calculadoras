import { useState } from 'react';
import { AlertTriangle, ShieldPlus, Syringe, Zap } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricSedationSafetyCalculator() {
  const [weight, setWeight] = useState(20);

  const atropine = Math.min(weight * 0.02, 0.5);
  const epinephrineMg = Math.min(weight * 0.01, 1);
  const epinephrineMl = epinephrineMg / 0.1;
  const flumazenil = Math.min(weight * 0.01, 0.2);
  const flumazenilTotal = Math.min(weight * 0.05, 1);
  const naloxone = Math.min(weight * 0.1, 2);
  const succIvLow = Math.min(weight * 1, 150);
  const succIvHigh = Math.min(weight * 2, 150);
  const succImLow = Math.min(weight * 2, 150);
  const succImHigh = Math.min(weight * 4, 150);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-graphite">
        <div className="panel-hero-copy">
          <span className="kicker">Seguranca</span>
          <h3>Sedacao: rescue meds e checklist rapido</h3>
          <p>
            Em vez de focar na droga sedativa, este modulo prioriza o que costuma faltar quando a
            sedacao complica: reversao, laringoespasmo e preparo da sala.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Naloxone</span>
            <strong>{formatNumber(naloxone, 1)} mg</strong>
            <p>0,1 mg/kg IV, maximo 2 mg.</p>
          </article>
          <article className="metric-card">
            <span>Flumazenil</span>
            <strong>{formatNumber(flumazenil, 2)} mg</strong>
            <p>0,01 mg/kg IV, maximo 0,2 mg.</p>
          </article>
          <article className="metric-card">
            <span>Succinilcolina IV</span>
            <strong>
              {formatNumber(succIvLow)} a {formatNumber(succIvHigh)} mg
            </strong>
            <p>Faixa de 1 a 2 mg/kg IV como rescue de laringoespasmo/intubacao.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="3"
                max="120"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 3, 120))}
              />
            </label>

            <label className="field">
              <span>Ajuste rápido do peso</span>
              <input
                className="range"
                type="range"
                min="3"
                max="60"
                step="0.5"
                value={Math.min(weight, 60)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <div className="status-banner compact-banner tone-info">
              <ShieldPlus size={18} />
              <div>
                <strong>Foco em seguranca</strong>
                <p>Este modulo foi desenhado para reduzir o atrito em rescue meds e checklist da sala.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Epinefrina IV</span>
                <h3>{formatNumber(epinephrineMg, 2)} mg</h3>
                <p>{formatNumber(epinephrineMl, 1)} mL da apresentacao 0,1 mg/mL.</p>
              </div>
              <div className="result-badge result-badge-graphite">
                <Zap size={18} />
                Rescue set
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Atropina IV</span>
                <strong>{formatNumber(atropine, 2)} mg</strong>
                <p>0,02 mg/kg IV, maximo 0,5 mg por dose.</p>
              </article>
              <article className="metric-card">
                <span>Flumazenil acumulado</span>
                <strong>{formatNumber(flumazenilTotal, 2)} mg</strong>
                <p>Maximo total cumulativo de 0,05 mg/kg ou 1 mg.</p>
              </article>
              <article className="metric-card">
                <span>Succinilcolina IM</span>
                <strong>
                  {formatNumber(succImLow)} a {formatNumber(succImHigh)} mg
                </strong>
                <p>2 a 4 mg/kg IM, capando em 150 mg para nao extrapolar no preparo rapido.</p>
              </article>
              <article className="metric-card">
                <span>Checklist base</span>
                <strong>SOAPME</strong>
                <p>Suction, Oxygen, Airway, Pharmacy, Monitors, Equipment.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Antes de sedar</h4>
              <ul className="plain-list">
                <li>Separar rescue meds antes da primeira dose sedativa</li>
                <li>Confirmar monitorizacao continua e acesso a via aerea avancada</li>
                <li>Se o sedador estiver fazendo o procedimento, outra pessoa deve monitorar</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fonte oficial</span>
                <h4>Procedural sedation CPS</h4>
                <p>
                  O guideline da Canadian Paediatric Society lista atropina, flumazenil,
                  naloxone, succinilcolina e epinefrina como rescue medications e reforca
                  equipe, monitorizacao e preparo estruturado.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.sedationGuideline} target="_blank" rel="noreferrer">
                  Guideline CPS de sedacao
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Contraindicacoes e interacoes continuam mandando mais do que a conta isolada de rescue meds.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
