import {Box, Container} from "@mui/material";

export function Main({children}: any) {
    return (
        <Box>
            <Container sx={{padding: '0 1rem'}}>
                {children}
            </Container>
        </Box>
    )
}
