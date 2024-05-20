import React from 'react'
import { Chart } from 'chart.js/auto';
import { Line} from 'react-chartjs-2';

function Field2() {

    const labels =['2019','2020','2021','2022','2023','2024'];

    const data={
        labels:labels,
        datasets:[
            {
                label:" No. of Student Every Year ",
                backgroundColor:"rgb(255,99,132)",
                borderColor:"rgb(255,99,132)",
                data:[10,30,20,15,40,50,60]


            }
        ]
    }



  return (
    <div className='bg-white border border-secondary'>
        <Line data={data} ></Line>
    </div>
  )
}

export default Field2