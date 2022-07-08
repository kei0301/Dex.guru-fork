import React, { useEffect, useState } from 'react';
import { Box, Button, FilledInput, FormControl, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Metroverses() {

    const [values, setValues] = useState({
        tokenName: '',
        address: '',
        network: 'avalanche'
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [token, setToken] = useState('');
    const [trendingOption, setTrendingOption] = useState([])
    const [counter, setCounter] = useState(0);
    const handleChangeToken = (event) => {
        setToken(event.target.value);
    };

    const Addtoken = async () => {
        if (values.tokenName === '' || values.address === '') {
            toast.error('Input the correct data!')
        } else {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/add`, {
                tokenData: values
            })
                .then(res => {
                    if (res.data === 'success') {
                        toast.success('Added!');
                        setValues({ tokenName: '', address: '', network: 'avalanche' });
                        setCounter(counter + 1);
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }
    }

    const Remove = async () => {
        if (token !== '') {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/remove`, {
                id: token
            })
                .then(res => {
                    if (res) {
                        toast.success('Removed!');
                        setTrendingOption(res.data)
                        setToken('')
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        } else {
            toast.error('Select the Pair!')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/trending/get`)
                .then(res => {
                    setCounter(res.data.length);
                    setTrendingOption(res.data);
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }
        fetchData();
    }, [counter])

    return (
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '300px !important', borderRadius: '10px', padding: '10px 10px', margin: '10px 10px', display: 'grid', background: '#23323c', color: 'white', border: '1px solid gray' }}>
                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.network}
                        onChange={handleChange('network')}
                        sx={{ backgroundColor: '#23323c', borderRadius: '20px', height: '40px', display: 'flex', alignItems: 'center', color: 'white' }}
                    >
                        <MenuItem value={'eth'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='token' src='./assets/ethereum.svg' style={{
                                    width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                }} />
                                Ethereum
                            </div>
                        </MenuItem>
                        <MenuItem value={'bsc'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='token' src='./assets/binance.jpg' style={{
                                    width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                }} />
                                Binance
                            </div>
                        </MenuItem>
                        <MenuItem value={'polygon'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='token' src='./assets/polygonscan.svg' style={{
                                    width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                }} />
                                Polygon
                            </div>
                        </MenuItem>
                        <MenuItem value={'fantom'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='token' src='./assets/fantom.png' style={{
                                    width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                }} />
                                Fantom
                            </div>
                        </MenuItem>
                        <MenuItem value={'avalanche'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='token' src='./assets/avalanche.svg' style={{
                                    width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                }} />
                                Avalanche
                            </div>
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="filled" style={{ marginTop: '10px' }}>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.tokenName}
                        onChange={handleChange('tokenName')}
                        placeholder='Pair Name'
                    />
                </FormControl>
                <FormControl fullWidth variant="filled" style={{ marginTop: '10px' }}>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.address}
                        onChange={handleChange('address')}
                        placeholder='Key Pair Address'
                    />
                </FormControl>
                <Button style={{ height: '40px', width: '100%', fontSize: 'larger', background: '#12a971', margin: '10px 0px' }} variant='contained' onClick={Addtoken}>
                    Add
                </Button>
                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={token}
                        onChange={handleChangeToken}
                        sx={{ backgroundColor: '#23323c', borderRadius: '20px', height: '40px', display: 'flex', alignItems: 'center', color: 'white' }}
                    >
                        {
                            trendingOption.length > 0 ?
                                trendingOption.map((option, i) => {
                                    return (
                                        [
                                            <MenuItem value={option._id} key={i}>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '160px', fontSize: '20px' }}>
                                                    {
                                                        option.network === 'eth' ?
                                                            <img alt='img' src='./assets/ethereum.svg' style={{
                                                                width: '20px', height: '20px', marginRight: '5px', borderRadius: '15px'
                                                            }} />
                                                            :
                                                            option.network === 'bsc' ?
                                                                <img alt='img' src='./assets/binance.jpg' style={{
                                                                    width: '20px', height: '20px', marginRight: '5px', borderRadius: '15px'
                                                                }} />
                                                                :
                                                                option.network === 'fantom' ?
                                                                    <img alt='img' src='./assets/fantom.png' style={{
                                                                        width: '20px', height: '20px', marginRight: '5px', borderRadius: '15px'
                                                                    }} />
                                                                    :
                                                                    option.network === 'polygon' ?
                                                                        <img alt='img' src='./assets/polygonscan.svg' style={{
                                                                            width: '20px', height: '20px', marginRight: '5px', borderRadius: '15px'
                                                                        }} />
                                                                        :
                                                                        <img alt='img' src='./assets/avalanche.svg' style={{
                                                                            width: '20px', height: '20px', marginRight: '5px', borderRadius: '15px'
                                                                        }} />
                                                    }
                                                    {option.tokenName}
                                                </div>
                                            </MenuItem>
                                        ]
                                    )
                                })
                                :
                                <></>
                        }
                    </Select>
                </FormControl>
                <Button onClick={Remove} style={{ height: '40px', width: '100%', fontSize: 'larger', background: 'rgb(251 8 120)', marginTop: '10px' }} variant='contained'>
                    Remove
                </Button>
                <Toaster />
            </Box>
        </Box>
    );
}