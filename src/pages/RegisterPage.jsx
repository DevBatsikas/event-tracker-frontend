import { Center } from '@chakra-ui/react';
import RegistrationForm from '#components/RegistrationForm';

const RegisterPage = () => {
  return (
    <Center h="100vh">
      <RegistrationForm isLoginForm={false} />
    </Center>
  );
};

export default RegisterPage;
