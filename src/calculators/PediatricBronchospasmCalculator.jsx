import { useState } from 'react';
import { Gauge, Pill, Wind, Zap } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricBronchospasmCalculator() {
  const [weight, setWeight] = useState(22);

  const mdiPuffs = weight < 20 ? 5 : 10;
  const nebSalbutamol = weight < 20 ? 2.5 : 5;
  const continuousSalbutamol = Math.min(weight * 0.5, 15);
  const ipratropiumMcg = weight < 20 ? 250 : 500;
  const magnesiumLow = Math.min(weight * 40, 2000);
  const magnesiumHigh = Math.min(weight * 75, 2000);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-violet">
        <div className="panel-hero-copy">
          <span className="kicker">Broncoespasmo</span>
          <h3>Asma aguda: broncodilatador e magnesio</h3>
          <p>
            Junta as doses que mais costumam ser calculadas na fase aguda: salbutamol,
            ipratrópio e magnesio IV em criancas maiores de 1 ano.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>MDI + spacer</span>
            <strong>{mdiPuffs} puffs</strong>
            <p>Primeira rodada pratica pelo peso.</p>
          </article>
          <article className="metric-card">
            <span>Nebulizacao</span>
            <strong>{formatNumber(nebSalbutamol, 1)} mg</strong>
            <p>Salbutamol por nebulizacao intermitente.</p>
          </article>
          <article className="metric-card">
            <span>Continuo</span>
            <strong>{formatNumber(continuousSalbutamol, 1)} mg/h</strong>
            <p>0,5 mg/kg/h com teto de 15 mg/h.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entrada</span>
            <h3>Peso</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="8"
                max="80"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 8, 80))}
              />
            </label>

            <label className="field">
              <span>Ajuste rapido do peso</span>
              <input
                className="range"
                type="range"
                min="8"
                max="60"
                step="0.5"
                value={Math.min(weight, 60)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <div className="status-banner compact-banner tone-info">
              <Wind size={18} />
              <div>
                <strong>Uso em maiores de 1 ano</strong>
                <p>As referencias abaixo foram escolhidas para crise aguda de asma/broncoespasmo em pediatria.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Salbutamol continuo</span>
                <h3>{formatNumber(continuousSalbutamol, 1)} mg/h</h3>
                <p>Ponto de partida util para casos com resposta ruim a terapia inicial.</p>
              </div>
              <div className="result-badge result-badge-violet">
                <Gauge size={18} />
                0,5 mg/kg/h
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Ipratrópio</span>
                <strong>{formatNumber(ipratropiumMcg)} mcg</strong>
                <p>3 doses na primeira hora como adjunto ao beta-agonista.</p>
              </article>
              <article className="metric-card">
                <span>Magnesio IV</span>
                <strong>
                  {formatNumber(magnesiumLow)} a {formatNumber(magnesiumHigh)} mg
                </strong>
                <p>40 a 75 mg/kg em 20 a 30 minutos, maximo 2 g.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Resumo rapido</h4>
              <ul className="plain-list">
                <li>MDI com espaco: {mdiPuffs} puffs por rodada</li>
                <li>Salbutamol nebulizado: {formatNumber(nebSalbutamol, 1)} mg</li>
                <li>Ipratrópio: {formatNumber(ipratropiumMcg)} mcg x 3 na primeira hora</li>
                <li>Magnesio IV: {formatNumber(magnesiumLow)} a {formatNumber(magnesiumHigh)} mg</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fonte oficial</span>
                <h4>CPS asma aguda</h4>
                <p>
                  O algoritmo adicional da Canadian Paediatric Society resume as doses por peso
                  para salbutamol, ipratropio e magnesio IV em criancas maiores de 1 ano.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.acuteAsthmaCpsFigure} target="_blank" rel="noreferrer">
                  Figura/algoritmos CPS
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Pill size={18} />
              <p>Oxigenio, corticoide sistemico e reavaliacao do esforço respiratorio continuam fazendo parte do pacote, nao so a nebulizacao.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
