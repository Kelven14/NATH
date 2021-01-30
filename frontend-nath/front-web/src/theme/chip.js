import { createMuiTheme } from '@material-ui/core/styles';
import {colors} from '@material-ui/core';


const themeChip = createMuiTheme({
    palette: {
      primary: {
        main: colors.orange['500']
       
      },
      secondary: {
        main: colors.yellow['500']
      },
    
    },
    
  });
  export default themeChip;