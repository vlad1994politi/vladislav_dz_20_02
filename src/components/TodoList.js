import TodoCard from "./TodoCard"

import classes from './components.module.css'

const TodoList = ({ todoList, editTodo, deleteTodo, completedOnChange,  handleFilter }) => {

    return (
        <div className={classes.flexList}>
            {todoList.map((todo, i) =>
                <TodoCard key = {todo.date} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} completedOnChange={completedOnChange} handleFilter={handleFilter}/>
            )}
        </div>
    )
}

export default TodoList