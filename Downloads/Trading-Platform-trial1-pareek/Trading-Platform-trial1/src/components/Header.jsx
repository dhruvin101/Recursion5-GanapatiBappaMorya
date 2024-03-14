import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.png";
import { TradingContext } from '../context/Trading';
import Login from './Login';
import Register from './Register';

const Header = () => {
  const { auth , setAuth ,
    user , userData ,
    isLoginAuth , setIsLoginAuth ,logout} = useContext(TradingContext);
  return (
    <div className='flex items-center justify-around text-2xl py-3'>
      <div className='flex items-center gap-16'>
        <NavLink to={'/'}> <img src={logo} class="logo" /></NavLink>
        <NavLink to={'/coins'}> Market </NavLink>
      </div>
      {
        !user ? <div>
        {
          !auth ? <div>
            <p className='btn cursor-pointer' onClick={()=>{setAuth(true); setIsLoginAuth(true)}}> Login </p>
          </div> : <div>
            {
              isLoginAuth ? <Login /> : <Register />
            }
          </div> 
        }
        </div> : <button onClick={logout} className='btn'>
                Logout
          </button>
      }
    </div>
  );
}

export default Header
