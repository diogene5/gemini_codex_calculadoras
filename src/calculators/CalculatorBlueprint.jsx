import { Code2, LayoutTemplate, Scale, WandSparkles } from 'lucide-react';

const skeleton = `export function MinhaCalculadora() {
  const [entrada, setEntrada] = useState(0);
  const resultado = calcularAlgo(entrada);

  return (
    <div className="calculator-stack">
      <section className="panel panel-hero">...</section>
      <div className="workspace-grid">
        <section className="panel">Entradas</section>
        <section className="panel">Resultados</section>
      </div>
    </div>
  );
}`;

export function CalculatorBlueprint() {
  return (
    <div className="calculator-stack">
      <section className="panel panel-hero panel-hero-amber">
        <div className="panel-hero-copy">
          <span className="kicker">Blueprint + princípios</span>
          <h3>Como transformar esse projeto em uma coleção de calculadoras úteis</h3>
          <p>
            O objetivo é não recriar layout toda vez. Cada nova calculadora entra como um
            componente novo e usa as mesmas classes visuais.
          </p>
        </div>
      </section>

      <div className="metric-grid three-columns">
        <article className="panel mini-panel">
          <span className="icon-chip">
            <LayoutTemplate size={16} />
          </span>
          <h4>1. Duplicar a estrutura</h4>
          <p>
            Crie um arquivo em <code>src/calculators/</code> e siga o padrão de hero, painel
            de entrada e painel de resultado.
          </p>
        </article>

        <article className="panel mini-panel">
          <span className="icon-chip">
            <Code2 size={16} />
          </span>
          <h4>2. Separar fórmula e interpretação</h4>
          <p>
            Mantenha a conta explícita e trate status, alertas e texto clínico como funções
            independentes.
          </p>
        </article>

        <article className="panel mini-panel">
          <span className="icon-chip">
            <WandSparkles size={16} />
          </span>
          <h4>3. Registrar no catálogo</h4>
          <p>
            Adicione o componente na lista de <code>calculators</code> em <code>src/App.jsx</code>
            para ele aparecer na navegação.
          </p>
        </article>
      </div>

      <div className="metric-grid three-columns">
        <article className="panel mini-panel">
          <span className="icon-chip">
            <Scale size={16} />
          </span>
          <h4>1 cálculo, 1 cenário</h4>
          <p>
            Cada módulo deve resolver uma decisão específica. Misturar sepse, bronquiolite e
            parada no mesmo painel piora a segurança.
          </p>
        </article>

        <article className="panel mini-panel">
          <span className="icon-chip">
            <Code2 size={16} />
          </span>
          <h4>Matemática separada da leitura</h4>
          <p>
            A conta fica em funções pequenas; a interpretação fica em labels, tons e faixas.
            Isso facilita revisão e manutenção.
          </p>
        </article>

        <article className="panel mini-panel">
          <span className="icon-chip">
            <LayoutTemplate size={16} />
          </span>
          <h4>Fonte visível na interface</h4>
          <p>
            Em temas clínicos, linkar o algoritmo oficial dentro do próprio card aumenta
            confiança e reduz ambiguidade.
          </p>
        </article>
      </div>

      <section className="panel">
        <div className="section-heading">
          <span className="kicker">Skeleton</span>
          <h3>Componente-base</h3>
        </div>

        <pre className="code-sample">
          <code>{skeleton}</code>
        </pre>
      </section>
    </div>
  );
}
