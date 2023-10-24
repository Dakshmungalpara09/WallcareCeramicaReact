import { useState } from "react";
import MainContext from "./MainContext";

const MainProvider = (props)=>{
    const PortNo = 'http://172.16.101.172:6060'

    const [Types,setTypes] = useState([])

    return (
        <MainContext.Provider value={{PortNo:PortNo,Types:Types,setTypes:setTypes}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainProvider;