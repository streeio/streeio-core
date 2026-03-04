"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AuthLayout({
  children,
  title = "Proptech",
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background">
      {/* Left Panel - Image/Branding */}
      <div className="relative hidden flex-col justify-between bg-zinc-900 p-12 text-white lg:flex lg:w-1/2">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            alt="Abstract botanical art"
            className="object-cover opacity-90"
            fill
            priority
            src="/auth-sidebar.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <title>Logo</title>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-white text-xl tracking-tight">
              {title}
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-2">
            <p className="font-medium text-lg leading-relaxed">
              &ldquo;This platform has completely transformed how we manage our
              properties. The insights and automation are unmatched.&rdquo;
            </p>
            <footer className="text-sm text-zinc-300">
              Thameem M, Property Manager
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="relative flex w-full flex-col justify-center bg-white px-4 sm:px-6 lg:w-1/2 lg:px-8 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <title>Logo</title>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-xl">{title}</span>
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
        <p className="absolute bottom-4 left-0 w-full text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} {title}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
