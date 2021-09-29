import { Button } from '@chakra-ui/react';

interface PaginationButtonProps {
  pageNumber: number;
  isCurrent?: boolean;
}

export function PaginationButton({
  pageNumber,
  isCurrent = false,
}: PaginationButtonProps) {
  return isCurrent ? (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      colorScheme='pink'
      disabled
      _disabled={{ bg: 'pink.500', cursor: 'default' }}
    >
      {pageNumber}
    </Button>
  ) : (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      bg='gray.700'
      _hover={{ bg: 'gray.500' }}
    >
      {pageNumber}
    </Button>
  );
}
