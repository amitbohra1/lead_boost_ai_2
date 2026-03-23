"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface BidData {
  date: string;
  bid: number;
}

interface Props {
  data: BidData[];
}

export default function BidChart({ data }: Props) {
  const categories = data.map((item) => item.date);
  const seriesData = data.map((item) => item.bid);

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      height: 400,
    },
    title: {
      text: undefined,
    },
     credits: { enabled: false },
    xAxis: {
      categories,
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Bid Value",
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: "$",
    },
    series: [
      {
        type: "line",
        name: "Bids",
        data: seriesData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}