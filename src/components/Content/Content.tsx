/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {Route, Link, useLocation} from "react-router-dom"
import Brazil from '../../pages/Brazil'
import States from '../../pages/States'
import Cities from '../../pages/Cities'
import './styles.css'

export default function Content(): JSX.Element{

    const link1 = document.getElementById("link1")
    const link2 = document.getElementById("link2")
    const link3 = document.getElementById("link3")

    let location = useLocation()

    useEffect(() => {
        if(location && location.pathname === "/"){
            if(link1?.classList)link1.classList.add("focus")
            if(link2?.classList)link2.classList.remove("focus")
            if(link3?.classList)link3.classList.remove("focus")
        }

        else if(location && location.pathname === "/estados"){
            if(link1?.classList)link1.classList.remove("focus")
            if(link2?.classList)link2.classList.add("focus")
            if(link3?.classList)link3.classList.remove("focus")
        }
        else if(location && location.pathname === "/municipios"){
            if(link1?.classList)link1.classList.remove("focus")
            if(link2?.classList)link2.classList.remove("focus")
            if(link3?.classList)link3.classList.add("focus")
        }
    }, [location])


    return(
        <React.Fragment>
            <div className="bodyContent">
                <div className="sideBar">
                    <div id="link1" className="focus"><Link to="/"><div>Brasil</div></Link></div>
                    <div id="link2"><Link to="/estados"><div>Estados</div></Link></div>
                    <div id="link3"><Link to="/municipios"><div>Municípios</div></Link></div>
                </div>
                <div className="content">
                    <Route exact path="/" component={Brazil} />
                    <Route path="/estados" component={States} />
                    <Route path="/municipios" component={Cities} />
                </div>
            </div>
        </React.Fragment>
    )
}