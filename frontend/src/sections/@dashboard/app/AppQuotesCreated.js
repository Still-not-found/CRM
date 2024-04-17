import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, colors } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppQuotesCreated.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppQuotesCreated({ title, subheader, chartLabels, chartData, ...other }) {

    const colors= ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'];

    const series=[{
        data: chartData,
      }];
    
    const options={
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: '45%',
            distributed: true,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: chartLabels,
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={series} options={options} height={355} />
      </Box>
    </Card>
  );
}
