import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import { useRecoilValue } from 'recoil';
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
  const location = useLocation();
  const { hash, pathname, search } = useLocation();
  const auth = useRecoilValue(authState);
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
    console.log(location.pathname);
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);
  return (
    <div className="App">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen}>
          {books?.map((elem) => {
            return (
              <SidebarMenuItemPrimary
                expandable="true"
                text={elem.name}
                key={`${elem._id}Primary`}
              >
                <Link
                  to={`/books/${elem._id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}Dashboard`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}`
                    }
                  >
                    대시보드
                  </SidebarMenuItemSecondary>
                </Link>
                <Link
                  to={`/books/${elem._id}/calendar`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}calendar`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}/calendar`
                    }
                  >
                    타임라인 및 캘린더
                  </SidebarMenuItemSecondary>
                </Link>
                <Link
                  to={`/books/${elem._id}/table`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}table`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}/table`
                    }
                    key={`${elem._id}table`}
                  >
                    테이블
                  </SidebarMenuItemSecondary>
                </Link>
                <Link
                  to={`/books/${elem._id}/schedules`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}schedules`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}/schedules`
                    }
                  >
                    금융 일정
                  </SidebarMenuItemSecondary>
                </Link>
                <Link
                  to={`/books/${elem._id}/statistics`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}statistics`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}/statistics`
                    }
                  >
                    통계 보기
                  </SidebarMenuItemSecondary>
                </Link>
                <Link
                  to={`/books/${elem._id}/settings`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={`${elem._id}settings`}
                >
                  <SidebarMenuItemSecondary
                    highlighted={
                      elem._id == bookUuid &&
                      location.pathname == `/books/${elem._id}/settings`
                    }
                    key={`${elem._id}settings`}
                  >
                    가계부 설정
                  </SidebarMenuItemSecondary>
                </Link>
              </SidebarMenuItemPrimary>
            );
          })}
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
