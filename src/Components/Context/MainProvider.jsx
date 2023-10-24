import MainContext from "./MainContext";

const MainProvider = (props)=>{
    const PortNo = 'http://172.16.101.172:6060'
    return (
        <MainContext.Provider value={{PortNo:PortNo}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainProvider;