import LoginForm from "@/modules/auth/login";
import AuthLayout from "../../layout/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
