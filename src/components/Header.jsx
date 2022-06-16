import { Flex, Spacer, IconButton, useToast } from '@chakra-ui/react';
import { FaStickyNote, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { storeLogout } from '#redux/slices/auth.slice';
import { storeResetNotes } from '#redux/slices/notes.slice';

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleNotesClicked = () => {
    navigate('/notes');
  };

  const handleLogoutClicked = () => {
    signOut(auth)
      .then(() => {
        dispatch(storeLogout());
        dispatch(storeResetNotes());
        toast({
          title: 'Successfully logged out.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate('/login');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Flex direction="row" w="100%" mb="2">
      <IconButton
        aria-label="Notes"
        icon={<FaStickyNote />}
        variant="ghost"
        colorScheme="blue"
        onClick={handleNotesClicked}
      />
      <Spacer />
      <IconButton
        aria-label="Logout"
        icon={<FaSignOutAlt />}
        variant="ghost"
        colorScheme="red"
        onClick={handleLogoutClicked}
      />
    </Flex>
  );
};

export default Header;
