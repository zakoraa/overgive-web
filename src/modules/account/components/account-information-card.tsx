"use client";

import { Label } from "@/core/components/text/label";
import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import CircularLoading from "@/core/components/ui/circular-loading";
import { Line } from "@/core/components/ui/line";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";

const ACCOUNT_INFO_ITEMS = [
  { label: "Email", key: "email" },
  { label: "Nama Lengkap", key: "fullName" },
] as const;

export const AccountInformationCard = () => {
  const { user, loading } = useGetCurrentUserContext();
  return (
    <Card className="space-y-2 p-5 text-start">
      <Title text="Informasi Akun" className="text-start" />
      <Line />
      {loading ? (
        <CircularLoading />
      ) : (
        <div className="space-y-3">
          {ACCOUNT_INFO_ITEMS.map((item) => (
            <div key={item.key}>
              <Label text={item.label} />
              <p>{user?.[item.key] ?? "-"}</p>
            </div>
          ))}
        </div>
      )}{" "}
    </Card>
  );
};
