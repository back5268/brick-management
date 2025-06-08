import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { formatDate } from '@lib/helper';
import { Cardz } from '@components/core';
import { themeColor } from '@theme';

export const ComboChart = ({ data = [], isLoading }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const dataz = {
      labels: [],
      datasets: []
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    setChartData(dataz);
    setChartOptions(options);
  }, [JSON.stringify(data)]);

  return (
    <Cardz className="w-full h-full py-8">
      <h2 className="font-bold uppercase leading-normal mb-4 text-primary">Báo cáo số lượng sản phẩm trong kho</h2>
      <hr className="mb-4" />
      <Chart type="line" data={chartData} options={chartOptions} />
    </Cardz>
  );
};
