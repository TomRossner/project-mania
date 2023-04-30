import React from 'react';

const Emoji = ({emoji, handleSelectEmoji}) => {
  return (
    <span
        className='emoji'
        onClick={() => handleSelectEmoji(emoji.character)}
    >{emoji.character}</span>
  )
}

export default Emoji;