import { createMuiTheme } from '@material-ui/core/styles';
import {colors} from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.indigo['500']
       
      },
      secondary: {
        main: colors.red['500']
      },
      success:{
        main: colors.orange['500']
      },

    },
    status:{
        laranja:{
            main: colors.orange['500']
          },
          amarelo:{
            main: colors.yellow['500']
          },
    }
  });

  export default theme;