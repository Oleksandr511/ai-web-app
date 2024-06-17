
// import React, { useState, useEffect } from 'react';
// import OpenAI from 'openai';


// const openai = new OpenAI({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true // Allow API usage in browser (if applicable)
// });

// function Convertor(props) {
//     const [completion, setCompletion] = useState(null);

//     useEffect(() => {
//         if (props.photo && props.question) {
//             // console.log(props.question)
//             fetchCompletion(props.photo);
//         }

//     }, [props.photo, props.question]);

//     async function fetchCompletion(link, question) {
//         try {
//             const response = await openai.chat.completions.create({
//                 model: 'gpt-4o',
//                 messages: [
//                     {
//                         role: 'user',
//                         content: [
//                             { type: 'text', text: `${question}` },
//                             {
//                                 type: 'image_url',
//                                 image_url: {
//                                     url: link,
//                                 },
//                             },
//                         ],
//                     },
//                 ],
//             });
//             setCompletion(response.choices[0].message);
//             props.sendToTelegram()
//             console.log('ok')
//         } catch (error) {
//             console.error('Error fetching OpenAI completion:', error);
//         }
//     }

//     return (
//         <div>
//             {props.photo && (
//                 <div>
//                     <img src={props.photo} alt="Selected" />
//                     <div>
//                         <h2>Response:</h2>
//                         {completion && (
//                             <p>{completion.content}</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Convertor;

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
    // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    apiKey: REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Allow API usage in browser (if applicable)
});

function Convertor(props) {
    const [completion, setCompletion] = useState(null);

    useEffect(() => {
        if (props.photo && props.question) {
            fetchCompletion(props.photo, props.question);
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
                            { type: 'text',
                                 text: `${question}. Create a very short summary that uses 30 completion_tokens or less` },
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
            setCompletion(response.choices[0].message.content);
            if (props.sendToTelegram && response.choices[0].message && completion) {
                console.log('Sending data to td' )
                console.log('1: ', completion.content)
                // await props.sendToTelegram(completion.content); // Ensure props.sendToTelegram is a function before calling
            } // Call sendToTelegram from Form component when completion is set
        } catch (error) {
            console.error('Error fetching OpenAI completion:', error);
        }
    }

    useEffect(() => {
        if (completion && props.sendToTelegram) {
            props.sendToTelegram({ completion });
        }
    }, [completion, props.sendToTelegram]);

    return (
        <div>
            {props.photo && (
                <div>
                    <img src={props.photo} alt="Selected" />
                    <div>
                        <h2>Response:</h2>
                        {completion && (
                            //  props.sendToTelegram({completion}),
                            <p>{completion}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Convertor;

