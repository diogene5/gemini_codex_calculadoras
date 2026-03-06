import { useState } from 'react';
import { Droplets, HeartPulse, ShieldAlert } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

const bolusOptions = [
  { label: '10 mL/kg', value: 10 },
  { label: '20 mL/kg', value: 20 },
];

const shockProfiles = {
  septic: {
    label: 'Séptico / distributivo',
    summary: 'Cristaloide em alíquotas com reavaliação frequente.',
    accent: 'tone-danger',
  },
  hypovolemic: {
    label: 'Hipovolêmico',
    summary: 'Bolus inicial clássico de NS ou Ringer lactato.',
    accent: 'tone-warn',
  },
  anaphylaxis: {
    label: 'Anafilaxia com choque',
    summary: 'Fluido entra como suporte, junto da adrenalina IM e via aérea.',
    accent: 'tone-info',
  },
};

function calculateCumulative(weight, bolusPerKg, rounds) {
  return weight * bolusPerKg * rounds;
}

export function PediatricShockCalculator() {
  const [weight, setWeight] = useState(18);
  const [bolusPerKg, setBolusPerKg] = useState(20);
  const [profile, setProfile] = useState('septic');

  const singleBolus = weight * bolusPerKg;
  const twoBoluses = calculateCumulative(weight, bolusPerKg, 2);
  const threeBoluses = calculateCumulative(weight, bolusPerKg, 3);
  const firstHourForty = weight * 40;
  const firstHourSixty = weight * 60;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ember">
        <div className="panel-hero-copy">
          <span className="kicker">Emergência pediátrica</span>
          <h3>Bolus de choque com leitura por cenário</h3>
          <p>
            Interface pensada para resposta rápida: você escolhe o peso, define a alíquota e
            enxerga volume único, cumulativo e faixa de reanimação.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Bolus atual</span>
            <strong>{formatNumber(singleBolus)} mL</strong>
            <p>{bolusPerKg} mL/kg de cristalóide isotônico.</p>
          </article>
          <article className="metric-card">
            <span>2 boluses</span>
            <strong>{formatNumber(twoBoluses)} mL</strong>
            <p>Útil para visualizar reanimação em sequência curta.</p>
          </article>
          <article className="metric-card">
            <span>3 boluses</span>
            <strong>{formatNumber(threeBoluses)} mL</strong>
            <p>Mostra rapidamente o acumulado antes de nova reavaliação.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Simulação do cenário</h3>
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

            <label className="field">
              <span>Perfil clínico</span>
              <select className="input" value={profile} onChange={(event) => setProfile(event.target.value)}>
                {Object.entries(shockProfiles).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="toggle-grid">
              {bolusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`choice-card ${bolusPerKg === option.value ? 'active' : ''}`}
                  onClick={() => setBolusPerKg(option.value)}
                >
                  <strong>{option.label}</strong>
                  <span>Alíquota rápida</span>
                </button>
              ))}
            </div>

            <div className={`status-banner compact-banner ${shockProfiles[profile].accent}`}>
              <HeartPulse size={18} />
              <div>
                <strong>{shockProfiles[profile].label}</strong>
                <p>{shockProfiles[profile].summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Volume imediato</span>
                <h3>{formatNumber(singleBolus)} mL</h3>
                <p>NS ou Ringer lactato conforme algoritmo e contexto clínico.</p>
              </div>
              <div className="result-badge result-badge-ember">
                <Droplets size={18} />
                {formatNumber(bolusPerKg)} mL/kg
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Faixa de 40 mL/kg</span>
                <strong>{formatNumber(firstHourForty)} mL</strong>
                <p>Marcador útil para reanimação inicial baseada em alíquotas.</p>
              </article>
              <article className="metric-card">
                <span>Faixa de 60 mL/kg</span>
                <strong>{formatNumber(firstHourSixty)} mL</strong>
                <p>Limite alto de referência para alguns cenários com monitorização adequada.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Leitura rápida</h4>
              <ul className="plain-list">
                <li>1 bolus: {formatNumber(weight)} x {formatNumber(bolusPerKg)} = {formatNumber(singleBolus)} mL</li>
                <li>2 boluses: {formatNumber(twoBoluses)} mL</li>
                <li>3 boluses: {formatNumber(threeBoluses)} mL</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>Base do módulo</h4>
                <p>
                  AHA PEARS/PALS descreve 20 mL/kg NS ou Ringer lactato em choque hipo ou
                  distributivo, e a atualização AHA/SCCM reforça bolus de 10 a 20 mL/kg com
                  reavaliação frequente.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.pediatricShock} target="_blank" rel="noreferrer">
                  Fluxograma AHA de choque
                </a>
                <a href={sourceLinks.pediatricShockGuideline} target="_blank" rel="noreferrer">
                  Diretriz pediátrica SSC/SCCM
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <ShieldAlert size={18} />
              <p>
                Reavalie enchimento capilar, perfusão, pressão, diurese, estado mental e sinais
                de sobrecarga antes de repetir bolus.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
