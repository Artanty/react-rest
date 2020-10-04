import React from 'react';

import {fetchItems, createItem, editItem, deleteItem} from '../actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FetchComponent extends React.Component {
  constructor(props) {
    super(props);
  
    this.createItemTrigger = this.createItemTrigger.bind(this);
    this.editItemTrigger = this.editItemTrigger.bind(this);
    this.deleteItemTrigger = this.deleteItemTrigger.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchItems());
  }
  
  createItemTrigger(){
    this.props.dispatch(createItem());
  }
  
  editItemTrigger(item){    
    item.text = item.text+' edited';
    this.props.dispatch(editItem(item));      
  }

  deleteItemTrigger(id){
    this.props.dispatch(deleteItem(id));
  }

  generateText(action){
    if(action === 'update'){
      return 'updated with random string: ' + Math.random().toString(36).substring(7);  
    } else {
      return 'generated body text: ' + Math.random().toString(36).substring(1);  
    }
  }
  render() {
   
    const { items_1 } = this.props;

      if (items_1.error) {
        return <div>Ошибка! {items_1.error}</div>;
      }

      else if (items_1.loading) {
        return <div>Загрузка...</div>;
      // }
      } else if(Array.isArray(items_1.items)) {
        return (
          <>
            <a target="_blank" href="https://mockapi.io/projects/5f591fbc8040620016ab8e0c"><h2>смотреть mock api</h2></a>
            <button onClick={()=>this.createItemTrigger()}>добавить item в items_1</button>
            <ul>
              {items_1.items.map(item => (
                <li key={item.id}>
                  {item.text}
                  
                  <button onClick={()=>this.editItemTrigger(item)}>редактировать</button>
                  <button onClick={()=>this.deleteItemTrigger(item.id)}>удалить</button>

                </li>
              ))}
            </ul>
          </>
          
        );
      } else {
        return <div>Загрузка...</div>;
      } 
  }
}

const mapStateToProps = state => ({//1 - что это будет в пропсах, 2 - что это есть в стэйте стора
  items_1: state.items_1
});
export default connect(mapStateToProps)(FetchComponent);