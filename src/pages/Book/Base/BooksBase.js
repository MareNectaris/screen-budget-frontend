import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import {
  SidebarMenuItemPrimary,
  SidebarMenuItemSecondary,
} from '../../../components/Sidebar/SidebarMenuItem';
import { NavbarCurrent, NavbarDirectory } from '../../../components/Text/Text';
import { authState } from '../../../store/Auth';
export const BooksBase = () => {
  const navigate = useNavigate();
  const { bookUuid } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [majorCategory, setMajorCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');
  const [books, setBooks] = useState([]);
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const booksPost = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks`,
      config
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: booksPost,
    onSuccess: (data) => {
      setBooks(data.accountBooks);
    },
    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });

  useEffect(() => {
    mutation.mutate();
  }, []);
  return (
    <div className="App">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen}>
          <SidebarMenuItemPrimary expandable="true" text="개인 가계부">
            <SidebarMenuItemSecondary highlighted>
              대시보드
            </SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>
              타임라인 및 캘린더
            </SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>테이블</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>금융 일정</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>통계 보기</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>가계부 설정</SidebarMenuItemSecondary>
          </SidebarMenuItemPrimary>
        </Sidebar>
      )}
      <div
        className="flex-col"
        style={{ gap: '12px', flexGrow: 1, padding: '12px' }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <NavbarDirectory>{majorCategory}</NavbarDirectory>
          <NavbarDirectory>/</NavbarDirectory>
          <NavbarCurrent>{minorCategory}</NavbarCurrent>
        </Navbar>

        <Outlet context={{ setMajorCategory, setMinorCategory }} />
      </div>
    </div>
  );
};
