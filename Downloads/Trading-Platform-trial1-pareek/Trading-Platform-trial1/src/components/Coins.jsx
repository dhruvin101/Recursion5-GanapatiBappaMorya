import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import CoinCard from './CoinCard';
import ErrorComponent from './ErrorComponent';
import logo from "../images/logo.png";
import Loader from './Loader';
import { Input } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import Header from './Header';
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [searchQuery, setSearchQuery] = useState("");
  var url = "";
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        url = `${server}/coins/markets?vs_currency=${currency}&page=${page}`;
        const { data } = await axios.get(url);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const changePage = (newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const clickHandler = async() => {
    try {
      console.log("object =>>> ")
      if(searchQuery){
       
      url += `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&page=1&ids=${searchQuery}`;
      const { data } = await axios.get(url);
      setCoins(data);
      setLoading(false);
      }
      console.log(url);
    } catch (error) {
      setError("Please try again later.")
    }
  }

  if (error) return <ErrorComponent message={"Error while fetching data for coins"} />;

  // Generate pagination buttons
  const totalPages = 10; // Assuming 10 pages for demonstration
  const btns = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='bg-black text-white'>
    <Header />
      <Container maxW={"container.xl"} >
        {loading ? <Loader /> : (
          <>
            <FormLabel className='mx-auto'>Search for a currency</FormLabel>
            <FormControl className='flex justify-center'>
              <Input placeholder='Search' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                onClick={() => {
                  // setPage(1);
                  clickHandler();
                  console.log("Button => ");
                  // setLoading(true);
                }}
              >
                Submit
              </Button>
            </FormControl>
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={'inr'} >INR</Radio>
                <Radio value={'usd'} >USD</Radio>
                <Radio value={'eur'} >EURO</Radio>
              </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {
                coins.map(i => (
                  <CoinCard id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol} key={i.id} />
                ))
              }
            </HStack>

            <HStack w={"full"} overflowX={"auto"} p={"8"}>
              {
                btns.map((item) => (
                  <Button key={item} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(item)}> {item}</Button>
                ))
              }
            </HStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default Coins;
