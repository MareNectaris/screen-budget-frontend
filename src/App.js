import { BrowserRouter, Route, Routes } from 'react-router';
import { useRecoilState } from 'recoil';
import './App.css';
import { FirstTimeSetup } from './pages/Auth/FirstTimeSetup/FirstTimeSetup';
import { Landing } from './pages/Auth/Landing/Landing';
import { Login } from './pages/Auth/Login/Login';
import { Logout } from './pages/Auth/Logout/Logout';
import { Register } from './pages/Auth/Register/Register';
import { TestPage } from './pages/Test/TestPage';
import {
  authState,
  firstTimeSetupRequiredState,
  isSignedInState,
} from './store/Auth';
function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [firstTimeSetupRequired, setFirstTimeSetupRequired] = useRecoilState(
    firstTimeSetupRequiredState
  );
  return (
    <BrowserRouter>
      {isSignedIn ? (
        <Routes>
          <Route path="/" element={<div>app</div>} />
          <Route path="tests">
            <Route index element={<TestPage />} />
          </Route>
          <Route path="auth">
            <Route path="logout" element={<Logout />}></Route>
          </Route>
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
          {firstTimeSetupRequired ?? (
            <Route path="firstTimeSetup" element={<FirstTimeSetup />} />
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
