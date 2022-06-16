import { Center } from '@chakra-ui/react';
import RegistrationForm from '#components/RegistrationForm';

const LoginPage = () => {
  return (
    <Center h="100vh">
      <RegistrationForm isLoginForm={true} />
    </Center>
  );
};

export default LoginPage;
