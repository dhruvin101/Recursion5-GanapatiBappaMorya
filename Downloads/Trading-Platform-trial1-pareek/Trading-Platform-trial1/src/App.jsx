import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CoinDetails from './components/CoinDetails'
import Coins from './components/Coins'
import Exchanges from './components/Exchanges'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <Router>
        {/* <Header/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/coins' element={<Coins/>} />
          <Route path='/exchanges' element={<Exchanges/>} />
          <Route path='/coin/:id' element={<CoinDetails/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
    </>
  )
}

export default App
