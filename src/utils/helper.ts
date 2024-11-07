export const formattedCurrency = (amount: number | undefined | null) => {
    if (amount == null) {
        return "Not Specified";
      }
      return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}
