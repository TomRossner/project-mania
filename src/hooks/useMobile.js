import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../store/globalStates/globalStates.actions';
import { selectIsMobile } from '../store/globalStates/globalStates.selector';

const useMobile = () => {
    const isMobile = useSelector(selectIsMobile);
    const dispatch = useDispatch();

    const handleResize = () => {
        if (window.innerWidth <= 1280) {
            dispatch(setIsMobile(true));
        } else {
            dispatch(setIsMobile(false));
        }
    };

   // Handle screen size
    useEffect(() => {
    
        window.addEventListener('load', handleResize);
        // window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('load', handleResize);
            // window.removeEventListener('resize', handleResize);
        };
    }, []);

  return {
    isMobile
  }
}

export default useMobile;