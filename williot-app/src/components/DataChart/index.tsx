import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export interface DataChartProps {
  options: Object;
};

export const DataChart = ({options} : DataChartProps):JSX.Element => {
  return (
    <HighchartsReact
      allowChartUpdate
      highcharts={Highcharts}
      options={options}
    />
  )
};