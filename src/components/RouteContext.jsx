import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteContext = createContext({});

// eslint-disable-next-line react/prop-types
const RouteProvider = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return <RouteContext.Provider value={{}}>{children}</RouteContext.Provider>
}

export { RouteContext, RouteProvider };