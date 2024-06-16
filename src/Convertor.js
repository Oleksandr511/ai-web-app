
import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Allow API usage in browser (if applicable)
});

function Convertor(props) {
    const [completion, setCompletion] = useState(null);

    useEffect(() => {
        if (props.photo && props.question) {
            console.log(props.question)
            fetchCompletion(props.photo);
        }

    }, [props.photo, props.question]);

    async function fetchCompletion(link, question) {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: `${question}` },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: link,
                                },
                            },
                        ],
                    },
                ],
            });
            setCompletion(response.choices[0].message);
        } catch (error) {
            console.error('Error fetching OpenAI completion:', error);
        }
    }

    return (
        <div>
            {props.photo && (
                <div>
                    <img src={props.photo} alt="Selected" />
                    <div>
                        <h2>Response:</h2>
                        {completion && (
                            <p>{completion.content}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Convertor;
