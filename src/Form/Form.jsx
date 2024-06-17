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


    const sendToTelegram = useCallback(async (response) => {
        console.log('we are sending data to tg: ');
        // console.log(response.completion);
        // console.log(typeof text)
        // console.log(typeof response.completion)

        try {
            const data = {
                response: response.completion,
                text,

            };

            await tg.sendData(JSON.stringify(data));
            console.log('Data successfully sent to Telegram');
        } catch (error) {
            console.error('Error sending data to Telegram:', error);
        }
    }, [ text, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', sendToTelegram)
        return () => {
            tg.offEvent('mainButtonClicked', sendToTelegram)
        }
    }, [sendToTelegram, tg])

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



            {isDone && image && text && (<Convertor photo={image} question={text} sendToTelegram={sendToTelegram} />)}

        </div>
    )
}
