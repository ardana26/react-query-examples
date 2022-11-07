import React, { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("get-mama-muda", getMessages, {
    staleTime: 15000,
    refetchInterval: 15000,
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    clearErrors,
  } = useForm<MessageProps>();

  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(submitMessage, {
    onMutate: async (newMessage) => {
      // mutation in progress
      // use for : spinner, disabled form, etc
      // -------------------------------------
      // optimistic update
      // 1. cancel any outgoind refecth
      await queryClient.cancelQueries("get-mama-muda");

      // 2. snapshot the previous value
      const previousMessages =
        queryClient.getQueryData<MessageProps[]>("get-mama-muda");

      // 3. optimistically update new value
      if (previousMessages) {
        newMessage = { ...newMessage, createdAt: new Date().toISOString() };
        const finalMessages = [...previousMessages, newMessage];
        queryClient.setQueryData("get-mama-muda", finalMessages);
      }

      return { previousMessages };
    },
    onSettled: async (data, error: any) => {
      // mutation done ->> success, error
      if (data) {
        await queryClient.invalidateQueries("get-mama-muda");
        setErrorMessage("");
        reset();
        clearErrors();
      }

      if (error) {
        setErrorMessage(error.message);
      }
    },
    onError: async (error: any, _variables, context: any) => {
      // mutation done with error response
      // console.log("onError");
      setErrorMessage(error.message);
      if (context?.previousMessages) {
        queryClient.setQueryData<MessageProps[]>(
          "get-mama-muda",
          context.previousMessages
        );
      }
    },
    onSuccess: async () => {
      // mutation done with success response
      console.log("onSuccess");
    },
  });

  const onSubmit = async (data: MessageProps) => {
    await mutation.mutate(data);
  };

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
              <FormControl pb={4} isInvalid={errors.phoneNumber ? true : false}>
                <FormLabel
                  htmlFor="phoneNumber"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Phone Number
                </FormLabel>
                <Input
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    required: "phone number required",
                  })}
                />
                <FormErrorMessage>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.message ? true : false}>
                <FormLabel
                  htmlFor="name"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Message
                </FormLabel>
                <Textarea
                  placeholder="Bullshit Message"
                  {...register("message", { required: "message required" })}
                />
                <FormErrorMessage>
                  {errors.message && errors.message.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
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
