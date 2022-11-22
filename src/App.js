import './App.css';
import ToDoAddAndEditForm from "./components/ToDo-add-and-edit-form/ToDo-add-and-edit-form";
import {createContext, useEffect, useState} from "react";
import {db} from './FireBase';
import {storage} from "./FireStor";
import {addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll, deleteObject} from "firebase/storage";
import DisplayTask from "./components/ListToDoItem/DisplayTask";
import {Task} from "./Model/Task";
import dayjs from "dayjs";

/** контекст для передачи данных странице редактирования формы */
export const ContextTask = createContext();

/** @module App */
function App() {
    /** useState хук для переменной todos содержащая список всех Task */
    const [todos, setTodos] = useState([]);
    /** useState хук для переменной task используемая для редактирования */
    const [task, setTask] = useState(Task.createTask());
    /** useState хук для переменной imgMap (Map) в формате key: "название файла" value: "адрес для доступа firebase" */
    const [imgMap, setImgMap] = useState(new Map());

    /** Timestamp текущей даты */
    const currentTimestamp = dayjs().unix();

    /**
     * @param {File} img - загружаемое изображение
     * @description загрузка изображения в firebase storage
     */
    const uploadImg = (img) => {
        const imageRef = ref(storage, `images/${img.name}`);
        uploadBytes(imageRef, img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                imgMap.set(img.name, url);
                setImgMap(structuredClone(imgMap));
            })
        })
    }

    /**
     * @param {ChangeEvent} e - Событие change происходит по окончании изменения значения элемента формы, когда это изменение зафиксировано.
     * @param {Task} editTask - экземпляр редактируемого класса Task
     * @description загрузка Task (и связанных с ним картинок) в базу данных
     */
    const submitFormToDo = async (e, editTask) => {
        e.preventDefault();
        if (editTask.name === '' || editTask.text === '' || editTask.endDate === '') {
            alert("Заполните все пункты")
            return
        }

        if (editTask.id === '') {
            await addDoc(collection(db, 'todos'), {
                name: editTask.name,
                text: editTask.text,
                createDate: currentTimestamp,
                endDate: editTask.endDate,
                imgsNames: editTask.newImgs.map(i => i.name),
            })
        } else {
            await updateDoc(doc(db, "todos", editTask.id), {
                name: editTask.name,
                text: editTask.text,
                endDate: editTask.endDate,
                imgsNames: (editTask.imgsNames.concat(editTask.newImgs.map(i => i.name)))
            });
        }

        editTask.removeImgsNames.forEach(n => {
            const imageRef = ref(storage, `images/${n}`);
            deleteObject(imageRef);
        })

        setTask(Task.createTask());
    };

    /**
     * @description Хук отрабатывающийся после рендеринга DOM структуры
     */
    useEffect(() => {
        let map = new Map();

        /**
         * Выгружает из firebase storage все адреса к доступным картинкам
         */
        listAll(ref(storage, "images/")).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    map.set(item.name, url);
                });
            });
        });
        setImgMap(map);

        /**
         * Выгружает из firebase все Task
         */
        onSnapshot(query(collection(db, 'todos')), (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let task = new Task(doc.id, data.name, data.text, data.createDate, data.endDate, data.isDone, data.imgsNames);
                todosArr.push(task);
            });
            todosArr.sort((a, b) => b.createDate - a.createDate);
            setTodos(todosArr)
        })
    }, [])

    /**
     * @param {string} id - идентификатор таски для удаления
     * @description удаления таски из firebase. А так же удаляет все связанные картинки из firebase storage
     */
    const deleteToDo = async (id) => {
        const indexId = todos.findIndex((todo) => todo.id === id);
        const selectedTask = todos[indexId];
        selectedTask.imgsNames.forEach(n => {
            deleteObject(ref(storage, "images/" + n));
        });
        await deleteDoc(doc(db, 'todos', id))
        if (task.id === id) {
            setTask(Task.createTask());
        }
    }

    /**
     * @param {string} id - идентификатор таски для редактирования
     * @description выбирается таска для редактирования
     */
    const onEdit = (id) => {
        const indexId = todos.findIndex((todo) => todo.id === id);
        const selectedTask = todos[indexId];
        setTask(selectedTask);
    }

    /**
     * @param {Task} todo - экземпляр объекта Task
     * @description обновляет статус Task isDone === true в базе данных firebase
     */
    const toggleDone = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {
            isDone: !todo.isDone
        })
    }


    return (
        <div className="App">
            <div className="left">
                <div>
                    ЗАДАЧИ
                </div>
                <ul className="app-list-div app-list">
                    {todos.map((todo, index) => {
                        return (
                            <DisplayTask todo={todo} key={index} deleteToDo={deleteToDo} onEdit={onEdit}
                                         toggleDone={toggleDone}/>
                        )
                    })}
                </ul>
            </div>
            <div className="right">
                <ContextTask.Provider
                    value={{task, imgMap}}>
                    <ToDoAddAndEditForm submitFormToDo={submitFormToDo} uploadImg={uploadImg}/>
                </ContextTask.Provider>
            </div>
        </div>
    );
}

export default App;