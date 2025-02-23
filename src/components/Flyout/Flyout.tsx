import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../features/selectedItems/selectedItemsSlice';
import { RootState } from '../../store/store';
import { ThemeContext } from '../../context/ThemeContext';
import './Flyout.css';

const Flyout: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const dispatch = useDispatch();

  const handleDownload = () => {
    const csvContent = selectedItems.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItems.length}_pokemons.csv`;
    link.click();
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedItems.length} items selected</p>
      <button onClick={() => dispatch(clearItems())}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
