import AuthLayout from "../../layout/auth-layout";
import SignUpForm from "@/modules/auth/sign_up";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm/>
    </AuthLayout>
  );
}
