import React, { useState } from 'react';

const ProgressBar = ({tasksDone, totalTasks}) => {
    // const width = ((tasksDone / totalTasks) * 100);
    const [width, setWidth] = useState(((tasksDone / totalTasks) * 100))
  return (
    <div className='progress-bar'>
        <div className='progress-bar-loader blue-bg' style={{width: `${width}%`}}></div>
    </div>
  )
}

export default ProgressBar;