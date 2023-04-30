import React, { useEffect, useState } from 'react';
import { getEmojis } from '../httpRequests/http.chat';
import { generateKey } from '../utils/keyGenerator';
import Emoji from './Emoji';

const Emojis = ({setInputValue, inputValue}) => {
    const [emojis, setEmojis] = useState([]);

    const handleSelectEmoji = (emojiChar) => {
        setInputValue(inputValue + emojiChar);
    }

    const fetchEmojis = async () => {
        const emojis = await getEmojis();
        setEmojis(emojis);
    }

    // Fetch emojis
    useEffect(() => {
        fetchEmojis();
    }, []);

  return (
    <div className='emojis-selector-container'>
        <div className='emojis-selector'>
            {emojis?.map(em => {
                return (
                    <Emoji
                        key={generateKey()}
                        emoji={em}
                        handleSelectEmoji={handleSelectEmoji}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Emojis;