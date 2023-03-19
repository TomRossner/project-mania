import React, { useEffect, useState } from 'react';

const ProgressBar = ({tasksDone = 0, totalTasks = 0}) => {
    const [width, setWidth] = useState((tasksDone / totalTasks * 100) || 0);

    useEffect(() => {
      setWidth((tasksDone / totalTasks * 100));
    }, [tasksDone, totalTasks])

  return (
    <div className='progress-bar'>
        <div className='progress-bar-loader' style={width ? {width: `${width.toFixed()}%`} : {width: '0%'}}></div>
    </div>
  )
}

export default ProgressBar;