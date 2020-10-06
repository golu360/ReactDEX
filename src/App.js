import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import axios from 'axios';


class PokeBox extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let listsItems = ""
   if(this.props.abilities){
    listsItems= this.props.abilities.map(item=>
      <li>{item.slot}. {item.ability.name}</li>)

   }
    return(
      <div className='box-pokemon'>
        <p>You have selected: {this.props.name}</p>
        <img src={this.props.front_default} alt={this.props.name}></img>
        <img src={this.props.front_shiny} alt={this.props.name}></img>
        <ul>
          <p>Abilities</p>
        {listsItems}
        </ul>

      </div>
    )
  }
}


class Pokemon extends React.Component{
  constructor(){
    super();
    this.state = {name:"",
  front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  showShiny:false}
this.show = this.show.bind(this);
  }

componentDidMount= async()=>{
    const res = await axios.get(this.props.url);
    const data = res.data


    this.setState({
      name:data.name,
      front_default:data.sprites.front_default,
      front_shiny:data.sprites.front_shiny
    })

    
  }



show = ()=>{
  this.setState({showShiny:!this.state.showShiny})
}

componentDidUpdate(){
  
}



  render(){
    
    
    
    
    return(
      
      <div style={{display:'inline-block',marginLeft:'20px',textAlign:'center',outlineWidth:"5px",outlineColor:"black"}} 
      onClick={this.props.clicked}>

        <p >{this.state.name}</p>
        <img src={this.state.showShiny ? this.state.front_shiny : this.state.front_default} alt="Can't load image"></img>
        <div>
          <label>Shiny</label>
          <input type='checkbox' onClick={this.show}></input>
        </div>
        
      </div>
    )
  }




}




class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {name:"",
  front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  abilities:[]
}
  this.selectPokemon = this.selectPokemon.bind(this);
    
  }


  selectPokemon= async(id)=>{
    
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/"+id.toString());
    const data = res.data
    


    this.setState({
      name:data.name,
      front_default:data.sprites.front_default,
      front_shiny:data.sprites.front_shiny,
      abilities:data.abilities
    })

  }


render(){
let urls = []

for( let i=1;i<=151;i++){
  var u = "https://pokeapi.co/api/v2/pokemon/"+i.toString();
  var id = i;
  var obj = {url:u,key:id}
  urls.push(obj);
}



const items = urls.map(u=>
  <Pokemon url={u.url} key={u.key} clicked={()=>this.selectPokemon(u.key)}/>
)



  return(
    <div>
      <PokeBox name={this.state.name} front_default={this.state.front_default} abilities={this.state.abilities} />
      {items}
    </div>
  )

  }

  
    
  }

  

  







export default React.memo(App);
