import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Beaker,
  Calculator,
  Droplets,
  Info,
  ShieldPlus,
  Zap,
} from 'lucide-react';
import { clampWeight, formatNumber } from './shared';

const glucoseOptions = [
  { label: 'SG 5%', value: 5 },
  { label: 'SG 7,5%', value: 7.5 },
  { label: 'SG 10%', value: 10 },
  { label: 'SG 12,5%', value: 12.5 },
];

const vigProfiles = {
  infant: {
    label: 'Criança maior',
    min: 4,
    max: 6,
    caution: 8,
    targetText: 'Meta habitual: 4 a 6 mg/kg/min.',
  },
  term: {
    label: 'Neonato a termo',
    min: 6,
    max: 8,
    caution: 10,
    targetText: 'Meta neonatal: 6 a 8 mg/kg/min.',
  },
  preterm: {
    label: 'Prematuro',
    min: 6,
    max: 10,
    caution: 12,
    targetText: 'Faixa frequente em prematuros: 6 a 10 mg/kg/min.',
  },
};

const calculateHolidaySegments = (weight) => {
  const firstKg = Math.min(weight, 10);
  const secondKg = Math.max(0, Math.min(weight - 10, 10));
  const thirdKg = Math.max(0, weight - 20);

  const firstVolume = firstKg * 100;
  const secondVolume = secondKg * 50;
  const thirdVolume = thirdKg * 20;

  return {
    firstKg,
    secondKg,
    thirdKg,
    firstVolume,
    secondVolume,
    thirdVolume,
    totalVolume: firstVolume + secondVolume + thirdVolume,
  };
};

const getVigStatus = (vig, profileKey) => {
  const profile = vigProfiles[profileKey];

  if (vig < profile.min) {
    return {
      label: 'Abaixo da meta',
      tone: 'warn',
      description: `${profile.targetText} O valor atual pode estar subofertando glicose.`,
    };
  }

  if (vig <= profile.max) {
    return {
      label: 'Na faixa-alvo',
      tone: 'ok',
      description: `${profile.targetText} O valor atual está dentro da faixa desejada.`,
    };
  }

  if (vig <= profile.caution) {
    return {
      label: 'Acima da meta',
      tone: 'info',
      description: `${profile.targetText} Revise contexto clínico e protocolo local.`,
    };
  }

  return {
    label: 'Elevada',
    tone: 'danger',
    description: `${profile.targetText} O valor atual merece revisão antes de uso clínico.`,
  };
};

const toneLabels = {
  ok: 'tone-ok',
  warn: 'tone-warn',
  info: 'tone-info',
  danger: 'tone-danger',
};

export function PediatricHydrationCalculator() {
  const [weight, setWeight] = useState(15);
  const [glucosePercent, setGlucosePercent] = useState(5);
  const [rateMlH, setRateMlH] = useState(62.5);
  const [vigProfile, setVigProfile] = useState('term');
  const [activeTab, setActiveTab] = useState('maintenance');
  const [autoSyncRate, setAutoSyncRate] = useState(true);

  const holidaySegments = calculateHolidaySegments(weight);
  const totalDailyVolume = holidaySegments.totalVolume;
  const calculatedHourlyRate = totalDailyVolume / 24;

  useEffect(() => {
    if (autoSyncRate) {
      setRateMlH(Number(calculatedHourlyRate.toFixed(1)));
    }
  }, [autoSyncRate, calculatedHourlyRate]);

  const vig = weight > 0 ? (glucosePercent * rateMlH) / (6 * weight) : 0;
  const vigStatus = getVigStatus(vig, vigProfile);
  const glucosePerDay = (rateMlH * 24 * glucosePercent) / 100;
  const waterPerKgDay = totalDailyVolume / weight;

  const tierWidths = [
    (holidaySegments.firstVolume / totalDailyVolume) * 100,
    (holidaySegments.secondVolume / totalDailyVolume) * 100,
    (holidaySegments.thirdVolume / totalDailyVolume) * 100,
  ];

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ocean">
        <div className="panel-hero-copy">
          <span className="kicker">Ferramenta educativa</span>
          <h3>Holiday-Segar com leitura clínica de VIG</h3>
          <p>
            Mantive a lógica do exemplo, mas com um shell mais fácil de reaproveitar para
            outras calculadoras da mesma família.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Volume em 24h</span>
            <strong>{formatNumber(totalDailyVolume)} mL</strong>
            <p>Manutenção basal calculada por faixas de peso.</p>
          </article>
          <article className="metric-card">
            <span>Taxa sugerida</span>
            <strong>{formatNumber(calculatedHourlyRate, 1)} mL/h</strong>
            <p>Referência horária baseada apenas em manutenção.</p>
          </article>
          <article className="metric-card">
            <span>VIG atual</span>
            <strong>{formatNumber(vig, 2)} mg/kg/min</strong>
            <p>Perfil avaliado: {vigProfiles[vigProfile].label}.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Dados do paciente</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Peso (kg)</span>
              <input
                className="input"
                type="number"
                min="0.5"
                max="80"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value)))}
              />
            </label>

            <label className="field">
              <span>Ajuste rápido do peso</span>
              <input
                className="range"
                type="range"
                min="0.5"
                max="40"
                step="0.5"
                value={Math.min(weight, 40)}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
            </label>

            <label className="field">
              <span>Perfil para interpretar a VIG</span>
              <select
                className="input"
                value={vigProfile}
                onChange={(event) => setVigProfile(event.target.value)}
              >
                {Object.entries(vigProfiles).map(([key, profile]) => (
                  <option key={key} value={key}>
                    {profile.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Concentração de glicose</span>
              <select
                className="input"
                value={glucosePercent}
                onChange={(event) => setGlucosePercent(Number(event.target.value))}
              >
                {glucoseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Taxa atual (mL/h)</span>
              <input
                className="input"
                type="number"
                min="0"
                step="0.1"
                value={rateMlH}
                onChange={(event) => {
                  setAutoSyncRate(false);
                  setRateMlH(Math.max(0, Number(event.target.value) || 0));
                }}
              />
            </label>

            <div className="inline-actions">
              <button
                type="button"
                className="action-button"
                onClick={() => {
                  setAutoSyncRate(true);
                  setRateMlH(Number(calculatedHourlyRate.toFixed(1)));
                }}
              >
                Usar taxa de manutenção
              </button>
              <span className={`status-pill ${autoSyncRate ? 'tone-ok' : 'tone-info'}`}>
                {autoSyncRate ? 'Taxa sincronizada' : 'Taxa personalizada'}
              </span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="tab-row">
            <button
              type="button"
              className={`tab-button ${activeTab === 'maintenance' ? 'active' : ''}`}
              onClick={() => setActiveTab('maintenance')}
            >
              <Calculator size={16} />
              Manutenção
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'vig' ? 'active' : ''}`}
              onClick={() => setActiveTab('vig')}
            >
              <Zap size={16} />
              VIG
            </button>
          </div>

          {activeTab === 'maintenance' ? (
            <div className="content-stack">
              <div className="result-hero">
                <div>
                  <span className="kicker">Holiday-Segar</span>
                  <h3>{formatNumber(totalDailyVolume)} mL/dia</h3>
                  <p>Estimativa basal em 24 horas para manutenção hídrica.</p>
                </div>
                <div className="result-badge">
                  <Droplets size={18} />
                  {formatNumber(calculatedHourlyRate, 1)} mL/h
                </div>
              </div>

              <div className="metric-grid two-columns">
                <article className="metric-card">
                  <span>mL/kg/dia</span>
                  <strong>{formatNumber(waterPerKgDay, 1)}</strong>
                  <p>Visão rápida do aporte hídrico por peso.</p>
                </article>
                <article className="metric-card">
                  <span>Faixa dominante</span>
                  <strong>
                    {weight <= 10
                      ? '100 mL/kg'
                      : weight <= 20
                        ? '50 mL/kg'
                        : '20 mL/kg'}
                  </strong>
                  <p>Ajuda a explicar qual parte da regra pesa mais no resultado.</p>
                </article>
              </div>

              <div className="bar-card">
                <div className="bar-header">
                  <span>Composição do volume final</span>
                  <strong>100 / 50 / 20</strong>
                </div>
                <div className="tier-bar">
                  <div className="tier tier-a" style={{ width: `${tierWidths[0]}%` }} />
                  <div className="tier tier-b" style={{ width: `${tierWidths[1]}%` }} />
                  <div className="tier tier-c" style={{ width: `${tierWidths[2]}%` }} />
                </div>
                <div className="legend-grid">
                  <div>
                    <span>Primeiros 10 kg</span>
                    <strong>{formatNumber(holidaySegments.firstVolume)} mL</strong>
                  </div>
                  <div>
                    <span>10 a 20 kg</span>
                    <strong>{formatNumber(holidaySegments.secondVolume)} mL</strong>
                  </div>
                  <div>
                    <span>Acima de 20 kg</span>
                    <strong>{formatNumber(holidaySegments.thirdVolume)} mL</strong>
                  </div>
                </div>
              </div>

              <div className="note-card">
                <h4>Como a regra foi aplicada</h4>
                <ul className="plain-list">
                  <li>{formatNumber(holidaySegments.firstKg, 1)} kg x 100 mL/kg</li>
                  <li>{formatNumber(holidaySegments.secondKg, 1)} kg x 50 mL/kg</li>
                  <li>{formatNumber(holidaySegments.thirdKg, 1)} kg x 20 mL/kg</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="content-stack">
              <div className="result-hero">
                <div>
                  <span className="kicker">Velocidade de infusão de glicose</span>
                  <h3>{formatNumber(vig, 2)} mg/kg/min</h3>
                  <p>
                    Fórmula usada: (% glicose x mL/h) / (6 x peso em kg). Leitura educacional.
                  </p>
                </div>
                <div className={`status-pill status-pill-large ${toneLabels[vigStatus.tone]}`}>
                  {vigStatus.label}
                </div>
              </div>

              <div className={`status-banner ${toneLabels[vigStatus.tone]}`}>
                <Info size={18} />
                <div>
                  <strong>{vigProfiles[vigProfile].label}</strong>
                  <p>{vigStatus.description}</p>
                </div>
              </div>

              <div className="metric-grid two-columns">
                <article className="metric-card">
                  <span>Dextrose por dia</span>
                  <strong>{formatNumber(glucosePerDay, 1)} g</strong>
                  <p>Estimativa direta a partir da taxa horária selecionada.</p>
                </article>
                <article className="metric-card">
                  <span>Taxa em uso</span>
                  <strong>{formatNumber(rateMlH, 1)} mL/h</strong>
                  <p>Altere manualmente para simular outro cenário de infusão.</p>
                </article>
              </div>

              <div className="formula-box">
                <div className="formula-title">
                  <Zap size={16} />
                  <span>Resumo matemático</span>
                </div>
                <code>VIG = (Taxa mL/h x Glicose % x 10) / (60 x Peso)</code>
                <p>
                  Equivalência simplificada usada na interface: <strong>(% x mL/h) / (6 x
                  kg)</strong>.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="panel">
        <div className="section-heading">
          <span className="kicker">Contexto da solução</span>
          <h3>Blocos que podem reaparecer em outras calculadoras</h3>
        </div>

        <div className="metric-grid three-columns">
          <article className="metric-card">
            <span className="icon-chip">
              <Beaker size={16} />
            </span>
            <strong>Veículo</strong>
            <p>Água e volume total entram como base do raciocínio de manutenção.</p>
          </article>
          <article className="metric-card">
            <span className="icon-chip">
              <Zap size={16} />
            </span>
            <strong>Energia</strong>
            <p>Concentração de glicose e taxa horária definem o aporte energético.</p>
          </article>
          <article className="metric-card">
            <span className="icon-chip">
              <ShieldPlus size={16} />
            </span>
            <strong>Segurança</strong>
            <p>Faixas-alvo e alertas visuais ajudam a expor risco de sub ou sobreoferta.</p>
          </article>
        </div>

        <div className="alert-strip">
          <AlertTriangle size={18} />
          <p>
            Ferramenta educacional. Em uso real, decisão clínica depende de perdas, sódio,
            potássio, estado hemodinâmico e protocolo institucional.
          </p>
        </div>
      </section>
    </div>
  );
}
