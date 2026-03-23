export function getChartColors(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      chart1: "#4264FF",
      chart2: "#00A7E6",
      chart3: "#00C7B2",
      chart4: "#59D84F",
      chart5: "#C04CFF",
      textColor: "#FAFAFA",
      gridColor: "#2B2F3F",
      backgroundColor: "#16181F",
    };
  }

  return {
    chart1: "#304FEA",
    chart2: "#0092C9",
    chart3: "#00B09D",
    chart4: "#45C23E",
    chart5: "#A33DF2",
    textColor: "#262626",
    gridColor: "#E6E6E8",
    backgroundColor: "#FFFFFF",
  };
}
