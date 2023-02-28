import React from 'react';
import {Grid} from "@mui/material";
import {GridProps} from "@mui/material/Grid/Grid";

export interface IAppFieldBox {
    title: React.ReactElement | string,
    children: any,
    containerProps?: GridProps,
    labelProps?: GridProps,
    valueProps?: GridProps
}

export const AppFieldBox = ({title, children, containerProps, labelProps, valueProps}: IAppFieldBox) => {
    const {sx: sxContainer, ...containerProp} = containerProps || {};
    const {sx: sxLabel, ...labelProp} = labelProps || {};
    const {sx: sxValue, ...valueProp} = valueProps || {};

    return (
        <Grid container sx={{
            ...sxContainer
        }} {...containerProp}>
            <Grid item xs={2} sx={{
                backgroundColor: '#d1d1d1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 .5rem',

                border: '1px solid #a6a6a6',
                margin: '0 -1px -1px 0',
                ...sxLabel
            }} {...labelProp}>
                {title}
            </Grid>
            <Grid item xs sx={{
                border: '1px solid #a6a6a6',
                margin: '0 -1px -1px 0',

                ...sxValue
            }} {...valueProp}>
                {children}
            </Grid>
        </Grid>
    );
};
