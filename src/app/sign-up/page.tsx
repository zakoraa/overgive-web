import AuthLayout from "../../core/layout/auth-layout";
import SignUpForm from "@/modules/auth/pages/sign_up";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
