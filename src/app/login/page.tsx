import LoginForm from "@/modules/auth/pages/login";
import AuthLayout from "../../core/layout/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
