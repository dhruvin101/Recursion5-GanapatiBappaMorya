import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
const Header = () => {
  return (
    <>
      <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
        <Button mr={"2.5"} variant={"unstyled"} color={"white"}>
            <Link to="/">Home</Link>
        </Button>
        <Button mr={"2.5"} variant={"unstyled"} color={"white"}>
            <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button mr={"2.5"} variant={"unstyled"} color={"white"}>
            <Link to="/coins">Coins</Link>
        </Button>
        
      </HStack>
    </>
  )
}

export default Header
