import { BrowserRouter, Route, Routes } from 'react-router';
import { useRecoilState } from 'recoil';
import './App.css';
import { FirstTimeSetup } from './pages/Auth/FirstTimeSetup/FirstTimeSetup';
import { Landing } from './pages/Auth/Landing/Landing';
import { Login } from './pages/Auth/Login/Login';
import { Logout } from './pages/Auth/Logout/Logout';
import { Register } from './pages/Auth/Register/Register';
import { ReInit } from './pages/Auth/ReInit/ReInit';
import { Dashboard } from './pages/Book/individual/Dashboard/Dashboard';
import { Main } from './pages/Book/Main/Main';
import { Loading } from './pages/Loading/Loading';
import { TestPage } from './pages/Test/TestPage';
import {
  authState,
  firstTimeSetupRequiredState,
  isReInitState,
  isSignedInState,
} from './store/Auth';
function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [isReInit, setIsReInit] = useRecoilState(isReInitState);
  const [firstTimeSetupRequired, setFirstTimeSetupRequired] = useRecoilState(
    firstTimeSetupRequiredState
  );
  return (
    <BrowserRouter>
      {isReInit ? (
        <Routes>
          <Route path="*" element={<ReInit />} />
        </Routes>
      ) : isSignedIn ? (
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="tests">
            <Route index element={<TestPage />} />
            <Route path="firstTimeSetup" element={<FirstTimeSetup />} />
            <Route path="loading" element={<Loading />} />
          </Route>
          <Route path="auth">
            <Route path="logout" element={<Logout />}></Route>
          </Route>
          {firstTimeSetupRequired && (
            <Route path="firstTimeSetup" element={<FirstTimeSetup />} />
          )}
          <Route path="/books/:bookUuid" element={<Dashboard />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tests">
            <Route index element={<TestPage />} />
            <Route path="firstTimeSetup" element={<FirstTimeSetup />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
