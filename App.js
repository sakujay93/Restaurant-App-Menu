import './App.css';
import React from 'react';
import './RestaurantCSS.css';




class RestaurantApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menu : [], shortString : "", tableData : []}
    console.log(this.state.tableData)
  }
  componentDidMount () {
    fetch("http://stream-restaurant-menu-svc.herokuapp.com/category")
    .then((resp) => resp.json())
    .then((data) => this.setState({menu : data}))
  }
  renderTable = (index) => {
    let menuCopy = [...this.state.menu];
    let shortStringCopy = this.state.shortString;
    shortStringCopy = menuCopy[index].short_name;
    fetch(`http://stream-restaurant-menu-svc.herokuapp.com/item?category=${shortStringCopy}`)
    .then((sata) => sata.json())
    .then((data2) => this.setState({tableData : data2}))
    

  }
  render() {
    return (<>
            <h1>Menu Categories</h1>
            <ul>
              {this.state.menu.map((item, index) => (<li key={item.id} onClick={() => this.renderTable(index)}>{item.name}-({item.short_name}) </li>))}
           </ul>
           <div className="ata">
           <h2>Items in category:{this.state.tableData.filter((item) => console.log(item.short_name))}</h2>
             <table>
               <tbody>
               <tr>
                 <th>
                   Name
                 </th>
                 <th>
                   Description
                 </th>
               </tr>
               {this.state.tableData.map((item, index) => 
               <tr key={item.id}>
                 <td>{item.name}</td>
                 <td>{item.description}</td>
               </tr>)}
               </tbody>
             </table>
           </div>

           </>
           
           )
  }
}



function App() {
  return (
    <div className="App">
      <RestaurantApp />
    </div>
  );
}


export default App;

