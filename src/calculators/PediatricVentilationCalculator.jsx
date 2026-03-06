import { useState } from 'react';
import { Gauge, ShieldPlus, TimerReset, Wind } from 'lucide-react';
import {
  airwayAgePresets,
  clampWeight,
  formatNumber,
  getAirwayPreset,
  parseRange,
  sourceLinks,
} from './shared';

export function PediatricVentilationCalculator() {
  const [weight, setWeight] = useState(18);
  const [agePresetId, setAgePresetId] = useState('4y');
  const [profile, setProfile] = useState('standard');

  const preset = getAirwayPreset(agePresetId);
  const rateRange =
    profile === 'obstructive'
      ? { label: '10 a 12/min', low: 10, high: 12, mid: 11 }
      : { label: `${preset.rr}/min`, ...parseRange(preset.rr) };
  const tidalLow = weight * 6;
  const tidalHigh = weight * 8;
  const apneicOxygenFlow = Math.min(weight * 2, 15);
  const minuteVentLow = (tidalLow * rateRange.low) / 1000;
  const minuteVentHigh = (tidalHigh * rateRange.high) / 1000;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-graphite">
        <div className="panel-hero-copy">
          <span className="kicker">Ventilacao</span>
          <h3>Pos-intubacao: comecar seguro e ajustar rapido</h3>
          <p>
            Modulo para acertar o ponto de partida da ventilacao e evitar a falha mais comum na
            beira do leito: ventilar cedo demais ou forte demais.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Volume corrente</span>
            <strong>
              {formatNumber(tidalLow)} a {formatNumber(tidalHigh)} mL
            </strong>
            <p>Faixa de 6 a 8 mL/kg como ponto de partida.</p>
          </article>
          <article className="metric-card">
            <span>Frequencia alvo</span>
            <strong>{rateRange.label}</strong>
            <p>{profile === 'obstructive' ? 'Perfil obstrutivo grave.' : 'Referencia pela faixa etaria.'}</p>
          </article>
          <article className="metric-card">
            <span>Oxigenacao apneica</span>
            <strong>{formatNumber(apneicOxygenFlow, 1)} L/min</strong>
            <p>Regra pratica de 2 L/kg/min com teto de 15 L/min.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Peso e perfil</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="3"
                max="90"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 3, 90))}
              />
            </label>

            <label className="field">
              <span>Faixa etaria de referencia</span>
              <select
                className="input"
                value={agePresetId}
                onChange={(event) => setAgePresetId(event.target.value)}
              >
                {airwayAgePresets.map((agePreset) => (
                  <option key={agePreset.id} value={agePreset.id}>
                    {agePreset.label} ({agePreset.rr}/min)
                  </option>
                ))}
              </select>
            </label>

            <div className="toggle-grid">
              <button
                type="button"
                className={`choice-card ${profile === 'standard' ? 'active' : ''}`}
                onClick={() => setProfile('standard')}
              >
                <strong>Referencia geral</strong>
                <span>RR da idade + capnografia</span>
              </button>
              <button
                type="button"
                className={`choice-card ${profile === 'obstructive' ? 'active' : ''}`}
                onClick={() => setProfile('obstructive')}
              >
                <strong>Obstrutivo grave</strong>
                <span>RR baixa e expiracao longa</span>
              </button>
            </div>

            <div className="status-banner compact-banner tone-info">
              <ShieldPlus size={18} />
              <div>
                <strong>Principio do modulo</strong>
                <p>Comece conservador, confira capnografia e ajuste pela mecanica, gasometria e doenca dominante.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Ventilacao inicial</span>
                <h3>
                  {formatNumber(tidalLow)} a {formatNumber(tidalHigh)} mL
                </h3>
                <p>{profile === 'obstructive' ? 'Evite breath stacking e aceite expiracao longa.' : 'Use como ponto de partida e reavalie cedo.'}</p>
              </div>
              <div className="result-badge result-badge-graphite">
                <TimerReset size={18} />
                {rateRange.label}
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Volume-minuto estimado</span>
                <strong>
                  {formatNumber(minuteVentLow, 1)} a {formatNumber(minuteVentHigh, 1)} L/min
                </strong>
                <p>Leitura rapida para perceber se a combinacao de RR e VT esta agressiva demais.</p>
              </article>
              <article className="metric-card">
                <span>Capnografia</span>
                <strong>EtCO2 continuo</strong>
                <p>Preferir waveform continuo para confirmar tubo e guiar ajuste fino.</p>
              </article>
              <article className="metric-card">
                <span>Faixa etaria escolhida</span>
                <strong>{preset.label}</strong>
                <p>RR fisiologica de referencia: {preset.rr}/min.</p>
              </article>
              <article className="metric-card">
                <span>Oxigenacao apneica</span>
                <strong>{formatNumber(apneicOxygenFlow, 1)} L/min</strong>
                <p>Durante laringoscopia, use o teto de 15 L/min mesmo em criancas maiores.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Leitura pratica</h4>
              <ul className="plain-list">
                <li>Se a fisiologia e geral, a RR inicial costuma seguir a faixa etaria e depois ceder a EtCO2 e expansao toracica</li>
                <li>No obstrutivo grave, a prioridade muda para expiracao longa, RR baixa e evitar auto-PEEP</li>
                <li>Numero bom no papel nao compensa assincronia, pressao alta ou hipotensao apos intubacao</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>APLS + via aerea de emergencia</h4>
                <p>
                  ACI resume as faixas respiratorias por idade. RCH reforca waveform capnography e
                  oxigenacao apneica 2 L/kg/min ate 15 L/min. No obstrutivo grave, a ECI descreve
                  RR de 10 a 12/min e VT de 6 a 8 mL/kg.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.aplsFormula} target="_blank" rel="noreferrer">
                  APLS formulas
                </a>
                <a href={sourceLinks.emergencyAirway} target="_blank" rel="noreferrer">
                  RCH via aerea
                </a>
                <a href={sourceLinks.asthmaVentilation} target="_blank" rel="noreferrer">
                  ECI ventilacao obstrutiva
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Wind size={18} />
              <p>Se a pressao cai depois da intubacao, pense em excesso de ventilacao, auto-PEEP, sedacao profunda ou pneumotorax antes de perseguir mais volume.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
