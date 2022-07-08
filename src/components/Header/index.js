import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Button } from '@mui/material';
import { useMetaMask } from "metamask-react";
import { useDispatch } from 'react-redux';
import { SetTokenName, SetNetwork } from '../../store/Token';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import toast, { Toaster } from 'react-hot-toast';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {

    const styles = {
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 20,
        marginTop: '5px',
        border: '1px solid gray',
        p: 1,
        bgcolor: '#142028',
        maxHeight: '400px',
        overflowY: 'overlay'
    };


    const handleClickAway = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const history = useHistory();

    const dispatch = useDispatch();

    const TrendingOption = () => {
        history.push('/trending')
    }

    const MangeAds = () => {
        history.push('/ads')
    }

    const Track = () => {
        history.push('./track')
    }

    const Trade = () => {
        history.push('./trade');
    }

    const { status, connect, account } = useMetaMask();

    const [searchValue, setSearchValue] = useState('0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7');

    const [tokenData, setTokenData] = useState([]);

    const [admin, setAdmin] = useState(false);

    const [age, setAge] = useState('avalanche');

    const handleChange = (event) => {

        dispatch(SetTokenName(event.target.value));
        setAge(event.target.value);

        if (event.target.value === 'eth') {
            setSearchValue('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')
        } else if (event.target.value === 'avalanche') {
            setSearchValue('0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7')
        } else if (event.target.value === 'bsc') {
            setSearchValue('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        } else if (event.target.value === 'fantom') {
            setSearchValue('0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83')
        } else if (event.target.value === 'polygon') {
            setSearchValue('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270')
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (searchValue !== '') {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                    value: searchValue,
                    network: age
                })
                    .then(res => {
                        if (res.data.total !== 0) {
                            setTokenData(res.data.data);
                            if (res.data.total === 1) {
                                dispatch(SetNetwork(res.data.data[0]));
                            }
                        } else {
                            setTokenData();
                        }
                    })
                    .catch(err => {
                        console.log(err, 'error');
                    })
            } else {
                setTokenData();
            }
        }
        fetchData();
    }, [searchValue, age, dispatch])

    useEffect(() => {
        if (account === '0x8b6e132456bea45954beff3488b4c7e245128b7d') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [account])

    const MetaMask_Connect = () => {
        if (status === "initializing") return <div style={{ fontFamily: 'Pancake' }}>Synchronisation with MetaMask ongoing...</div>

        if (status === "unavailable") return <div style={{ fontFamily: 'Pancake' }}>MetaMask not available</div>

        if (status === "notConnected") return <Button style={{ fontFamily: 'Pancake' }} variant="contained" onClick={connect}>Connect</Button>

        if (status === "connecting") return <Button style={{ fontFamily: 'Pancake' }} variant="contained">Connecting ...</Button>

        if (status === "connected") {
            return (<Button style={{ fontFamily: 'Pancake' }} variant="contained">{account.slice(0, 6)}...{account.slice(account.length - 4)}</Button>)
        }

        return null;
    }

    const SelectList = (token) => {
        console.log(token, '99999')
        setSearchValue(token.address);
        dispatch(SetNetwork(token));
        setOpen(false);
    }

    const Dashboard = () => {
        history.push('/')
    }

    const [pageRouter, setPageRouter] = useState('/');

    const RouterChange = (event) => {
        console.log(event.target.value, 99)
        if (event.target.value === 'status') {
            setPageRouter('status');
        } else {
            setPageRouter(event.target.value);
            history.push(event.target.value);
        }
    }

    const MetaMask_Connect_mobile = () => {
        if (status === "initializing") return <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>Synchronisation with MetaMask ongoing...</div>

        if (status === "unavailable") return <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>MetaMask not available</div>

        if (status === "notConnected") return <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }} variant="contained" onClick={connect}>Connect</div>

        if (status === "connecting") return <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }} variant="contained">Connecting ...</div>

        if (status === "connected") {
            return (<div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }} variant="contained">{account.slice(0, 6)}...{account.slice(account.length - 4)}</div>)
        }

        return null;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <Toaster /> */}
            <AppBar position="static" className='header p10 desktop'>
                <Toolbar>
                    <Box sx={{ width: '20%' }}>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                                sx={{ backgroundColor: '#23323c', borderRadius: '20px', height: '40px', display: 'flex', alignItems: 'center', color: 'white' }}
                            >
                                <MenuItem value={'eth'}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                        <img alt='token' src='./assets/ethereum.svg' style={{
                                            width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                        }} />
                                        Ethereum
                                    </div>
                                </MenuItem>
                                <MenuItem value={'bsc'}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                        <img alt='token' src='./assets/binance.jpg' style={{
                                            width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                        }} />
                                        Binance
                                    </div>
                                </MenuItem>
                                <MenuItem value={'polygon'}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                        <img alt='token' src='./assets/polygonscan.svg' style={{
                                            width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                        }} />
                                        Polygon
                                    </div>
                                </MenuItem>
                                <MenuItem value={'fantom'}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                        <img alt='token' src='./assets/fantom.png' style={{
                                            width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                        }} />
                                        Fantom
                                    </div>
                                </MenuItem>
                                <MenuItem value={'avalanche'}>
                                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                        <img alt='token' src='./assets/avalanche.svg' style={{
                                            width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                        }} />
                                        Avalanche
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <ClickAwayListener
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={handleClickAway}
                    >
                        <Search sx={{ borderRadius: '20px', backgroundColor: '#23323c' }} className='searchPart'>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onClick={handleClick}
                                onChange={event => setSearchValue(event.target.value)}
                                style={{ fontFamily: 'Pancake' }}
                            />
                            {open ? (
                                <Box sx={styles}>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360 }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            tokenData ?
                                                <></>
                                                :
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    no result
                                                </ListSubheader>
                                        }
                                    >
                                        {
                                            tokenData && tokenData.length > 0 ?
                                                tokenData.map((token, i) => {
                                                    let defaultPath = './assets/logo.jpg';
                                                    return (
                                                        <ListItemButton key={i} onClick={() => { SelectList(token) }}>
                                                            <ListItemIcon>
                                                                <img alt='img' src={token.logoURI ? token.logoURI : defaultPath} style={{ width: '30px' }} />
                                                            </ListItemIcon>
                                                            <div style={{ display: 'grid' }}>
                                                                <ListItemText primary={`Name : ${token.name}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Symbol : ${token.symbol}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Network : ${token.network}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Address : ${token.address.substr(0, 6)}...${token.address.substr(-6)}`} style={{ fontFamily: 'Pancake' }} />
                                                            </div>
                                                        </ListItemButton>
                                                    )
                                                })
                                                :
                                                <></>
                                        }
                                    </List>
                                </Box>
                            ) : null}
                        </Search>
                    </ClickAwayListener>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="contained" onClick={Dashboard} style={{ marginRight: '10px', fontFamily: 'Pancake' }}>DashBoard</Button>
                        {
                            admin ?
                                <Button variant="contained" onClick={TrendingOption} style={{ marginRight: '10px', fontFamily: 'Pancake' }}>Trending</Button>
                                :
                                <></>
                        }
                        {
                            admin ?
                                <Button variant="contained" onClick={MangeAds} style={{ marginRight: '10px', fontFamily: 'Pancake' }}>Ads</Button>
                                :
                                <></>
                        }
                        <Button variant="contained" onClick={Trade} style={{ marginRight: '10px', fontFamily: 'Pancake' }}>Swap</Button>
                        <Button variant="contained" onClick={Track} style={{ marginRight: '10px', fontFamily: 'Pancake' }}>Currency</Button>
                        {MetaMask_Connect()}
                    </Box>
                </Toolbar>
            </AppBar>
            <AppBar position="static" className='header p10 mobile'>
                <Toolbar style={{ display: 'grid', marginTop: '10px' }}>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ flex: '1', textAlign: 'left' }}>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChange}
                                    sx={{ backgroundColor: '#23323c', height: '40px', display: 'flex', alignItems: 'center', color: 'white' }}
                                >
                                    <MenuItem value={'eth'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            <img alt='token' src='./assets/ethereum.svg' style={{
                                                width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                            }} />
                                            Ethereum
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'bsc'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            <img alt='token' src='./assets/binance.jpg' style={{
                                                width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                            }} />
                                            Binance
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'polygon'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            <img alt='token' src='./assets/polygonscan.svg' style={{
                                                width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                            }} />
                                            Polygon
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'fantom'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            <img alt='token' src='./assets/fantom.png' style={{
                                                width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                            }} />
                                            Fantom
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'avalanche'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            <img alt='token' src='./assets/avalanche.svg' style={{
                                                width: '30px', height: '30px', marginRight: '5px', borderRadius: '15px'
                                            }} />
                                            Avalanche
                                        </div>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box style={{ flex: '1', textAlign: 'right' }}>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pageRouter}
                                    onChange={RouterChange}
                                    sx={{ backgroundColor: '#23323c', height: '40px', display: 'flex', alignItems: 'center', color: 'white' }}
                                >
                                    <MenuItem value={'/'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            DashBoard
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'trade'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            Swap
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'track'}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                            Currency
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'status'}>
                                        {MetaMask_Connect_mobile()}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <ClickAwayListener
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={handleClickAway}
                    >
                        <Search sx={{ marginTop: '10px' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                className='searchvalue'
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onClick={handleClick}
                                onChange={event => setSearchValue(event.target.value)}
                                style={{ fontFamily: 'Pancake', width: '100%' }}
                            />
                            {open ? (
                                <Box sx={styles}>
                                    <List
                                        sx={{ width: '100%' }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            tokenData ?
                                                <></>
                                                :
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    no result
                                                </ListSubheader>
                                        }
                                    >
                                        {
                                            tokenData && tokenData.length > 0 ?
                                                tokenData.map((token, i) => {
                                                    let defaultPath = './assets/logo.jpg';
                                                    return (
                                                        <ListItemButton key={i} onClick={() => { SelectList(token) }}>
                                                            <ListItemIcon>
                                                                <img alt='img' src={token.logoURI ? token.logoURI : defaultPath} style={{ width: '30px' }} />
                                                            </ListItemIcon>
                                                            <div style={{ display: 'grid' }}>
                                                                <ListItemText primary={`Name : ${token.name}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Symbol : ${token.symbol}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Network : ${token.network}`} style={{ fontFamily: 'Pancake' }} />
                                                                <ListItemText primary={`Address : ${token.address.substr(0, 6)}...${token.address.substr(-6)}`} style={{ fontFamily: 'Pancake' }} />
                                                            </div>
                                                        </ListItemButton>
                                                    )
                                                })
                                                :
                                                <></>
                                        }
                                    </List>
                                </Box>
                            ) : null}
                        </Search>
                    </ClickAwayListener>

                </Toolbar>
            </AppBar>
        </Box>
    );
}