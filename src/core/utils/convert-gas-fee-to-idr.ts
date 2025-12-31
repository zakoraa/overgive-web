export async function convertGasfeeToIDR() {
  try {
    const res = await fetch(`https://coinyep.com/api/v1/?from=MATIC&to=IDR`);
    const data = await res.json();

    const priceIdr = data?.price ?? 0;

    return priceIdr;
  } catch (e) {
    // console.error("Error convertGasfeeToIDR:", e);
    return 0;
  }
}

export function convertGasFeeWeiToMatic(gasFeeWei: number | bigint) {
  return Number(gasFeeWei) / 1e18;
}

// const POLYGON_CMC_ID = "3890";

// export async function convertGasfeeToIDR() {
//   try {
//     // 1️⃣ Ambil harga MATIC dalam USD
//     const priceRes = await fetch(
//       `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${POLYGON_CMC_ID}&convert=USD`,
//       {
//         headers: {
//           "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY as string,
//           Accept: "application/json",
//         },
//       }
//     );

//     const priceJson = await priceRes.json();

//     const priceUsd =
//       priceJson?.data?.[POLYGON_CMC_ID]?.quote?.USD?.price ?? 0;
// console.log("priceUsd: ", priceJson?.data?.[POLYGON_CMC_ID]?.quote)

//     const usdToIdr = await getUsdToIdrRate();
// console.log("Usd TO IDR: ", usdToIdr)
//     return priceUsd * usdToIdr;
//   } catch (e) {
//     console.error("Error convertGasfeeToIDR:", e);
//     return 0;
//   }
// }

// async function getUsdToIdrRate() {
//   const headers = new Headers();
//   headers.append("apikey", process.env.APILAYER_API_KEY as string);

//   const res = await fetch(
//     "https://api.apilayer.com/exchangerates_data/convert?from=USD&to=IDR&amount=1",
//     { headers }
//   );

//   const json = await res.json();
//   return json?.result ?? 0;
// }
