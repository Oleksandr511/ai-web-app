import React, { useEffect, useState } from 'react'
import useTelegram from '../hooks/useTelegram'

export default function Form() {
    const [text, setText] = useState('')
    const {tg} = useTelegram()
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
