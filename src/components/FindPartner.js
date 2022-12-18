import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import React, { useEffect, useState, Link } from 'react';
import { FaSearch } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
function FindPartner() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  let color = useColorModeValue('gray.900', 'gray.50');
  const [isActive, setIsActive] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [query, setQuery] = useState('');
  let fetchdata = async () => {
    setloading(true);

    const res = await fetch(`https://lxuwymtrux3fuvgvqxvackkcvq0alfqf.lambda-url.ap-south-1.on.aws/suggestions?q=${query}`);
    if (res.status === 200) {
      const Data = await res.json();

      setData(Data.data);
    } else {
      const Data = await res.json();
      console.log(Data.detail);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [query]);

  return (
    <Flex justifyContent={'center'} direction={'column'} align={'center'}>
      <Heading fontFamily={`'Source Code Pro',sans-serif`}>
        Looking for a Partner?
      </Heading>
      <Text color={color} fontSize={'lg'} mt={5}>
        {' '}
        We'll find it for you ✌️
      </Text>
      <Flex
        justifyContent={'center'}
        align={'center'}
        minH={isActive ? '10vh' : '65vh'}
        transition={'all 0.3s ease-in-out'}
      >
        <FormControl minW={'440px'}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch />}
              size={'lg'}
            />
            <Input
              type="text"
              placeholder="What are you looking for in a partner"
              size={'lg'}
              onFocus={() => setIsActive(true)}
              value={query}
              onChange={e => {
                setQuery(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <Collapse in={isActive} animateOpacity>
        <Flex
          maxW={'lg'}
          w={'md'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          p={4}
          direction={'column'}
        >
          {loading ? (
            <></>
          ) : (
            data?.map(resu => (
              <Button
                onClick={() => {
                  navigate(`/search?id=${resu.name}`);
                }}

                my = {'2'}
              >
                {resu.name}
              </Button>
            ))
          )}
        </Flex>
      </Collapse>
    </Flex>
  );
}

export default FindPartner;
