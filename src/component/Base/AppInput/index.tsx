import React from "react";
import {FormHelperText, InputBase, InputBaseProps, Theme, useTheme} from "@mui/material";
import {TypeTypography} from "../../../utils/theme";

export interface AppInputProps extends Omit<InputBaseProps, 'errors'> {
    errors?: string | null | boolean;
}

export const AppInput = React.forwardRef(function AppInput(
    {sx, fullWidth, errors, ...props}: AppInputProps,
    ref: React.ForwardedRef<HTMLUListElement>
) {
    const theme = useTheme();
    return (
        <>
            <InputBase
                ref={ref}
                fullWidth={fullWidth}
                sx={{
                    border: `2px solid ` + theme.color.gray10,
                    // borderRadius: '12px',
                    transitionProperty: 'all',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '0.2s',
                    '&:hover': {
                        borderColor: theme.color.gray30,
                    },
                    '&:focus-within': {
                        borderColor: theme.color.gray100,
                    },

                    'label + &': {
                        // marginTop: theme.spacing(3),
                    },
                    '& .MuiInputBase-input': {
                        position: 'relative',
                        // backgroundColor:
                        //   theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
                        // width: 'auto',

                        padding: '.375rem .75rem',
                        typography: 'body' as TypeTypography,
                        // transition: theme.transitions.create([
                        //   'border-color',
                        //   'background-color',
                        //   'box-shadow',
                        // ]),

                        '&:not(:focus)': {
                            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                            // borderColor: theme.palette.primary.main,
                            ':hover::-webkit-input-placeholder': {
                                /* Chrome/Opera/Safari */ color: theme.color.gray60,
                            },
                            ':hover::-moz-placeholder': {
                                /* Firefox 19+ */ color: theme.color.gray60,
                            },
                        },

                        // '&::placeholder': {
                        //     color: (theme: Theme) => theme.color.gray30,
                        //     opacity: 1,
                        // },
                        '&.Mui-disabled': {
                            backgroundColor: theme.color.gray10
                        }
                    },
                    ...sx,
                }}
                // startAdornment={
                //     !isNormal && (
                //         <InputAdornment
                //             position="start"
                //             sx={{
                //                 marginLeft: '8px',
                //                 color: '#55617E',
                //             }}
                //         >
                //             <img src={iconSearch} alt="" width={24} height={24}/>
                //         </InputAdornment>
                //     )
                // }
                {...props}
            />
            {errors && (
                <FormHelperText
                    sx={{
                        color: (theme: Theme) => theme.color.error,
                        mt: '12px',
                    }}
                >
                    {errors === true ? 'This field is required.' : errors}
                </FormHelperText>
            )}
        </>
    )
})
