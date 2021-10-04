import { Button, Flex, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

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
            {...register('email')}
            type='email'
            label='E-mail'
            error={errors.email}
          />

          <Input
            {...register('password')}
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
