import React, { useCallback, useEffect, useState } from 'react'
import useTelegram from '../hooks/useTelegram'
import Convertor from '../Convertor'

export default function Form() {
    const [text, setText] = useState('')
    const [image, setImage] = useState()
    const [isDone, setIsDone] = useState(false)
    const { tg } = useTelegram()

    const handleImage = (e) => {
        e.preventDefault()
        console.log(e.target.files)
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImage(data.result)
        })
        data.readAsDataURL(e.target.files[0])

    }
    

    const sendToTelegram = useCallback(() => {
        const data = {
            text,
            image
        };
        tg.sendData(JSON.stringify(data));
    }, [text, image, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', sendToTelegram)
        return () => {
            tg.offEvent('mainButtonClicked', sendToTelegram)
        }
    }, [sendToTelegram])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    }, [])

    useEffect(() => {
        if (!text || !image) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [text, image]);

    // const onSendData = useCallback(() => {
    //     const data = {
    //         text
    //     }
    //     tg.sendData(JSON.stringify(data))
    // }, [sendToTelegram])

    

    

    // useEffect(() => {
    //     if (!text) {
    //         tg.MainButton.hide()
    //     } else {
    //         tg.MainButton.show()
    //     }
    // }, [text])

    // const onChangeText = (e) => {
    //     setText(e.target.value)
    // }
    return (
        <div>
            {/* <input className={'input'}
                type='text'
                placeholder='Type here'
                value={text}
                onChange={onChangeText} /> */}
            <input type='file' accept='image/*' onChange={handleImage} />
            <input type='text' onChange={e => setText(e.target.value)} />
            <input type='submit' onClick={setIsDone} />


            
                {isDone && image && text && <Convertor photo={image} question={text} sendToTelegram={sendToTelegram} />}
            
        </div>
    )
}
