/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/context/Context'
import Graphic from '../components/Graphic/Graphic'
import Table from '../components/Table/Table'
import './styles.css'

export default function Cities(): JSX.Element{
    const [valueData, setValueData] = useState([])
    const [cityValue, setCityValue] = useState("1200013")
    const [cityLabel, setCityLabel] = useState("")

    const {
        getCurrentState,
        getCurrentCity,
        setCurrentState,
        setCurrentCity,
        getStatesList,
        getCitiesList
    } = useContext(Context)

    const getData = async (valueCity:string) => {
        var valuesAux:any = []
        let url = `http://api.sidra.ibge.gov.br/values/t/6579/n6/${valueCity}/p/2011-2020`
        return await fetch(url)
                        .then(res => res.json())
                        .then(data =>{
                            data.forEach((value:any) => {
                                valuesAux = [...valuesAux,value.V]
                            })
                            valuesAux.splice(0,1)
                        return [
                            valuesAux.map((a:string)=>parseInt(a,10)),
                            data[1].D1N
                            ]
                        })
    }
    const setValues = async (city:string) => {
        var [arrayValue,label] = await getData(city)
        setValueData(arrayValue)
        setCityLabel(label)
    }

    const getCity = async (id:string) => {
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        return await fetch(url)
                        .then(res => res.json())
                        .then(data =>{
                            data.sort((a:any,b:any) => a.nome.localeCompare(b.nome))
                            return [data[0].id,data[0].nome]
                        })
    }
    const currentCity = async (id:string) =>{
        var [arrayValue,label] = await getCity(id)
        setCityValue(arrayValue)
        setCityLabel(label)
    }

    useEffect(() => {
        setCurrentState("12")
    },[])
    
    useEffect(() => {
        setValues(cityValue)
    }, [cityValue])
    
    return(
        <div className="wrapper">
            <div className="selects">
                    <select 
                        value={getCurrentState()} 
                        onChange={event => {
                            setCurrentState(event.target.value)
                            currentCity(event.target.value)

                        }}
                        >
                        {getStatesList().map((a) => (
                            <option key={a.id} value={a.id}>{a.sigla} - {a.nome}</option>
                        ))}

                    </select>

                    <select 
                        value={getCurrentCity()} 
                        onChange={event => {
                            setCurrentCity(event.target.value)
                            setCityValue(event.target.value)
                        }}
                        >
                        
                        {getCitiesList().map((a) =>(
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}

                    </select>
            </div>
            <Graphic name={cityLabel} data={valueData}></Graphic>
            <Table name={cityLabel} data={valueData}></Table>
        </div>
    )
}