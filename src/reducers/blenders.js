import Store from '../store/blenders';

export const initialState = Store;

export default function blenderReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'BLENDERS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'BLENDERS_REPLACE': {
      let blenders = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        blenders = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        blenders,
      };
    }
    default:
      return state;
  }
}
