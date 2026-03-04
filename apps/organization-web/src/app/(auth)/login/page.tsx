import AuthLayout from "@/components/auth-layout";
import SignInForm from "@/components/sign-in-form";

export default function LoginPage() {
  return (
    <AuthLayout title="Proptech">
      <SignInForm />
    </AuthLayout>
  );
}
