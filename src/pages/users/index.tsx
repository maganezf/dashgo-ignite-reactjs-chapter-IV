import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Header } from 'components/Header';
import { Pagination } from 'components/Pagination';
import { Sidebar } from 'components/Sidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useUsers } from 'services/hooks/useUsers';
import { User } from 'types/User';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error, isSuccess, isFetching } = useUsers(page);

  useEffect(() => {
    console.log('page', page);
  }, [page]);

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

            <Link href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>
            </Link>
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
                          <Text fontWeight='bold'>{user.name}</Text>
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
