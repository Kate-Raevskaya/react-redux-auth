import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../pages/loginPage";
import {AppDispatch} from "../app/store";
import {uploadImage} from "./usersSlice";

export const UserPage = (): React.ReactElement => {
    const {image} = useSelector((state: IRootState) => state.users);

    return <>
        {
            image ?
                <Image/> :
                <UploadImage/>
        }
    </>
}

const UploadImage = (): React.ReactElement => {
    const {user} = useSelector((state:IRootState) => state.users)
    const dispatch = useDispatch<AppDispatch>();

    const handleLoadingImageEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.target.files) {
            let image = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onloadend = function () {
                console.log('result', reader.result)
                let userCredential = {"token": user, "image": reader.result}
                dispatch(uploadImage(userCredential))
            }
        }

    }

    return <>
        <div id='upload-image-page'>
            <h1>Загрузка аватара</h1>
            <p>
                Загрузите файл размером до 5Мб<br/>
                По формату: JPG, PNG, GIF
            </p>
            <form>
                <label>
                    Выбрать файл
                    <input
                        type='file'
                        name='image'
                        accept='image/jpg,image/png,image/gif'
                        onChange={handleLoadingImageEvent}
                    />
                </label>
            </form>
        </div>
    </>
}


const Image = (): React.ReactElement => {
    return <>
        here your image
    </>
}