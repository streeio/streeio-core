import { Button } from "@streeio-core/ui/components/button";
import { Input } from "@streeio-core/ui/components/input";
import { Label } from "@streeio-core/ui/components/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@streeio-core/ui/components/sheet";
import { useForm } from "@tanstack/react-form";
import { Building2, Calendar, Mail, Phone, User } from "lucide-react";
import { type Client, createClientSchema } from "@/types/client";

interface CreateClientSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (client: Client) => void;
}

export function CreateClientSheet({
  open,
  onOpenChange,
  onCreate,
}: CreateClientSheetProps) {
  const form = useForm({
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      agreementStartDate: "",
      agreementEndDate: "",
    },
    onSubmit: ({ value }) => {
      const newClient: Client = {
        ...value,
        id: crypto.randomUUID(),
        status: "Pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onCreate(newClient);
      form.reset();
      onOpenChange(false);
    },
    validators: {
      onChange: createClientSchema,
    },
  });

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="sm:max-w-xl">
        <div className="">
          <SheetHeader className="mb-8 items-start text-left">
            <SheetTitle className="font-semibold text-2xl text-slate-900 tracking-tight dark:text-slate-50">
              Create Client
            </SheetTitle>
            <SheetDescription className="">
              Enter the details to create a new client record and send an
              activation email.
            </SheetDescription>
          </SheetHeader>

          <div className="overflow-y-auto px-4">
            <form
              className="flex flex-col gap-5 text-sm"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field name="companyName">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      className="text-slate-700 dark:text-slate-300"
                      htmlFor={field.name}
                    >
                      Company Name
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Building2 className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                      </div>
                      <Input
                        className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Acme Corp"
                        value={field.state.value}
                      />
                    </div>
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

              <form.Field name="contactPerson">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      className="text-slate-700 dark:text-slate-300"
                      htmlFor={field.name}
                    >
                      Contact Person Name
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                      </div>
                      <Input
                        className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                        value={field.state.value}
                      />
                    </div>
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

              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      className="text-slate-700 dark:text-slate-300"
                      htmlFor={field.name}
                    >
                      Work Email
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                      </div>
                      <Input
                        className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="john@acme.com"
                        type="email"
                        value={field.state.value}
                      />
                    </div>
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

              <form.Field name="phoneNumber">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      className="text-slate-700 dark:text-slate-300"
                      htmlFor={field.name}
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                      </div>
                      <Input
                        className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="+1 555-0199"
                        type="tel"
                        value={field.state.value}
                      />
                    </div>
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

              <div className="grid grid-cols-2 gap-4">
                <form.Field name="agreementStartDate">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        className="text-slate-700 dark:text-slate-300"
                        htmlFor={field.name}
                      >
                        Start Date
                      </Label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Calendar className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                        </div>
                        <Input
                          className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="date"
                          value={field.state.value}
                        />
                      </div>
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

                <form.Field name="agreementEndDate">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        className="text-slate-700 dark:text-slate-300"
                        htmlFor={field.name}
                      >
                        End Date
                      </Label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Calendar className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
                        </div>
                        <Input
                          className="h-10 rounded-lg border-slate-200 bg-slate-50 pr-4 pl-10 text-slate-900 transition-colors focus-visible:bg-transparent focus-visible:ring-indigo-500/30 dark:border-slate-800/60 dark:bg-[#0c0c0e] dark:text-slate-100 dark:placeholder:text-slate-500"
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="date"
                          value={field.state.value}
                        />
                      </div>
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
              </div>

              <div className="mt-8 flex justify-end gap-3 border-slate-200 border-t pt-6 dark:border-slate-800/60">
                <Button
                  className="h-10 rounded-lg border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => onOpenChange(false)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <form.Subscribe>
                  {(state) => (
                    <Button
                      className="h-10 rounded-lg bg-indigo-600 px-6 font-medium text-white transition-opacity hover:bg-indigo-700 hover:opacity-90 dark:bg-indigo-600"
                      disabled={!state.canSubmit || state.isSubmitting}
                      type="submit"
                    >
                      {state.isSubmitting ? "Creating..." : "Create Client"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
