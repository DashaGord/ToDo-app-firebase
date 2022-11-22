
export class Task {

    /**
     * Конструктор для создания Task
     * @constructor
     * @param {string} id - идентификатор таски
     * @param {string} name - название таски
     * @param {string} text - текст таски
     * @param {number} createDate - время создания таски
     * @param {string} endDate - время завершения таски
     * @param {boolean} isDone - флаг обозначающий выполнена ли задача
     * @param {Array<string>} imgsNames - список названий связанных картинок
     */
    constructor(id, name, text, createDate, endDate, isDone, imgsNames) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.createDate = createDate;
        this.endDate = endDate;
        this.isDone = isDone;
        this.imgsNames= [].concat(imgsNames);
        this.newImgs = [];
        this.removeImgsNames = [];
    }

    /**
     * @description фабричный метод для создания заявки по умолчанию
     * @returns {Task}
     */
    static createTask() {
        return new Task('','', '', 0, '', false, []);
    }
}