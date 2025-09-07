import React from "react";
import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";

const Chart = () => {
  const { watchlist } = useSelector((store) => store.data);
  const chartData = watchlist?.map((token) => ({
    id: token.id,
    value: token.value,
    label: `${token.name} (${token.symbol.toUpperCase()})`,
  }));

  return (
    chartData.length > 0 && (
      <PieChart
        hideLegend
        sx={{
          "& .MuiChartsLegend-label": {
            color: "white",
          },
        }}
        series={[
          {
            data: chartData,
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 2,
          },
        ]}
        width={200}
        height={300}
      />
    )
  );
};

export default Chart;
