const priceFormatter = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  maximumFractionDigits: 2,
});

/** Formatează un preț în lei, ex. 5499.99 -> "5.499,99 RON". */
export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

/** Inițialele unui produs, folosite pe placeholderul de imagine. */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
