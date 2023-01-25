import { useEffect, useState } from "react"
import ModalAdd from "../components/ModalAdd"
import TodoCard from "../components/TodoCard"
import TodoList from "../components/TodoList"
import Button from "../components/ui/button"
import Input from "../components/ui/input"
import classes from './todo.module.css'
import {isDisabled} from "@testing-library/user-event/dist/utils";

const data = [
    {title: 'Важно', description: 'Сходить в магазин', date: 'Сегодня',completed: false}
]


const TodoPage = () => {

    const [todoList, setTodoList] = useState(data)
    const [inputValue, setInputValue] = useState('')
    const [dataForm, setDataForm] = useState({
        title: '',
        description: '',
    })
    const [isShow, setIsShow] = useState(false)
    const [ count, setCount ] = useState(0)
    const handleOnChange = (e) => {
        setDataForm(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const handleShow = () => {
        setIsShow(prev => !prev)

        setDataForm({
            title: '',
            description: '',
        })
    }
    console.log(handleShow)

    const submitData = () => {
        setTodoList(prev => {
            return [...prev, {...dataForm, date: Date(), completed: false}]
        })
        handleShow()
        setInputValue('')
    }

    const submitEditData = () => {
        const newList = todoList.map((todo) => {
            if (todo.date === dataForm.date) {
                return {...dataForm, date: Date()}
            } else {
                return todo
            }
        })
        setTodoList(newList)
        handleShow()
    }
    const completedOnChange = (date) => {
        const newList = todoList.map((todo) => {
            if (todo.date === date) {
                return {...todo, completed: !todo.completed}
            } else {
                return todo
            }
        })
        setTodoList(newList)
    }
    const editTodo = (todo) => {
        setIsShow(true)
        setDataForm({
            title: todo.title,
            description: todo.description,
            date: todo.date,
            completed: todo.completed
        })
    }

    const deleteTodo = (todo) => {
        const newList = todoList.filter((item) => {
            return item.date !== todo.date
        })
        setTodoList(newList)
    }

    const handleFilter = () => {
        const filtered = todoList.filter((item) => {
            return !item.complete;
        });
        setTodoList(filtered);
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'))
        if (data.length !== 0) {
            setTodoList(data)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(todoList))
    }, [ todoList ])


    return (
        <>
            <Button handleDo={handleShow}>Добавить таск</Button>
            {isShow && (
                <ModalAdd closeWindow={handleShow}>
                    <Input name='title' propsClass={'modalInput'} value={dataForm.title} handleOnChange={handleOnChange}/>
                    <Input name='description' propsClass={'modalInput'} value={dataForm.description} handleOnChange={handleOnChange}/>
                    {
                        dataForm.date
                            ?
                            <Button isModal={true} handleDo={submitEditData}>Редактировать</Button>
                            :
                            <Button isModal={true} handleDo={submitData}>Добавить таск</Button>
                    }
                </ModalAdd>
            )}
            <Input propsClass={'inputSearch'} value={inputValue} handleOnChange={(e) => setInputValue(e.target.value)}/>
            <TodoList todoList={todoList} editTodo={editTodo} deleteTodo={deleteTodo} completedOnChange={completedOnChange} handleFilter={handleFilter}/>
        </>
    )
}

export default TodoPage