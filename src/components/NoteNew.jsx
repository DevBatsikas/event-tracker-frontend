import { Flex, Spacer, Textarea, Button } from '@chakra-ui/react';
import { useRef } from 'react';

const NoteNew = ({ saveNote }) => {
  const bodyRef = useRef();

  const handleSaveClicked = () => {
    if (bodyRef.current.value !== '') saveNote(bodyRef.current.value);
  };

  return (
    <Flex
      direction="row"
      w="100%"
      align="flex-start"
      gap="5"
      p="3"
      bgColor="gray.900"
      rounded="md"
    >
      <Textarea size="md" ref={bodyRef} placeholder="Note body..." />
      <Spacer />
      <Flex direction="column" gap="2">
        <Button colorScheme="blue" onClick={handleSaveClicked}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default NoteNew;
