import {useContext} from "react";
import {DisplayImgContext} from "../ToDo-add-and-edit-form/ToDo-add-and-edit-form";

/**
 * @module DisplayImg
 * @description отображение список связанных с Task картинками
 */
const DisplayImg = () => {

    /**
     * контекст для приёма данных
     * @param {Map} imgMap - Map в формате key: "название файла" value: "адрес для доступа firebase"
     * @param {Array<string>} imgNames - список названий связанных картинок
     */
    const {imgMap, imgNames} = useContext(DisplayImgContext);

    let content = (<div></div>);

    if (imgNames.length > 0) {
        content = (
            <div>
                <div>Список картинок:</div>
                {imgNames.map((imgName, index) => {
                    return (
                        <div key={index} className='box'>
                            <img src={imgMap.get(imgName)} width="100" height="80"/>
                        </div>
                    )
                })}
            </div>
        );

    }

    return content;
}

export default DisplayImg;