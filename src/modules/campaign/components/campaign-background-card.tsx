import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";

export const CampaignBackgroundCard = () => {
  return (
    <Card className="space-y-3 px-5 py-5 text-sm">
      <Title text="Latar Belakang" />

      <p>
        Kampanye ini lahir dari kepedulian terhadap mereka yang sedang berjuang
        menghadapi kondisi yang tidak mudah. Banyak dari mereka membutuhkan
        uluran tangan, namun sering kali tidak memiliki tempat untuk bersandar.
      </p>

      <p>
        Dalam perjalanan kami melihat langsung bagaimana satu bantuan kecil
        mampu mengubah hari seseorang. Dari sanalah keinginan untuk membuka
        penggalangan dana ini muncul—sebagai jembatan antara niat baik dan
        mereka yang membutuhkan.
      </p>

      <p>
        Kami percaya bahwa setiap orang layak mendapatkan kesempatan untuk
        bangkit, dan setiap donasi, sekecil apa pun, dapat menjadi titik awal
        perubahan besar. Harapan itulah yang mendorong kami untuk memulai
        kampanye ini.
      </p>

      <p>
        Semoga melalui inisiatif ini, semakin banyak tangan yang tergerak untuk
        membantu, dan semakin banyak hati yang merasa tidak sendirian dalam
        perjuangannya. Karena kebaikan selalu menemukan jalannya ketika kita
        melangkah bersama.
      </p>
    </Card>
  );
};
