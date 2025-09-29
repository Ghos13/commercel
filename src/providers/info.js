import { createContext, useState,useEffect } from "react";


const api_url = process.env.REACT_APP_API;


export const InfoContext = createContext();


export const InfoProvider = ({children}) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const func = async () => {
            try{
                const res = await fetch(`${api_url}info/`);

                if(!res.ok){
                    setLoading(null);
                }
                const import_data = await res.json();
                setLoading(false);
                setData(import_data);
                console.log(data);
            } catch(error){

            }
        }

        func();
    },[])

    return (
        <InfoContext.Provider value={{data,loading}}> 
            {children}
        </InfoContext.Provider>
    )
}

