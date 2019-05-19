import { createMuiTheme } from "@material-ui/core/styles";

// see https://material-ui.com/customization/themes/
const customTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            main: "#51b848",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#e41e26",
            contrastText: "#ffffff"
        }
    }
});

export default customTheme;
