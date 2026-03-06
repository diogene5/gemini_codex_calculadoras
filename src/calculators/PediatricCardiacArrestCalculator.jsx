import { useState } from 'react';
import { Activity, Siren, Zap } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricCardiacArrestCalculator() {
  const [weight, setWeight] = useState(16);

  const firstShock = weight * 2;
  const secondShock = weight * 4;
  const subsequentShock = weight * 4;
  const maxShock = Math.min(weight * 10, 200);
  const epinephrineMg = Math.min(weight * 0.01, 1);
  const epinephrineMl = Math.min(weight * 0.1, 10);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ruby">
        <div className="panel-hero-copy">
          <span className="kicker">PALS</span>
          <h3>Parada cardíaca pediátrica: choque + epinefrina</h3>
          <p>
            Resumo numérico do algoritmo: energia do desfibrilador e dose IV/IO de epinefrina
            em uma única tela.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>1º choque</span>
            <strong>{formatNumber(firstShock)} J</strong>
            <p>Equivalente a 2 J/kg.</p>
          </article>
          <article className="metric-card">
            <span>2º choque</span>
            <strong>{formatNumber(secondShock)} J</strong>
            <p>Equivalente a 4 J/kg.</p>
          </article>
          <article className="metric-card">
            <span>Epinefrina IV/IO</span>
            <strong>{formatNumber(epinephrineMl, 1)} mL</strong>
            <p>Solução 0,1 mg/mL.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso estimado</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="1"
                max="80"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 1, 80))}
              />
            </label>

            <label className="field">
              <span>Ajuste rápido do peso</span>
              <input
                className="range"
                type="range"
                min="1"
                max="50"
                step="0.5"
                value={Math.min(weight, 50)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <div className="status-banner compact-banner tone-danger">
              <Siren size={18} />
              <div>
                <strong>Uso educativo de alta urgência</strong>
                <p>Os valores ajudam a preparar o raciocínio, não substituem o carrinho de parada.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Energia para desfibrilação</span>
                <h3>{formatNumber(firstShock)} J</h3>
                <p>Primeiro choque. A partir do segundo, subir para 4 J/kg.</p>
              </div>
              <div className="result-badge result-badge-ruby">
                <Zap size={18} />
                Máximo {formatNumber(maxShock)} J
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Choques subsequentes</span>
                <strong>{formatNumber(subsequentShock)} J</strong>
                <p>Pelo menos 4 J/kg, sem ultrapassar 10 J/kg ou dose adulta.</p>
              </article>
              <article className="metric-card">
                <span>Epinefrina</span>
                <strong>{formatNumber(epinephrineMg, 2)} mg</strong>
                <p>0,01 mg/kg IV/IO, repetindo a cada 3 a 5 minutos.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Equivalência pronta</h4>
              <ul className="plain-list">
                <li>0,01 mg/kg = 0,1 mL/kg da apresentação 0,1 mg/mL</li>
                <li>Volume calculado: {formatNumber(epinephrineMl, 1)} mL</li>
                <li>Dose máxima por administração: 1 mg</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fonte oficial</span>
                <h4>Algoritmo AHA/AAP 2025</h4>
                <p>
                  O algoritmo pediátrico de parada cardíaca mantém 2 J/kg no primeiro choque,
                  4 J/kg no segundo, choques subsequentes com pelo menos 4 J/kg e epinefrina
                  0,01 mg/kg IV/IO.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.pediatricCardiacArrest} target="_blank" rel="noreferrer">
                  PDF oficial do algoritmo
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Activity size={18} />
              <p>Confirme ritmo, pás adequadas, via de acesso e concentração antes de administrar.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
