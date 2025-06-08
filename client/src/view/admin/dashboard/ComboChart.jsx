import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { formatDate } from '@lib/helper';
import { Cardz } from '@components/core';

export const ComboChart = ({ data = [], categories }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const arr = [
      documentStyle.getPropertyValue('--orange-500'),
      documentStyle.getPropertyValue('--red-500'),
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--green-500')
    ];
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const dataz = {
      labels: data.map((d) => formatDate(d.date, 'date')),
      datasets: categories?.map((c, index) => ({
        type: 'line',
        label: c.name,
        borderColor: arr[index],
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        data: data.map((d) => d[c._id] || 0)
      }))
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
