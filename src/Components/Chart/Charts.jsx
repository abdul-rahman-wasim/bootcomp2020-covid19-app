import React, {useState,useEffect} from 'react'
import {fetchDailyData} from '../../Api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Charts.module.css';


const Charts = ({data:{confirmed,recovered,deaths},countryName}) => { 
    
  const [dailyData,setDailyData]=useState([]);
  
  useEffect(() => {
      const fetchApi = async ()=>{
            setDailyData(await fetchDailyData());
      }
      fetchApi();
  },[])
  


  const barChart=(
     confirmed ? 
     (<Bar
     data = {{
         labels:['Infected','Recovered','Deaths'],
         datasets:[{
            label:'People',
            backgroundColor:['blue','green','red'],
           data: [confirmed.value,recovered.value,deaths.value]
         }]
     }}
     options={{
         legend:{display:false},
         title:{display:true, text:`Current State in ${countryName}`},
     }}
     />)
     :null
  );

  const lineChart=(
     dailyData.length
     ? (<Line 
      data={{
        labels: dailyData.map(({date})=>date),
        datasets:[{
            data:dailyData.map(({confirmed})=>confirmed),
            label:'Infected',
            borderColor: 'rgba(0,0, 255, 0.5)',
            fill:true,
       
        },{
            data:dailyData.map(({deaths})=>deaths),
            label:'Deaths',
            borderColor:'red',
            backgroundColor:'rgba(255,0, 0, 0.5)',
            fill:true,
        
        }],

      }}
      />):null

  );

    return (
        <div className={styles.container}>
           {countryName ? barChart: lineChart}
        </div>
    )
}

export default Charts
