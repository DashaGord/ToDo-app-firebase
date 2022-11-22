import './ListToDoItem.css';
import dayjs from "dayjs";


/**
 * @module DisplayTask
 * @param {Task} todo - экземпляр объекта Task
 * @param {function} deleteToDo - удаления таски из firebase. А так же удаляет все связанные картинки из firebase storage
 * @param {function} onEdit - выбирается таска для редактирования
 * @param {function} toggleDone - обновляет статус Task isDone === true в базе данных firebase
 * @description отображение одной Task в списке
 */
const DisplayTask = ({todo, deleteToDo, onEdit, toggleDone}) => {

    /** Переменная содержащая набор классов*/
    let classNames = "gro name-span";
    /** Флаг для обозначения задача в процессе или выполнена*/
    const finished = todo.isDone || dayjs(todo.endDate).unix() - dayjs().unix() < 0;
    if(finished){
        classNames += ' isDone'
    }

    return (
        <li className={classNames}>
            <div className="div1">
                {!finished && <input onClick={() => toggleDone(todo)} type="checkbox"/>}
            </div>
            <div onClick={() => onEdit(todo.id)} className="gr">
                <div className="name-span text" onChange={() => onEdit(todo.id)}>{todo.name}</div>
                <div className="name-span" onChange={() => onEdit(todo.id)}></div>
                <div className="name-span" onChange={() => onEdit(todo.id)}>Дo: {todo.endDate}</div>
                <div className="name-span" onChange={() => onEdit(todo.id)}></div>
            </div>
            <div className="but">
                <button type="button" onClick={() => deleteToDo(todo.id)}> x </button>
            </div>
        </li>
    )
}

export default DisplayTask;
