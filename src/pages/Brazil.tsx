/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Graphic from '../components/Graphic/Graphic'
import Table from '../components/Table/Table'
import './styles.css'

export default function Brazil(): JSX.Element{
    const [valueData , setValueData] = useState([])
    const getData = async () => {
        var valuesAux:any = []
        let url = 'http://api.sidra.ibge.gov.br/values/t/6579/n1/1/p/2011-2020'
        return await fetch(url)
                        .then(res => res.json())
                        .then(data =>{
                            data.forEach((value:any) => {
                                valuesAux = [...valuesAux,value.V]
                            })
                            valuesAux.splice(0,1)
                        return valuesAux.map((a:string)=>parseInt(a,10))
                        })
    }
    const setValues = async () => {
        setValueData(await getData())
    }

    useEffect(() => {
        setValues()
    },[])

    useEffect(() => {
    }, [valueData])

    return(
        <div className="wrapper">
            <Graphic name="Brasil" data={valueData}></Graphic>
            <Table name="Brasil" data={valueData}></Table>
        </div>
    )
}