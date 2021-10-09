import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Header } from 'components/Header';
import { Pagination } from 'components/Pagination';
import { Sidebar } from 'components/Sidebar';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { api } from 'services/api';
import { useUsers } from 'services/hooks/useUsers';
import { queryClient } from 'services/queryClient';
import { User } from 'types/User';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error, isSuccess, isFetching } = useUsers(page);

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`/users/${userId}`);

        return data;
      },
      {
        staleTime: 1000 * 60 * 10, // 1000 * 60 = 1min * 10 = 10min
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px={['4', '4', '6']}>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size='sm' color='gray.500' ml='4' />
              )}
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading && (
            <Flex alignItems='center' justifyContent='center'>
              <Spinner />
            </Flex>
          )}

          {!isLoading && error && (
            <Flex alignItems='center' justifyContent='center'>
              <Text>Falha ao obter dados do usuário</Text>
            </Flex>
          )}

          {isSuccess && (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' width='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width='8'></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users?.map((user: User) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink' />
                      </Td>

                      <Td>
                        <Box>
                          <ChakraLink
                            color='purple.400'
                            onMouseEnter={() =>
                              handlePrefetchUser(Number(user.id))
                            }
                          >
                            <Text fontWeight='bold'>{user.name}</Text>
                          </ChakraLink>

                          <Text fontSize='sm' color='gray.300'>
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={Number(data?.totalCount)}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
