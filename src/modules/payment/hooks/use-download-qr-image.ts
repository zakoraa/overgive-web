"use client";

interface DownloadQrOptions {
  size?: number; // px, misal 300, 512, 1024
  filename?: string;
}

export function useDownloadQrImage() {
  const downloadQr = async (
    qrImage: string,
    options?: DownloadQrOptions
  ) => {
    const {
      size = 512,
      filename = "overgive-qris.png",
    } = options || {};

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.src = qrImage.startsWith("data:image")
        ? qrImage
        : `${qrImage}`;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // JANGAN smoothing biar QR tetap tajam
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(img, 0, 0, size, size);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh QR image", error);
    }
  };

  return { downloadQr };
}
