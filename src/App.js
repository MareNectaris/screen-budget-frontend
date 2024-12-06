import { BrowserRouter, Route, Routes } from 'react-router';
import { useRecoilState } from 'recoil';
import './App.css';
import { Continue } from './pages/Auth/Continue/Continue';
import { FirstTimeSetup } from './pages/Auth/FirstTimeSetup/FirstTimeSetup';
import { Landing } from './pages/Auth/Landing/Landing';
import { Login } from './pages/Auth/Login/Login';
import { Logout } from './pages/Auth/Logout/Logout';
import { Register } from './pages/Auth/Register/Register';
import { BooksBase } from './pages/Book/Base/BooksBase';
import { Dashboard } from './pages/Book/common/Dashboard/Dashboard';
import { FinanceSchedule } from './pages/Book/common/FinanceSchedule/FinanceSchedule';
import { NewsList } from './pages/Book/common/News/News';
import { Settings } from './pages/Book/common/Settings/Settings';
import { Stats } from './pages/Book/common/Stats/Stats';
import { TableView } from './pages/Book/common/TableView/TableView';
import { TimelineAndCalendar } from './pages/Book/common/TimelineAndCalendar/TimelineAndCalendar';
import { Main } from './pages/Book/Main/Main';
import {
  firstTimeSetupRequiredState,
  isReInitState,
  isSignedInState,
} from './store/Auth';
function App() {
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [isReInit, setIsReInit] = useRecoilState(isReInitState);
  const [firstTimeSetupRequired, setFirstTimeSetupRequired] = useRecoilState(
    firstTimeSetupRequiredState
  );
  return (
    <BrowserRouter>
      {isReInit ? (
        <Routes>
          <Route path="*" element={<Continue />} />
        </Routes>
      ) : isSignedIn ? (
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="auth">
            <Route path="logout" element={<Logout />}></Route>
          </Route>
          {firstTimeSetupRequired && (
            <Route path="firstTimeSetup" element={<FirstTimeSetup />} />
          )}
          <Route path="/books/:bookUuid" element={<BooksBase />}>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<NewsList />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calendar" element={<TimelineAndCalendar />} />
            <Route path="table" element={<TableView />} />
            <Route path="schedules" element={<FinanceSchedule />} />
            <Route path="statistics" element={<Stats />} />
          </Route>
          <Route path="/news" element={<BooksBase />}>
            <Route index element={<NewsList />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
