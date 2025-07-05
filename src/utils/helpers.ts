export const customChartTooltip = (price: number, fixed: number) => {
  return `<div class="bg-main-darker text-white p-2 rounded-lg border border-primary/20">$${Math.fround(
    price,
  ).toFixed(fixed)}</div>`
}
