import { createMuiTheme } from "@material-ui/core/styles";

// see https://material-ui.com/customization/themes/
const customTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            main: "#bdcebe",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#eca1a6",
            contrastText: "#ffffff"
        }
    }
});

export default customTheme;
