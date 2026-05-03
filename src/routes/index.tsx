import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Users, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — The simple way to ship faster" },
      {
        name: "description",
        content:
          "Lumen helps modern teams plan, build, and ship software with less friction. Start free in minutes.",
      },
      { property: "og:title", content: "Lumen — The simple way to ship faster" },
      {
        property: "og:description",
        content:
          "Lumen helps modern teams plan, build, and ship software with less friction. Start free in minutes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-foreground" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Lumen</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-sm">
            Sign in
          </Button>
          <Button size="sm" className="text-sm">
            Get started
          </Button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            New — Lumen v1.0 is here
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            The simple way to ship faster
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Lumen helps modern teams plan, build, and release software with less
            friction — so you can focus on the work that matters.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Get started free
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              See how it works
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · Free for small teams
          </p>
        </div>

        {/* Mockup placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
            <div className="rounded-xl border border-border/60 bg-muted/40">
              <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="grid gap-4 p-8 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-lg border border-border/60 bg-background p-4"
                  >
                    <div className="h-2 w-1/2 rounded bg-muted" />
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-3/4 rounded bg-muted" />
                    <div className="flex items-center gap-2 pt-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="h-2 w-1/3 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: "Fast setup",
    description:
      "Get up and running in minutes with sensible defaults and zero configuration.",
  },
  {
    icon: Users,
    title: "Built for teams",
    description:
      "Real-time collaboration, shared workspaces, and roles that scale with you.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    description:
      "Your data stays yours. Encrypted in transit and at rest, always.",
  },
];

function Features() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A focused set of tools designed to stay out of your way.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="rounded-2xl border border-border bg-muted/40 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Join thousands of teams already shipping faster with Lumen.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg">
              Get started free
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-foreground" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">Lumen</span>
          <span className="ml-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
