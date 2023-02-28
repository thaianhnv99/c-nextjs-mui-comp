import {AppBar, Box, Container, Toolbar, useTheme} from "@mui/material";
import Logo from 'src/assets/images/moodle-vector-logo.svg';
import Link from "next/link";

export function Header() {
    const theme = useTheme();
    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: theme.color.bg2,
                border: 'none',
            }}
        >
            <Container>
                <Toolbar
                    disableGutters
                    sx={{
                        height: '70px',
                        padding: '0 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href="/">
                        <a>
                            <Logo style={{
                                display: 'block',
                            }}/>
                        </a>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
