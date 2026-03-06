import { useEffect, useState } from 'react';
import { ShieldPlus, Syringe, Wind } from 'lucide-react';
import {
  airwayAgePresets,
  clampWeight,
  formatNumber,
  getAirwayPreset,
  sourceLinks,
} from './shared';

export function PediatricIntubationCalculator() {
  const [agePresetId, setAgePresetId] = useState('6y');
  const preset = getAirwayPreset(agePresetId);
  const [weight, setWeight] = useState(preset.weight);

  useEffect(() => {
    setWeight(preset.weight);
  }, [preset.id, preset.weight]);

  const cuffedTube = preset.cuffedTube;
  const uncuffedTube = preset.cuffedTube + 0.5;
  const smallerBackup = Math.max(3, preset.cuffedTube - 0.5);
  const largerBackup = preset.cuffedTube + 0.5;
  const teethDepth =
    preset.ageYears >= 2 ? Math.max(preset.lipDepth, preset.ageYears / 2 + 12) : preset.lipDepth;
  const apneicOxygenFlow = Math.min(weight * 2, 15);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ocean">
        <div className="panel-hero-copy">
          <span className="kicker">Intubacao</span>
          <h3>Tubo, profundidade e plano B antes da laringoscopia</h3>
          <p>
            O erro que atrasa a via aerea nao e calculo dificil. Quase sempre e entrar sem tubo de
            backup, sem profundidade-alvo e sem alternativa supraglotica a mao.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>ETT cuffed</span>
            <strong>{formatNumber(cuffedTube, 1)}</strong>
            <p>Tamanho principal para a faixa etaria escolhida.</p>
          </article>
          <article className="metric-card">
            <span>Profundidade</span>
            <strong>{formatNumber(teethDepth, 1)} cm</strong>
            <p>Checagem inicial na marca do tubo/arcada.</p>
          </article>
          <article className="metric-card">
            <span>Oxigenacao apneica</span>
            <strong>{formatNumber(apneicOxygenFlow, 1)} L/min</strong>
            <p>2 L/kg/min com teto de 15 L/min durante a tentativa.</p>
          </article>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="kicker">Entradas</span>
            <h3>Faixa etaria e peso</h3>
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
                    {agePreset.label} ({agePreset.weight} kg)
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Peso real (kg)</span>
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

            <div className="status-banner compact-banner tone-info">
              <ShieldPlus size={18} />
              <div>
                <strong>Checklist mental</strong>
                <p>Tubo escolhido, 0,5 abaixo e acima separados, capnografia pronta e dispositivo supraglotico ao alcance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Tubo principal</span>
                <h3>{formatNumber(cuffedTube, 1)} cuffed</h3>
                <p>Faixa etaria selecionada: {preset.label} com peso-guia de {preset.weight} kg.</p>
              </div>
              <div className="result-badge">
                <Syringe size={18} />
                {formatNumber(preset.lipDepth, 1)} cm
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Tubos de backup</span>
                <strong>
                  {formatNumber(smallerBackup, 1)} / {formatNumber(largerBackup, 1)}
                </strong>
                <p>Leve 0,5 abaixo e 0,5 acima para reduzir reintubacao desorganizada.</p>
              </article>
              <article className="metric-card">
                <span>ETT uncuffed</span>
                <strong>{formatNumber(uncuffedTube, 1)}</strong>
                <p>Leitura rapida se o servico ou o contexto pedir uncuffed.</p>
              </article>
              <article className="metric-card">
                <span>LMA</span>
                <strong>{preset.lma}</strong>
                <p>Plano B supraglotico da cue card pediatrica.</p>
              </article>
              <article className="metric-card">
                <span>Profundidade inicial</span>
                <strong>{formatNumber(teethDepth, 1)} cm</strong>
                <p>Confirme com expansao, ausculta e waveform capnography.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Principios de via aerea</h4>
              <ul className="plain-list">
                <li>Profundidade anotada no tubo e tubo reserva separado antes da sedacao reduzem erro de execucao</li>
                <li>Waveform capnography vale mais que impressao subjetiva de complacencia ou ausculta isolada</li>
                <li>Se a visualizacao piora, mude de estrategia cedo; insistir na mesma tentativa costuma ser o atraso mais caro</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>RCH + cue card pediatrica</h4>
                <p>
                  A cue card da ACI resume tamanhos de tubo, LMA e profundidade por idade. RCH
                  reforca capnografia, oxigenacao apneica 2 L/kg/min e o uso de tubo cuffed em boa
                  parte das intubacoes de emergencia.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.emergencyCueCard} target="_blank" rel="noreferrer">
                  ACI cue card
                </a>
                <a href={sourceLinks.emergencyAirway} target="_blank" rel="noreferrer">
                  RCH via aerea
                </a>
                <a href={sourceLinks.traumaAirway} target="_blank" rel="noreferrer">
                  RCH trauma airway
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <Wind size={18} />
              <p>Se a saturacao cai, a prioridade volta para oxigenar e reposicionar; numero de tubo nenhum compensa tentativa prolongada.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
