export async function getTxByHash(txHash: string) {
  const apiKey = process.env.POLYGONSCAN_API_KEY;

  if (!apiKey) {
    throw new Error("POLYGONSCAN_API_KEY belum diset");
  }

  const url =
    `https://api.etherscan.io/v2/api` +
    `?module=proxy` +
    `&action=eth_getTransactionByHash` +
    `&chainid=${80002}` +
    `&txhash=${txHash}` +
    `&apikey=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!json.result) {
    throw new Error("Transaksi tidak ditemukan di blockchain");
  }

  return json.result;
}

export async function getTxReceiptByHash(txHash: string) {
  const apiKey = process.env.POLYGONSCAN_API_KEY;

  if (!apiKey) {
    throw new Error("POLYGONSCAN_API_KEY belum diset");
  }

  const url =
    `https://api.etherscan.io/v2/api` +
    `?module=proxy` +
    `&action=eth_getTransactionReceipt` +
    `&chainid=80002` +
    `&txhash=${txHash}` +
    `&apikey=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!json?.result) {
    throw new Error("TX receipt tidak ditemukan");
  }

  return json.result as {
    gasUsed: string;
    effectiveGasPrice: string;
  };
}
