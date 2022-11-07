import React, { ReactNode } from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

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
      <Container></Container>
    </>
  );
};

export default Layout;
