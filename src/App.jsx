import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  Blocks,
  Flame,
  FlaskConical,
  HeartHandshake,
  Palette,
  Sparkles,
  Stethoscope,
  Syringe,
  Wind,
  ShieldPlus,
  Waves,
} from 'lucide-react';
import { CalculatorBlueprint } from './calculators/CalculatorBlueprint';
import { DesignAlternativesLab } from './calculators/DesignAlternativesLab';
import { PediatricAnaphylaxisCalculator } from './calculators/PediatricAnaphylaxisCalculator';
import { PediatricBronchiolitisCalculator } from './calculators/PediatricBronchiolitisCalculator';
import { PediatricBronchospasmCalculator } from './calculators/PediatricBronchospasmCalculator';
import { PediatricCardiacArrestCalculator } from './calculators/PediatricCardiacArrestCalculator';
import { PediatricDKACalculator } from './calculators/PediatricDKACalculator';
import { PediatricHydrationCalculator } from './calculators/PediatricHydrationCalculator';
import { PediatricSedationSafetyCalculator } from './calculators/PediatricSedationSafetyCalculator';
import { PediatricSeizureCalculator } from './calculators/PediatricSeizureCalculator';
import { PediatricSepsisCalculator } from './calculators/PediatricSepsisCalculator';
import { PediatricShockCalculator } from './calculators/PediatricShockCalculator';
import { PediatricTachycardiaCalculator } from './calculators/PediatricTachycardiaCalculator';
import { VasoactiveInfusionCalculator } from './calculators/VasoactiveInfusionCalculator';
import { PwaInstallBanner } from './components/PwaInstallBanner';

const calculators = [
  {
    id: 'pediatric-hydration',
    name: 'Hidratação Pediátrica',
    subtitle: 'Holiday-Segar + VIG',
    description:
      'Combina cálculo de manutenção hídrica, taxa horária e velocidade de infusão de glicose.',
    category: 'Pediatria',
    badge: 'Pronta para uso',
    icon: Activity,
    component: PediatricHydrationCalculator,
  },
  {
    id: 'pediatric-shock',
    name: 'Bolus no Choque',
    subtitle: '10 a 20 mL/kg',
    description:
      'Variação para choque com leitura rápida de bolus único, acumulado e faixa inicial.',
    category: 'Emergência',
    badge: 'Ressuscitação',
    icon: HeartHandshake,
    component: PediatricShockCalculator,
  },
  {
    id: 'pediatric-bronchiolitis',
    name: 'Bronquiolite + HFNC',
    subtitle: '1,5 a 2 L/kg/min',
    description:
      'Transforma peso em faixa inicial de alto fluxo nasal para bronquiolite moderada a grave.',
    category: 'Respiratório',
    badge: 'HFNC',
    icon: Wind,
    component: PediatricBronchiolitisCalculator,
  },
  {
    id: 'pediatric-anaphylaxis',
    name: 'Anafilaxia',
    subtitle: 'Adrenalina IM',
    description:
      'Dose IM de adrenalina, volume em mL e sugestao de autoinjetor para reduzir atrito na primeira linha.',
    category: 'Emergência',
    badge: 'Epi IM',
    icon: AlertTriangle,
    component: PediatricAnaphylaxisCalculator,
  },
  {
    id: 'pediatric-bronchospasm',
    name: 'Broncoespasmo',
    subtitle: 'Salbutamol + Mg',
    description:
      'Doses praticas de salbutamol, ipratrópio e magnesio IV para asma aguda/broncoespasmo.',
    category: 'Respiratório',
    badge: 'Asma',
    icon: Waves,
    component: PediatricBronchospasmCalculator,
  },
  {
    id: 'pediatric-cardiac-arrest',
    name: 'Parada Cardíaca',
    subtitle: 'Choque + epinefrina',
    description:
      'Resumo numérico do algoritmo PALS para desfibrilação e epinefrina IV/IO.',
    category: 'Emergência',
    badge: 'Código',
    icon: Syringe,
    component: PediatricCardiacArrestCalculator,
  },
  {
    id: 'pediatric-seizure',
    name: 'Convulsão',
    subtitle: '1a e 2a linha',
    description:
      'Benzodiazepinicos de resgate e opcoes de segunda linha para status epilepticus convulsivo.',
    category: 'Neuro',
    badge: 'CSE',
    icon: Brain,
    component: PediatricSeizureCalculator,
  },
  {
    id: 'pediatric-sepsis',
    name: 'Sepse Pediátrica',
    subtitle: 'Fluido + ATB + pressor',
    description:
      'Bundle inicial com janelas de antibiotico, bolus por peso e primeira escolha de vasoativo.',
    category: 'Sepse',
    badge: 'Bundle',
    icon: Flame,
    component: PediatricSepsisCalculator,
  },
  {
    id: 'pediatric-tachycardia',
    name: 'Taquicardia com Pulso',
    subtitle: 'Cardioversão + adenosina',
    description:
      'Variação voltada a taquiarritmia instável e ritmo regular monomórfico no PALS.',
    category: 'Arritmias',
    badge: 'Ritmo',
    icon: Stethoscope,
    component: PediatricTachycardiaCalculator,
  },
  {
    id: 'pediatric-dka',
    name: 'DKA Pediátrica',
    subtitle: 'Severidade + insulina',
    description:
      'Sodio corrigido, osmolaridade, severidade bioquimica e faixa de insulina por hora.',
    category: 'Metabólico',
    badge: 'DKA',
    icon: FlaskConical,
    component: PediatricDKACalculator,
  },
  {
    id: 'pediatric-sedation',
    name: 'Segurança na Sedação',
    subtitle: 'Rescue meds + checklist',
    description:
      'Foca em rescue medications, laringoespasmo e preparo minimo de uma sedacao segura.',
    category: 'Segurança',
    badge: 'Sedação',
    icon: ShieldPlus,
    component: PediatricSedationSafetyCalculator,
  },
  {
    id: 'vasoactive-infusion',
    name: 'Drogas Vasoativas',
    subtitle: 'Conversor mcg/kg/min',
    description:
      'Converte diluicao local e bomba em mcg/kg/min para epinefrina, norepinefrina e dopamina.',
    category: 'Infusões',
    badge: 'Bomba',
    icon: Syringe,
    component: VasoactiveInfusionCalculator,
  },
  {
    id: 'design-lab',
    name: 'Alternativas de Design',
    subtitle: 'Triage, protocol e night shift',
    description:
      'Comparador de direções visuais para aprender como adaptar a mesma base a contextos diferentes.',
    category: 'Design',
    badge: 'Lab',
    icon: Palette,
    component: DesignAlternativesLab,
  },
  {
    id: 'blueprint',
    name: 'Blueprint e Princípios',
    subtitle: 'Estrutura reaproveitável',
    description:
      'Mostra o padrão de arquivos e os princípios de design para ampliar a coleção.',
    category: 'Framework',
    badge: 'Modelo',
    icon: Blocks,
    component: CalculatorBlueprint,
  },
];

const activeCalculatorFallback = calculators[0];

export default function App() {
  const [activeCalculatorId, setActiveCalculatorId] = useState(activeCalculatorFallback.id);

  const activeCalculator =
    calculators.find((calculator) => calculator.id === activeCalculatorId) ??
    activeCalculatorFallback;
  const ActiveCalculatorComponent = activeCalculator.component;

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />
      <PwaInstallBanner />

      <div className="layout">
        <aside className="sidebar">
          <section className="panel hero-card">
            <div className="badge-row">
              <span className="badge badge-ghost">
                <Sparkles size={14} />
                React + Vite
              </span>
              <span className="badge badge-ghost">
                <FlaskConical size={14} />
                UI educacional
              </span>
            </div>

            <h1>Biblioteca de Calculadoras Clinicas</h1>
            <p>
              Coleção visual para calculadoras rápidas, com prioridade para emergência
              pediátrica, fórmulas transparentes e uso confortável no celular.
            </p>

            <div className="hero-stats">
              <div>
                <span className="hero-label">Módulos</span>
                <strong>{calculators.length}</strong>
              </div>
              <div>
                <span className="hero-label">Foco</span>
                <strong>Emergência PED</strong>
              </div>
            </div>

            <div className="library-pills">
              <span>Cards modulares</span>
              <span>Fontes oficiais</span>
              <span>Leitura mobile</span>
              <span>PWA instalavel</span>
            </div>
          </section>

          <section className="panel nav-panel">
            <div className="section-heading">
              <span className="kicker">Calculadoras</span>
              <h2>Selecione um bloco</h2>
            </div>

            <div className="nav-list">
              {calculators.map((calculator) => {
                const Icon = calculator.icon;
                const isActive = calculator.id === activeCalculator.id;

                return (
                  <button
                    key={calculator.id}
                    type="button"
                    className={`nav-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCalculatorId(calculator.id)}
                  >
                    <div className="nav-card-header">
                      <div className="nav-card-icon">
                        <Icon size={18} />
                      </div>
                      <span className="badge badge-soft">{calculator.badge}</span>
                    </div>

                    <div className="nav-card-copy">
                      <strong>{calculator.name}</strong>
                      <span>{calculator.subtitle}</span>
                      <p>{calculator.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>

        <main className="workspace">
          <section className="panel workspace-header">
            <div>
              <span className="kicker">{activeCalculator.category}</span>
              <h2>{activeCalculator.name}</h2>
              <p>{activeCalculator.description}</p>
            </div>
            <div className="workspace-chip">
              <span>Interface modular</span>
              <strong>{activeCalculator.subtitle}</strong>
            </div>
          </section>

          <ActiveCalculatorComponent />
        </main>
      </div>
    </div>
  );
}
