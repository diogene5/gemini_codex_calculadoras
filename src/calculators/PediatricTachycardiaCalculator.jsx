import { useState } from 'react';
import { Bolt, HeartPulse, Waves } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricTachycardiaCalculator() {
  const [weight, setWeight] = useState(22);

  const cardioversionLow = weight * 0.5;
  const cardioversionHigh = weight * 1;
  const cardioversionSecond = weight * 2;
  const adenosineFirst = Math.min(weight * 0.1, 6);
  const adenosineSecond = Math.min(weight * 0.2, 12);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-violet">
        <div className="panel-hero-copy">
          <span className="kicker">Arritmias</span>
          <h3>Taquicardia com pulso: cardioversão e adenosina</h3>
          <p>
            Variação pensada para SVT/VT com pulso instável ou regular monomórfica, mantendo a
            lógica do algoritmo PALS visível.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Cardioversão inicial</span>
            <strong>
              {formatNumber(cardioversionLow, 1)} a {formatNumber(cardioversionHigh, 1)} J
            </strong>
            <p>Faixa inicial sincronizada.</p>
          </article>
          <article className="metric-card">
            <span>Próxima energia</span>
            <strong>{formatNumber(cardioversionSecond)} J</strong>
            <p>Escalada para 2 J/kg se necessário.</p>
          </article>
          <article className="metric-card">
            <span>Adenosina 1ª dose</span>
            <strong>{formatNumber(adenosineFirst, 1)} mg</strong>
            <p>0,1 mg/kg, máximo 6 mg.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e preparo</h3>
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
                max="60"
                step="0.5"
                value={Math.min(weight, 60)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <div className="status-banner compact-banner tone-info">
              <HeartPulse size={18} />
              <div>
                <strong>Lembrete do algoritmo</strong>
                <p>Sedate se necessário, mas não atrase a cardioversão em paciente instável.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Cardioversão sincronizada</span>
                <h3>
                  {formatNumber(cardioversionLow, 1)} a {formatNumber(cardioversionHigh, 1)} J
                </h3>
                <p>Primeira energia sugerida para taquiarritmia com pulso e instabilidade.</p>
              </div>
              <div className="result-badge result-badge-violet">
                <Bolt size={18} />
                Depois {formatNumber(cardioversionSecond)} J
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Adenosina 2ª dose</span>
                <strong>{formatNumber(adenosineSecond, 1)} mg</strong>
                <p>0,2 mg/kg, máximo 12 mg, em ritmo regular monomórfico.</p>
              </article>
              <article className="metric-card">
                <span>Pontos de corte do algoritmo</span>
                <strong>SVT: 220/180</strong>
                <p>Infante ≥220 bpm, criança ≥180 bpm como heurística do fluxograma.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Sequência visual</h4>
              <ul className="plain-list">
                <li>1ª cardioversão: 0,5 a 1 J/kg</li>
                <li>Se falhar: 2 J/kg</li>
                <li>Adenosina: 0,1 mg/kg e depois 0,2 mg/kg se indicado</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fonte oficial</span>
                <h4>Algoritmo AHA de taquiarritmia</h4>
                <p>
                  O texto longo do algoritmo descreve cardioversão sincronizada iniciando em 0,5
                  a 1 J/kg, escalando para 2 J/kg, com adenosina 0,1 mg/kg e repetição de 0,2
                  mg/kg para ritmo regular monomórfico quando apropriado.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.pediatricTachycardia} target="_blank" rel="noreferrer">
                  PDF oficial da taquicardia
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Waves size={18} />
              <p>Analise largura do QRS, regularidade e estabilidade hemodinâmica antes da via terapêutica.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
