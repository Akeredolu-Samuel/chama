// Injective Testnet REST API (no SDK dependency)
const REST_ENDPOINT = 'https://testnet.sentry.lcd.injective.network';

export async function getBalance(address: string, denom = 'inj'): Promise<string> {
  try {
    const res = await fetch(`${REST_ENDPOINT}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`);
    const data = await res.json();
    const raw = BigInt(data?.balance?.amount ?? '0');
    // INJ has 18 decimals
    const formatted = Number(raw) / 1e18;
    return formatted.toFixed(2);
  } catch {
    return '0.00';
  }
}
