import { IoEyeOff, IoEyeSharp  } from "react-icons/io5";
import { TradingContext } from "../context/Trading";
const { useState, useContext } = require("react");
const { login } = require("../firebase/auth");
// import { TradingContext } from "../context/Trading";


const Login = ()=>{
    
    const {setAuth,setIsLoginAuth} = useContext(TradingContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [formData,setFormData] = useState({email:'',password:''});

    const changeHandler = (e)=>{
        setFormData(prevData=>{
            return {...prevData,[e.target.name]:e.target.value}
        })
    }

    const loginUser = async() => {
        try {
          await login(formData.email,formData.password);
        } 
        catch (error) {
          console.log(error);
        }
    }
    return (
        <div className='modal-backdrop' onClick={()=>{setAuth(false);}}>
            <div className='blue-glassmorphism pb-5 flex flex-col justify-center items-center' onClick={e => {e.stopPropagation();}}>
                <form className='p-5 flex flex-col gap-5 relative' >
                    <input type='email' name='email' value={formData.email} placeholder='Email' className='outline-none text-black px-3 rounded-lg py-2' required onChange={changeHandler}/>
                    <input type={`${isEyeOpen ? 'text' :'password'}`} name='password' value={formData.password} placeholder='Password' className='outline-none text-black px-3 rounded-lg py-2 pr-8' required onChange={changeHandler}/>
                    <p className='absolute cursor-pointer text-xl text-black bottom-7 right-7' onClick={()=>setIsEyeOpen(!isEyeOpen)} >{isEyeOpen ?<IoEyeSharp/> : <IoEyeOff/> }</p>
                </form>
                <div className="flex justify-around items-center flex-wrap w-full">
                <button className='bg-blue-500 w-fit rounded-lg px-3 py-1 mt-2 hover:bg-blue-800' onClick={()=> setIsLoginAuth(false) } > Register </button>
                <button className='bg-blue-500 w-fit rounded-lg px-3 py-1 mt-2 hover:bg-blue-800'  onClick={loginUser}> Login </button>
                {/* <p > ----OR---- </p> */}
                </div>
            </div>
        </div>
    )
}

export default Login;
