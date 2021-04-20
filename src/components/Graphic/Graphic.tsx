import React, { useEffect} from 'react'
import './styles.css'
import Chart from 'chart.js/auto';

interface propsData{
  data:number[],
  name:string
}

var myChart:any

export default function Graphic(props:propsData): JSX.Element{
    
    const labels = [
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
      ];

      const data = {
        labels: labels,
        datasets: [{
          label: `${props.name} 2011-2020`,
          backgroundColor: '#4299E1',
          borderColor: '#4299E1',
          data: [0],
        }]
      };

      const config = {
        type: 'line',
        data,
        options: {
          responsive:true,
          plugins: [{
            datalabels: {

              font: function(context:any) {
                var width = context.chart.width;
                var size = Math.round(width / 32);
                  return {
                    size: size,
                    weight: 600
                  };
                }
            }
        }]
        }  
      };

    // useEffect(() => {

    //     myChart = new Chart(
    //     document.getElementById('myChart'),
    //     config)

    // },[])

    useEffect(() => {
      data.datasets[0].data = [...props.data]

      if(myChart){
        myChart.destroy()
      }
      
      myChart = new Chart(
        document.getElementById('myChart'),
        config)

    }, )

    return(
        <div className="graphicContent">
            <canvas id="myChart"></canvas>
        </div>
    )
}
