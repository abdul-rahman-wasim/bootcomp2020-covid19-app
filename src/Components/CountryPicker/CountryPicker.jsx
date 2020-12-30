import React,{useState,useEffect} from 'react'
import {NativeSelect,FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';

import {countryData} from '../../Api';


const CountryPicker = ({handleCountryChange}) => {

    const [fetchCountries,setFetchCountries] =useState([]);  


    useEffect(() => {
        const countryName = async ()=>{
            setFetchCountries(await countryData());
    
        }
        countryName();
    
    }, [setFetchCountries])
    
    return (
       <FormControl className={styles.FormControl}>
           <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value )}>
               <option value="">Global</option>
               {fetchCountries.map((country,ind)=>(
                   <option key={ind} value={country}>{country}</option>
               )
               )}
           </NativeSelect>
       </FormControl>
    )
}

export default CountryPicker
