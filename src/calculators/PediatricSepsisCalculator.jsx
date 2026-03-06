import { useState } from 'react';
import { AlertTriangle, Droplets, ShieldPlus, TimerReset } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

const phenotypes = {
  cold: {
    name: 'Choque frio + hipotensao',
    agent: 'Epinefrina',
    start: 0.05,
    increment: 0.02,
    note: 'CPS sugere iniciar epinefrina 0,05 mcg/kg/min e subir em passos de 0,02.',
  },
  warm: {
    name: 'Choque quente + hipotensao',
    agent: 'Norepinefrina',
    start: 0.05,
    increment: 0.02,
    note: 'CPS sugere iniciar norepinefrina 0,05 mcg/kg/min e subir em passos de 0,02.',
  },
};

export function PediatricSepsisCalculator() {
  const [weight, setWeight] = useState(18);
  const [shockPresent, setShockPresent] = useState(true);
  const [phenotype, setPhenotype] = useState('cold');

  const bolusTen = weight * 10;
  const bolusTwenty = weight * 20;
  const firstHourForty = weight * 40;
  const firstHourSixty = weight * 60;
  const vaso = phenotypes[phenotype];
  const startMcgMin = weight * vaso.start;
  const incrementMcgMin = weight * vaso.increment;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ember">
        <div className="panel-hero-copy">
          <span className="kicker">Sepse</span>
          <h3>Bundle inicial: fluido, antibiotico e vasoativo</h3>
          <p>
            Tela para decidir mais rapido quanto fluido dar, qual a janela de antibiótico e qual
            vasoativo periferico/central costuma entrar primeiro conforme o fenotipo.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Bolus 10 mL/kg</span>
            <strong>{formatNumber(bolusTen)} mL</strong>
            <p>Alíquota menor quando se quer reavaliar mais cedo.</p>
          </article>
          <article className="metric-card">
            <span>Bolus 20 mL/kg</span>
            <strong>{formatNumber(bolusTwenty)} mL</strong>
            <p>Alíquota clássica em ressuscitacao com monitorizacao.</p>
          </article>
          <article className="metric-card">
            <span>Primeira hora</span>
            <strong>
              {formatNumber(firstHourForty)} a {formatNumber(firstHourSixty)} mL
            </strong>
            <p>Faixa SSC antes de pensar em pressor mais cedo por sobrecarga ou refratariedade.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e fenotipo</h3>
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

            <div className="toggle-grid">
              <button
                type="button"
                className={`choice-card ${shockPresent ? 'active' : ''}`}
                onClick={() => setShockPresent(true)}
              >
                <strong>Choque septico</strong>
                <span>ATB em ate 1 h</span>
              </button>
              <button
                type="button"
                className={`choice-card ${!shockPresent ? 'active' : ''}`}
                onClick={() => setShockPresent(false)}
              >
                <strong>Sepse sem choque</strong>
                <span>ATB em ate 3 h</span>
              </button>
            </div>

            <div className="toggle-grid">
              <button
                type="button"
                className={`choice-card ${phenotype === 'cold' ? 'active' : ''}`}
                onClick={() => setPhenotype('cold')}
              >
                <strong>Choque frio</strong>
                <span>Epinefrina</span>
              </button>
              <button
                type="button"
                className={`choice-card ${phenotype === 'warm' ? 'active' : ''}`}
                onClick={() => setPhenotype('warm')}
              >
                <strong>Choque quente</strong>
                <span>Norepinefrina</span>
              </button>
            </div>

            <div className="status-banner compact-banner tone-info">
              <ShieldPlus size={18} />
              <div>
                <strong>Mensagens do bundle</strong>
                <p>Hemocultura nao deve atrasar antibiótico; sinais de sobrecarga podem antecipar vasoativo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Tempo do antibiótico</span>
                <h3>{shockPresent ? 'Dentro de 1 hora' : 'Dentro de 3 horas'}</h3>
                <p>{shockPresent ? 'Choque septico reconhecido.' : 'Sepse com disfuncao de orgao, sem choque.'}</p>
              </div>
              <div className="result-badge result-badge-ember">
                <TimerReset size={18} />
                {vaso.agent}
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Inicio do vasoativo</span>
                <strong>{formatNumber(startMcgMin, 2)} mcg/min</strong>
                <p>{vaso.agent} a {formatNumber(vaso.start, 2)} mcg/kg/min.</p>
              </article>
              <article className="metric-card">
                <span>Incremento pratico</span>
                <strong>{formatNumber(incrementMcgMin, 2)} mcg/min</strong>
                <p>Passo de titulacao de {formatNumber(vaso.increment, 2)} mcg/kg/min.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Leitura rapida</h4>
              <ul className="plain-list">
                <li>Bolus menores: {formatNumber(bolusTen)} mL por rodada</li>
                <li>Bolus maiores: {formatNumber(bolusTwenty)} mL por rodada</li>
                <li>Faixa da primeira hora: {formatNumber(firstHourForty)} a {formatNumber(firstHourSixty)} mL</li>
                <li>{vaso.note}</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>SSC + CPS sepsis</h4>
                <p>
                  O SSC reforca antibiotico em 1 hora no choque e em 3 horas na sepse sem choque,
                  com 40 a 60 mL/kg na primeira hora quando apropriado. O CPS detalha epinefrina
                  ou norepinefrina em 0,05 mcg/kg/min com incrementos de 0,02.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.sepsisResuscitation} target="_blank" rel="noreferrer">
                  Algoritmo SSC
                </a>
                <a href={sourceLinks.sepsisGuideline} target="_blank" rel="noreferrer">
                  Guia CPS
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Droplets size={18} />
              <p>Se perfusao piora ou surgem estertores/hepatomegalia, o numero do fluido precisa ceder lugar a reavaliacao e ao vasoativo precoce.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
