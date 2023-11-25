import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  Colors
);

export const LineChart = () => {



    const labels = getLastYearMonths();
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Yearly Views',
          },
        },
      };
            
       const data = {
        labels,
        datasets: [
          {
            label: 'Views',
            data: [1, 2, 3, 4],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };



  return <Line options={options} data={data} />;
};



export const DoughnutChart = () => {
 const data = {
        labels: ['Subscribed', 'Not Subscribed'],
        datasets: [
          {
            label: 'Number of users',
            data: [3, 20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

   
      return <Doughnut data={data}/>
      
};


function getLastYearMonths(){
  const labels = [];

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]

const currentMonth = new Date().getMonth();

const remainNummberOfMonths = 11 - currentMonth;

for (let i = currentMonth; i < months.length; i--) {
  const element = months[i];
  labels.unshift(element)
  if(i===0) break; //because otherwise i will in negative value and loop never ends
}

console.log(labels)

for (let i = 11; i > remainNummberOfMonths; i--) {
  if(i===currentMonth) break

  const element = months[i];
  labels.unshift(element)

  
}

console.log(labels)

return labels

}

