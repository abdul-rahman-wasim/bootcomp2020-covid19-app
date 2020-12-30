import React from 'react';

import {Cards,Charts,CountryPicker} from './Components';
//import CountryPicker from './Components/CountryPicker/CountryPicker';

import coronaImg from './images/covid.png';
import styles from './App.module.css';
import {fetchData} from './Api';


class App extends React.Component{

state={
    data:{},
    countryName:'',
}

   async componentDidMount(){
    const coronaData = await fetchData();
     this.setState({data:coronaData});

    }


    handleCountryChange = async (country) =>{
        
    const coronaData = await fetchData(country);
    this.setState({ data:coronaData, countryName:country});
    

    }


    render(){

        const {data,countryName}=this.state;
            
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImg}></img>
              <Cards data={data}/>
          <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Charts data={data} countryName={countryName}/>
            </div>
        )
    }
}


export default App