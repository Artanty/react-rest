import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

store.subscribe(() => { //подписка на изменения стора
    console.log(store.getState().items_1.items);
});

export default store;