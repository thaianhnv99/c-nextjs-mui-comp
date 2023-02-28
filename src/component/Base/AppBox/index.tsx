import {Box, BoxProps, useTheme} from "@mui/material";

export interface IAppBox extends BoxProps {
    color?: 'white' | 'gray10'
}

export function AppBox({children, sx, color = 'white', ...props}: IAppBox) {
    const theme = useTheme();

    const styleColor: { [key in typeof color]: any } = {
        gray10: {
            backgroundColor: theme.color.gray10
        },
        white: {
            backgroundColor: theme.color.bg
        }
    }
    return (<Box sx={{
        background: theme.color.bg, ...styleColor[color], ...sx
    }} {...props}>
        {children}
    </Box>)
}
