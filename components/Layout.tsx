import React, { ReactNode } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { FaGithub } from "react-icons/fa";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
  subTitle?: string;
}

const Layout = ({
  children,
  title = "This is the default title",
  subTitle,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxW={{ xl: "1200px" }} h="100vh">
        <Flex pt={10} pb={24}>
          <Box>
            <Heading>{title}</Heading>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontWeight="extrabold"
            >
              {subTitle}
            </Text>
          </Box>

          <Spacer />
          <ColorModeSwitcher />
        </Flex>

        {children}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          zIndex="sticky"
          borderTop="1px"
          borderColor="gray.200"
          py={2}
          w="full"
        >
          <footer>
            <Container maxW={{ xl: "1200px" }}>
              <Flex>
                <Box>
                  <span>React Query Example</span>
                </Box>
                <Spacer />
                <Box>
                  <Link href="https://github.com/ardana26" isExternal mx={4}>
                    <Icon as={FaGithub} w={6} h={6} color="#24292e" />
                  </Link>
                </Box>
              </Flex>
            </Container>
          </footer>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
