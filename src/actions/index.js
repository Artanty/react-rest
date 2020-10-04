import rest from '../api/rest';
import {FETCH_ITEMS_SUCCESS,FETCH_ITEMS_BEGIN,FETCH_ITEMS_FAILURE,
    CREATE_ITEM,
    EDIT_ITEM,
    DELETE_ITEM
} from "../constants/action-types";


const apiActions = {

    getItemsRequest(){
        return rest({
            url: '/',
            method: 'GET',
            data: {page:1},
            responseHandler: ({data}) => data
        });
    },

    createItemRequest(data){
        return rest({
            url: '/',
            method: 'POST',
            data: {data},
            responseHandler: ({data}) => data
        });
    },

    editItemRequest(data){
        return rest({
            url: '/'+data.id,
            method: 'PUT',
            data: data,
            responseHandler: (data) => data
        });
    },

    deleteItemRequest(id){
        return rest({
            url: '/'+id,
            method: 'DELETE',
            data: '',
            responseHandler: ({data}) => data
        });
    }

}
export default apiActions;


export function fetchItems() {
  return dispatch => {
    dispatch(fetchItemsBegin());
    return apiActions.getItemsRequest()
    .then(res => dispatch(fetchItemsSuccess(res)) )
    .catch(error => dispatch(fetchItemsFailure(error)) );
  }
}

export const fetchItemsSuccess = res => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: res
});
export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN
});
export const fetchItemsFailure = error => ({
  type: FETCH_ITEMS_FAILURE,
  payload: error 
});

export function createItem() {
  return dispatch => {
    return apiActions.createItemRequest()
    .then(res => dispatch(createItemSuccess(res)) );
  }
}

export const createItemSuccess = res => ({
  type: CREATE_ITEM,
  payload: res
});

export function editItem(item) {
  return dispatch => {
    return apiActions.editItemRequest(item)
    .then(res => dispatch(editItemSuccess(res)) );
  }
}

export const editItemSuccess = res => ({
  type: EDIT_ITEM,
  payload: res
});

export function deleteItem(id) {
  return dispatch => {
    return apiActions.deleteItemRequest(id)
    .then(res =>  dispatch(deleteItemSuccess(res)) )
  }
}

export const deleteItemSuccess = res => ({
  type: DELETE_ITEM,
  payload: res
});