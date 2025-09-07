import { SparkLineChart } from '@mui/x-charts/SparkLineChart';


export default function SparklineCharts({value, chartColor}) {
    const values = value.price
  return (
    <SparkLineChart color = {chartColor} data={values} height={50} width={100}/>
  );
}
