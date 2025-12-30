import { Categories } from "@/modules/categories";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Categories />
    </Suspense>
  );
}
