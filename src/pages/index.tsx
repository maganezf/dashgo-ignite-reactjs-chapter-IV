import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Input } from 'components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  };

  return (
    <Flex w='100vw' h='100vh' align='center' justifyContent='center'>
      <Flex
        as='form'
        w='100%'
        maxW={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDirection='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            {...register('email', { required: 'E-mail obrigatório' })}
            type='email'
            label='E-mail'
            error={errors.email}
          />

          <Input
            {...register('password', { required: 'Senha obrigatória' })}
            type='password'
            label='Senha'
            error={errors.password}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
