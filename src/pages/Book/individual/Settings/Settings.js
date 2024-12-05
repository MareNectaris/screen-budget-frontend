import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Panel } from '../../../../components/Panel/Panel';
import SettingsTable from '../../../../components/Settings/Settings';
import { TextboxLabel } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
export const Settings = ({ props, children }) => {
  // const [categories, setCategories] = useState([
  //   { id: 1, name: '구독비', daily: 30000, monthly: 900000, color: 'blue' },
  //   { id: 2, name: '식비', daily: 10000, monthly: 300000, color: 'green' },
  //   { id: 3, name: '교통비', daily: 1000, monthly: 30000, color: 'brown' },
  // ]);
  const [auth, setAuth] = useRecoilState(authState);
  const { bookUuid } = useParams();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '',
    daily: '',
    monthly: '',
  });
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

  useEffect(() => {
    mutation.mutate();
  }, []);

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
  const deleteMutation = useMutation({
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
  const handleDeleteCategory = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div className="flex-col flex-1" style={{ gap: '12px', maxHeight: '100%' }}>
      <div className="flex-1" style={{ minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',
            height: '100%',
          }}
        >
          <Panel>
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
          </Panel>
          <Panel></Panel>
        </div>
      </div>
      <div className="flex-1" style={{ minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',
            height: '100%',
          }}
        >
          <Panel></Panel>
          <Panel></Panel>
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
    </div>
  );
};
