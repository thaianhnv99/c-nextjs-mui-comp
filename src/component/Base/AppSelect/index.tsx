import React from 'react';
import {
    OptionUnstyled,
    optionUnstyledClasses,
    PopperUnstyled,
    SelectUnstyled,
    selectUnstyledClasses,
    SelectUnstyledProps, SelectUnstyledRootSlotProps
} from "@mui/base";
import {Box, styled} from "@mui/material";
import {SxProps} from "@mui/system";
import IconUp from 'src/assets/icons/up.svg';
import IconDown from 'src/assets/icons/down.svg';

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const Button = React.forwardRef(function Button(
    props: SelectUnstyledRootSlotProps<any>,
    ref: React.ForwardedRef<HTMLButtonElement>
) {
    const {ownerState, ...other} = props
    return (<button type="button" {...other} ref={ref} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }}>
        {other.children}
        {ownerState?.open ? <IconUp/> : <IconDown/>}
    </button>)
})

const StyleRoot = styled(Button, {shouldForwardProp: () => true})(({theme, sx}) => `
font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // &.${selectUnstyledClasses.expanded} {
  //   &::after {
  //     content: '▴';
  //   }
  // }
  //
  // &::after {
  //   content: '▾';
  //   float: right;
  // }
`);

const StyledListbox = styled('ul')(
    ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const SelectOption = styled(OptionUnstyled)(
    ({theme}) => `
  list-style: none;
  padding: 12px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  width: 100%;
  right: 3rem !important;
`;

export interface IAppSelect extends SelectUnstyledProps<any> {
    sx?: SxProps,
}

export const AppSelect = React.forwardRef(function AppSelect(
    {components, sx, ...props}: IAppSelect,
    ref: React.ForwardedRef<HTMLButtonElement>
) {
    const componentsWrapper = {
        Root: StyleRoot,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...components,
    } as typeof components
    return (
        <Box position={'relative'} sx={{
            ...sx
        }}><SelectUnstyled {...props} ref={ref} components={componentsWrapper}/></Box>)
})

export {SelectOption}
