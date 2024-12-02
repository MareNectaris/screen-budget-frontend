import { BrowserRouter, Route, Routes } from 'react-router';
import { useRecoilState } from 'recoil';
import './App.css';
import { Landing } from './pages/Auth/Landing/Landing';
import { Login } from './pages/Auth/Login/Login';
import { Register } from './pages/Auth/Register/Register';
import { TestPage } from './pages/Test/TestPage';
import { authState, isSignedInState } from './store/Auth';
function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  return (
    <BrowserRouter>
      {isSignedIn ? (
        <Routes>
          <Route path="/" element={<div>app</div>} />
          <Route path="tests">
            <Route index element={<TestPage />} />
          </Route>
          <Route path="auth"></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tests" element={<TestPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
