import { useEffect, useState } from 'react';
import { AlertTriangle, Gauge, ShieldPlus, Wind } from 'lucide-react';
import {
  airwayAgePresets,
  formatNumber,
  getAirwayPreset,
  parseRange,
  sourceLinks,
} from './shared';

const nivProfiles = {
  cpap: {
    name: 'CPAP',
    badge: '5 a 6 cmH2O',
    setup: 'CPAP 5 a 6 cmH2O',
    support: 'Pressao continua',
    supportValue: '5 a 6 cmH2O',
    indication: 'Hipoxemico ou bronquiolite com trabalho respiratorio mantido.',
    reassess: 'Se hipoxemia ou retrações persistem, titule cedo e pense em escalonamento.',
  },
  bilevel: {
    name: 'BiPAP',
    badge: 'IPAP 8 a 10 / EPAP 4 a 5',
    setup: 'IPAP 8 a 10 + EPAP 4 a 5 cmH2O',
    support: 'Pressure support inicial',
    supportValue: '4 a 5 cmH2O',
    indication: 'Hipercapnico, obstrutivo ou fadiga ventilatoria com drive preservado.',
    reassess: 'Se a ventilacao segue ruim, a janela para via aerea invasiva encurta.',
  },
};

export function PediatricNIVCalculator() {
  const [agePresetId, setAgePresetId] = useState('2y');
  const [profileId, setProfileId] = useState('cpap');

  const preset = getAirwayPreset(agePresetId);
  const rrRange = parseRange(preset.rr);
  const [currentRespiratoryRate, setCurrentRespiratoryRate] = useState(rrRange.high + 10);

  useEffect(() => {
    setCurrentRespiratoryRate(rrRange.high + 10);
  }, [agePresetId, rrRange.high]);

  const profile = nivProfiles[profileId];
  const rrAboveNormal = Math.max(0, currentRespiratoryRate - rrRange.high);
  const breathingLoad =
    rrAboveNormal === 0 ? 'Dentro da referencia' : `${formatNumber(rrAboveNormal)} acima do limite`;

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-violet">
        <div className="panel-hero-copy">
          <span className="kicker">Ventilacao nao invasiva</span>
          <h3>CPAP e BiPAP: inicio rapido sem perder o timing</h3>
          <p>
            Este modulo nao substitui o julgamento clinico. Ele reduz o atraso na hora de escolher
            a modalidade, iniciar a pressao e reconhecer quem esta falhando cedo.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Modalidade</span>
            <strong>{profile.name}</strong>
            <p>{profile.indication}</p>
          </article>
          <article className="metric-card">
            <span>Inicio sugerido</span>
            <strong>{profile.badge}</strong>
            <p>Faixa inicial de pressao mais comum nos protocolos pediátricos.</p>
          </article>
          <article className="metric-card">
            <span>Carga respiratoria</span>
            <strong>{breathingLoad}</strong>
            <p>Comparacao da FR atual com a referencia da idade.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Faixa etaria e modo</h3>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Faixa etaria</span>
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

            <label className="field">
              <span>FR atual (/min)</span>
              <input
                className="input"
                type="number"
                min="10"
                max="100"
                step="1"
                value={currentRespiratoryRate}
                onChange={(event) =>
                  setCurrentRespiratoryRate(Math.max(10, Number(event.target.value) || 0))
                }
              />
            </label>

            <div className="toggle-grid">
              {Object.entries(nivProfiles).map(([id, nivProfile]) => (
                <button
                  key={id}
                  type="button"
                  className={`choice-card ${profileId === id ? 'active' : ''}`}
                  onClick={() => setProfileId(id)}
                >
                  <strong>{nivProfile.name}</strong>
                  <span>{nivProfile.badge}</span>
                </button>
              ))}
            </div>

            <div className="status-banner compact-banner tone-info">
              <ShieldPlus size={18} />
              <div>
                <strong>Antes de ligar</strong>
                <p>Escolha interface toleravel, explique o plano para a equipe e combine qual sinal vai significar falha precoce.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Ajuste de partida</span>
                <h3>{profile.setup}</h3>
                <p>{profile.reassess}</p>
              </div>
              <div className="result-badge result-badge-violet">
                <Gauge size={18} />
                FR ref. {preset.rr}
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>FR acima do normal</span>
                <strong>{formatNumber(rrAboveNormal)}</strong>
                <p>Zero nao significa conforto; significa apenas que a FR nao esta acima do teto da idade.</p>
              </article>
              <article className="metric-card">
                <span>{profile.support}</span>
                <strong>{profile.supportValue}</strong>
                <p>BiPAP comeca com delta pequeno; CPAP usa uma unica pressao continua.</p>
              </article>
              <article className="metric-card">
                <span>Faixa etaria</span>
                <strong>{preset.label}</strong>
                <p>Referencia APLS: {preset.rr}/min.</p>
              </article>
              <article className="metric-card">
                <span>Objetivo nas proximas minutos</span>
                <strong>Menor esforco</strong>
                <p>Menos retração, melhor conforto e queda sustentada da FR valem mais que um numero isolado.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Contraindicacoes e sinais de falha</h4>
              <ul className="plain-list">
                <li>Rebaixamento importante, apneia, vomitos recorrentes, secrecao incontrolavel ou choque importante afastam o uso de VNI</li>
                <li>Trauma facial, impossibilidade de vedacao e pneumotorax nao drenado tambem empurram a decisao para outra estrategia</li>
                <li>Se a crianca piora apesar de VNI bem aplicada, o erro e persistir demais, nao escalar cedo</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes</span>
                <h4>APLS + revisao pediatrica de VNI</h4>
                <p>
                  Para CPAP, a revisao pediatrica descreve inicio tipico em 5 a 6 cmH2O. Em
                  BiPAP, os pontos de partida mais comuns sao EPAP 4 a 5 e IPAP 8 a 10 cmH2O.
                  A referencia de FR vem da tabela APLS, e a pagina do Starship funciona como guia
                  oficial de NIV/HFNC no fluxo pediatrico.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.aplsFormula} target="_blank" rel="noreferrer">
                  APLS formulas
                </a>
                <a href={sourceLinks.pediatricNivReview} target="_blank" rel="noreferrer">
                  Revisao pediatrica de VNI
                </a>
                <a href={sourceLinks.starshipNiv} target="_blank" rel="noreferrer">
                  Starship NIV guide
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Wind size={18} />
              <p>VNI boa melhora trabalho respiratorio cedo. VNI ruim so compra atraso antes da intubacao.</p>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Use este modulo como apoio educacional; a decisao real continua dependente da doenca, monitorizacao e tolerancia da interface.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
