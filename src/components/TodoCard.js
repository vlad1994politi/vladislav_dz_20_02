import classes from './components.module.css'

const TodoCard = ({ todo, editTodo, deleteTodo, completedOnChange, handleFilter }) => {

    return (
        <div className={classes.todoCard}>
            <div className={classes.flex} onClick={() => editTodo(todo)}>
                <h3 className={todo.completed ? 'style.completed' : undefined}>{todo.title}</h3>
                <h3>{todo.description}</h3>
            </div>
            <div className={classes.flex}>
                <h3>{todo.date.length > 30 ? todo.date.slice(0, 30) + '...' : todo.date}</h3>
                <input name="checkbox" type={"checkbox"} checked={todo.completed} onChange={(e) => {
                    console.log(e)
                    completedOnChange(todo.date)
                }}/>
                <button onClick={() => deleteTodo(todo)}>Delete</button>
                <button onClick={() => handleFilter(todo)}>Clear</button>
            </div>
        </div>
    )
}

export default TodoCard