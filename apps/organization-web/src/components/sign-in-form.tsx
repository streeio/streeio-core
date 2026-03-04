"use client";

import { Button } from "@streeio-core/ui/components/button";
import { Checkbox } from "@streeio-core/ui/components/checkbox";
import { Input } from "@streeio-core/ui/components/input";
import { Label } from "@streeio-core/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          // rememberMe: value.rememberMe, // Enable when supported/needed
        },
        {
          onSuccess: () => {
            const channel = new BroadcastChannel("auth_channel");
            channel.postMessage("login");
            channel.close();
            router.push("/dashboard");
            toast.success("Welcome back!");
          },
          onError: (error) => {
            toast.error(error.error.message || "Failed to sign in");
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
        rememberMe: z.boolean(),
      }),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-bold text-3xl text-gray-900 tracking-tight dark:text-gray-100">
          Login to your account
        </h1>
        <p className="text-balance text-muted-foreground text-sm">
          Welcome back! Enter your details to log in to your account
        </p>
      </div>

      <div className="grid gap-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          suppressHydrationWarning
        >
          <div className="space-y-4">
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    className="font-normal text-muted-foreground"
                    htmlFor={field.name}
                  >
                    Everyday Email
                  </Label>
                  <Input
                    className="h-12 bg-white px-4 text-base shadow-sm transition-colors file:border-0 focus-visible:ring-1 focus-visible:ring-indigo-500"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    value={field.state.value}
                  />
                  {field.state.meta.errors ? (
                    <em className="font-medium text-red-500 text-sm">
                      {field.state.meta.errors
                        .map((error) => error?.message || error)
                        .join(", ")}
                    </em>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    className="font-normal text-muted-foreground"
                    htmlFor={field.name}
                  >
                    Password
                  </Label>
                  <Input
                    className="h-12 bg-white px-4 text-base shadow-sm transition-colors file:border-0 focus-visible:ring-1 focus-visible:ring-indigo-500"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your Password"
                    type="password"
                    value={field.state.value}
                  />
                  {field.state.meta.errors ? (
                    <em className="font-medium text-red-500 text-sm">
                      {field.state.meta.errors
                        .map((error) => error?.message || error)
                        .join(", ")}
                    </em>
                  ) : null}
                </div>
              )}
            </form.Field>

            <div className="flex items-center justify-between">
              <form.Field name="rememberMe">
                {(field) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.state.value}
                      id={field.name}
                      onCheckedChange={(checked: boolean | "indeterminate") =>
                        field.handleChange(!!checked)
                      }
                    />
                    <label
                      className="font-medium text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor={field.name}
                    >
                      Remember login
                    </label>
                  </div>
                )}
              </form.Field>
              <Button
                className="px-0 font-normal text-indigo-600 hover:text-indigo-800"
                size="sm"
                type="button"
                variant="link"
              >
                Forget Password?
              </Button>
            </div>
          </div>

          <form.Subscribe>
            {(state) => (
              <Button
                className="h-12 w-full rounded-full bg-indigo-700 font-medium text-base text-white shadow-lg transition-all duration-300 hover:bg-indigo-800 hover:shadow-xl"
                disabled={!state.canSubmit || state.isSubmitting || isPending}
                type="submit"
              >
                {(state.isSubmitting || isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-zinc-200 border-t dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-950">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-0 bg-zinc-100 font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={() => toast.info("Social login not yet configured")}
            type="button"
            variant="secondary"
          >
            <AppleIcon className="h-5 w-5" />
            Sign in with Apple
          </Button>

          <Button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-0 bg-zinc-100 font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={() => toast.info("Social login not yet configured")}
            type="button"
            variant="secondary"
          >
            <GoogleIcon className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="text-center text-muted-foreground text-sm">
        New here?{" "}
        <Link
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-400"
          // biome-ignore lint/suspicious/noExplicitAny: Temporary fix for typed routes
          href={"/signup" as any}
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <title>Sign in with Apple</title>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.29-.93 3.93-.93 1.16.02 2.58.59 3.23 1.51-3.26 1.88-2.6 7 1.76 8.57-.42 1.54-1.12 3-2.06 4.67-.92 1.6-1.92 1.64-1.94 1.64zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Sign in with Google</title>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
