import QRCode from 'react-qr-code'

export default function InvoicePopup({ qrString }: { qrString: string }) {
  return (
    <div className="flex flex-col items-center p-6">
      <QRCode value={qrString} size={200} />
      <p className="text-sm text-center mt-2 text-gray-500">
        Scan with any QRIS-compatible app to complete your payment.
      </p>
    </div>
  )
}