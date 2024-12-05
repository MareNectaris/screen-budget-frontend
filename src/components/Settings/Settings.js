import React from 'react';
import './Settings.css'; // 스타일 추가 필요

export const SettingsTable = ({
  categories,
  setCategories,
  isModalOpen,
  setIsModalOpen,
  newCategory,
  setNewCategory,
  handleInputChange,
  handleDeleteCategory,
}) => {
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
              <td style={{ backgroundColor: category.color }}>
                {category.name}
              </td>
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
    </div>
  );
};

export default SettingsTable;
