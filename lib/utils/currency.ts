"use server";

export async function getLiveExchangeRate(): Promise<number> {
  const FALLBACK_RATE = 305;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch exchange rate, status: ${res.status}`);
      return FALLBACK_RATE;
    }

    const data = await res.json();
    
    if (data?.rates?.LKR) {
      return data.rates.LKR;
    }

    console.error("Invalid exchange rate data format");
    return FALLBACK_RATE;
  } catch (error) {
    console.error("Error fetching live exchange rate:", error);
    return FALLBACK_RATE;
  }
}
