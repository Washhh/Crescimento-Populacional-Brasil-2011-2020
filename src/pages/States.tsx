/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/context/Context'
import Graphic from '../components/Graphic/Graphic'
import Table from '../components/Table/Table'
import './styles.css'

export default function States(): JSX.Element{
    const [valueData, setValueData] = useState([])
    const [stateValue, setStateValue] = useState("12")
    const [stateLabel, setStateLabel] = useState("Acre")
    const {
        getCurrentState,
        setCurrentState,
        getStatesList,
      } = useContext(Context)
      
      const getData = async (value:string) => {
        var valuesAux:any = []
        let url = `http://api.sidra.ibge.gov.br/values/t/6579/n3/${value}/p/2011-2020`
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
    const setValues = async (string:string) => {
        var [arrayValue,label] = await getData(string)
        setValueData(arrayValue)
        setStateLabel(label)
    }

    useEffect(() => {
        setCurrentState("12")
    },[])

    useEffect(() => {
        setValues(stateValue)
    }, [stateValue])

    return(
        <div className="wrapper">
            <div className="selects">
                    <select
                        id = "statesValue" 
                        value={getCurrentState()} 
                        onChange={event => {
                            setCurrentState(event.target.value)
                            setStateValue(event.target.value)
                        }}
                        >
                        {getStatesList().map((a) => (
                            <option key={a.id} value={a.id}>{a.sigla} - {a.nome}</option>
                        ))}

                    </select>
            </div>
            <Graphic name={stateLabel} data={valueData}></Graphic>
            <Table name={stateLabel} data={valueData}></Table>
        </div>
    )
}