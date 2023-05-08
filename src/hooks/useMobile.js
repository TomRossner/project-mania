import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../store/globalStates/globalStates.actions';
import { selectIsMobile } from '../store/globalStates/globalStates.selector';

const useMobile = () => {
    const isMobile = useSelector(selectIsMobile);
    const dispatch = useDispatch();

   // Handle Screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1441) {
                dispatch(setIsMobile(true));
            } else {
                dispatch(setIsMobile(false));
            }
        };
    
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []);

  return {
    isMobile
  }
}

export default useMobile;