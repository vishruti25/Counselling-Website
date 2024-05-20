import React from 'react'
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function Field1() {

    const labels =['2019','2020','2021','2022','2023','2024'];

    const data={
        labels:labels,
        datasets:[
            {
                label:" No. of Student Every Year ",
                backgroundColor:"rgb(255,99,132)",
                borderColor:"rgb(25,99,132)",
                data:[10,30,2,15,40,50,60]


            }
        ]
    }



  return (
    <div className='bg-white border border-secondary'>
        <Pie data={data} ></Pie>
    </div>
  )
}

export default Field1