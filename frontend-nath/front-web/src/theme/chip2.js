import { createMuiTheme } from '@material-ui/core/styles';
import {colors} from '@material-ui/core';


const themeChip2 = createMuiTheme({
    palette: {
      primary: {
        main: colors.green['500']
       
      },
      secondary: {
        main: colors.blue['500']
      },
    
    },
    
  });
  export default themeChip2;