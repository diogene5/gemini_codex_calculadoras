import { useEffect, useMemo, useState } from 'react';
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
import { PediatricAdvancedAnaphylaxisCalculator } from './calculators/PediatricAdvancedAnaphylaxisCalculator';
import { PediatricBronchiolitisCalculator } from './calculators/PediatricBronchiolitisCalculator';
import { PediatricBronchospasmCalculator } from './calculators/PediatricBronchospasmCalculator';
import { PediatricCardiacArrestCalculator } from './calculators/PediatricCardiacArrestCalculator';
import { PediatricDKACalculator } from './calculators/PediatricDKACalculator';
import { PediatricHydrationCalculator } from './calculators/PediatricHydrationCalculator';
import { PediatricIntubationCalculator } from './calculators/PediatricIntubationCalculator';
import { PediatricNIVCalculator } from './calculators/PediatricNIVCalculator';
import { PediatricRSICalculator } from './calculators/PediatricRSICalculator';
import { PediatricSedationSafetyCalculator } from './calculators/PediatricSedationSafetyCalculator';
import { PediatricSeizureCalculator } from './calculators/PediatricSeizureCalculator';
import { PediatricSepsisCalculator } from './calculators/PediatricSepsisCalculator';
import { PediatricShockCalculator } from './calculators/PediatricShockCalculator';
import { PediatricTachycardiaCalculator } from './calculators/PediatricTachycardiaCalculator';
import { PediatricVentilationCalculator } from './calculators/PediatricVentilationCalculator';
import { VasoactiveInfusionCalculator } from './calculators/VasoactiveInfusionCalculator';
import { PwaInstallBanner } from './components/PwaInstallBanner';

const ACTIVE_CALCULATOR_KEY = 'calc-ped-active-module-mobile';
const LEARNING_MODULES_KEY = 'calc-ped-show-learning-mobile';

const calculators = [
  {
    id: 'pediatric-hydration',
    name: 'Hidratação Pediátrica',
    subtitle: 'Holiday-Segar + VIG',
    description: 'Manutenção hídrica e glicose em uma tela só.',
    category: 'Pediatria',
    badge: 'Pronta para uso',
    section: 'metabolic',
    icon: Activity,
    component: PediatricHydrationCalculator,
  },
  {
    id: 'pediatric-shock',
    name: 'Bolus no Choque',
    subtitle: '10 a 20 mL/kg',
    description: 'Fluido rápido por peso para ressuscitação inicial.',
    category: 'Emergência',
    badge: 'Ressuscitação',
    section: 'immediate',
    quick: true,
    icon: HeartHandshake,
    component: PediatricShockCalculator,
  },
  {
    id: 'pediatric-bronchiolitis',
    name: 'Bronquiolite + HFNC',
    subtitle: '1,5 a 2 L/kg/min',
    description: 'Faixa inicial de alto fluxo nasal por peso.',
    category: 'Respiratório',
    badge: 'HFNC',
    section: 'respiratory',
    icon: Wind,
    component: PediatricBronchiolitisCalculator,
  },
  {
    id: 'pediatric-anaphylaxis',
    name: 'Anafilaxia',
    subtitle: 'Adrenalina IM',
    description: 'Primeira dose IM e autoinjetor por peso.',
    category: 'Emergência',
    badge: 'Epi IM',
    section: 'immediate',
    quick: true,
    icon: AlertTriangle,
    component: PediatricAnaphylaxisCalculator,
  },
  {
    id: 'pediatric-anaphylaxis-advanced',
    name: 'Anafilaxia Avancada',
    subtitle: 'Infusao + fluido',
    description: 'Escalada para choque e via aerea ameaçada.',
    category: 'Emergência',
    badge: 'Escalada',
    section: 'immediate',
    quick: true,
    icon: AlertTriangle,
    component: PediatricAdvancedAnaphylaxisCalculator,
  },
  {
    id: 'pediatric-bronchospasm',
    name: 'Broncoespasmo',
    subtitle: 'Salbutamol + Mg',
    description: 'Salbutamol, ipratrópio e magnésio IV.',
    category: 'Respiratório',
    badge: 'Asma',
    section: 'respiratory',
    icon: Waves,
    component: PediatricBronchospasmCalculator,
  },
  {
    id: 'pediatric-niv',
    name: 'Ventilacao Nao Invasiva',
    subtitle: 'CPAP + BiPAP',
    description: 'Pressao inicial e sinais de falha precoce.',
    category: 'Respiratório',
    badge: 'VNI',
    section: 'respiratory',
    icon: Wind,
    component: PediatricNIVCalculator,
  },
  {
    id: 'pediatric-ventilation',
    name: 'Ventilacao Pos-Intubacao',
    subtitle: 'VT + RR + EtCO2',
    description: 'Ponto de partida da ventilação e perfil obstrutivo.',
    category: 'Via aérea',
    badge: 'Ventilar',
    section: 'airway',
    quick: true,
    icon: Wind,
    component: PediatricVentilationCalculator,
  },
  {
    id: 'pediatric-intubation',
    name: 'Intubacao',
    subtitle: 'ETT + profundidade',
    description: 'Tubo, backup e profundidade por faixa etária.',
    category: 'Via aérea',
    badge: 'Tubo',
    section: 'airway',
    quick: true,
    icon: Stethoscope,
    component: PediatricIntubationCalculator,
  },
  {
    id: 'pediatric-rsi',
    name: 'Drogas de RSI',
    subtitle: 'Ketamina + roc',
    description: 'Indução, bloqueio e rescue hemodinâmico.',
    category: 'Via aérea',
    badge: 'RSI',
    section: 'airway',
    quick: true,
    icon: Syringe,
    component: PediatricRSICalculator,
  },
  {
    id: 'pediatric-cardiac-arrest',
    name: 'Parada Cardíaca',
    subtitle: 'Choque + epinefrina',
    description: 'Choques e epinefrina IV/IO no PALS.',
    category: 'Emergência',
    badge: 'Código',
    section: 'immediate',
    icon: Syringe,
    component: PediatricCardiacArrestCalculator,
  },
  {
    id: 'pediatric-seizure',
    name: 'Convulsão',
    subtitle: '1a e 2a linha',
    description: 'Resgate e segunda linha para CSE.',
    category: 'Neuro',
    badge: 'CSE',
    section: 'immediate',
    icon: Brain,
    component: PediatricSeizureCalculator,
  },
  {
    id: 'pediatric-sepsis',
    name: 'Sepse Pediátrica',
    subtitle: 'Fluido + ATB + pressor',
    description: 'Bundle inicial e primeira escolha vasoativa.',
    category: 'Sepse',
    badge: 'Bundle',
    section: 'immediate',
    quick: true,
    icon: Flame,
    component: PediatricSepsisCalculator,
  },
  {
    id: 'pediatric-tachycardia',
    name: 'Taquicardia com Pulso',
    subtitle: 'Cardioversão + adenosina',
    description: 'Cardioversão e adenosina no PALS.',
    category: 'Arritmias',
    badge: 'Ritmo',
    section: 'immediate',
    icon: Stethoscope,
    component: PediatricTachycardiaCalculator,
  },
  {
    id: 'pediatric-dka',
    name: 'DKA Pediátrica',
    subtitle: 'Severidade + insulina',
    description: 'Severidade, sódio corrigido e insulina.',
    category: 'Metabólico',
    badge: 'DKA',
    section: 'metabolic',
    icon: FlaskConical,
    component: PediatricDKACalculator,
  },
  {
    id: 'pediatric-sedation',
    name: 'Segurança na Sedação',
    subtitle: 'Rescue meds + checklist',
    description: 'Checklist e rescue meds para sedação.',
    category: 'Segurança',
    badge: 'Sedação',
    section: 'support',
    icon: ShieldPlus,
    component: PediatricSedationSafetyCalculator,
  },
  {
    id: 'vasoactive-infusion',
    name: 'Drogas Vasoativas',
    subtitle: 'Conversor mcg/kg/min',
    description: 'Bomba e diluição virando mcg/kg/min.',
    category: 'Infusões',
    badge: 'Bomba',
    section: 'support',
    icon: Syringe,
    component: VasoactiveInfusionCalculator,
  },
  {
    id: 'design-lab',
    name: 'Alternativas de Design',
    subtitle: 'Triage, protocol e night shift',
    description: 'Comparador de direções visuais.',
    category: 'Design',
    badge: 'Lab',
    section: 'learning',
    learning: true,
    icon: Palette,
    component: DesignAlternativesLab,
  },
  {
    id: 'blueprint',
    name: 'Blueprint e Princípios',
    subtitle: 'Estrutura reaproveitável',
    description: 'Padrão de expansão e princípios de produto.',
    category: 'Framework',
    badge: 'Modelo',
    section: 'learning',
    learning: true,
    icon: Blocks,
    component: CalculatorBlueprint,
  },
];

const activeCalculatorFallback = calculators[0];
const sectionOrder = [
  {
    id: 'immediate',
    label: 'Plantao imediato',
    description: 'Choque, sepse, anafilaxia, arritmia e parada.',
  },
  {
    id: 'airway',
    label: 'Via aerea',
    description: 'Intubacao, sequencia rapida e ventilacao.',
  },
  {
    id: 'respiratory',
    label: 'Respiratorio',
    description: 'HFNC e broncoespasmo agudo.',
  },
  {
    id: 'metabolic',
    label: 'Metabolico e fluidos',
    description: 'Hidratacao e DKA.',
  },
  {
    id: 'support',
    label: 'Suporte e infusoes',
    description: 'Sedacao, checklists e conversoes.',
  },
  {
    id: 'learning',
    label: 'Aprendizado',
    description: 'Design e blueprint para expandir o projeto.',
  },
];

export default function App() {
  const [activeCalculatorId, setActiveCalculatorId] = useState(() => {
    if (typeof window === 'undefined') {
      return activeCalculatorFallback.id;
    }

    return localStorage.getItem(ACTIVE_CALCULATOR_KEY) ?? activeCalculatorFallback.id;
  });
  const [showLearningTools, setShowLearningTools] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(LEARNING_MODULES_KEY) === 'true';
  });
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');

  const activeCalculator =
    calculators.find((calculator) => calculator.id === activeCalculatorId) ??
    activeCalculatorFallback;
  const ActiveCalculatorComponent = activeCalculator.component;
  const clinicalCalculators = useMemo(
    () => calculators.filter((calculator) => !calculator.learning),
    []
  );
  const learningCalculators = useMemo(
    () => calculators.filter((calculator) => calculator.learning),
    []
  );
  const quickLaunch = calculators.filter((calculator) => calculator.quick).slice(0, 5);
  const sectionChips = useMemo(
    () => [
      { id: 'all', label: 'Todos' },
      ...sectionOrder.filter((section) => showLearningTools || section.id !== 'learning'),
    ],
    [showLearningTools]
  );
  const visibleCalculators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return calculators.filter((calculator) => {
      if (!showLearningTools && calculator.learning) {
        return false;
      }

      if (sectionFilter !== 'all' && calculator.section !== sectionFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return [
        calculator.name,
        calculator.subtitle,
        calculator.description,
        calculator.badge,
        calculator.category,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [query, sectionFilter, showLearningTools]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_CALCULATOR_KEY, activeCalculatorId);
  }, [activeCalculatorId]);

  useEffect(() => {
    localStorage.setItem(LEARNING_MODULES_KEY, String(showLearningTools));
  }, [showLearningTools]);

  return (
    <div className="app-shell mobile-command-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />
      <PwaInstallBanner />

      <div className="layout mobile-command-layout">
        <aside className="sidebar mobile-command-sidebar">
          <section className="panel hero-card mobile-command-hero">
            <div className="badge-row">
              <span className="badge badge-ghost">
                <Sparkles size={14} />
                Mobile-first
              </span>
              <span className="badge badge-ghost">
                <FlaskConical size={14} />
                Busca + filtro
              </span>
            </div>

            <h1>Command Center</h1>
            <p>
              Explora a hipótese de um app mais direto para bolso: busca rápida, filtros por
              cenário e cards compactos para navegação com uma mão.
            </p>

            <label className="field mobile-search-field">
              <span>Buscar modulo</span>
              <input
                className="input"
                type="search"
                placeholder="Sepse, tubo, DKA, VNI..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="hero-stats hero-stats-compact">
              <div>
                <span className="hero-label">Clinicos</span>
                <strong>{clinicalCalculators.length}</strong>
              </div>
              <div>
                <span className="hero-label">Aprendizado</span>
                <strong>{learningCalculators.length}</strong>
              </div>
            </div>

            <div className="mobile-filter-row">
              {sectionChips.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`mobile-filter-chip ${sectionFilter === section.id ? 'active' : ''}`}
                  onClick={() => setSectionFilter(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </section>

          <section className="panel nav-panel mobile-browser-panel">
            <div className="mobile-browser-header">
              <div className="section-heading">
                <span className="kicker">Resultados</span>
                <h2>{visibleCalculators.length} modulos</h2>
              </div>
              <button
                type="button"
                className="learning-toggle"
                onClick={() => setShowLearningTools((current) => !current)}
              >
                {showLearningTools ? 'Ocultar aprendizado' : 'Mostrar aprendizado'}
              </button>
            </div>

            <div className="mobile-result-list">
              {visibleCalculators.map((calculator) => {
                const Icon = calculator.icon;
                const isActive = calculator.id === activeCalculator.id;

                return (
                  <button
                    key={calculator.id}
                    type="button"
                    className={`nav-card mobile-result-card ${isActive ? 'active' : ''}`}
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
                      <p>{calculator.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>

        <main className="workspace mobile-command-workspace">
          <section className="panel workspace-header mobile-command-header">
            <div>
              <span className="kicker">{activeCalculator.category}</span>
              <h2>{activeCalculator.name}</h2>
              <p>{activeCalculator.subtitle}</p>
            </div>
            <div className="workspace-chip">
              <span>{activeCalculator.badge}</span>
              <strong>{activeCalculator.description}</strong>
            </div>
          </section>

          <section className="mobile-context-row">
            {quickLaunch.map((calculator) => (
              <button
                key={calculator.id}
                type="button"
                className={`mobile-context-chip ${calculator.id === activeCalculator.id ? 'active' : ''}`}
                onClick={() => setActiveCalculatorId(calculator.id)}
              >
                {calculator.name}
              </button>
            ))}
          </section>

          <ActiveCalculatorComponent />
        </main>
      </div>
    </div>
  );
}
