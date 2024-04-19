import { createContext, useState, useContext, useEffect } from "react";

export const AlertContext = createContext();

export function AlertProvider ({children}) {
    const [alertData, setAlertData] = useState({open: false, status: null, headline: null, message: null})

    useEffect(() => {
        if (alertData.open) {
            reset();
        }
    }, [alertData.open])

    function reset () {
        setTimeout(() => {
            setAlertData({open: false, status: null, headline: null, message: null})
        }, 3000);
    }

    return (
        <AlertContext.Provider value={{
            alertData,
            setAlertData
        }}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);