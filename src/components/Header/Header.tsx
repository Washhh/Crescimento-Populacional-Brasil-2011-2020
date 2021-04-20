import React from 'react'
import './styles.css'

import logo from '../../assets/imgs/logoT.png'
export default function Header(): JSX.Element{

    return(
        <div className="header">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <div className="headerContent">
                <h2>Crescimento Populacional no Brasil</h2>
            </div>
        </div>
    )
}