import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5, // 0.5 MB = 500 KB
    maxWidthOrHeight: 2000, // optionally resize
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(file, options);

  return new File([compressedBlob], file.name, {
    type: compressedBlob.type,
  });
}