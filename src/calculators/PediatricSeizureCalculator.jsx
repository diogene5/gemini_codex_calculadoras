import { useState } from 'react';
import { Activity, Brain, Syringe, Zap } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricSeizureCalculator() {
  const [weight, setWeight] = useState(18);
  const [ageYears, setAgeYears] = useState(4);
  const [activeTab, setActiveTab] = useState('first-line');

  const midazolamInIm = Math.min(weight * 0.2, 10);
  const midazolamIv = Math.min(weight * 0.1, 5);
  const lorazepam = Math.min(weight * 0.1, 4);
  const diazepamIv = Math.min(weight * 0.3, ageYears < 5 ? 5 : 10);
  const diazepamPr = Math.min(weight * 0.5, 20);

  const fosphenytoin = Math.min(weight * 20, 1000);
  const phenytoin = Math.min(weight * 20, 1000);
  const levetiracetam = Math.min(weight * 60, 3000);
  const valproate = Math.min(weight * 40, 3000);
  const phenobarbital = Math.min(weight * 20, 1000);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ruby">
        <div className="panel-hero-copy">
          <span className="kicker">Neurologia aguda</span>
          <h3>Convulsao: primeira e segunda linha</h3>
          <p>
            Resume as doses mais usadas para status epilepticus convulsivo pediatrico, separando
            claramente benzodiazepinicos e opcoes de segunda linha.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Midazolam IN/IM</span>
            <strong>{formatNumber(midazolamInIm, 1)} mg</strong>
            <p>0,2 mg/kg, maximo 10 mg.</p>
          </article>
          <article className="metric-card">
            <span>Lorazepam IV/bucal</span>
            <strong>{formatNumber(lorazepam, 1)} mg</strong>
            <p>0,1 mg/kg, maximo 4 mg.</p>
          </article>
          <article className="metric-card">
            <span>Levetiracetam</span>
            <strong>{formatNumber(levetiracetam)} mg</strong>
            <p>60 mg/kg, maximo 3000 mg.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e idade</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="3"
                max="80"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 3, 80))}
              />
            </label>

            <label className="field">
              <span>Idade (anos)</span>
              <input
                className="input"
                type="number"
                min="0.1"
                max="18"
                step="0.1"
                value={ageYears}
                onChange={(event) => setAgeYears(clampWeight(Number(event.target.value), 0.1, 18))}
              />
            </label>

            <div className="status-banner compact-banner tone-danger">
              <Brain size={18} />
              <div>
                <strong>Trate cedo</strong>
                <p>Esse modulo serve para reduzir atrito nas contas, nao para adiar acesso, glicemia ou suporte de via aerea.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="tab-row">
            <button
              type="button"
              className={`tab-button ${activeTab === 'first-line' ? 'active' : ''}`}
              onClick={() => setActiveTab('first-line')}
            >
              <Zap size={16} />
              Primeira linha
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'second-line' ? 'active' : ''}`}
              onClick={() => setActiveTab('second-line')}
            >
              <Syringe size={16} />
              Segunda linha
            </button>
          </div>

          {activeTab === 'first-line' ? (
            <div className="content-stack">
              <div className="result-hero">
                <div>
                  <span className="kicker">Benzodiazepinico de resgate</span>
                  <h3>{formatNumber(midazolamInIm, 1)} mg</h3>
                  <p>Midazolam IN/IM 0,2 mg/kg. Pode repetir uma vez apos 5 minutos se ainda houver crise.</p>
                </div>
                <div className="result-badge result-badge-ruby">
                  <Activity size={18} />
                  1a linha
                </div>
              </div>

              <div className="metric-grid two-columns">
                <article className="metric-card">
                  <span>Midazolam IV/IO</span>
                  <strong>{formatNumber(midazolamIv, 1)} mg</strong>
                  <p>0,1 mg/kg, maximo 5 mg.</p>
                </article>
                <article className="metric-card">
                  <span>Diazepam retal</span>
                  <strong>{formatNumber(diazepamPr, 1)} mg</strong>
                  <p>0,5 mg/kg, maximo 20 mg.</p>
                </article>
                <article className="metric-card">
                  <span>Diazepam IV/IO</span>
                  <strong>{formatNumber(diazepamIv, 1)} mg</strong>
                  <p>0,3 mg/kg; maximo depende da idade.</p>
                </article>
                <article className="metric-card">
                  <span>Idade atual</span>
                  <strong>{ageYears < 5 ? 'max 5 mg IV' : 'max 10 mg IV'}</strong>
                  <p>Ponto que muda o teto do diazepam IV.</p>
                </article>
              </div>
            </div>
          ) : (
            <div className="content-stack">
              <div className="result-hero">
                <div>
                  <span className="kicker">Carga de levetiracetam</span>
                  <h3>{formatNumber(levetiracetam)} mg</h3>
                  <p>60 mg/kg, maximo 3000 mg, como uma das opcoes de segunda linha.</p>
                </div>
                <div className="result-badge result-badge-ruby">
                  <Syringe size={18} />
                  2a linha
                </div>
              </div>

              <div className="metric-grid two-columns">
                <article className="metric-card">
                  <span>Fosphenytoin</span>
                  <strong>{formatNumber(fosphenytoin)} mg PE</strong>
                  <p>20 mg PE/kg, maximo 1000 mg PE.</p>
                </article>
                <article className="metric-card">
                  <span>Phenytoin</span>
                  <strong>{formatNumber(phenytoin)} mg</strong>
                  <p>20 mg/kg, maximo 1000 mg.</p>
                </article>
                <article className="metric-card">
                  <span>Valproato</span>
                  <strong>{formatNumber(valproate)} mg</strong>
                  <p>40 mg/kg, maximo 3000 mg.</p>
                </article>
                <article className="metric-card">
                  <span>Fenobarbital</span>
                  <strong>{formatNumber(phenobarbital)} mg</strong>
                  <p>20 mg/kg, maximo 1000 mg.</p>
                </article>
              </div>
            </div>
          )}

          <div className="source-panel">
            <div className="source-copy">
              <span className="kicker">Fonte oficial</span>
              <h4>Status epilepticus convulsivo</h4>
              <p>
                As doses acima seguem o algoritmo e a tabela de anticonvulsivantes da Canadian
                Paediatric Society para criancas acima de 1 mes em contexto de emergencia.
              </p>
            </div>
            <div className="source-links">
              <a href={sourceLinks.seizureAlgorithm} target="_blank" rel="noreferrer">
                Algoritmo CPS
              </a>
              <a href={sourceLinks.seizureMedicationTable} target="_blank" rel="noreferrer">
                Tabela de doses CPS
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
