import { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  storeUpdateNotes,
  storeResetNotes,
} from '#redux/slices/notes.slice.js';

// API
import {
  apiFetchAllNotes,
  apiAddNote,
  apiEditNote,
  apiDeleteNote,
} from '#api/notes.requests.js';

// Chakra
import {
  Center,
  VStack,
  CircularProgress,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

// Components
import Header from '#components/Header';
import Note from '#components/Note';
import NoteNew from '#components/NoteNew';

const NotesPage = () => {
  const uid = useSelector(state => state.auth.uid);
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  const [circularProgressVisible, setCircularProgressVisible] = useState(false);
  const [addNoteVisible, setAddNoteVisible] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setCircularProgressVisible(true);
    // Check if uid is null before pulling data.
    if (uid) fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Fetch notes and dispatch them to the store.
  const fetchNotes = async () => {
    setCircularProgressVisible(true);
    const res = await apiFetchAllNotes(uid);

    let toastTitle = '';
    let toastStatus = '';
    switch (res.status) {
      case 200:
        toastTitle = 'Notes loaded successfully.';
        toastStatus = 'success';
        dispatch(storeUpdateNotes(await res.json()));
        break;
      case 404:
        toastTitle = 'No notes found.';
        toastStatus = 'error';
        dispatch(storeResetNotes());
        break;
      default:
        toastTitle = 'Internal Server Error.';
        toastStatus = 'error';
        break;
    }

    toast({
      title: toastTitle,
      status: toastStatus,
      duration: 7000,
      isClosable: true,
    });

    setCircularProgressVisible(false);
  };

  const addNote = async body => {
    const res = await apiAddNote(uid, body);

    let toastTitle = '';
    let toastStatus = '';
    switch (res.status) {
      case 201:
        toastTitle = 'Note created successfully.';
        toastStatus = 'success';
        fetchNotes();
        break;
      default:
        toastTitle = 'Internal Server Error.';
        toastStatus = 'error';
        break;
    }

    toast({
      title: toastTitle,
      status: toastStatus,
      duration: 7000,
      isClosable: true,
    });
    setAddNoteVisible(false);
  };

  const updateNote = async (id, body) => {
    const res = await apiEditNote(id, body);

    let toastTitle = '';
    let toastStatus = '';
    switch (res.status) {
      case 200:
        toastTitle = 'Note updated successfully.';
        toastStatus = 'success';
        fetchNotes();
        break;
      default:
        toastTitle = 'Internal Server Error.';
        toastStatus = 'error';
        break;
    }

    toast({
      title: toastTitle,
      status: toastStatus,
      duration: 7000,
      isClosable: true,
    });
  };

  const deleteNote = async id => {
    const res = await apiDeleteNote(id);

    let toastTitle = '';
    let toastStatus = '';
    switch (res.status) {
      case 200:
        toastTitle = 'Note deleted successfully.';
        toastStatus = 'success';
        fetchNotes();
        break;
      default:
        toastTitle = 'Internal Server Error.';
        toastStatus = 'error';
        break;
    }

    toast({
      title: toastTitle,
      status: toastStatus,
      duration: 7000,
      isClosable: true,
    });
  };

  return (
    <Center h="100vh">
      <VStack minH="100vh" maxW="800px" w="100%" p="2" gap="1">
        <Header />
        <IconButton
          w="100%"
          icon={<FaPlus />}
          colorScheme="blue"
          variant="ghost"
          onClick={() => {
            setAddNoteVisible(!addNoteVisible);
          }}
        />
        {circularProgressVisible && (
          <CircularProgress isIndeterminate color="blue.200" thickness="5px" />
        )}
        {addNoteVisible && <NoteNew saveNote={addNote} />}
        {notes.map(({ id, body }) => (
          <Note
            key={id}
            id={id}
            body={body}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        ))}
      </VStack>
    </Center>
  );
};

export default NotesPage;
