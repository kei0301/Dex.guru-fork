import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
    { id: 'name', label: 'Name', align: 'center' },
    { id: 'price', label: 'Price', align: 'center' },
    {
        id: 'h24',
        label: '24h %',
        align: 'center',
    },
    {
        id: 'd7',
        label: '7d %',
        align: 'center',
    },
    {
        id: 'cap',
        label: 'Market Cap',
        align: 'center',
    },
    {
        id: 'vol',
        label: 'Volume 24h',
        align: 'center',
    },
    {
        id: 'supply',
        label: 'Circulating Supply',
        align: 'center',
    },
    {
        id: 'chart',
        label: 'Token',
        align: 'center',
    },
];

export default function Metroverses() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [crypto, setCrypto] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/trending/track`)
                .then(res => {
                    const array = [];
                    for (let k = 0; k < res.data.data.length; k++) {
                        const element = res.data.data[k];
                        array.push({ name: element.name + ' ' + element.symbol, price: '$' + element.quote.USD.price.toFixed(2), h24: element.quote.USD.percent_change_24h.toFixed(2) + '%', d7: element.quote.USD.percent_change_7d.toFixed(2) + '%', cap: '$' + element.quote.USD.market_cap.toFixed(0), vol: '$' + element.quote.USD.volume_24h.toFixed(0), supply: element.circulating_supply.toFixed(0) + ' ' + element.symbol, chart: element.id });
                    }
                    setCrypto(array);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }
        fetchData();
    }, [])

    return (
        <Box sx={{ display: 'grid', width: '100%', overflowX: 'overlay' }}>
            {isLoading ?
                (
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', position: 'relative', top: window.innerHeight / 2 - 50
                    }}>
                        <CircularProgress />
                    </Box>
                )
                :
                <Box sx={{ width: '100% !important', borderRadius: '10px', padding: '10px 10px', margin: '0px', display: 'flex' }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid gray' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, background: '#23323c', color: 'white' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ background: '#23323c' }}>
                                    {crypto
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, i) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.name + i} >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id === 'chart') {
                                                            return (
                                                                <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', color: '#ff4a68' }}>
                                                                    <img alt='img' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${value}.png`} style={{ width: '30px' }} />
                                                                </TableCell>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', color: 'rgb(170 182 225)' }}>
                                                                    {value}
                                                                </TableCell>
                                                            );
                                                        }
                                                    })}
                                                </TableRow>
                                            );
                                        }
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={crypto.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{ background: '#23323c' }}
                        />
                    </Paper>
                </Box>
            }
        </Box>
    );
}