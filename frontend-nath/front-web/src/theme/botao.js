import { createMuiTheme } from '@material-ui/core/styles';
import {colors} from '@material-ui/core';


const themeBotao = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue['500']
       
      },
      secondary: {
        main: colors.yellow['500']
      },
    
    },
    
  });
  export default themeBotao;