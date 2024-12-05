import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Panel } from '../../../../components/Panel/Panel';
import SettingsTable from '../../../../components/Settings/Settings';
import { TextboxLabel } from '../../../../components/Text/Text';
export const Settings = ({ props, children }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: '구독비', daily: 30000, monthly: 900000, color: 'blue' },
    { id: 2, name: '식비', daily: 10000, monthly: 300000, color: 'green' },
    { id: 3, name: '교통비', daily: 1000, monthly: 30000, color: 'brown' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '',
    daily: '',
    monthly: '',
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

  const handleAddCategory = () => {
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
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
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
