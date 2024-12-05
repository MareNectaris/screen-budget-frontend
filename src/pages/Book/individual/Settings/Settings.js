import AddIcon from '@mui/icons-material/Add';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Panel } from '../../../../components/Panel/Panel';
import { PaymentMethodIndividual } from '../../../../components/PaymentMethodIndividual/PaymentMethodIndividual';
import SettingsTable from '../../../../components/Settings/Settings';
import { TextboxLabel, Title } from '../../../../components/Text/Text';
import { Textbox } from '../../../../components/Textbox/Textbox';
import { authState } from '../../../../store/Auth';
export const Settings = ({}) => {
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  useEffect(() => {
    setMinorCategory('가계부 설정');
  }, []);
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const { bookUuid } = useParams();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookName, setBookName] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '',
    daily: '',
    monthly: '',
  });
  const [membersToChange, setMembersToChange] = useState([]);
  const [isPaymentMethodAddModalOpen, setIsPaymentMethodAddModalOpen] =
    useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethodName, setNewPaymentMethodName] = useState('');
  const paymentMethodPost = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/paymentMethods/${bookUuid}`,
      data,
      config
    );
    return response.data;
  };
  const paymentMethodPostMutation = useMutation({
    mutationFn: (data) => paymentMethodPost(data),
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });
  const handleAddPaymentMethod = () => {
    paymentMethodPostMutation.mutate({
      name: newPaymentMethodName,
    });
    setNewPaymentMethodName('');
  };
  const config = {
    headers: { Authorization: `${auth}` },
  };
  const categoryPost = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/categories/${bookUuid}`,
      config
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: categoryPost,
    onSuccess: (data) => {
      setCategories((prevCategories) => {
        const updatedCategories = data?.data
          .filter((elem) => !elem.isDeleted)
          .map((elem) => ({
            id: elem._id,
            name: elem.name,
            daily: elem.dailyBudget,
            monthly: elem.dailyBudget * 30,
            color: elem.color,
          }));

        const newCategoryIds = new Set(updatedCategories.map((cat) => cat.id));
        const filteredPrevCategories = prevCategories.filter(
          (cat) => !newCategoryIds.has(cat.id)
        );

        return [...filteredPrevCategories, ...updatedCategories];
      });
    },

    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'daily') {
      setNewCategory({
        ...newCategory,
        daily: value,
        monthly: value ? (value * 30).toString() : '',
      });
    } else if (name === 'monthly') {
      setNewCategory({
        ...newCategory,
        monthly: value,
        daily: value ? (value / 30).toString() : '',
      });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };
  const categoryAdd = async (objToAdd) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/categories/${bookUuid}`,
      objToAdd,
      config
    );
    return response.data;
  };
  const addMutation = useMutation({
    mutationFn: (objToAdd) => categoryAdd(objToAdd),
    onSuccess: (data, objToAdd) => {
      if (newCategory.name && newCategory.color) {
        setCategories([
          ...categories,
          {
            id: categories.length + 1,
            name: newCategory.name,
            daily: parseInt(newCategory.daily, 10) || 0,
            monthly: parseInt(newCategory.monthly, 10) || 0,
            color: newCategory.color,
          },
        ]);
        setNewCategory({ name: '', color: '', daily: '', monthly: '' });
        setIsModalOpen(false);
      } else {
        alert('카테고리 이름과 색상을 입력하세요.');
      }
    },

    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });

  const handleAddCategory = () => {
    if (!newCategory.color) alert('색상이 설정되지 않았습니다.');
    else
      addMutation.mutate({
        name: newCategory.name,
        color: newCategory.color,
        dailyBudget: parseInt(newCategory.daily, 10) || 0,
      });
  };
  const categoryDelete = async (idToDelete) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/categories/${bookUuid}/${idToDelete}`,
      config
    );
    return response.data;
  };
  const categoryDeleteMutation = useMutation({
    mutationFn: (idToDelete) => categoryDelete(idToDelete),
    onSuccess: (data, idToDelete) => {
      setCategories(
        categories.filter((category) => category.id !== idToDelete)
      );
    },

    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });
  const bookChange = async (data) => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks/${bookUuid}`,
      data,
      config
    );
    return response.data;
  };
  const bookChangeMutation = useMutation({
    mutationFn: (data) => bookChange(data),
    onSuccess: (data) => {
      navigate(0); //refresh
    },

    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });
  const bookDelete = async (data) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks/${bookUuid}`,
      config
    );
    return response.data;
  };
  const bookDeleteMutation = useMutation({
    mutationFn: bookDelete,
    onSuccess: (data) => {
      navigate('/'); //to top
    },

    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });
  const handleDeleteCategory = (id) => {
    categoryDeleteMutation.mutate(id);
  };
  const handleChangeBookName = () => {
    bookChangeMutation.mutate({
      name: bookName,
    });
  };
  const handleDeleteBook = () => {
    bookDeleteMutation.mutate();
  };
  const paymentMethodGet = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/paymentMethods/${bookUuid}`,
      config
    );
    return response.data;
  };
  const paymentMethodGetMutation = useMutation({
    mutationFn: paymentMethodGet,
    onSuccess: (data) => {
      if (data?.data) setPaymentMethods(data.data);
    },
    onError: (error) => {
      alert(error);
    },
  });
  const paymentMethodDelete = async (idToDelete) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/paymentMethods/${bookUuid}/${idToDelete}`,
      config
    );
    return response.data;
  };
  const paymentMethodDeleteMutation = useMutation({
    mutationFn: (idToDelete) => paymentMethodDelete(idToDelete),
    onSuccess: (data) => {
      navigate(0); //refresh
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    mutation.mutate();
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    paymentMethodGetMutation.mutate();
  }, []);

  useEffect(() => {
    mutation.mutate();
    paymentMethodGetMutation.mutate();
  }, [bookUuid]);

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
  return (
    <div style={{ height: '100%' }}>
      <div
        className="flex-1"
        style={{
          maxHeight: '100%',
          display: 'grid',
          gridGap: '12px',
          gridTemplateColumns: '1fr 1fr',
          height: '100%',
        }}
      >
        <div className="flex-1" style={{ minHeight: 0 }}>
          <div
            style={{
              display: 'grid',
              gridGap: '16px',
              gridTemplateRows: '1fr 1fr',
              height: '100%',
            }}
          >
            <Panel>
              <div className="flex-col" style={{ gap: '12px' }}>
                <Title>카테고리 및 예산 설정</Title>
                <SettingsTable
                  categories={categories}
                  setCategories={setCategories}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  handleInputChange={handleInputChange}
                  handleDeleteCategory={handleDeleteCategory}
                />
              </div>
            </Panel>
            <Panel>
              <div className="flex-col" style={{ gap: '12px' }}>
                <Title>멤버 설정</Title>
              </div>
            </Panel>
          </div>
        </div>
        <div className="flex-1" style={{ minHeight: 0 }}>
          <div className="flex-col" style={{ gap: '16px', height: '100%' }}>
            <Panel>
              <div className="flex-col" style={{ gap: '12px' }}>
                <Title>가계부 설정</Title>
                <div className="flex-col">
                  <TextboxLabel>가계부 이름</TextboxLabel>
                  <Textbox
                    type="text"
                    value={bookName}
                    setText={setBookName}
                    onKeyDown={() => {}}
                  />
                </div>

                <div className="flex-col" style={{ gap: '8px' }}>
                  <Button variant="contained" onClick={handleChangeBookName}>
                    저장
                  </Button>
                  <Button
                    variant="text"
                    style={{ color: 'red' }}
                    onClick={handleDeleteBook}
                  >
                    가계부 삭제
                  </Button>
                </div>
              </div>
            </Panel>
            <Panel className="flex-1">
              <div className="flex-col" style={{ gap: '12px' }}>
                <Title>결제 수단 설정</Title>
                {paymentMethods.map((elem) => {
                  return (
                    <PaymentMethodIndividual
                      _id={elem._id}
                      onDelete={() =>
                        paymentMethodDeleteMutation.mutate(elem._id)
                      }
                    >
                      {elem.name}
                    </PaymentMethodIndividual>
                  );
                })}
                <div
                  className="flex-row gap-6px pointer"
                  onClick={() => {
                    setIsPaymentMethodAddModalOpen(true);
                  }}
                >
                  <AddIcon />
                  <div className="medium">결제 수단 추가</div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="카테고리 추가"
      >
        <div className="flex-col modal-content flex-1">
          <div>
            <TextboxLabel>카테고리 이름</TextboxLabel>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextboxLabel>배경색</TextboxLabel>
            <input
              type="color"
              name="color"
              value={newCategory.color}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextboxLabel>하루 예산</TextboxLabel>
            <input
              type="number"
              name="daily"
              value={newCategory.daily}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextboxLabel>한 달 예산</TextboxLabel>
            <input
              type="number"
              name="monthly"
              value={newCategory.monthly}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="contained" onClick={handleAddCategory}>
            추가
          </Button>
          <Button variant="text" onClick={() => setIsModalOpen(false)}>
            취소
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isPaymentMethodAddModalOpen}
        setIsOpen={setIsPaymentMethodAddModalOpen}
        title="결제 수단 추가"
      >
        <div className="flex-col modal-content flex-1">
          <div>
            <TextboxLabel>결제 수단 이름</TextboxLabel>
            <Textbox
              type="text"
              name="name"
              value={newPaymentMethodName}
              setText={setNewPaymentMethodName}
              onKeyDown={() => {}}
            />
          </div>
          <Button variant="contained" onClick={handleAddPaymentMethod}>
            추가
          </Button>
          <Button
            variant="text"
            onClick={() => setIsPaymentMethodAddModalOpen(false)}
          >
            취소
          </Button>
        </div>
      </Modal>
    </div>
  );
};
