import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Flex,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router';

export default function HackathonCard(props) {
  const heroImageMap = {
    'mlh.io':
      'https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg',
    DEVPOST:
      'https://res.cloudinary.com/hackbot/image/upload/v1610604172/Hackbot%20Web/Devpost_hpiydu.jpg',
    DEVFOLIO:
      'https://www.hackoff.tech/v2.0/html/event_organizer/images/brands/devfolio.png',
  };
  const logoImageMap = {
    'mlh.io':
      'https://res.cloudinary.com/hackbot/image/upload/v1610603074/Hackbot%20Web/mlh-facebook-ae6144c0a3605f15992ee2970616db8d_excuuh.jpg',
    DEVPOST:
      'https://res.cloudinary.com/hackbot/image/upload/v1610604172/Hackbot%20Web/Devpost_hpiydu.jpg',
    DEVFOLIO:
      'https://res.cloudinary.com/hackbot/image/upload/v1610594222/Hackbot%20Web/38809367_j6zmw0.png',
  };
  let id = props.id
  let website = props.website;
  let heroImage = props.heroImage || heroImageMap[website];
  let logo = props.logo || logoImageMap[website];
  let name = props.name;
  let startDate = props.start;
  let endDate = props.end;
  let Location = props.location;
  let mode = props.mode;
  let link = props.url;
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.700', 'white');
  const [isInterested, setIsInterested] = useState(false);
  let navigate = useNavigate();
  let toast = useToast();
  let token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4OTdjZjk0NTllMjU0ZmYxYzY3YTRlYjZlZmVhNTJmMjFhOWJhMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU0hBU0hBTksgS1VNQVIgU1JJVkFTVEFWQSAtSUlJVEsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKektFX2wxczNyWTU0ejBFMEROV0F4MFNDbGs5VjdiOGZOVURwb2w9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFydG5lcnMtaW4tY3JpbWUtMzgzMDkiLCJhdWQiOiJwYXJ0bmVycy1pbi1jcmltZS0zODMwOSIsImF1dGhfdGltZSI6MTY1Njc0NzAyNSwidXNlcl9pZCI6IkFMUEZtNVZDSURUeG5TZURCRFd4N2N2enB4ODMiLCJzdWIiOiJBTFBGbTVWQ0lEVHhuU2VEQkRXeDdjdnpweDgzIiwiaWF0IjoxNjU2NzY3MTE5LCJleHAiOjE2NTY3NzA3MTksImVtYWlsIjoic2hhc2hhbmtrdW1hcjIwYmNzMTVAaWlpdGtvdHRheWFtLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTE1MzgxMTc0MTY1MDU2Nzg4MDQiXSwiZW1haWwiOlsic2hhc2hhbmtrdW1hcjIwYmNzMTVAaWlpdGtvdHRheWFtLmFjLmluIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.bhUkAvSeSXiY_W2x8AKhtxSnsnGUEr2pkSEg5J-DOu-tNgbfO6TX2nPUr3UOZpQVjEPQpDIh8aO_YtNRan3_ud19qF5oBAQk61WPOqOsg8VQhI75P24CevQFYsHy6EktZGgUscQEPyttd9TwEKITWA4PCzlenS7nZFpCNK_-ULk25kUoNfCNjUCo1G_gdDBIhCvq_VfGJnAlk_rLe-uuwL2XYtX3z5stXWFs88aXoGmxh-LDa9W7kAHz1mgaPJ59soOvCmtxhUk_0kwG3bxMCvYP_rlluaAoByusqWmx4UzYZoX3eEoSFIQriSi5nECLPLWaBBRUFunx3LwSRGjWug';
  let addInterested = async () => {
    let url = `http://127.0.0.1:8000/addfavourite`;
    let data = {
      hackathon_id: id,
    };
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        setIsInterested(true);
      } else {
        let json = await response.json()
        console.log(json)
        toast({
          title: 'Error',
          description: `${json.detail} - ${response.status}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: `Something went wrong - ${e}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  let removeInterested = async () => {
    let url = `http://127.0.0.1:8000/deleteFavourite/${id}?is_project=${false}`;
    try {
      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        setIsInterested(false);
      } else {
        toast({
          title: 'Error',
          description: `Something went wrong - ${response.status}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: `Something went wrong - ${e}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Center py={6} px={6}>
      <Box
        maxW={'445px'}
        minW={'xs'}
        bg={bg}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box bg={'gray.100'} mt={-6} mx={-6} mb={12} pos={'relative'}>
          <Image src={heroImage} maxH={'200px'} />
        </Box>
        <Flex justify={'flex-start'} mt={-12}>
          <Avatar size={'lg'} borderColor={'gray.200'} mt={-6} src={logo} />
        </Flex>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {website}
          </Text>
          <Heading
            color={color}
            fontSize={'2xl'}
            fontFamily={'body'}
            textAlign={'center'}
          >
            {name}
          </Heading>
          <Flex align={'center'}>
            <Text color={'gray.400'}>
              <Text fontWeight={'bold'} color={'gray.100'}>
                Date
              </Text>
              {startDate} - {endDate}
              <Text fontWeight={'bold'} color={'gray.100'}>
                Location
              </Text>
              {Location}
              <Text fontWeight={'bold'} color={'gray.100'}>
                Mode
              </Text>
              {mode}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <IconButton
              variant={isInterested ? 'solid' : 'outline'}
              colorScheme="red"
              aria-label="Interested"
              icon={isInterested ? <FaHeart /> : <FiHeart />}
              onClick={() => {
                if (isInterested) {
                  removeInterested();
                } else {
                  addInterested();
                }
              }}
            />
            <IconButton
              variant={'outline'}
              colorScheme="teal"
              aria-label="visit"
              icon={<FaLink />}
              onClick={() => window.open(link, '_blank')}
            />
            <IconButton
              variant={'solid'}
              colorScheme="teal"
              aria-label="find-partners"
              icon={<FaUserSecret />}
              onClick={() => navigate('/find')}
            />
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}
