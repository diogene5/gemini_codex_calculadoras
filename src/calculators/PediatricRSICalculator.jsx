import { useState } from 'react';
import { AlertTriangle, ShieldPlus, Syringe } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricRSICalculator() {
  const [weight, setWeight] = useState(18);
  const [profile, setProfile] = useState('standard');

  const fentanylLow = weight * 1;
  const fentanylHigh = weight * 2;
  const ketamineLow = weight * (profile === 'shock' ? 0.5 : 1);
  const ketamineHigh = weight * (profile === 'shock' ? 1 : 2);
  const rocuroniumMg = weight * 1.2;
  const suxamethoniumMg = weight * 2;
  const atropineMg = weight * 0.02;
  const pushDoseEpinephrineMcg = Math.min(weight * 1, 50);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ember">
        <div className="panel-hero-copy">
          <span className="kicker">Sequencia rapida</span>
          <h3>Inducao, bloqueio e plano hemodinamico</h3>
          <p>
            Este modulo foca nas drogas que mais atrasam a RSI quando nao estao preparadas com
            antecedencia: analgesia, inducao, bloqueador e rescue hemodinamico.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Ketamina</span>
            <strong>
              {formatNumber(ketamineLow)} a {formatNumber(ketamineHigh)} mg
            </strong>
            <p>{profile === 'shock' ? 'Faixa mais conservadora para choque/sepse.' : 'Faixa usual de inducao IV.'}</p>
          </article>
          <article className="metric-card">
            <span>Rocuronio</span>
            <strong>{formatNumber(rocuroniumMg, 1)} mg</strong>
            <p>Bloqueio a 1,2 mg/kg.</p>
          </article>
          <article className="metric-card">
            <span>Fentanil</span>
            <strong>
              {formatNumber(fentanylLow)} a {formatNumber(fentanylHigh)} mcg
            </strong>
            <p>Opcao de atenuar resposta simpatica quando o contexto permite.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e fisiologia</h3>
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
                className={`choice-card ${profile === 'standard' ? 'active' : ''}`}
                onClick={() => setProfile('standard')}
              >
                <strong>Padrao</strong>
                <span>Inducao habitual</span>
              </button>
              <button
                type="button"
                className={`choice-card ${profile === 'shock' ? 'active' : ''}`}
                onClick={() => setProfile('shock')}
              >
                <strong>Choque/sepse</strong>
                <span>Inducao mais conservadora</span>
              </button>
            </div>

            <div className="status-banner compact-banner tone-warn">
              <ShieldPlus size={18} />
              <div>
                <strong>Preparacao minima</strong>
                <p>Pressor pronto, capnografia ligada e estrategia pos-intubacao decidida antes do primeiro push.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Bloqueador principal</span>
                <h3>{formatNumber(rocuroniumMg, 1)} mg</h3>
                <p>Ketamina ajustada para {profile === 'shock' ? 'fisiologia fragil' : 'inducao padrao'}.</p>
              </div>
              <div className="result-badge result-badge-ember">
                <Syringe size={18} />
                {formatNumber(ketamineLow)}-{formatNumber(ketamineHigh)} mg
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Fentanil</span>
                <strong>
                  {formatNumber(fentanylLow)} a {formatNumber(fentanylHigh)} mcg
                </strong>
                <p>Faixa usada em protocolos de RSI e sepsis para analgesia/atenuacao.</p>
              </article>
              <article className="metric-card">
                <span>Suxametonio</span>
                <strong>{formatNumber(suxamethoniumMg, 1)} mg</strong>
                <p>Alternativa ao rocuronio em contexto apropriado e sem contraindicacoes.</p>
              </article>
              <article className="metric-card">
                <span>Atropina (opcional)</span>
                <strong>{formatNumber(atropineMg, 2)} mg</strong>
                <p>20 mcg/kg quando o protocolo local pedir premedicacao.</p>
              </article>
              <article className="metric-card">
                <span>Push-dose adrenalina</span>
                <strong>{formatNumber(pushDoseEpinephrineMcg)} mcg</strong>
                <p>1 mcg/kg, maximo 50 mcg, se a hipotensao domina a cena.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Leitura de plantao</h4>
              <ul className="plain-list">
                <li>No choque, a dose de inducao tende a cair; o erro mais comum e repetir dose padrao em hemodinamica fragil</li>
                <li>Rocuronio ja preparado e rotulado antes da sedacao reduz metade do caos operacional da RSI</li>
                <li>Depois do push, o proximo problema costuma ser hipotensao e nao falta de sedativo</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>Queensland + RCH</h4>
                <p>
                  Queensland resume ketamina 0,5 a 1 mg/kg em sepsis e 1 a 2 mg/kg em uso
                  habitual, fentanil 1 a 2 mcg/kg, rocuronio 1,2 mg/kg e atropina 20 mcg/kg. RCH
                  destaca push-dose de adrenalina 1 mcg/kg ate 50 mcg no peri-intubacao.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.sepsisGuideline} target="_blank" rel="noreferrer">
                  Guia de sepse CPS
                </a>
                <a href={sourceLinks.qldEmergencyDrugs} target="_blank" rel="noreferrer">
                  Queensland drug dosage
                </a>
                <a href={sourceLinks.emergencyAirway} target="_blank" rel="noreferrer">
                  RCH via aerea
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Na RSI pediatrica, a conta que salva e a que entra antes da laringoscopia; se o kit hemodinamico nao esta pronto, a sedacao esta cedo demais.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
