import React, { useCallback, useEffect, useState } from 'react'
import useTelegram from '../hooks/useTelegram'

export default function Form() {
    const [text, setText] = useState('')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            text
        }
        tg.sendData(JSON.stringify(data))
    },[text])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', callback)
        return () => {
            tg.offEvent('mainButtonClicked', callback)
        }
    }, [])

    useEffect(()=> {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    },[])

    useEffect(() => {
        if (!text) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [text])

    const onChangeText = (e) => {
        setText(e.target.value)
    }
    return (
        <div>
            <input className={'input'}
                type='text'
                placeholder='Type here'
                value={text}
                onChange={onChangeText} />
        </div>
    )
}
