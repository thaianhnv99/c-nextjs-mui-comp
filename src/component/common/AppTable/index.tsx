import React, {useState} from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid'
import {Box, Chip, InputBase, MenuItem, Pagination, PaginationItem, Select, styled, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export interface IAppTable extends DataGridProps {
    height?: string | number,
    pageOptions?: number[],
}

export const AppTable = ({rows, columns, pageOptions = [5, 10, 25], height = 370, sx, ...props}: IAppTable) => {
    const [pageSizeRef, setPageSizeRef] = useState<number>(pageOptions[0]);
    const [page, setPage] = useState<number>(0);

    return (
        <Box sx={{height: height, width: '100%', position: 'relative'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                experimentalFeatures={{newEditingApi: true}}
                page={page}
                pageSize={pageSizeRef}
                hideFooterPagination
                disableSelectionOnClick
                sx={{
                    '& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon': {
                        display: 'none'
                    },
                    ...sx
                }}
                {...props}
            />
            <AppPagination
                page={page}
                pageSize={pageSizeRef}
                pageOptions={pageOptions}
                totalPages={Math.ceil(rows.length / pageSizeRef)}
                onChangePage={(value) => setPage(value)}
                onChangePageSize={(newPageSize) => setPageSizeRef(+newPageSize)}/>
        </Box>
    );
};

export interface IAppPagination {
    pageSize?: number;
    page?: number;
    totalPages?: number;
    onChangePage?: (newPage: number) => void;
    onChangePageSize?: (newPageSize: any) => void;
    pageOptions?: number[]
}

export const AppPagination = ({
                                  pageSize,
                                  page = 0,
                                  totalPages = 0,
                                  onChangePage,
                                  onChangePageSize,
                                  pageOptions
                              }: IAppPagination) => {
    const BootstrapInput = styled(InputBase)(({theme}) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            // backgroundColor: theme.palette.background.paper,
            // border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            '&:focus': {
                // borderRadius: 4,
                // borderColor: '#80bdff',
                // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                backgroundColor: 'unset'
            },
        },
    }));
    return (
        <>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={pageSize}
                variant={'standard'}
                input={<BootstrapInput/>}
                onChange={(value) => onChangePageSize && onChangePageSize(value.target.value)}
                renderValue={(selected: any) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        View each {selected}
                    </Box>
                )}
                sx={{
                    position: 'absolute',
                    right: '1rem',
                    bottom: '.4rem',
                }}
            >
                {pageOptions?.map(item => {
                    return (<MenuItem key={item} value={item}>{item}</MenuItem>)
                })}
            </Select>
            <Pagination
                color="primary"
                count={totalPages}
                page={page + 1}
                onChange={(event, value) => onChangePage && onChangePage(value - 1)}
                showFirstButton={true}
                showLastButton={true}
                sx={{
                    position: 'absolute',
                    bottom: '.4rem',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            />
        </>
    )
}
