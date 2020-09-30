import React from 'react';
import axios from 'axios';

export default class FetchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      selectedItemBody: ''
    };
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getOneItem = this.getOneItem.bind(this);
  }

  componentDidMount() {
    axios.get(`https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1`)
    .then(res => this.setState({ isLoaded: true, items: res.data }) )
  }

  getOneItem(id){
    axios.get(`https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/`+id)
    .then(res => this.setState({ isLoaded: true, selectedItemBody:'Тело выбранной записи: '+ res.data.body }) )
  }

  createItem(){
    axios.post("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1", {
        title: 'Created via REST api mf', 
        body: this.generateText('create')
      })
      .then(res => this.setState({ items: [...this.state.items,res.data]}))
      .catch(error => this.setState({ isLoaded: true, error }));
  }
  
  editItem(id){    
    axios.put("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/"+id, {
        title: 'Edited via REST api mf', 
        text: this.generateText('update')
      })
      .then(res => {
        let newItems = this.state.items;
        let foundIndex = newItems.findIndex(el => el.id == res.data.id);
        newItems[foundIndex].text = res.data.text; 
        newItems[foundIndex].title = res.data.title;
        this.setState({ items: newItems });
        console.log(res);
      })
      .catch(error => this.setState({ isLoaded: true, error }) );
  }

  deleteItem(id){    
    axios.delete("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/"+id, {
        title: 'Deleted via REST api mf'
      })
    .then(res => {
      let newItems = this.state.items.filter(el => el.id !== res.data.id);
      this.setState({ items: newItems })
    })
    .catch(error => this.setState({ isLoaded: true, error }) );
  }

  generateText(action){
    if(action === 'update'){
      return 'updated with random string: ' + Math.random().toString(36).substring(7);  
    } else {
      return 'generated body text: ' + Math.random().toString(36).substring(1);  
    }
  }
  render() {
    const { error, isLoaded, items } = this.state;//по ходу это равноценно bind в конструкторе
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <>
          <a href="https://mockapi.io/projects/5f591fbc8040620016ab8e0c"><h2>смотреть mock api</h2></a>
          
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.text}
                <button onClick={()=>this.getOneItem(item.id)}>смотреть</button>
                <button onClick={()=>this.editItem(item.id)}>редактировать</button>
                <button onClick={()=>this.deleteItem(item.id)}>удалить</button>

              </li>
            ))}
          </ul>


          <button onClick={this.createItem}>добавить</button>
          <div>{this.state.selectedItemBody}</div>
        </>
      );
    }
  }
}