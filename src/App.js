import logo from "./images/logo.png";
import bitcoin from "./images/bitcoin.png";
import ethereum from "./images/ethereum.png";
import doge from "./images/dogecoin.png";
import "./App.css";
import { useState } from "react/cjs/react.production.min";

function App() {
  const [name, setName] = useState("");
  return (
    <div className="App">
      <div class="container">
        <nav>
          <img src={logo} class="logo" />
          <ul>
            <li>
              <a href="#">Market</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
          <a href="#" class="btn">
            Connect Wallet
          </a>
        </nav>

        <div class="content">
          <h1>
            Exchange your <br />
            <span>currency</span>
          </h1>
          <p>
            Get the best exchange rates for your <br />
            currency and save money
          </p>
          <a href="#" class="btn">
            Exchange Now
          </a>
        </div>

        <div class="coinlist">
          <div class="coin">
            <img src={bitcoin} alt="bitcoin" />
            <div>
              <h2>$100</h2>
              <p>Bitcoin</p>
            </div>
          </div>

          <div class="coin">
            <img src={ethereum} alt="Ethereum" />
            <div>
              <h2>$50</h2>
              <p>Ethereum</p>
            </div>
          </div>

          <div class="coin">
            <img src={doge} alt="Dogecoin" />
            <div>
              <h2>$20</h2>
              <p>Dogecoin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
