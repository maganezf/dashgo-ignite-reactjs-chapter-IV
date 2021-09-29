import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function Sidebar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start'>
        <NavSection title='GERAL'>
          <NavLink icon={RiDashboardLine} label='Dashboard' />

          <NavLink icon={RiContactsLine} label='Usuários' />
        </NavSection>

        <NavSection title='AUTOMAÇÃO'>
          <NavLink icon={RiInputMethodLine} label='Formulários' />

          <NavLink icon={RiGitMergeLine} label='Automação' />
        </NavSection>
      </Stack>
    </Box>
  );
}
