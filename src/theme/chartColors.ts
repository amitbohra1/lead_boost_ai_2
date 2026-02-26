export function getChartColors(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      chart1: "oklch(0.65 0.24 263)",
      chart2: "oklch(0.70 0.20 220)",
      chart3: "oklch(0.75 0.18 180)",
      chart4: "oklch(0.80 0.15 140)",
      chart5: "oklch(0.68 0.22 300)",
      textColor: "oklch(0.98 0 0)",
      gridColor: "oklch(0.24 0.02 263)",
      backgroundColor: "oklch(0.17 0.01 263)",
    }
  }

  return {
    chart1: "oklch(0.55 0.22 263)",
    chart2: "oklch(0.65 0.18 220)",
    chart3: "oklch(0.70 0.15 180)",
    chart4: "oklch(0.75 0.12 140)",
    chart5: "oklch(0.60 0.20 300)",
    textColor: "oklch(0.15 0 0)",
    gridColor: "oklch(0.90 0.005 263)",
    backgroundColor: "oklch(1 0 0)",
  }
}
