import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`} className="bg-gray-500 w-32 mx-5 my-2 text-white rounded-xl hover:scale-105 hover:shadow-2xl duration-300 ">
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
    >
      <Image
        src={img}
        w={"50"}
        h={"50"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1} className="text-lg">
        {symbol}
      </Heading>

      <Text noOfLines={1} className="text-lg">{name}</Text>
      <p className="text-xl">{price ? `${currencySymbol}${price}` : "NA"}</p>
    </VStack>
  </Link>
);

export default CoinCard;