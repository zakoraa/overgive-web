import PaymentPage from "@/modules/payment";

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const resolved = await params;
  const { orderId } = resolved;

  return <PaymentPage orderId={orderId} />;
}
