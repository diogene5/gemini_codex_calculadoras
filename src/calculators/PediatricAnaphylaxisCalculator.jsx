import { useState } from 'react';
import { AlertTriangle, HeartPulse, Siren, Syringe } from 'lucide-react';
import { clampWeight, formatNumber, sourceLinks } from './shared';

export function PediatricAnaphylaxisCalculator() {
  const [weight, setWeight] = useState(24);
  const [profile, setProfile] = useState('prepubertal');

  const maxDose = profile === 'adolescent' ? 0.5 : 0.3;
  const epinephrineMg = Math.min(weight * 0.01, maxDose);
  const epinephrineMl = epinephrineMg;
  const autoInjector =
    weight > 25 ? '0,30 mg' : weight >= 7.5 ? '0,15 mg' : 'Seringa/ampola com cautela';

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-ruby">
        <div className="panel-hero-copy">
          <span className="kicker">Alergia grave</span>
          <h3>Anafilaxia: adrenalina IM sem atrito</h3>
          <p>
            Modulo direto para calcular dose IM de adrenalina, volume em mL e uma sugestao de
            dispositivo, mantendo a mensagem principal visivel: adrenalina primeiro.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>Adrenalina IM</span>
            <strong>{formatNumber(epinephrineMg, 2)} mg</strong>
            <p>0,01 mg/kg IM, limitada pelo teto do perfil selecionado.</p>
          </article>
          <article className="metric-card">
            <span>Volume 1 mg/mL</span>
            <strong>{formatNumber(epinephrineMl, 2)} mL</strong>
            <p>Mesmo valor numerico quando a concentracao e 1 mg/mL.</p>
          </article>
          <article className="metric-card">
            <span>Autoinjetor</span>
            <strong>{autoInjector}</strong>
            <p>Sugestao pratica para agilizar o primeiro disparo.</p>
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
                min="5"
                max="120"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(clampWeight(Number(event.target.value), 5, 120))}
              />
            </label>

            <div className="toggle-grid">
              <button
                type="button"
                className={`choice-card ${profile === 'prepubertal' ? 'active' : ''}`}
                onClick={() => setProfile('prepubertal')}
              >
                <strong>Prepuberal</strong>
                <span>Teto 0,30 mg</span>
              </button>
              <button
                type="button"
                className={`choice-card ${profile === 'adolescent' ? 'active' : ''}`}
                onClick={() => setProfile('adolescent')}
              >
                <strong>Adolescente</strong>
                <span>Teto 0,50 mg</span>
              </button>
            </div>

            <div className="status-banner compact-banner tone-danger">
              <Siren size={18} />
              <div>
                <strong>Mensagem principal</strong>
                <p>Antihistaminico e corticoide sao adjuntos. Nao substituem adrenalina IM como primeira linha.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="content-stack">
            <div className="result-hero">
              <div>
                <span className="kicker">Dose imediata</span>
                <h3>{formatNumber(epinephrineMg, 2)} mg IM</h3>
                <p>Aplicar no vasto lateral da coxa. Repetir em 5 minutos se persistirem sinais importantes.</p>
              </div>
              <div className="result-badge result-badge-ruby">
                <Syringe size={18} />
                {formatNumber(epinephrineMl, 2)} mL
              </div>
            </div>

            <div className="metric-grid two-columns">
              <article className="metric-card">
                <span>Dispositivo sugerido</span>
                <strong>{autoInjector}</strong>
                <p>Em criancas com mais de 25 kg, a dose de 0,30 mg e a preferida no CPS.</p>
              </article>
              <article className="metric-card">
                <span>Observacao</span>
                <strong>4 a 6 h</strong>
                <p>Tempo minimo de observacao apos tratamento inicial, se estabilizado.</p>
              </article>
            </div>

            <div className="note-card">
              <h4>Lembretes de seguranca</h4>
              <ul className="plain-list">
                <li>Deitar o paciente e evitar ortostatismo se houver tontura ou hipotensao</li>
                <li>Oxigenio, acesso e monitorizacao devem caminhar em paralelo</li>
                <li>Broncodilatador pode ser adjunto se houver broncoespasmo refratario</li>
              </ul>
            </div>

            <div className="source-panel">
              <div className="source-copy">
                <span className="kicker">Fontes oficiais</span>
                <h4>Anafilaxia</h4>
                <p>
                  ASCIA mantem a dose IM de 0,01 mg/kg ate 0,5 mg por dose. O CPS recomenda 0,30
                  mg em criancas acima de 25 kg e reforca observacao em servico de emergencia.
                </p>
              </div>
              <div className="source-links">
                <a href={sourceLinks.anaphylaxisGuideline} target="_blank" rel="noreferrer">
                  Guia ASCIA
                </a>
                <a href={sourceLinks.anaphylaxisCps} target="_blank" rel="noreferrer">
                  Guia CPS
                </a>
              </div>
            </div>

            <div className="alert-strip">
              <AlertTriangle size={18} />
              <p>Se houver piora rapida, estridor, cianose ou choque, a conta nao pode atrasar a primeira aplicacao de adrenalina.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
