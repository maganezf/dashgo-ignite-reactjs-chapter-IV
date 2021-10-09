import { useQuery } from 'react-query';
import { api } from 'services/api';
import { User } from 'types/User';

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<{ users: User[] }>('/users');

  const users: User[] = data?.users?.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  });
}
