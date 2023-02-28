import React from 'react';
import {Box, BoxProps, Modal, ModalProps, Stack} from "@mui/material";
import IconClose from '/src/assets/icons/close.svg'

export interface IAppModalProps extends Omit<ModalProps, 'children'> {
    title?: string;
    description?: string;
    children?: any;
    open: boolean;
    headerProps?: BoxProps;
    bodyProps?: BoxProps;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const AppModal = ({open, onClose, children, title, sx, headerProps, bodyProps}: IAppModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                boxShadow: '0px 2px 6px 1px #3a3a3a',
                ...sx
            }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    sx={{
                        padding: '.5rem',
                        borderBottom: '1px solid #999999',
                        backgroundColor: '#dddddd',
                        ...headerProps
                    }}
                >
                    <Box sx={{
                        visibility: title ? 'visible' : 'hidden'
                    }}>{title}</Box>
                    <IconClose onClick={onClose}/>
                </Stack>
                <Box sx={{
                    padding: '.5rem',
                    ...bodyProps
                }}>
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

export default AppModal;
