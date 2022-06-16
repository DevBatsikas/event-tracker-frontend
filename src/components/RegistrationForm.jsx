import { useState, useRef } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  HStack,
  Input,
  Button,
  useToast,
  Link,
  CircularProgress,
} from '@chakra-ui/react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const RegistrationForm = ({ isLoginForm }) => {
  const [circularProgressVisible, setCircularProgressVisible] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const auth = getAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegisterClicked = async () => {
    setCircularProgressVisible(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setCircularProgressVisible(false);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
    } catch (err) {
      setCircularProgressVisible(false);
      let toastTitle = '';
      switch (err.code) {
        case 'auth/invalid-email':
          toastTitle = 'Email is not valid.';
          break;
        case 'auth/email-already-in-use':
          toastTitle = 'Email is already in use.';
          break;
        case 'auth/weak-password':
          toastTitle = 'Password is too weak.';
          break;
        default:
          toastTitle = 'Internal Server Error.';
          break;
      }
      toast({
        title: toastTitle,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogInClicked = async () => {
    setCircularProgressVisible(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setCircularProgressVisible(false);
      toast({
        title: 'Successfully logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      setCircularProgressVisible(false);
      let toastTitle = '';
      switch (err.code) {
        case 'auth/invalid-email':
          toastTitle = 'Email is not valid.';
          break;
        case 'auth/wrong-password':
          toastTitle = 'Wrong password.';
          break;
        default:
          toastTitle = 'Internal Server Error.';
          break;
      }
      toast({
        title: toastTitle,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl
      w={['100%', '50%', '25%', '20%']}
      maxW="400px"
      ml={[2, null, null, null]}
      mr={[2, null, null, null]}
    >
      <VStack>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" ref={emailRef} />
        <FormHelperText>We'll never share your credentials.</FormHelperText>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" type="password" ref={passwordRef} />

        <HStack spacing={[2, 6, 6, 6]} paddingTop="10px">
          {isLoginForm ? (
            <>
              <Button
                colorScheme="teal"
                leftIcon={<FaSignInAlt />}
                onClick={handleLogInClicked}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="purple"
                leftIcon={<FaUserPlus />}
                onClick={handleRegisterClicked}
              >
                Register
              </Button>
            </>
          )}
        </HStack>

        {circularProgressVisible ? (
          <>
            {isLoginForm ? (
              <CircularProgress
                isIndeterminate
                color="teal.200"
                thickness="5px"
              />
            ) : (
              <CircularProgress
                isIndeterminate
                color="purple.200"
                thickness="5px"
              />
            )}
          </>
        ) : (
          <></>
        )}

        {isLoginForm ? (
          <Link as={ReactLink} to="/register" color="teal.200">
            Register instead.
          </Link>
        ) : (
          <Link as={ReactLink} to="/login" color="teal.200">
            Log In instead.
          </Link>
        )}

        <FormHelperText>Powered by Firebase.</FormHelperText>
      </VStack>
    </FormControl>
  );
};

export default RegistrationForm;
