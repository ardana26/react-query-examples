import React from "react";
import {
  Box,
  Grid,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FcBullish, FcBusinesswoman } from "react-icons/fc";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="50vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="15vmin" pointerEvents="none" />
          <Text fontSize="6xl" fontWeight="900">
            React Query Examples
          </Text>
          <SimpleGrid
            columns={2}
            spacing="8"
            p="10"
            textAlign="center"
            rounded="lg"
          >
            <NextLink href="crypto-market" passHref>
              <Box
                boxShadow="xs"
                p="6"
                rounded="md"
                bg="white"
                textAlign="center"
                borderColor="grey.10"
                borderWidth={1}
                _hover={{
                  bg: "gray.50",
                  borderWidth: "1px",
                  borderColor: "red.200",
                }}
              >
                <Icon as={FcBullish} w={20} h={20} />
                <Link color="teal.500" fontSize="xl" display="block">
                  Crypto Market
                </Link>
              </Box>
            </NextLink>

            <NextLink href="mama-muda" passHref>
              <Box
                boxShadow="xs"
                p="6"
                rounded="md"
                bg="white"
                textAlign="center"
                borderColor="grey.10"
                borderWidth={1}
                _hover={{
                  bg: "gray.50",
                  borderWidth: "1px",
                  borderColor: "red.200",
                }}
              >
                <Icon as={FcBusinesswoman} w={20} h={20} />
                <Link color="teal.500" fontSize="xl" display="block">
                  Mama Muda
                </Link>
              </Box>
            </NextLink>
          </SimpleGrid>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Home;
