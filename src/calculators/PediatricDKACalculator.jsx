import { useState } from 'react';
import { AlertTriangle, Droplets, FlaskConical, LineChart } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

function classifyDKA(ph, bicarbonate) {
  if (ph < 7.1 || bicarbonate < 5) {
    return 'Grave';
  }

  if ((ph >= 7.1 && ph < 7.2) || (bicarbonate >= 5 && bicarbonate < 10)) {
    return 'Moderada';
  }

  if ((ph >= 7.2 && ph < 7.3) || (bicarbonate >= 10 && bicarbonate < 18)) {
    return 'Leve';
  }

  return 'Fora de criterio bioquimico';
}

export function PediatricDKACalculator() {
  const [weight, setWeight] = useState(30);
  const [ageYears, setAgeYears] = useState(12);
  const [glucose, setGlucose] = useState(420);
  const [sodium, setSodium] = useState(132);
  const [ph, setPh] = useState(7.18);
  const [bicarbonate, setBicarbonate] = useState(9);

  const correctedSodium = sodium + 1.6 * ((glucose - 100) / 100);
  const effectiveOsmolality = 2 * sodium + glucose / 18;
  const severity = classifyDKA(ph, bicarbonate);

  const dehydrationPercent =
    severity === 'Leve' ? 5 : severity === 'Moderada' ? 7 : severity === 'Grave' ? 10 : 0;
  const estimatedDeficit = weight * dehydrationPercent * 10;
  const insulinLowUnitsPerHour =
    weight * (severity === 'Leve' && ageYears < 5 ? 0.03 : 0.05);
  const insulinHighUnitsPerHour = weight * 0.1;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-amber">
        <div className="panel-hero-copy">
          <span className="kicker">Metabolico</span>
          <h3>DKA: leitura rapida de severidade e osmolaridade</h3>
          <p>
            Combina classificacao bioquimica, sodio corrigido, osmolaridade efetiva e faixa de
            infusao de insulina por hora.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Severidade</span>
            <strong>{severity}</strong>
            <p>Baseada em pH e bicarbonato segundo ISPAD.</p>
          </article>
          <article className="metric-card">
            <span>Sodio corrigido</span>
            <strong>{formatNumber(correctedSodium, 1)} mEq/L</strong>
            <p>Ajuda a interpretar melhor a natremia em hiperglicemia.</p>
          </article>
          <article className="metric-card">
            <span>Osmolaridade efetiva</span>
            <strong>{formatNumber(effectiveOsmolality, 1)}</strong>
            <p>2 x Na + glicose/18.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Parametros laboratoriais</h3>
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

            <label className="field">
              <span>Idade (anos)</span>
              <input
                className="input"
                type="number"
                min="0.5"
                max="18"
                step="0.1"
                value={ageYears}
                onChange={(event) => setAgeYears(clampWeight(Number(event.target.value), 0.5, 18))}
              />
            </label>

            <label className="field">
              <span>Glicose (mg/dL)</span>
              <input
                className="input"
                type="number"
                min="100"
                step="1"
                value={glucose}
                onChange={(event) => setGlucose(Math.max(100, Number(event.target.value) || 100))}
              />
            </label>

            <label className="field">
              <span>Sodio medido (mEq/L)</span>
              <input
                className="input"
                type="number"
                min="100"
                max="170"
                step="0.1"
                value={sodium}
                onChange={(event) => setSodium(Number(event.target.value) || 0)}
              />
            </label>

            <label className="field">
              <span>pH venoso/arterial</span>
              <input
                className="input"
                type="number"
                min="6.8"
                max="7.5"
                step="0.01"
                value={ph}
                onChange={(event) => setPh(Number(event.target.value) || 0)}
              />
            </label>

            <label className="field">
              <span>Bicarbonato (mEq/L)</span>
              <input
                className="input"
                type="number"
                min="1"
                max="30"
                step="0.1"
                value={bicarbonate}
                onChange={(event) => setBicarbonate(Number(event.target.value) || 0)}
              />
            </label>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Insulina IV</span>
                <h3>
                  {formatNumber(insulinLowUnitsPerHour, 2)} a {formatNumber(insulinHighUnitsPerHour, 2)} U/h
                </h3>
                <p>Faixa usual 0,05 a 0,1 U/kg/h; 0,03 U/kg/h entra como opcao em leves e menores de 5 anos.</p>
              </div>
              <div className="result-badge result-badge-ember">
                <LineChart size={18} />
                {severity}
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Deficit estimado</span>
                <strong>{formatNumber(estimatedDeficit)} mL</strong>
                <p>Usando a regra pratica 5%, 7% e 10% conforme a severidade.</p>
              </article>
              <article className="metric-card">
                <span>Leitura do sodio corrigido</span>
                <strong>{formatNumber(correctedSodium, 1)} mEq/L</strong>
                <p>O esperado e que suba gradualmente conforme a glicose cai.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Conta aplicada</h4>
              <ul className="plain-list">
                <li>Sodio corrigido = Na + 1,6 x ((glicose - 100) / 100)</li>
                <li>Osmolaridade efetiva = 2 x Na + glicose / 18</li>
                <li>Deficit estimado = peso x {dehydrationPercent}% x 10 mL/kg</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fonte oficial</span>
                <h4>ISPAD 2022</h4>
                <p>
                  A diretriz usa pH/bicarbonato para classificar a DKA, calcula osmolaridade
                  efetiva como 2 x Na + glicose/18 e mantem insulina IV em 0,05 a 0,1 U/kg/h,
                  com 0,03 U/kg/h como opcao em alguns menores de 5 anos com DKA leve.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.dkaGuideline} target="_blank" rel="noreferrer">
                  Guideline ISPAD
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Bicarbonato de rotina e bolus agressivos fora das indicacoes continuam sendo pontos de alto risco em DKA pediatrica.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
