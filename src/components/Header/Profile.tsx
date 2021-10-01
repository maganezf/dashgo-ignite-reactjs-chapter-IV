import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean | undefined;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align='center'>
      {showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Maganez Filho</Text>

          <Text color='gray.300' fontSize='small'>
            maganezfilho@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size='md'
        name='Maganez Filho'
        src='https://github.com/maganezf.png'
      />
    </Flex>
  );
}
