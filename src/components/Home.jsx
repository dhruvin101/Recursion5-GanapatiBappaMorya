import { Box, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import btc from "../assets/btc.png"

const Home = () => {
  return (
    <>
      <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
        <motion.div style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px"
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btc} filter={"grayscale(1)"}/>
        </motion.div>
        <Text fontSize={"6xl"} textAlign={"center"} color={"whiteAlpha.700"} fontWeight={"thin"} mt={"-19"}>
          CoinVortex
        </Text>
      </Box>
    </>
  )
}

export default Home
