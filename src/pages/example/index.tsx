import {
    Box,
    Button,
    Checkbox,
    Divider, FormControl,
    FormControlLabel,
    Grid, InputLabel, MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography
} from "@mui/material";
import {AppBox, AppDateRangePicker, AppInput, SelectOption} from "src/component/Base";
import IconDelete from 'src/assets/icons/close.svg';
import {TypeTypography} from "../../utils/theme";
import React, {useEffect, useState} from "react";
import AppModal from "../../component/Base/AppModal";
import {useToggle} from "../../hooks/useToggle";
import styled from "styled-components";
import {AppFieldBox, AppSelect} from "src/component/Base";
import {AppTable} from "src/component/common";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import Link from "next/link";

import IconLoading from 'src/assets/icons/loading.svg';
import LinearProgress from "@mui/material/LinearProgress";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

const Example = () => {
    const [radioValueSelected, setRadioValueSelected] = useState<any>(null);
    const [checked, setChecked] = useState({all: true, a: false, b: false, c: false});
    const [fileUpload, setFileUpload] = useState<any>();
    const [openModal, toggleModal] = useToggle();
    const [list, setList] = useState<{ result: any[], loading: boolean }>({result: [], loading: true});
    const [objList, setObjList] = useState<any[]>([]);
    const [numConfig, setNumConfig] = useState('');
    // For select option
    const [option, setOption] = useState('id');

    useEffect(() => {
        setTimeout(() => {
            setList({result: rows, loading: false});
        }, 2000)
    }, [])

    const handleAddConfig = (num: any) => {
        if (objList.length > num) {
            setObjList(prevState => [...prevState.slice(0, num)])
        } else {
            const arrayNew = new Array(num - objList.length)
                .fill({name: ''})
                .map(item => ({...item}));
            setObjList((prevState) => [...prevState, ...arrayNew])
        }
    }

    const handleSetForm = (index: number, e: any) => {
        setObjList(prevState => {
            const objChnage = prevState;
            objChnage[index].name = e.target.value
            return [...objChnage];
        })
    }

    const styleFlexCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }

    const styleCell = {
        border: '1px solid red',
        margin: '0 -1px -1px 0',
    }

    const Abc = styled.div`
      width: 100px;
      height: 100px;
      color: red;
      text-align: center;`

    const a = 'text';

    return (<>
        <AppBox p={3}>
            <Stack spacing={3}>
                {/*Navigate*/}
                <Divider>
                    Navigate link
                </Divider>
                <Typography>
                    <Link href={'/todo'}>
                        <a>Goto todo list</a>
                    </Link>
                </Typography>

                {/*Typography*/}
                <Divider>Typography</Divider>
                <Grid container>
                    <Grid item xs={4}>
                        <Divider>Typography - REG</Divider>
                        <Box sx={{width: '100%', maxWidth: 500}}>
                            <Typography variant="h1" component="div" gutterBottom>
                                Title 1
                            </Typography>
                            <Typography variant="h2" gutterBottom component="div">
                                h2. Heading
                            </Typography>
                            <Typography variant="h3" gutterBottom component="div">
                                h3. Heading
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                h4. Heading
                            </Typography>
                            <Typography variant="h5" gutterBottom component="div">
                                h5. Heading
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                h6. Heading
                            </Typography>
                            <Typography variant="copy" gutterBottom component="div">
                                copy
                            </Typography>
                            <Typography variant="body" gutterBottom component="div">
                                body
                            </Typography>
                            <Typography variant="label" gutterBottom component="div">
                                label
                            </Typography>
                            <Typography variant="caption" gutterBottom component="div">
                                caption
                            </Typography>
                            <Typography variant="small" gutterBottom component="div">
                                small
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Divider>Typography - MED</Divider>
                        <Box sx={{width: '100%', maxWidth: 500}}>
                            <Typography
                                variant="h1"
                                fontWeight="medium"
                                component="div"
                                gutterBottom
                            >
                                Title 1
                            </Typography>
                            <Typography
                                variant="h2"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                h2. Heading
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                h3. Heading
                            </Typography>
                            <Typography
                                variant="h4"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                h4. Heading
                            </Typography>
                            <Box
                                // component='span'
                                sx={{
                                    typography: 'h5' as TypeTypography,
                                    fontWeight: 'medium',
                                }}
                            >
                                h5
                            </Box>
                            <Typography
                                variant="h5"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                h5. Heading
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                h6. Heading
                            </Typography>
                            <Typography
                                variant="copy"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                copy
                            </Typography>
                            <Typography
                                variant="body"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                body
                            </Typography>
                            <Typography
                                variant="label"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                label
                            </Typography>
                            <Typography
                                variant="caption"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                caption
                            </Typography>
                            <Typography
                                variant="small"
                                fontWeight="medium"
                                gutterBottom
                                component="div"
                            >
                                small
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Divider>Typography - BOLD</Divider>
                        <Box sx={{width: '100%', maxWidth: 500}}>
                            <Typography
                                variant="h1"
                                fontWeight="bold"
                                component="div"
                                gutterBottom
                            >
                                Title 1
                            </Typography>
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                h2. Heading
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                h3. Heading
                            </Typography>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                h4. Heading
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                h5. Heading
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                h6. Heading
                            </Typography>
                            <Typography
                                variant="copy"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                copy
                            </Typography>
                            <Typography
                                variant="body"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                body
                            </Typography>
                            <Typography
                                variant="label"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                label
                            </Typography>
                            <Typography
                                variant="caption"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                caption
                            </Typography>
                            <Typography
                                variant="small"
                                fontWeight="bold"
                                gutterBottom
                                component="div"
                            >
                                small
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/*Input*/}
                <Divider>
                    Input
                </Divider>
                <AppInput/>

                {/*DateRangePicker*/}
                <Divider>
                    DateRangePicker
                </Divider>
                <AppDateRangePicker/>

                {/*Radio*/}
                <Divider>
                    Radio
                </Divider>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioValueSelected}
                    onChange={(event) => setRadioValueSelected(event.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <FormControlLabel value="a" control={<Radio/>} label="Catalogyo main Category"/>
                    <FormControlLabel value="b" control={<Radio/>} label="Product"/>
                </RadioGroup>

                {/*Checkbox*/}
                <Divider>
                    Checkbox
                </Divider>
                <Box>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label={'Checked'}/>
                    <FormControlLabel control={<Checkbox/>} label={'UnChecked'}/>
                    <FormControlLabel control={<Checkbox sx={{
                        '&.Mui-disabled': {color: '#B1B5C3'}
                    }} checked disabled/>} label={'Checked, disabled'}/>
                    <FormControlLabel control={<Checkbox sx={{
                        '&.Mui-disabled': {color: '#B1B5C3'}
                    }} disabled/>} label={'UnChecked, disabled'}/>
                </Box>
                <Box mt={'1rem'}>
                    <FormControlLabel control={<Checkbox checked={checked.all}
                                                         onChange={(event) => {
                                                             setChecked(prevState => {
                                                                 return {
                                                                     ...prevState,
                                                                     all: event.target.checked,
                                                                     a: false,
                                                                     b: false,
                                                                     c: false,
                                                                 }
                                                             })
                                                         }}/>} label={'All'}/>
                    <FormControlLabel control={<Checkbox checked={checked.a}
                                                         onChange={(event) => setChecked(prevState => {
                                                             return {...prevState, all: false, a: event.target.checked}
                                                         })}/>}
                                      label={'A'}/>
                    <FormControlLabel control={<Checkbox checked={checked.b}
                                                         onChange={(event) => setChecked(prevState => {
                                                             return {...prevState, all: false, b: event.target.checked}
                                                         })}/>}
                                      label={'B'}/>
                    <FormControlLabel control={<Checkbox checked={checked.c}
                                                         onChange={(event) => setChecked(prevState => {
                                                             return {...prevState, all: false, c: event.target.checked}
                                                         })}/>}
                                      label={'C'}/>
                    <Button onClick={() => {
                        const obj: any = {};
                        console.log(checked)
                    }}>Submit</Button>
                </Box>

                {/*Input Upload*/}
                <Divider>
                    Input Upload
                </Divider>
                <Box display={'flex'}>
                    {fileUpload?.name && (
                        <Box component={'span'} mr={3} sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>{fileUpload?.name} <IconDelete style={{"cursor": "pointer"}}
                                                          onClick={() => setFileUpload(null)}/></Box>
                    )}
                    <Button variant={'outlined'} component={'label'}>
                        <input type={'file'} hidden multiple accept=".xlsx, .xls, .csv"
                               onChange={(event) => setFileUpload(event.target.files && event.target.files[0])}/>
                        Upload
                    </Button>
                </Box>

                {/*Form*/}
                <Divider>
                    Form
                </Divider>
                <Box>
                    <AppFieldBox title={<Typography
                        variant="label"
                        fontWeight="bold">
                        Connection type
                    </Typography>}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioValueSelected}
                            onChange={(event) => setRadioValueSelected(event.target.value)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: '1rem'
                            }}
                        >
                            <FormControlLabel value="a" control={<Radio/>} label="Catalogyo main Category"/>
                            <FormControlLabel value="b" control={<Radio/>} label="Product"/>
                        </RadioGroup>
                    </AppFieldBox>

                    <AppFieldBox title={<Typography
                        variant="label"
                        fontWeight="bold">
                        Connection category
                    </Typography>}>
                        <Grid container padding={'0.5rem 0.5rem 0.5rem 1rem'} columnSpacing={2}>
                            <Grid item xs>
                                <AppInput fullWidth disabled/>
                            </Grid>
                            <Grid item xs>
                                <AppInput fullWidth disabled/>
                            </Grid>
                            <Grid item xs={'auto'}>
                                <Button>Search</Button>
                            </Grid>
                        </Grid>
                    </AppFieldBox>

                    <AppFieldBox title={<Typography
                        variant="label"
                        fontWeight="bold">
                        Composition of exhibition products
                    </Typography>}>
                        <Box sx={{height: 400, width: '100%'}}>
                        </Box>
                    </AppFieldBox>
                </Box>

                {/*Modal*/}
                <Divider>
                    Modal
                </Divider>
                <Box><Button onClick={toggleModal}>Show/Hidden</Button></Box>
                <AppModal title={'Save'} open={openModal} onClose={() => toggleModal(false)} sx={{
                    width: '60%'
                }} bodyProps={{}}>
                    <Typography variant={'label'} fontWeight={'bold'}>Search Category</Typography>
                    <AppFieldBox labelProps={{xs: 2}} title={<Typography
                        variant="label"
                        fontWeight="bold">
                        Search detail
                    </Typography>}>
                        <Box m={'.5rem'} display={'flex'} gap={'.5rem'}>
                            <AppInput fullWidth value={'Fruit/vegetable/salad'}/>
                            <AppInput fullWidth/>
                        </Box>
                    </AppFieldBox>
                    <Button sx={{
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '1rem',
                    }}>Search</Button>
                </AppModal>

                {/*Field box*/}
                <Divider>
                    Field box
                </Divider>
                <Box>
                    <AppFieldBox title={'abc'}>
                        <AppInput/>
                    </AppFieldBox>
                    <AppFieldBox title={'abc'}>
                        <AppInput/>
                    </AppFieldBox>
                </Box>

                {/*Table*/}
                <Divider>
                    Table
                </Divider>
                <Box>
                    <AppTable columns={columns} rows={list.result} checkboxSelection components={{
                        LoadingOverlay: LinearProgress,
                        NoRowsOverlay: () => <Typography sx={{
                            textAlign: 'center',
                            position: 'relative',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}>There are no products that displayed.
                        </Typography>
                    }} loading={list.loading}/>
                </Box>

                {/*AppSelect*/}
                <Divider>
                    Select
                </Divider>
                <Box><FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                    <AppSelect value={option} sx={{
                        width: '30%'
                    }} onChange={(e, value) => setOption(value)}>
                        <SelectOption value={'id'}>ID</SelectOption>
                        <SelectOption value={'franchise_id'}>Franchise ID</SelectOption>
                        <SelectOption value={'policy_name'}>Policy name</SelectOption>
                    </AppSelect>
                </Box>

                {/*Form initial by number*/}
                <Divider>
                    Form initial by number
                </Divider>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <AppInput value={numConfig} onChange={(e) => setNumConfig(e.target.value)}/><Button sx={{
                    textAlign: 'center',
                    textTransform: 'unset'
                }} onClick={() => handleAddConfig(numConfig)}><Typography variant={'caption'}>Add configuration
                    item</Typography></Button>
                </Box>
                <Box>
                    {objList && objList.map((item, index) => {
                        const name = objList[index].name;
                        return (<Box key={index}>
                            <AppInput value={name} onChange={(e) => handleSetForm(index, e)}/>
                        </Box>)
                    })}
                </Box>
            </Stack>
        </AppBox>
    </>)
}

export default Example;
