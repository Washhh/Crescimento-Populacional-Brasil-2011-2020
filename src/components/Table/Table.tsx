import React from 'react'
import './styles.css'

interface propsData{
    data:number[],
    name:string
}

export default function Table(props:propsData): JSX.Element{
    
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
    return(
        <div className="myTable">
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        {labels.map((name:string) => <th key={name}>{name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.name}</td>
                        {props.data.map((data:number) => <td key={data}>{new Intl.NumberFormat().format(data)}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}