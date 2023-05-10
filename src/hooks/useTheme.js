import { useSelector } from 'react-redux';
import { selectTheme } from "../store/theme/theme.selector";
import { setTheme } from "../store/theme/theme.actions";

const useTheme = () => {
    const theme = useSelector(selectTheme);
    
  return {
    theme,
    setTheme
  }
}

export default useTheme;