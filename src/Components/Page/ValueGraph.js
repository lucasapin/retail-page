import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const ValueGraph = (props) => {
  const { groupedTransactions } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    const transactionsData = groupedTransactions;

    const labelsData = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];

    const valuesData = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    transactionsData.map((transaction) => {
      let i = 0;
      for (i; i < labelsData.length; i++) {
        if (labelsData[i] === format(new Date(transaction.date), "HH:00")) {
          valuesData[i] = transaction.value;
        }
      }
    });

    setState({
      labels: [...labelsData],
      datasets: [
        {
          label: "Total Transaction Value for the hour",
          data: [...valuesData],
          backgroundColor: ["rgba(60,179,113, 0.2)"],
          borderColor: ["rgba(60,179,113, 1)"],
          borderWidth: 1,
          tension: 0.4,
          yAxisID: "y",
          type: "bar",
        },
      ],
      height: "300px",
      width: "400px",
    });
  }, [groupedTransactions]);

  return (
    <Line
      data={state}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            type: "linear",
            position: "left",
            ticks: {
              callback: function (value, index, values) {
                return `$${value}`;
              },
            },
          },
        },
      }}
    ></Line>
  );
};

export default ValueGraph;
