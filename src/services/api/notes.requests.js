import endpoint from './endpoint';

export const apiFetchAllNotes = async uid => {
  const res = await fetch(endpoint + '/notes/all/' + uid);
  return res;
};

export const apiAddNote = async (uid, body) => {
  const res = await fetch(endpoint + '/notes/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: uid,
      body: body,
    }),
  });

  return res;
};

export const apiEditNote = async (id, body) => {
  const res = await fetch(endpoint + '/notes/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      body: body,
    }),
  });

  return res;
};

export const apiDeleteNote = async id => {
  const res = await fetch(endpoint + '/notes/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  return res;
};
