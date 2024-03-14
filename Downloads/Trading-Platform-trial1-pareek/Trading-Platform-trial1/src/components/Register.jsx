import { TradingContext } from "../context/Trading";
const { useState, useContext } = require("react");
const { register } = require("../firebase/auth");
const { IoEyeSharp, IoEyeOff } = require("react-icons/io5");

const Register = ()=>{

    const {setAuth,setIsLoginAuth} = useContext(TradingContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [formData,setFormData] = useState({name:'',email:'',password:''});

    const changeHandler = (e)=>{
        setFormData(prevData=>{
            return {...prevData,[e.target.name]:e.target.value}
        })
    }

    const registerUser = async(e) => {
        e.preventDefault();
        try {
          await register(formData.name,formData.email,formData.password);
          setAuth(false);
        } 
        catch (error) {
          console.log(error?.message);
        }
      }
    return (
        <div className='modal-backdrop ' onClick={()=>{setAuth(false);}}>
            <div className='blue-glassmorphism pb-5 flex flex-col justify-center items-center' onClick={e => {e.stopPropagation();}}>
                <form className='p-5 flex flex-col gap-5 relative'  >
                    <input type='text' value={formData.name} placeholder='Name' name='name' className='outline-none text-black px-3 rounded-lg py-2' required onChange={changeHandler} />
                    <input type='email' value={formData.email} placeholder='Email' name='email' className='outline-none text-black px-3 rounded-lg py-2' required onChange={changeHandler} />
                    <input type={`${isEyeOpen ? 'text' :'password'}`} value={formData.password} name='password' placeholder='Password' className='outline-none text-black px-3 rounded-lg py-2' required onChange={changeHandler} />
                    <p className='absolute cursor-pointer text-xl text-black bottom-7 right-7' onClick={()=>setIsEyeOpen(!isEyeOpen)} >{isEyeOpen ?<IoEyeSharp/> : <IoEyeOff/> }</p>
                </form>
                <div className="flex justify-around items-center w-full">
                <button className='bg-blue-500 w-fit rounded-lg px-3 py-1 mt-2 hover:bg-blue-800' onClick={()=> setIsLoginAuth(true) } > Login </button>
                <button className='bg-blue-500 w-fit rounded-lg px-3 py-1 mt-2 hover:bg-blue-800' onClick={registerUser}> Register </button>
                {/* <p > ----OR---- </p> */}
                </div>
            </div>
        </div>
    )
}

export default Register