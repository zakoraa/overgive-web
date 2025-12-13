import PaymentPage from "@/modules/payment";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const { id } = resolved;

  return <PaymentPage id={id} />;
}
