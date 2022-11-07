import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useMutation, useQuery } from "react-query";
import MamaTable from "./MamaTable";
import { useForm } from "react-hook-form";

const getMessages = async () => {
  const URL = "http://localhost:3000/api/message";
  const result = await fetch(URL);
  return await result.json();
};

export interface MessageProps {
  id?: number;
  createdAt?: string;
  phoneNumber: number;
  message: string;
  status?: string;
}

export const formatDate = (date: string = "2022-11-07T22:40:02.178Z") => {
  return new Date(date).toLocaleString("id-Id");
};

const submitMessage = async (data: MessageProps) => {
  const URL = "http://localhost:3000/api/message";
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("An error has occureed");
  }
  return await response.json();
};

const MamaMuda = () => {
  const { data, isSuccess } = useQuery("get-mama-muda", getMessages, {
    staleTime: 5000,
    refetchInterval: 5000,
  });

  const { handleSubmit, setError, register, reset, clearErrors } =
    useForm<MessageProps>();

  const mutation = useMutation(submitMessage, {
    // onError,
    // onMutate,
    // onSettled,
  });

  return (
    <Layout title="💌 Mama Muda" subTitle="Minta Pulsa">
      <Flex>
        <Box>
          <Box
            w="md"
            p={5}
            mr={4}
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={4}
              pb={2}
              borderBottom="1px"
              borderColor="gray.200"
            >
              ✍️ Request Pulsa
            </Text>
            <form>
              <FormControl pb={4}>
                <FormLabel
                  htmlFor="phoneNumber"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Phone Number
                </FormLabel>
                <Input name="phoneNumber" placeholder="Phone Number" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="name"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Message
                </FormLabel>
                <Textarea placeholder="Bullshit Message" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <Button mt={4} colorScheme="teal" type="submit">
                Send
              </Button>
            </form>
          </Box>
        </Box>
        <Box flex="1">{isSuccess && <MamaTable data={data} />}</Box>
      </Flex>
    </Layout>
  );
};

export default MamaMuda;
