import React,{useContext} from 'react'
import logo from "../images/logo.png";
import bitcoin from "../images/bitcoin.png";
import ethereum from "../images/ethereum.png";
import doge from "../images/dogecoin.png";
import { NavLink } from 'react-router-dom';
import { TradingContext } from '../context/Trading';
import Login from './Login';
import Register from './Register';

const Home = () => {
  const { auth , setAuth ,
    user , userData ,
    isLoginAuth , setIsLoginAuth ,logout} = useContext(TradingContext);
  return (
    <>
      <div class="container">
        <nav>
          <NavLink to={'/'}> <img src={logo} class="logo" /> </NavLink>
          <ul>
            <li>
              <NavLink to={'/coins'}> Market </NavLink>
              {/* <a href="#">Market</a> */}
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
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
            </div> : <button onClick={logout} className='btn' >
                Logout
            </button>
          }
        </nav>
          <div>
            <p className='text-7xl -mb-20 tracking-wider font-medium mt-10 text-[#00FFFF]'> CoinPulse </p>
          </div>

        <div class="content">
          <h1>
            Exchange your <br />
            <span>currency</span>
          </h1>
          <p>
            Get the best exchange rates for your <br />
            currency and save money
          </p>
          <NavLink to={'/coins'} className={'btn'}> 
            Exchange Now
          </NavLink>
        </div>

        <div class="coinlist">
          <div class="coin">
            <img src={bitcoin} alt="bitcoin" />
            <div>
              <h2>$73200</h2>
              <p>Bitcoin</p>
            </div>
          </div>

          <div class="coin">
            <img src={ethereum} alt="Ethereum" />
            <div>
              <h2>$3995.87</h2>
              <p>Ethereum</p>
            </div>
          </div>

          <div class="coin">
            <img src={doge} alt="Dogecoin" />
            <div>
              <h2>$0.19</h2>
              <p>Dogecoin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
