import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Brain, CheckSquare, Gift, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Mindsy</h1>
                <p className="text-xl text-muted-foreground">Gamificação de tarefas para pessoas com TDAH</p>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transforme suas tarefas diárias em uma jornada divertida. Ganhe pontos, suba de nível e resgate
                recompensas enquanto mantém o foco no que importa.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link to="/register">
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">Já tenho uma conta</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 flex items-center justify-center">
              <div className="rounded-xl bg-gradient-to-b from-primary/20 to-primary/5 p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-background p-4 text-center shadow">
                    <CheckSquare className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold">Organize Tarefas</h3>
                    <p className="text-sm text-muted-foreground">Crie e gerencie suas tarefas diárias</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-background p-4 text-center shadow">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold">Ganhe XP</h3>
                    <p className="text-sm text-muted-foreground">Complete tarefas e suba de nível</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-background p-4 text-center shadow">
                    <Gift className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold">Recompensas</h3>
                    <p className="text-sm text-muted-foreground">Resgate prêmios com seus pontos</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-background p-4 text-center shadow">
                    <Brain className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold">Foco TDAH</h3>
                    <p className="text-sm text-muted-foreground">Projetado para neurodiversidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como funciona</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Mindsy transforma suas tarefas diárias em uma experiência gamificada, ajudando você a manter o foco e a
                motivação.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold">Crie suas tarefas</h3>
              <p className="text-muted-foreground">
                Adicione tarefas com diferentes níveis de dificuldade e categorias. Defina prazos para manter-se
                organizado.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold">Complete e ganhe pontos</h3>
              <p className="text-muted-foreground">
                Ao concluir tarefas, você ganha XP para subir de nível e pontos para trocar por recompensas.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold">Resgate recompensas</h3>
              <p className="text-muted-foreground">
                Use seus pontos para resgatar recompensas que você mesmo definiu, criando um ciclo de motivação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pronto para começar?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Crie sua conta agora e comece a transformar sua produtividade.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link to="/register">
                  Criar conta gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 