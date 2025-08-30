export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background p-xl">
      <div className="max-w-6xl mx-auto space-y-2xl">
        <header className="text-center">
          <h1 className="text-5xl font-display text-foreground mb-md">
            Design System
          </h1>
          <p className="text-lg text-muted-foreground">
            Página de teste para verificar todos os tokens do design system
          </p>
        </header>

        {/* Cores */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Cores</h2>
          
          {/* Cores Base */}
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Cores Base</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div className="bg-background border p-md rounded-lg">
                <div className="text-sm font-mono">background</div>
              </div>
              <div className="bg-card border p-md rounded-lg">
                <div className="text-sm font-mono">card</div>
              </div>
              <div className="bg-popover border p-md rounded-lg">
                <div className="text-sm font-mono">popover</div>
              </div>
              <div className="bg-muted border p-md rounded-lg">
                <div className="text-sm font-mono">muted</div>
              </div>
            </div>
          </div>

          {/* Cores Primárias */}
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Cores Primárias</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-sm">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div
                  key={shade}
                  className={`bg-primary-${shade} h-16 rounded-md flex items-center justify-center`}
                >
                  <span className="text-xs font-mono text-primary-foreground">
                    {shade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cores Semânticas */}
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Cores Semânticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div className="bg-destructive text-destructive-foreground p-md rounded-lg">
                <div className="text-sm font-mono">destructive</div>
              </div>
              <div className="bg-success text-success-foreground p-md rounded-lg">
                <div className="text-sm font-mono">success</div>
              </div>
              <div className="bg-warning text-warning-foreground p-md rounded-lg">
                <div className="text-sm font-mono">warning</div>
              </div>
              <div className="bg-info text-info-foreground p-md rounded-lg">
                <div className="text-sm font-mono">info</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tipografia */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Tipografia</h2>
          
          {/* Tamanhos de Fonte */}
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Tamanhos de Fonte</h3>
            <div className="space-y-sm">
              <div className="text-xs text-foreground">text-xs - 0.75rem (12px)</div>
              <div className="text-sm text-foreground">text-sm - 0.875rem (14px)</div>
              <div className="text-base text-foreground">text-base - 1rem (16px)</div>
              <div className="text-lg text-foreground">text-lg - 1.125rem (18px)</div>
              <div className="text-xl text-foreground">text-xl - 1.25rem (20px)</div>
              <div className="text-2xl text-foreground">text-2xl - 1.5rem (24px)</div>
              <div className="text-3xl text-foreground">text-3xl - 1.875rem (30px)</div>
              <div className="text-4xl text-foreground">text-4xl - 2.25rem (36px)</div>
              <div className="text-5xl text-foreground">text-5xl - 3rem (48px)</div>
              <div className="text-6xl text-foreground">text-6xl - 3.75rem (60px)</div>
            </div>
          </div>

          {/* Famílias de Fontes */}
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Famílias de Fontes</h3>
            <div className="space-y-sm">
              <div className="font-sans text-lg text-foreground">font-sans - Inter (Sans-serif)</div>
              <div className="font-serif text-lg text-foreground">font-serif - Georgia (Serif)</div>
              <div className="font-mono text-lg text-foreground">font-mono - JetBrains Mono (Monospace)</div>
              <div className="font-display text-lg text-foreground">font-display - Inter (Display)</div>
              <div className="font-body text-lg text-foreground">font-body - Inter (Body)</div>
            </div>
          </div>
        </section>

        {/* Espaçamento */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Espaçamento</h2>
          
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Espaçamento Customizado</h3>
            <div className="space-y-sm">
              <div className="bg-primary-100 p-xs rounded">
                <span className="text-sm font-mono">p-xs - 0.25rem (4px)</span>
              </div>
              <div className="bg-primary-200 p-sm rounded">
                <span className="text-sm font-mono">p-sm - 0.5rem (8px)</span>
              </div>
              <div className="bg-primary-300 p-md rounded">
                <span className="text-sm font-mono">p-md - 1rem (16px)</span>
              </div>
              <div className="bg-primary-400 p-lg rounded">
                <span className="text-sm font-mono">p-lg - 1.5rem (24px)</span>
              </div>
              <div className="bg-primary-500 p-xl rounded">
                <span className="text-sm font-mono text-primary-foreground">p-xl - 2rem (32px)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bordas */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Bordas</h2>
          
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Border Radius</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
              <div className="bg-card border p-md rounded-xs">
                <div className="text-sm font-mono">rounded-xs</div>
              </div>
              <div className="bg-card border p-md rounded-sm">
                <div className="text-sm font-mono">rounded-sm</div>
              </div>
              <div className="bg-card border p-md rounded-md">
                <div className="text-sm font-mono">rounded-md</div>
              </div>
              <div className="bg-card border p-md rounded-lg">
                <div className="text-sm font-mono">rounded-lg</div>
              </div>
              <div className="bg-card border p-md rounded-full">
                <div className="text-sm font-mono">rounded-full</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sombras */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Sombras</h2>
          
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Box Shadows</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div className="bg-card p-md rounded-lg shadow-xs">
                <div className="text-sm font-mono">shadow-xs</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-sm">
                <div className="text-sm font-mono">shadow-sm</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-md">
                <div className="text-sm font-mono">shadow-md</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-lg">
                <div className="text-sm font-mono">shadow-lg</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-xl">
                <div className="text-sm font-mono">shadow-xl</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-2xl">
                <div className="text-sm font-mono">shadow-2xl</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-inner">
                <div className="text-sm font-mono">shadow-inner</div>
              </div>
              <div className="bg-card p-md rounded-lg shadow-none">
                <div className="text-sm font-mono">shadow-none</div>
              </div>
            </div>
          </div>
        </section>

        {/* Animações */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Animações</h2>
          
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Animações Disponíveis</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
              <div className="bg-card p-md rounded-lg animate-fade-in">
                <div className="text-sm font-mono">animate-fade-in</div>
              </div>
              <div className="bg-card p-md rounded-lg animate-scale-in">
                <div className="text-sm font-mono">animate-scale-in</div>
              </div>
              <div className="bg-card p-md rounded-lg animate-slide-in-from-top">
                <div className="text-sm font-mono">animate-slide-in-from-top</div>
              </div>
            </div>
          </div>
        </section>

        {/* Exemplos de Componentes */}
        <section className="space-y-lg">
          <h2 className="text-3xl font-display text-foreground">Exemplos de Componentes</h2>
          
          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Botões</h3>
            <div className="flex flex-wrap gap-md">
              <button className="bg-primary text-primary-foreground px-md py-sm rounded-md shadow-sm hover:shadow-md transition-shadow">
                Botão Primário
              </button>
              <button className="bg-secondary text-secondary-foreground px-md py-sm rounded-md shadow-sm hover:shadow-md transition-shadow">
                Botão Secundário
              </button>
              <button className="bg-destructive text-destructive-foreground px-md py-sm rounded-md shadow-sm hover:shadow-md transition-shadow">
                Botão Destrutivo
              </button>
            </div>
          </div>

          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="bg-card text-card-foreground p-lg rounded-lg shadow-md">
                <h3 className="text-xl font-display mb-md">Card com Sombra</h3>
                <p className="text-muted-foreground">Este é um exemplo de card usando os tokens do design system.</p>
              </div>
              <div className="bg-card text-card-foreground p-lg rounded-lg shadow-lg">
                <h3 className="text-xl font-display mb-md">Card com Sombra Grande</h3>
                <p className="text-muted-foreground">Este card usa uma sombra maior para destaque.</p>
              </div>
            </div>
          </div>

          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Progress</h3>
            <div className="space-y-sm">
              <div>
                <div className="text-sm font-body mb-sm">Progresso 25%</div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-1/4 bg-primary transition-all duration-300 ease-in-out"></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-body mb-sm">Progresso 50%</div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-1/2 bg-primary transition-all duration-300 ease-in-out"></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-body mb-sm">Progresso 75%</div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-3/4 bg-primary transition-all duration-300 ease-in-out"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Avatar Group</h3>
            <div className="flex items-center space-x-md">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center ring-2 ring-background">
                  <span className="text-xs font-medium text-primary-foreground">JD</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center ring-2 ring-background -ml-2">
                  <span className="text-xs font-medium text-secondary-foreground">AS</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-success flex items-center justify-center ring-2 ring-background -ml-2">
                  <span className="text-xs font-medium text-success-foreground">MK</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center ring-2 ring-background -ml-2">
                  <span className="text-xs font-medium">+2</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-md">
            <h3 className="text-xl font-body text-foreground">Alert</h3>
            <div className="space-y-sm">
              <div className="relative w-full rounded-lg border p-md bg-background text-foreground">
                <div className="text-sm font-body">Alerta padrão com informações importantes.</div>
              </div>
              <div className="relative w-full rounded-lg border p-md border-success/50 text-success">
                <div className="text-sm font-body">Alerta de sucesso - operação concluída com êxito.</div>
              </div>
              <div className="relative w-full rounded-lg border p-md border-warning/50 text-warning">
                <div className="text-sm font-body">Alerta de aviso - atenção necessária.</div>
              </div>
              <div className="relative w-full rounded-lg border p-md border-destructive/50 text-destructive">
                <div className="text-sm font-body">Alerta de erro - algo deu errado.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
