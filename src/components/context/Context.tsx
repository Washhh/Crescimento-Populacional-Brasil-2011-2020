/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface ContextProviderProps{
    children:ReactNode
}

interface ContextData{
    getCurrentState: () => string,
    getCurrentCity: () => string,
    setCurrentState: (param:string) => void,
    setCurrentCity: (param:string) => void,
    getStatesList: () => any[],
    getCitiesList: () => any[]
}

export const Context = createContext({} as ContextData)

export function ContextProvider({
    children,
}:ContextProviderProps):JSX.Element{

    const [state, setState] = useState('AC')
    const [city, setCity] = useState('')
    const [statesList, setStatesList] = useState<any[]>([])
    const [citiesList, setCitiesList] = useState<any[]>([])

    const getStates = async () =>{
        let url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.sort((a:any,b:any) => a.nome.localeCompare(b.nome))
                setStatesList([...data])
            })
    }

    const getCities = async (id:string) =>{
        
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.sort((a:any,b:any) => a.nome.localeCompare(b.nome))
                setCitiesList([...data])
                setCurrentCity(data[0])
        })
    }

    useEffect(() => {
        getStates()
    },[])

    useEffect(() => {
        if(state){
            getCities(state)
        }
    }, [state])


    const getCurrentState = ():string => {
        return state
    }
    const setCurrentState = (uf:string) => {
        setState(uf)
    }

    const getCurrentCity = ():string => {
        return city
    }
    const setCurrentCity = (newCity:string) => {
        setCity(newCity)
    }

    const getStatesList = () => {
        return statesList
    }
    const getCitiesList = () => {
        return citiesList
    }

    return(
        <Context.Provider
            value={{
                getCurrentState,
                getCurrentCity,
                setCurrentState,
                setCurrentCity,
                getStatesList,
                getCitiesList
            }}>
            {children}
        </Context.Provider>
    )
}
