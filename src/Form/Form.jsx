import React, { useCallback, useEffect, useState } from 'react'
import useTelegram from '../hooks/useTelegram'
import Convertor from '../Convertor'
import './Form.css'

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
            text: 'Add photo & question, press "Submit" for answer.'
        })
    }, [])

    useEffect(() => {
        if (!text || !image) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [text, image]);

    return (
        <div className='form'>
            
            <input type='file' accept='image/*' onChange={handleImage} className='input_file'/>
            <input type='text' placeholder='Type your question' onChange={e => setText(e.target.value)} className='input_question'/>
            <input type='submit'  onClick={setIsDone} className='submit_button'/>



            {isDone && image && text && (<Convertor photo={image} question={text} sendToTelegram={sendToTelegram} />)}

        </div>
    )
}
