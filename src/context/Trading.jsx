import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const TradingContext = createContext();

function TradingContextProvider(props){
    const children = props.children;
    const [loading,setLoading] = useState(false); //Done
    const [user,setUser] = useState(null); //Done
    const [userData,setUserData] = useState([]); //Done
    const [userNews,setUserNews] = useState([]);
    const [data,setData] = useState([]); //Done
    const [auth,setAuth] = useState(false); //Done
    const [isLoginAuth,setIsLoginAuth] = useState(true); //Done
    const [active,setActive] = useState("general"); //Done

    
    const logout = async() => {
        try {
          await signOut();
          setUser(null);
          setUserData([]);
          setAuth(false);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
    }

    const add = (d)=>{
        const dn = userNews;
        dn.push(d);
        setUserNews(dn);
    }

    const remove = (d)=>{
        setLoading(true);
        const dn = userNews.filter((news) => news.title !== d);
        setLoading(false);
        return setUserNews(dn);
    }
    
    const value = {
        loading , setLoading ,
        user , setUser ,
        userData , setUserData ,
        data , setData ,
        auth , setAuth ,
        isLoginAuth , setIsLoginAuth ,
        active , setActive ,
        logout, 
        userNews, add, remove
    };

    

    useEffect(()=>{
        onAuthStateChanged(async(user)=>{
            if(user){
                setLoading(true);
                setUser(user);
                const docRef = doc(db,"coin",user.uid);
                const docSnap = await getDoc(docRef);
                setUserData(docSnap.data());
                setUserNews(docSnap.data()?.data);
                console.log("User Data => ",user);
                setLoading(false);
            }
        })
    },[]);

    return <TradingContext.Provider value={value}>
        {children}
    </TradingContext.Provider>
}

export default TradingContextProvider;