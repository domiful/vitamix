import Store from '../store/devices';

export const initialState = Store;

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case 'DEVICES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'SINGLE_DEVICE': {
      return {
        ...state,
        device: action.data
      };
    }
    case 'DEVICES_REPLACE': {
      let devices = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        devices = action.data.map(item => ({
          id: item.id,
          name: item.name,
          body: item.eTag,
          createdBy: item.createdBy,
          createdOn: item.createdOn,
          modifiedBy: item.modifiedBy,
          modifiedOn: item.modifiedOn,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        devices,
      };
    }
    default:
      return state;
  }
}
