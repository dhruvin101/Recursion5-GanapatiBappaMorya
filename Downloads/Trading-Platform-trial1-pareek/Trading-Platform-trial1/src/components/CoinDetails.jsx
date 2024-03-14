import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import Chart from './Chart';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import Header from './Header';
import { TradingContext } from '../context/Trading';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CoinDetails = () => {
  const { user , userData } = useContext(TradingContext);
  console.log(userData);

  // if(userData?.)

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const [minThresholdVal,setMinThresholdVal] = useState("");
  const [maxThresholdVal,setMAxThresholdVal] = useState('');

  const params = useParams();
  const clickAddHandler = async(e) =>{
    e.preventDefault();
    console.log("Hello => ");
    // if(!thresholdVal) return;
    console.log("Hello");
    try {
      if(user){
        console.log(params);
        // console.log(thresholdVal);
        // console.log(user);
        const docRef = doc(db, "coin",user.uid);
        await updateDoc(docRef, {
          data : arrayUnion({
            coin : params,
            thresholdVal : minThresholdVal,
            maxThresholdVal : maxThresholdVal,
          })
        });
        console.log("Success");
      }
    } 
    catch (error) {
      console.log(error);
    }
  }

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async()=>{
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);

        const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
      setCoin(data);
      setChartArray(chartData.prices);
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id, currency, days]);

  if(error) return <ErrorComponent message={"Error while fetching data for coin"}/>

  return (
    <>
    <Header />
    <div className='mb-10 flex flex-col items-center gap-10 '>
        <button className={`bg-blue-700 text-white px-5 max-w-52 py-2 rounded-xl text-xl ${user ? 'cursor-pointer' : ' cursor-not-allowed'}`} onClick={clickAddHandler} > Add to Notification </button>
        {
          user ? <div className='flex justify-around w-full'>
            <input type='text' placeholder='Enter Maximum threshold' className='outline-none px-2 border rounded-xl placeholder:text-black text-black text-xl w-60 py-1' value={minThresholdVal} onChange={(e)=>setMinThresholdVal(e.target.value)}/>
            <input type='text' placeholder='Enter Minimum threshold' className='outline-none px-2 border rounded-xl placeholder:text-black text-black text-xl w-60 py-1' value={maxThresholdVal} onChange={(e)=>setMAxThresholdVal(e.target.value)}/>
          </div> : <></>
        }
    </div>
        <Container maxW={"container.xl"} className='px-10 bg-white'>
          {
            loading?<Loader/>:(
              <>
              <Box borderWidth={1} width={"full"} >
                <Chart arr={chartArray} currency={currencySymbol} days={days}/>
              </Box>

              <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
                className={`mx-10 my-2 ${days == i ? 'text-xl text-blue-400' :''}`}
              >
                {i}
              </Button>
            ))}
          </HStack>
              
              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
               <HStack spacing={"4"}>
              <Radio value={'inr'} className={`${currency == 'inr' ? 'text-xl text-blue-500' :''}`} >INR</Radio>
                <Radio value={'usd'} className={`${currency == 'usd' ? 'text-xl text-blue-500' :''}`} >USD</Radio>
                <Radio value={'eur'} className={`${currency == 'eur' ? 'text-xl text-blue-500' :''}`} >EURO</Radio>
              </HStack>
             </RadioGroup>

             <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
             <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>Last Updated on : {Date(coin.market_data.last_updated).split("G")[0]}</Text>
              <div className='mx-auto pt-10'>
                
                <div className=''>
                  <Image src={coin.image.large} w={"100"} h={"100"} objectFit={"contain"}/>
                  <Stat>
                    <StatLabel className='text-xl'>{coin.name}</StatLabel>
                    <StatNumber className='text-xl'>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText className='text-xl' >
                      <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                      {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                  </Stat>
                </div>
                
             
              </div>

              {/* <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
                {`#${coin.market_cap_rank}`}
              </Badge> */}

              {/* <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} /> */}
              <Box w={"50vw"} p="4" className='mx-auto px-20'>
                {
                  coin.market_data.max_supply ?  <Item title={"Max Supply"} value={coin.market_data.max_supply} /> :<></>

                }
                
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>
             </VStack>

              </>
            )
          }
        </Container>
    </>
  )
}

const Item = ({title,value})=>(
    <HStack justify={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
)

const CustomBar = ({high, low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme='teal' w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}></HStack>
    <Badge children={low} colorScheme='red' />
    <Text fontSize={"sm"}>24H Range</Text>
    <Badge children={high} colorScheme='green' />
  </VStack>
)

export default CoinDetails
