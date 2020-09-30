import React from 'react';

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
    fetch("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1")
      .then(res => res.json())
      .then(
        (res) => { this.setState({ isLoaded: true, items: res }) },
        (error) => {  this.setState({ isLoaded: true, error }) }
      )
  }
  getOneItem(id){
    fetch("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/"+id)
      .then(res => res.json())
      .then(
        (res) => { this.setState({ isLoaded: true, selectedItemBody:'Тело выбранной записи: '+ res.body }) },
        (error) => {  this.setState({ isLoaded: true, error }) }
      )
  }
  createItem(){
    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Created via REST api mf', body: this.generateText('create')})
        };
    fetch("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1", requestOptions)
            .then(res => res.json())
            .then(
              (result) => { this.setState({ items: [...this.state.items,result]}) },
              (error) => {  this.setState({ isLoaded: true, error }) }
            )
  }
  
  editItem(id){    
    // let random = ;

    const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Edited via REST api mf', text: this.generateText('update') })
        };
    fetch("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/"+id, requestOptions)
            .then(res => res.json())
            .then(
              (res) => {
              let newItems = this.state.items;
              let foundIndex = newItems.findIndex(el => el.id == res.id);
              newItems[foundIndex].text = res.text; 
              newItems[foundIndex].title = res.title;
              
               this.setState({ 
                items: newItems   
              }) 
             },
              (error) => {  this.setState({ isLoaded: true, error }) }
            )
  }

  deleteItem(id){    
    let random = 'updated with random string: ' + Math.random().toString(36).substring(7);

    const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Deleted via REST api mf' })
        };
    fetch("https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1/"+id, requestOptions)
            .then(res => res.json())
            .then(
              (res) => {
              let newItems = this.state.items.filter(el => el.id !== res.id);
              
               this.setState({ items: newItems }) 
               
             },
              (error) => {  this.setState({ isLoaded: true, error }) }
            )
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