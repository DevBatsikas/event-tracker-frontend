import firebaseApp from '#firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { storeLogin } from '#redux/slices/auth.slice';
import { useEffect } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from '#pages/LoginPage';
import RegisterPage from '#pages/RegisterPage';
import NotesPage from '#pages/NotesPage';

const App = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(firebaseApp);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(storeLogin(user.uid));
        navigate('/notes');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={loggedIn ? <Navigate replace to="/notes" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={loggedIn ? <Navigate replace to="/notes" /> : <RegisterPage />}
      />
      <Route
        path="/notes"
        element={loggedIn ? <NotesPage /> : <Navigate replace to="/login" />}
      />
      <Route path="*" element={<Navigate replace to="/notes" />} />
    </Routes>
  );
};

export default App;
