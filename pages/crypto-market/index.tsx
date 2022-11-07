import React, { useState } from "react";
import {
  Badge,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";

interface PriceProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

interface PageProps {
  initialPrice: PriceProps[];
}

const getMarket = async (page = 1) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10&page=${page}`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Fetching error");
  }
  return await response.json();
};

const formatNumber = (num: number) => {
  return Intl.NumberFormat("id-Id").format(num);
};

const Percentage = ({ percent }: { percent: number }) => {
  const formatPercent = Intl.NumberFormat("id-Id", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percent);

  let color = "black";
  if (percent > 0) {
    color = "green.500";
  } else {
    color = "red.500";
  }

  return <Text color={color}>{formatPercent}</Text>;
};

export async function getStaticProps() {
  const initialPrice = await getMarket();

  return { props: { initialPrice } };
}

const Market = ({ initialPrice }: PageProps) => {
  const [page, setPage] = useState(1);

  const previousPage = () => {
    setPage((old) => old - 1);
  };

  const nextPage = () => {
    setPage((old) => old + 1);
  };

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    ["market", page],
    () => getMarket(page),
    {
      staleTime: 3000, // ms
      refetchInterval: 3000,
      initialData: initialPrice,
    }
  );

  return (
    <Layout title="Crypto Market">
      {isFetching && (
        <Spinner color="blue.500" position="fixed" top={10} right={10} />
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Last Price</Th>
            <Th>24h % Change</Th>
            <Th isNumeric>Total Volume</Th>
            <Th isNumeric>Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isError && <Text>There was an error processing your request</Text>}
          {isSuccess &&
            data?.map((price: PriceProps) => (
              <Tr key={price.id + "_" + price.symbol}>
                <Td>
                  <Flex alignItems="center">
                    <Image
                      src={price.image}
                      boxSize="24px"
                      ignoreFallback={true}
                      alt={price.symbol}
                    />

                    <Text pl={2} fontWeight="bold" textTransform="capitalize">
                      {price.id}
                    </Text>
                    <Badge ml={3}>{price.symbol}</Badge>
                  </Flex>
                </Td>
                <Td>{formatNumber(price.current_price)}</Td>
                <Td>
                  <Percentage percent={price.price_change_percentage_24h} />
                </Td>
                <Td isNumeric>{formatNumber(price.total_volume)}</Td>
                <Td isNumeric>{formatNumber(price.market_cap)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Grid templateColumns="70% 1fr auto 1fr auto" gap={6} mt={10}>
        <div></div>
        <Button
          colorScheme="facebook"
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Text>{page}</Text>{" "}
        <Button
          colorScheme="facebook"
          variant="outline"
          size="sm"
          onClick={nextPage}
        >
          Next
        </Button>
      </Grid>
    </Layout>
  );
};

export default Market;
