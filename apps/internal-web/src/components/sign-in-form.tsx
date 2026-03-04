"use client";

import { Button } from "@streeio-core/ui/components/button";
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
            router.push("/");
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
                    Email
                  </Label>
                  <Input
                    className="h-12 bg-white px-4 text-base shadow-sm transition-colors file:border-0 focus-visible:ring-1 focus-visible:ring-indigo-500"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="example@gmail.com"
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
                    placeholder="••••••••"
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
              <div />
              {/* <form.Field name="rememberMe">
                {(field) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.state.value}
                      id={field.name}
                      onCheckedChange={(checked) =>
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
              </form.Field> */}
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
      </div>
      <div className="text-center text-muted-foreground text-sm">
        New here?{" "}
        <Link
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-400"
          href={"/signup"}
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
