import AddIcon from '@mui/icons-material/Add';
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
import { Button } from '../../../components/Button/Button';
import { MemberIndividual } from '../../../components/MemberIndividual/MemberIndividual';
import { Modal } from '../../../components/Modal/Modal';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Radio } from '../../../components/Radio/Radio';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import {
  SidebarMenuItemPrimary,
  SidebarMenuItemSecondary,
} from '../../../components/Sidebar/SidebarMenuItem';
import {
  NavbarCurrent,
  NavbarDirectory,
  TextboxLabel,
} from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
import { authState } from '../../../store/Auth';
export const BooksBase = () => {
  const navigate = useNavigate();
  const { bookUuid } = useParams();
  const location = useLocation();
  const auth = useRecoilValue(authState);
  const [myId, setMyId] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [majorCategory, setMajorCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');
  const [selectedRadio, setSelectedRadio] = useState();
  const [newBookName, setNewBookName] = useState('');
  const [newBookMembers, setNewBookMembers] = useState([]);
  const [newMemberInputValue, setNewMemberInputValue] = useState('');
  const [newMemberInputOpen, setNewMemberInputOpen] = useState(false);
  const [isCreateNewBookModalOpen, setIsCreateNewBookModalOpen] =
    useState(false);
  const [books, setBooks] = useState([]);
  const config = {
    headers: { Authorization: `${auth}` },
  };
  const handleRadioChange = (val) => {
    setSelectedRadio(val);
  };

  const bookPost = async (body) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks`,
      body,
      config
    );
    return response.data;
  };
  const bookPostMutation = useMutation({
    mutationFn: (body) => bookPost(body),
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });
  const handleCreateBook = () => {
    if (!selectedRadio || newBookName === '') {
      alert('이름이 비어 있거나 분류가 선택되어 있지 않습니다.');
      return;
    }
    const body = {
      type: selectedRadio,
      name: newBookName,
      ...(selectedRadio === 'group' && {
        memberEmailsInput: newBookMembers,
      }),
    };
    bookPostMutation.mutate(body);
  };

  const profileGet = async (record) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/members/profile`,
      config
    );
    return response.data;
  };
  const profileGetMutation = useMutation({
    mutationFn: profileGet,
    onSuccess: (data) => {
      if (data) setMyId(data);
    },
    onError: (error) => {
      alert(error);
    },
  });
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
    profileGetMutation.mutate();
  }, []);

  useEffect(() => {
    mutation.mutate();
  }, [bookUuid]);
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
          <SidebarMenuItemPrimary
            expandable={false}
            type="add"
            text="새 가계부"
            onClick={() => setIsCreateNewBookModalOpen(true)}
          />
          <SidebarMenuItemPrimary
            expandable={false}
            type="newspaper"
            text="뉴스"
            onClick={() => navigate('/news')}
          />
          <SidebarMenuItemPrimary
            expandable={false}
            type="logout"
            text="로그아웃"
            onClick={() => navigate('/auth/logout')}
          />
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
          {majorCategory && (
            <div className="flex-row" style={{ gap: '12px' }}>
              <NavbarDirectory>{majorCategory}</NavbarDirectory>
              <NavbarDirectory>/</NavbarDirectory>
            </div>
          )}
          <NavbarCurrent>{minorCategory}</NavbarCurrent>
        </Navbar>

        <Outlet
          context={{
            setMajorCategory,
            setMinorCategory,
            books,
            setBooks,
          }}
        />
      </div>
      <Modal
        isOpen={isCreateNewBookModalOpen}
        setIsOpen={setIsCreateNewBookModalOpen}
        title="새 가계부"
      >
        <div className="flex-col" style={{ gap: '12px' }}>
          <div className="flex-col">
            <TextboxLabel>분류</TextboxLabel>
            <div className="flex-row gap-6px">
              <Radio
                name="type"
                value="personal"
                checked={selectedRadio === 'personal'}
                handleChange={handleRadioChange}
              >
                개인
              </Radio>
              <Radio
                name="type"
                value="group"
                checked={selectedRadio === 'group'}
                handleChange={handleRadioChange}
              >
                그룹
              </Radio>
            </div>
          </div>
          <div className="flex-col" style={{ gap: '12px' }}>
            <TextboxLabel>이름</TextboxLabel>
            <Textbox
              type="text"
              value={newBookName}
              setText={setNewBookName}
              onKeyDown={() => {}}
            />
          </div>
          {selectedRadio === 'group' && (
            <div className="flex-col gap-6px">
              <TextboxLabel>멤버 리스트</TextboxLabel>
              <MemberIndividual _id="me" onDelete={() => {}} me={true}>
                나
              </MemberIndividual>
              {newBookMembers.map((elem) => {
                return (
                  <MemberIndividual
                    _id={elem}
                    onDelete={() => {
                      setNewBookMembers(
                        newBookMembers.filter((e) => elem !== e)
                      );
                    }}
                  >
                    {elem}
                  </MemberIndividual>
                );
              })}
              {newMemberInputOpen ? (
                <div className="flex-row">
                  <Textbox
                    type="text"
                    value={newMemberInputValue}
                    setText={setNewMemberInputValue}
                    onKeyDown={() => {}}
                    className="flex-1"
                    placeholder="이메일 입력"
                  />
                  <Button
                    variant="text"
                    onClick={() => {
                      setNewBookMembers([
                        ...newBookMembers,
                        newMemberInputValue,
                      ]);
                      setNewMemberInputOpen(false);
                      setNewMemberInputValue('');
                    }}
                  >
                    추가
                  </Button>
                </div>
              ) : (
                <div
                  className="flex-row gap-6px pointer"
                  onClick={() => {
                    setNewMemberInputOpen(true);
                  }}
                >
                  <AddIcon />
                  <div className="medium">멤버 추가</div>
                </div>
              )}
            </div>
          )}
          <Button variant="contained" onClick={() => handleCreateBook()}>
            가계부 만들기
          </Button>
        </div>
      </Modal>
    </div>
  );
};
