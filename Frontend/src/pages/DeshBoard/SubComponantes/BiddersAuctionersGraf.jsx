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
import { Line } from 'react-chartjs-2'
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

const BiddersAuctionersGraf = () => {
  const {totalBidders,totalAucteners} = useSelector(state=>state.superAdmin)
  const data={
    labels: [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ],
    datasets:[
      {
        label:"Number of Bidders",
        data: totalBidders,
        borderColor:'#D64b28',
        fill:false
      },
      {
        label:"Number of Auctners",
        data: totalAucteners,
        borderColor:'#D5522845',
        fill:false
      },
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
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
        text: "Number of Bidders and Auctners Registered"
      }
    }
  }


  return <Line data={data} options={options} />
}

export default BiddersAuctionersGraf
