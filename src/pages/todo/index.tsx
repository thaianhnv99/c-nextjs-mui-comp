import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, FormControlLabel, Stack, Typography} from "@mui/material";
import {AppBox, AppInput} from "src/component/Base";
import {_addTodo, wrapper} from "src/state";
import Link from "next/link";

const Todo = () => {
    const dispatch = useDispatch();
    const {info, todo} = useSelector(state => state) as any;

    const [todoText, setTodoText] = useState(null);

    const handleAddTodo = (event: any) => {
        if (event.target.value === '') {
            return;
        }
        if (event['key'] === 'Enter') {
            dispatch(_addTodo(event.target.value));
            event.target.value = ''
        }
    }

    return (<>
            <Box sx={{
                padding: '.5rem'
            }}><Link href={'/example'}>
                <a>Back to home</a>
            </Link></Box>
            <Box textAlign={'center'} mt={3}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    justifyContent: 'center'
                }}>
                    <Typography>Todo name:</Typography>
                    <AppInput sx={{
                        width: '50%'
                    }} onKeyDown={handleAddTodo}/>
                </Box>
                <Stack spacing={2}>
                    {
                        todo?.list.map((item: string) => {
                            return (
                                <Box key={item}>{item}</Box>
                            )
                        })
                    }
                </Stack>
            </Box>
        </>
    );
};

export default Todo;
