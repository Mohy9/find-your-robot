import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import './App.css';

//virtual DOM, collecting states as robots and searchfields
class App extends Component {
	constructor(){
		super()
		this.state={
		robots: [],
		searchfield:''
		}
	}

// more info https://reactjs.org/docs/react-component.html
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({robots: users }));
	}

//listening to the event and with every change runs the function
  onSearchChange = (event) => {
  	this.setState({ searchfield: event.target.value})
     }
//rendering cards with robots
  render(){
  	  	const filteredRobots = this.state.robots.filter(robot =>{
  		return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
	//loading in slow connection scenario - just comment componentDidMount function for test
	if (this.state.robots.length === 0){
		return <h1> Loading</h1>
	} else {
	return(
	<div className='tc'>
		<h1 className='f1'>RoboFriends</h1>
		<SearchBox searchChange={this.onSearchChange} />
		<Scroll>
			<CardList robots={filteredRobots}/>
		</Scroll>
	</div>
		);
		}
	}
}


export default App;