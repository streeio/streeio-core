import { Button } from "@streeio-core/ui/components/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex h-full min-h-screen flex-col justify-between bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Steerio</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button size="sm" variant="ghost">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden py-24 text-center lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="fade-in slide-in-from-bottom-8 container mx-auto animate-in px-4 duration-700">
          <div className="mx-auto mb-4 flex w-fit items-center justify-center rounded-full border bg-background px-4 py-1.5 font-medium text-sm shadow-sm transition-colors hover:bg-accent/50">
            <span className="flex items-center gap-1">
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              v1.0 is now in dev
            </span>
          </div>

          <h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Property Management <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-primary text-transparent">
              Reimagined
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            Streamline your portfolio with our all-in-one platform. Automate
            rent collection, maintenance requests, and tenant screening with
            ease.
          </p>

          {/* <div className="mt-8 flex justify-center gap-4">
            <Link href="/signup">
              <Button className="h-12 px-8 text-base" size="lg">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span className="text-primary">Steerio</span>
            </div>
            <div className="flex gap-8 text-muted-foreground text-sm">
              <Link className="hover:text-foreground" href="#">
                Terms
              </Link>
              <Link className="hover:text-foreground" href="#">
                Privacy
              </Link>
              <Link className="hover:text-foreground" href="#">
                Cookies
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Steerio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
