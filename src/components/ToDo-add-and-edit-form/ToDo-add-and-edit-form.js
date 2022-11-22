import './ToDo-add-and-edit-form.css';

import DisplayImg from "../DisplayImg/DisplayImg";
import {createContext, useContext, useEffect, useState} from "react";
import {ContextTask} from "../../App";
import {Task} from "../../Model/Task";

export const DisplayImgContext = createContext();


/**
 * @module ToDoAddAndEditForm
 * @param {function} submitFormToDo - загрузка Task (и связанных с ним картинок) в базу данных
 * @param {function} uploadImg - загрузка изображения в firebase storage
 * @description отображение формы редактирования
 */
const ToDoAddAndEditForm = ({submitFormToDo, uploadImg}) => {
    /**
     * контекст для приёма данных
     * @param {Map} imgMap - Map в формате key: "название файла" value: "адрес для доступа firebase"
     * @param {Task} task - новая/редактируемая заявка
     */
    const {imgMap, task} = useContext(ContextTask);
    /** useState хук для редактируемой копии объекта */
    const [editTask, setEditTask] = useState(Task.createTask())

    /**
     * @description Хук отрабатывающийся после изменения Task получаемая из контекста
     */
    useEffect(() => {
        setEditTask(structuredClone(task));
    }, [task])

    /**
     * @description получаем полный список связанных с Task названий картинок
     * @returns {Array<string>} массив со списком названий картинок
     */
    const getImgNames = () => editTask.imgsNames.concat(editTask.newImgs.map(file => file.name));

    return (
        <div className="app-add-form">
            <form className="add-form" onSubmit={e => submitFormToDo(e, editTask)}>
                <div className='group-button'>
                    <button type="submit" className="clear"> + </button>
                    <label className="custom-file-upload">
                        <input type="file" onChange={(e) => {
                            const img = e.target.files[0];
                            if (imgMap.has(img.name)) {
                                e.preventDefault(e);
                                alert(`Картинка ${img.name} уже есть в базе данных`)
                                return
                            }

                            editTask.newImgs.push(img);
                            uploadImg(img);
                            setEditTask(structuredClone(editTask));
                        }}/>
                        &#128204;
                    </label>
                </div>
                <input value={editTask.name} onChange={e => {
                    editTask.name = e.target.value;
                    setEditTask(structuredClone(editTask));
                }}
                       type="text" className="title" id=""
                       placeholder="Введите название задачи"/>
                <span>Выполнить до: </span>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Time"
                    value={editTask.endDate}
                    onChange={e => {
                        editTask.endDate = e.target.value;
                        setEditTask(structuredClone(editTask));
                    }}/>
                <textarea className="form-control"
                          placeholder="Введите задачу"
                          value={editTask.text}
                          onChange={e => {
                              editTask.text = e.target.value;
                              setEditTask(structuredClone(editTask));
                          }}/>
                <DisplayImgContext.Provider value={{imgMap, imgNames: getImgNames()}}>
                    <DisplayImg/>
                </DisplayImgContext.Provider>
            </form>
        </div>
    )
}

export default ToDoAddAndEditForm;