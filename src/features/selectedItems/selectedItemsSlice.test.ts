import selectedItemsReducer, {
  addItem,
  removeItem,
  clearItems,
} from './selectedItemsSlice';

describe('selectedItemsSlice', () => {
  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
      selectedItems: [],
    });
  });

  it('should handle addItem', () => {
    const initialState = { selectedItems: [] };
    const nextState = selectedItemsReducer(initialState, addItem('pikachu'));
    expect(nextState.selectedItems).toEqual(['pikachu']);
  });

  it('should handle removeItem', () => {
    const initialState = { selectedItems: ['pikachu', 'bulbasaur'] };
    const nextState = selectedItemsReducer(initialState, removeItem('pikachu'));
    expect(nextState.selectedItems).toEqual(['bulbasaur']);
  });

  it('should handle clearItems', () => {
    const initialState = { selectedItems: ['pikachu', 'bulbasaur'] };
    const nextState = selectedItemsReducer(initialState, clearItems());
    expect(nextState.selectedItems).toEqual([]);
  });
});
