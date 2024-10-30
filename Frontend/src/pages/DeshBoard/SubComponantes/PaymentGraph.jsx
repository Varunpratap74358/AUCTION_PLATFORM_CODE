import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
)

const PaymentGraph = () => {
  const { loading, monthlyrevenue } = useSelector((store) => store.superAdmin)

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyrevenue,
        backgroundColor: "#D6482B"
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 8000,
        ticks: {
          callback: function(value) {
            return value.toLocaleString() 
          }
        }
      }
    },
    plugins: {
      title: {
        display: true, 
        text: "Monthly Total Payment Received"
      }
    }
  }

  return <Bar data={data} options={options}  />
}

export default PaymentGraph
