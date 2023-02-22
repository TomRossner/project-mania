import React, { useEffect, useState } from 'react';

const ProgressBar = ({tasksDone = 0, totalTasks = 0, stage}) => {
    // const width = ((tasksDone / totalTasks) * 100);
    const [width, setWidth] = useState(((tasksDone / totalTasks) * 100) || 0);

    useEffect(() => {
      console.log(stage.tasks_done / stage.stage_tasks.length)
      setWidth(((tasksDone / totalTasks) * 100));
    }, [tasksDone, totalTasks])

  return (
    <div className='progress-bar'>
        <div className='progress-bar-loader blue-bg' style={width ? {width: `${width}%`} : {width: `0%`}}></div>
    </div>
  )
}

export default ProgressBar;