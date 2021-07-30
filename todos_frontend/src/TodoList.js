import React, {Component} from 'react';
import TodoItem from './TodoItem';
const APIURL = '/api/todos';

class TodoList extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			todos: []
		}
	}
	
	componentDidMount(){
		this.loadTodos();
	}
	
	
	loadTodos(){
		fetch(APIURL)
		.then(res => {
			if(!res.ok){
				if(res.status >= 400 && res.status < 500){
					return res.json().then(data => {
						let err = {errorMessage: data.message};
						throw err;
					});
				} else {
					let err = {errorMessage: 'Please try again later, server is not responding!'}
					throw err;
				}
			}
			
			return res.json();
		})
		.then(todos => this.setState({todos}))
	}
	
	
	render(){
		const todos = this.state.todos.map(t => (
			<TodoItem
				key={t._id} 
				{...t}
			/>
		));
		
		return(
			<div>
				<h1>Tasks</h1>
				<ul>
					{todos}
				</ul>
			</div>
			
			
		);
	}
}

export default TodoList;