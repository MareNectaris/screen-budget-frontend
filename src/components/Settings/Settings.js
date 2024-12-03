import React, { useState } from 'react';
import './Settings.css'; // 스타일 추가 필요

const SettingsTable = () => {
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
    <div className="settings-table-container">
      <table className="settings-table">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>하루 예산</th>
            <th>한 달 예산</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={{ backgroundColor: category.color }}>{category.name}</td>
              <td>{category.daily.toLocaleString()}원</td>
              <td>{category.monthly.toLocaleString()}원</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-category-btn" onClick={() => setIsModalOpen(true)}>
        + 카테고리 추가
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>카테고리 추가</h2>
            <div>
              <label>카테고리 이름:</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>배경색:</label>
              <input
                type="color"
                name="color"
                value={newCategory.color}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>하루 예산:</label>
              <input
                type="number"
                name="daily"
                value={newCategory.daily}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>한 달 예산:</label>
              <input
                type="number"
                name="monthly"
                value={newCategory.monthly}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleAddCategory}>추가</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTable;
