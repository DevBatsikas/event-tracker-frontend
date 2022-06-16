import {
  Flex,
  Box,
  HStack,
  IconButton,
  Spacer,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Note = ({ id, body, updateNote, deleteNote }) => {
  const [editingBody, setEditingBody] = useState(false);
  const bodyRef = useRef();

  const handleEditClicked = () => {
    setEditingBody(true);
  };

  const handleDeleteClicked = () => {
    deleteNote(id);
  };

  const handleSaveClicked = () => {
    setEditingBody(false);
    if (bodyRef.current.value !== body) updateNote(id, bodyRef.current.value);
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
      {editingBody ? (
        <Textarea defaultValue={body} size="md" ref={bodyRef} />
      ) : (
        <Box>{body}</Box>
      )}
      <Spacer />
      <Flex direction="column" gap="2">
        <HStack gap="1">
          <IconButton
            aria-label="Edit"
            icon={<FaEdit />}
            variant="ghost"
            colorScheme="blue"
            size="sm"
            onClick={handleEditClicked}
          />
          <IconButton
            aria-label="Delete"
            icon={<FaTrash />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={handleDeleteClicked}
          />
        </HStack>
        {editingBody && (
          <Button colorScheme="blue" onClick={handleSaveClicked}>
            Save
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Note;
