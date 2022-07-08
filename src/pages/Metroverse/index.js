import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, ButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useMetaMask } from "metamask-react";
import TradingViewComponent from '../../tradingView'
import moment from 'moment';
import NumberFormat from 'react-number-format'
import toast, { Toaster } from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import { parseUnits } from '@ethersproject/units';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardRibbon,
    ChevronDownIcon,
    Heading,
    Input,
    RemoveIcon,
    SwapVertIcon,
    Text
} from '@pancakeswap-libs/uikit';

import { Modal } from '@mui/material';

// ------

import {
    getFactoryContractInstance,
    getSwapContractInstance,
    getTokenContractInstance,
} from '../../utils/web3'


export default function Metroverses() {


    // -------------------


    const RouterAddress = '0xfc29321B5872f860a076BFEE43B76435fF996f2d';
    const wethAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

    const { status, connect, account } = useMetaMask();

    const defalt = './assets/tokenlogo.png';
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    const [open4, setOpen4] = useState(false);
    const handleOpen4 = () => setOpen4(true);
    const handleClose4 = () => setOpen4(false);
    const [swapFlag, setSwapFlag] = useState(true);
    const [liquidityFlag, setLiquidityFlag] = useState(true);
    const [searchValue, setsearchValue] = useState('');
    const [tokenData, setTokenData] = useState([]);

    useEffect(async () => {

        const fetchData = async () => {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                value: searchValue,
                network: 'avalanche'
            })
                .then(async (res) => {
                    if (res.data.total && res.data.total !== 0) {
                        setTokenData(res.data.data);
                    } else {
                        axios.get('https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json')
                            .then((result) => {
                                if (result) {
                                    console.log(result.data, 'data')
                                    setTokenData(result.data.tokens);
                                }
                            })
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }

        if (searchValue !== '') {
            fetchData();
        } else {
            axios.get('https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json')
                .then((result) => {
                    if (result) {
                        setTokenData(result.data.tokens);
                    }
                })
        }
    }, [searchValue])

    const [token1, setToken1] = useState([]);
    const [tokenAddress1, setTokenAddress1] = useState('0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7');
    const [tokenSymbol1, setTokenSymbol1] = useState('WAVAX');
    const [tokenDecimal1, setTokenDecimal1] = useState(18);
    const [tokenPrice1, setTokenPrice1] = useState(1);
    const [tokenLgo1, setTokenLogo1] = useState('https://assets.dex.guru/icons/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7-avalanche.png');

    useEffect(() => {
        if (token1[0]) {
            setTokenAddress1(token1[0]);
            setTokenLogo1(token1[1])
            setTokenSymbol1(token1[2])
            setTokenDecimal1(token1[3])
            if (!token1[4]) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                    value: token1[0],
                    network: 'avalanche'
                })
                    .then(async (res) => {
                        setTokenPrice1(res.data.data[0].priceUSD);
                    })
            } else {
                setTokenPrice1(token1[4]);
            }
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                value: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
                network: 'avalanche'
            })
                .then(async (res) => {
                    setTokenPrice1(res.data.data[0].priceUSD);
                })
        }
        handleClose();
    }, [token1])

    // ------------change Token-------

    const changeToken = () => {
        setTokenAddress1(tokenAddress2);
        setTokenLogo1(tokenLgo2)
        setTokenSymbol1(tokenSymbol2)
        setTokenAddress2(tokenAddress1);
        setTokenLogo2(tokenLgo1)
        setTokenSymbol2(tokenSymbol1)
    }

    // -----------set token2-----------

    const [token2, setToken2] = useState([]);
    const [tokenAddress2, setTokenAddress2] = useState("0xde3a24028580884448a5397872046a019649b084");
    const [tokenSymbol2, setTokenSymbol2] = useState('USDT');
    const [tokenDecimal2, setTokenDecimal2] = useState(18);
    const [tokenPrice2, setTokenPrice2] = useState(1);
    const [tokenLgo2, setTokenLogo2] = useState("https://assets-stage.dex.guru/icons/0xde3a24028580884448a5397872046a019649b084-avalanche.png");

    useEffect(() => {
        if (token2[0]) {
            setTokenAddress2(token2[0]);
            setTokenLogo2(token2[1])
            setTokenSymbol2(token2[2])
            setTokenDecimal2(token2[3])
            if (!token2[4]) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                    value: token2[0],
                    network: 'avalanche'
                })
                    .then(async (res) => {
                        setTokenPrice2(res.data.data[0].priceUSD);
                    })
            } else {
                setTokenPrice2(token2[4]);
            }
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                value: '0xde3a24028580884448a5397872046a019649b084',
                network: 'avalanche'
            })
                .then(async (res) => {
                    setTokenPrice2(res.data.data[0].priceUSD);
                })
        }
        handleClose2();
    }, [token2])

    // ------------------------

    const [token3, setToken3] = useState([]);
    const [tokenAddress3, setTokenAddress3] = useState('0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7');
    const [tokenSymbol3, setTokenSymbol3] = useState('WAVAX');
    const [tokenDecimal3, setTokenDecimal3] = useState(18);
    const [tokenPrice3, setTokenPrice3] = useState(1);
    const [tokenLgo3, setTokenLogo3] = useState('https://assets.dex.guru/icons/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7-avalanche.png');

    useEffect(() => {
        if (token3[0]) {
            setTokenAddress3(token3[0]);
            setTokenLogo3(token3[1])
            setTokenSymbol3(token3[2])
            setTokenDecimal3(token3[3])
            if (!token3[4]) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                    value: token3[0],
                    network: 'avalanche'
                })
                    .then((res) => {
                        setTokenPrice3(res.data.data[0].priceUSD);
                    })
            } else {
                setTokenPrice3(token3[4]);
            }
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                value: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
                network: 'avalanche'
            })
                .then(async (res) => {
                    setTokenPrice3(res.data.data[0].priceUSD);
                })
        }
        handleClose3();
    }, [token3])

    // ---------------------set Token4----------

    const [token4, setToken4] = useState([]);
    const [tokenAddress4, setTokenAddress4] = useState("0xde3a24028580884448a5397872046a019649b084");
    const [tokenSymbol4, setTokenSymbol4] = useState('USDT');
    const [tokenDecimal4, setTokenDecimal4] = useState(18);
    const [tokenPrice4, setTokenPrice4] = useState(1);
    const [tokenLgo4, setTokenLogo4] = useState("https://assets-stage.dex.guru/icons/0xde3a24028580884448a5397872046a019649b084-avalanche.png");

    useEffect(() => {
        if (token4[0]) {
            setTokenAddress4(token4[0]);
            setTokenLogo4(token4[1])
            setTokenSymbol4(token4[2])
            setTokenDecimal4(token4[3])
            if (!token4[4]) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                    value: token4[0],
                    network: 'avalanche'
                })
                    .then((res) => {
                        console.log(res.data.data[0].priceUSD, 'price4')
                        setTokenPrice4(res.data.data[0].priceUSD);
                    })
            } else {
                setTokenPrice4(token4[4]);
            }
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/trending/search`, {
                value: '0xde3a24028580884448a5397872046a019649b084',
                network: 'avalanche'
            })
                .then(async (res) => {
                    setTokenPrice4(res.data.data[0].priceUSD);
                })
        }
        handleClose4();
    }, [token4])

    const [liquidityAmount1, setLiquidityAmount1] = useState(0);
    const [liquidityAmount2, setLiquidityAmount2] = useState(0);

    const [swapAmount1, setswapAmount1] = useState(0);
    const [swapAmount2, setswapAmount2] = useState(0);

    useEffect(() => {
        setLiquidityAmount2(tokenPrice3 / tokenPrice4 * liquidityAmount1);
    }, [liquidityAmount1, tokenPrice4, tokenPrice3])

    useEffect(() => {
        setswapAmount2(tokenPrice1 / tokenPrice2 * swapAmount1 * 0.997);
    }, [swapAmount1, tokenPrice1, tokenPrice2])

    const AddLiquidity = async () => {
        if (status === 'notConnected') {
            toast.error('Connect the Wallet');
        } else {
            if (window.ethereum.networkVersion !== "43114") {
                toast.error('Change to Avalanche Mainnet')
            } else {
                if (liquidityAmount1 === '' || liquidityAmount1 === '0') {
                    toast.error('Input the Correct Token Amount')
                } else {
                    const amount1 = parseUnits(String(liquidityAmount1), tokenDecimal3)
                    const amount2 = parseUnits(String(liquidityAmount2), tokenDecimal4)
                    const swapContract = getSwapContractInstance();
                    const tokenContract1 = getTokenContractInstance(tokenAddress3)
                    const tokenContract2 = getTokenContractInstance(tokenAddress4)

                    try {
                        const allowance1 = await tokenContract1.methods
                            .allowance(account, RouterAddress)
                            .call();
                        if (allowance1 < Number(amount1) && tokenAddress3 !== wethAddress) {
                            console.log(allowance1, amount1)
                            const amount = parseUnits(String(1e20), tokenDecimal3)
                            await tokenContract1.methods
                                .approve(RouterAddress, amount)
                                .send({ from: account });
                        }

                        const allowance2 = await tokenContract2.methods
                            .allowance(account, RouterAddress)
                            .call();
                        if (allowance2 < Number(amount2) && tokenAddress4 !== wethAddress) {
                            console.log(allowance2, amount2, 'asdfasdf')
                            const amount = parseUnits(String(1e20), tokenDecimal4)
                            await tokenContract2.methods
                                .approve(RouterAddress, amount)
                                .send({ from: account });
                        }

                        if (tokenAddress3 === wethAddress) {
                            console.log(tokenAddress4, amount2, account, amount1, 'addliquidity')
                            const tx = await swapContract.methods
                                .addLiquidityETH(
                                    tokenAddress4,
                                    amount2,
                                    0,
                                    0,
                                    account,
                                    new Date().valueOf() + 100000
                                )
                                .send({ from: account, value: amount1 })
                        } else if (tokenAddress4 === wethAddress) {
                            const tx = await swapContract.methods
                                .addLiquidityETH(
                                    tokenAddress3,
                                    amount1,
                                    0,
                                    0,
                                    account,
                                    new Date().valueOf() + 100000
                                )
                                .send({ from: account, value: amount2 })
                        } else {
                            const tx = await swapContract.methods
                                .addLiquidity(
                                    tokenAddress3,
                                    tokenAddress4,
                                    amount1,
                                    amount2,
                                    0,
                                    0,
                                    account,
                                    new Date().valueOf() + 100000
                                )
                                .send({ from: account })
                            console.log(tx);
                        }
                        toast.success('Success AddLiquidity')
                    } catch (error) {
                        toast.error(error.message);
                    }
                }
            }
        }
    }

    const TokenSwap = async () => {
        if (status === 'notConnected') {
            toast.error('Connect the Wallet');
        } else {
            if (window.ethereum.networkVersion !== "43114") {
                toast.error('Change to Avalanche Mainnet')
            } else {
                if (swapAmount1 === '' || swapAmount1 === '0') {
                    toast.error('Input the Correct Token Amount')
                } else {
                    const amount1 = parseUnits(String(swapAmount1), tokenDecimal1)
                    const swapContract = getSwapContractInstance();
                    try {

                        if (tokenAddress1 === wethAddress) {
                            const tx = await swapContract.methods
                                .swapExactETHForTokens(
                                    0,
                                    [tokenAddress1, tokenAddress2],
                                    account,
                                    new Date().valueOf() + 10000
                                )
                                .send({ from: account, value: amount1 })
                        } else if (tokenAddress2 === wethAddress) {

                            const tokenContract1 = getTokenContractInstance(tokenAddress1)

                            const allowance1 = await tokenContract1.methods
                                .allowance(account, RouterAddress)
                                .call();
                            if (allowance1 < Number(amount1)) {
                                const amount = parseUnits(String(1e20), tokenDecimal3)
                                await tokenContract1.methods
                                    .approve(RouterAddress, amount)
                                    .send({ from: account });
                            }

                            const tx = await swapContract.methods
                                .swapExactTokensForETH(
                                    amount1,
                                    0,
                                    [tokenAddress1, tokenAddress2],
                                    account,
                                    new Date().valueOf() + 10000000
                                )
                                .send({ from: account })
                        } else {

                            const tokenContract1 = getTokenContractInstance(tokenAddress1)

                            const allowance1 = await tokenContract1.methods
                                .allowance(account, RouterAddress)
                                .call();
                            if (allowance1 < Number(amount1)) {
                                const amount = parseUnits(String(1e20), tokenDecimal3)
                                await tokenContract1.methods
                                    .approve(RouterAddress, amount)
                                    .send({ from: account });
                            }

                            let path = [tokenAddress1, tokenAddress2];
                            const tx = await swapContract.methods
                                .swapExactTokensForTokens(
                                    amount1,
                                    0,
                                    path,
                                    account,
                                    new Date().valueOf() + 10000000
                                )
                                .send({ from: account })
                            console.log(tx);
                        }
                        toast.success('Success Swap')
                    } catch (error) {
                        toast.error(error.message);
                    }
                }
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------------------


    const eth1Address = '0xE20dC52fb419cfa770386A3679bCaF8a62722948';
    const eth2Address = '0xAB5Cee7735A9B06b936C6157fdDaF4E2366F50a5';
    const Token = useSelector((state) => state.Token.TokenName);
    const Network = useSelector((state) => state.Token.Network);
    const [trendingOption, setTrendingOption] = useState([]);
    const [tradingHistory, setTradingHistory] = useState({});
    const [basic, setBasic] = useState('');
    const [quote, setQuote] = useState('');
    const columns = [
        { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
        { id: 'type', label: 'Type', minWidth: 50, align: 'center' },
        {
            id: 'usd',
            label: 'Price USD',
            minWidth: 75,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'token1',
            label: basic,
            minWidth: 75,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'token2',
            label: quote,
            minWidth: 75,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'price',
            label: 'Price',
            minWidth: 75,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'transaction',
            label: 'TXN',
            align: 'left',
            format: (value) => value.toFixed(2),
        }
    ];
    const [symbol, setSymbol] = useState('avaxusd')
    const [isLoading, setIsLoading] = useState(false);
    const [ads, setAds] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (Token === 'avalanche') {
            setSymbol('AVAXUSD');
        } else if (Token === 'eth' || Token === 'optimism' || Token === 'arbitrum') {
            setSymbol('ETHUSD')
        } else if (Token === 'bsc') {
            setSymbol('BNBUSD')
        } else if (Token === 'fantom') {
            setSymbol('FTMUSD')
        } else if (Token === 'polygon') {
            setSymbol('MATICUSD')
        } else if (Token === 'celo') {
            setSymbol('CELOUSD')
        }

        async function fetchData1() {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/optionlist`, {
                network: Token,
            })
                .then(res => {
                    if (res.data) {
                        setTrendingOption(res.data);
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }

        async function fetchData2() {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/getAds`, {
                network: Token,
            })
                .then(res => {
                    if (res.data) {
                        setAds(res.data[0]);
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }

        fetchData1();
        fetchData2();

    }, [Token])

    useEffect(() => {


        if (Network.network === 'avalanche') {
            setSymbol(`${Network.symbol}USD`);
        } else if (Network.network === 'eth' || Network.network === 'optimism' || Network.network === 'arbitrum') {
            setSymbol(`${Network.symbol}USD`)
        } else if (Network.network === 'bsc') {
            setSymbol(`${Network.symbol}USD`)
        } else if (Network.network === 'fantom') {
            setSymbol(`${Network.symbol}USD`)
        } else if (Network.network === 'polygon') {
            setSymbol(`${Network.symbol}USD`)
        }

        function fetchData() {
            axios.post(`${process.env.REACT_APP_BASE_URL}/trending/tradingHistory`, {
                address: Network.address,
            })
                .then(res => {
                    console.log(res.data, '------------------------')
                    if (res.data.length) {
                        setBasic(res.data.baseTokenSymbol)
                        setQuote(res.data.quoteTokenSymbol)
                        let array = [];
                        for (let k = 0; k < res.data.tradingHistory.length; k++) {
                            const element = res.data.tradingHistory[k];
                            let date = moment(element.blockTimestamp).format();
                            array.push({ date: date, type: element.type, usd: `$${element.volumeUsd}`, token1: element.amount0, token2: element.amount1, price: `$${element.priceUsd}`, transaction: element.txnHash });
                        }
                        setTradingHistory(array);
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                    setIsLoading(false);
                })
        }

        if (Network.address) {
            // fetchData();
        }

    }, [Network])

    useEffect(async () => {
        if (account) {
            const factoryContract = getFactoryContractInstance();
            const allPairsLength = await factoryContract.methods.allPairsLength().call();
            for (let index = 0; index < allPairsLength; index++) {
                const tx = await factoryContract.methods.allPairs(index).call();
                console.log(tx, 'transaction')
            }
        }
    }, [account])

    return (
        <Box sx={{ display: 'grid' }}>
            {isLoading ?
                (
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', position: 'relative', top: window.innerHeight / 2 - 50
                    }}>
                        <CircularProgress />
                    </Box>
                )
                :
                <Box style={{ padding: '10px' }}>
                    <img alt='img' src='./assets/ads3.gif' style={{ width: '100%', borderRadius: '5px', height: '100px' }} />
                    <Box sx={{ width: 'auto !important', borderRadius: '5px', padding: '10px 0px', margin: '0px', display: 'flex' }}>
                        <Box style={{ maxWidth: '20%', marginRight: '10px' }}>
                            <Box style={{ background: '#23323c', borderRadius: '5px', padding: '20px', border: '1px solid gray', marginBottom: '10px' }}>
                                <Typography gutterBottom component="div" style={{ color: 'white', margin: '0px', fontSize: '25px', fontFamily: 'Pancake', borderBottom: '1px solid gray' }}>
                                    Hot Pairs
                                </Typography>
                                <Box style={{ display: 'flex' }}>
                                    <Box style={{ color: 'white', fontSize: 'small', display: 'grid', minWidth: '250px' }} >
                                        {
                                            trendingOption ?
                                                trendingOption.map((option, i) => {
                                                    return (
                                                        <div style={{ padding: '10px 0px', display: 'grid' }}>
                                                            <span style={{ fontFamily: 'Pancake', fontSize: '18px', color: '#f0ff07' }}>{option.tokenName}</span>
                                                            <span style={{ color: 'aquamarine', fontFamily: 'Pancake', fontSize: '18px', textAlign: 'left' }}>{option.address.substr(0, 10)}...{option.address.substr(-10)}</span>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <></>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{ background: '#23323c', borderRadius: '5px', padding: '20px', border: '1px solid gray' }}>
                                <Typography gutterBottom component="div" style={{ color: 'white', margin: '0px', fontSize: '25px', fontFamily: 'Pancake', borderBottom: '1px solid gray' }}>
                                    {
                                        Network.name ?
                                            <span>
                                                {Network.name}
                                            </span>
                                            :
                                            ''
                                    }
                                </Typography>
                                <Box style={{ display: 'flex' }}>
                                    {
                                        Network.network ?
                                            <Box style={{ display: 'flex' }}>
                                                <Box style={{ color: 'white', fontSize: 'small', display: 'grid' }} >
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Market Cap:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Market CapChange 24H:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Liquidity AVAX:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Liquidity USD:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Price AVAX:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Price AVAXChange 24H:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Price USD:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>PriceUSDChange 24H:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Volume24hAVAX:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>Volume24hUSD:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>VolumeAVAXChange24h:</span>
                                                    <span style={{ fontFamily: 'Pancake', fontSize: '12px' }}>VolumeUSDChange24h:</span>
                                                </Box>
                                                <Box style={{ color: 'white', fontSize: 'small', display: 'grid' }} >
                                                    <NumberFormat value={Network.marketCap.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.marketCapChange24h.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.liquidityETH.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.liquidityUSD.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.priceETH.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.priceETHChange24h.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.priceUSD.toFixed(10)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.priceUSDChange24h.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.volume24hETH.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.volume24hUSD.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.volumeETHChange24h.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                    <NumberFormat value={Network.volumeUSDChange24h.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                                </Box>
                                            </Box>
                                            :
                                            <></>
                                    }

                                </Box>
                            </Box>
                            <Box>
                                <img alt='img' src='./assets/ads2.gif' style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />
                                <img alt='img' src='./assets/ads4.gif' style={{ width: '100%', borderRadius: '5px' }} />
                                <img alt='img' src='./assets/ads1.gif' style={{ width: '100%', borderRadius: '5px' }} />
                            </Box>
                        </Box>
                        <Box style={{ width: '100%', display: 'flex !important', flexDirection: 'column' }}>
                            <Box sx={{ width: '100% !important', borderRadius: '5px', display: 'flex', background: '#23323c', color: 'white' }}>
                                <Box sx={{ width: '80% !important', borderRadius: '5px', margin: '10px 10px', display: 'flex', background: '#23323c', color: 'white' }}>
                                    <Box style={{ width: '100%' }}>
                                        <TradingViewComponent />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '25% !important', borderRadius: '5px', margin: '10px 10px', display: 'grid', background: '#23323c', color: 'white' }}>
                                    <Box style={{ display: 'grid', width: '100%' }}>
                                        {
                                            swapFlag ?
                                                <div>
                                                    <Card isSuccess style={{ borderRadius: '5px' }}>
                                                        <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                            <Button onClick={handleOpen} style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={tokenLgo1 ? tokenLgo1 : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />} endIcon={<ChevronDownIcon />}>{tokenSymbol1}</Button>
                                                            <div style={{ display: 'flex' }}>
                                                                <Input value={swapAmount1} onChange={(event) => { setswapAmount1(event.target.value) }} type="number" placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Button onClick={changeToken} style={{ backgroundColor: 'transparent', padding: '0px', border: '1px solid #ed4b9e', borderRadius: '50%', width: '40px', height: '40px', color: '#ed4b9e' }}><SwapVertIcon /></Button>
                                                            </div>
                                                            <Button onClick={handleOpen2} style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={tokenLgo2 ? tokenLgo2 : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />} endIcon={<ChevronDownIcon />}>{tokenSymbol2}</Button>
                                                            <div style={{ display: 'flex' }}>
                                                                <Input value={swapAmount2} onChange={(event) => { setswapAmount2(event.target.value) }} type="number" placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} readOnly />
                                                            </div>
                                                        </CardBody>
                                                        <CardFooter style={{ backgroundColor: 'rgb(0 0 0 / 38%)', textAlign: 'center' }}>
                                                            <Button style={{ borderRadius: '5px' }} onClick={TokenSwap} width="100%">Swap</Button>
                                                            <h3 onClick={() => setSwapFlag(false)} style={{ cursor: 'pointer', color: '#ed4b9e', marginBottom: '0px' }}>Add Liquidity?</h3>
                                                        </CardFooter>
                                                    </Card>
                                                    <Modal
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(244, 238, 255, 0.6)' }}
                                                    >
                                                        <div style={{ padding: "32px", width: "400px" }}>
                                                            <Card isSuccess style={{ borderRadius: '5px' }}>
                                                                <div style={{ height: "80px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid #31d0aa' }}>
                                                                    <Heading size="lg" style={{ margin: '0px' }}>Select a token</Heading>
                                                                </div>
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input type="text" placeholder="Search name or paste address" style={{ textAlign: 'left', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} value={searchValue} onChange={(event) => { setsearchValue(event.target.value) }} />
                                                                    </div>
                                                                    <div style={{ overflowY: 'overlay', height: '400px' }}>
                                                                        {
                                                                            tokenData ?
                                                                                tokenData.map((token) => {
                                                                                    if (!token.chainId || token.chainId !== 4) {
                                                                                        return (
                                                                                            <div key={token.address} onClick={() => { setToken1([token.address, token.logoURI, token.symbol, token.decimals, token.priceUSD]) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                                                                <Button style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={token.logoURI ? token.logoURI : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />}>{token.symbol}</Button>
                                                                                                {/* <Text style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>{token.priceUSD}</Text> */}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </Modal>
                                                    <Modal
                                                        open={open2}
                                                        onClose={handleClose2}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(244, 238, 255, 0.6)' }}
                                                    >
                                                        <div style={{ padding: "32px", width: "400px" }}>
                                                            <Card isSuccess style={{ borderRadius: '5px' }}>
                                                                <div style={{ height: "80px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid #31d0aa' }}>
                                                                    <Heading size="lg" style={{ margin: '0px' }}>Select a token</Heading>
                                                                </div>
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input type="text" placeholder="Search name or paste address" style={{ textAlign: 'left', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} value={searchValue} onChange={(event) => { setsearchValue(event.target.value) }} />
                                                                    </div>
                                                                    <div style={{ overflowY: 'overlay', height: '400px' }}>
                                                                        {
                                                                            tokenData ?
                                                                                tokenData.map((token) => {
                                                                                    if (!token.chainId || token.chainId !== 4) {
                                                                                        return (
                                                                                            <div key={token.address} onClick={() => { setToken2([token.address, token.logoURI, token.symbol, token.decimals, token.priceUSD]) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                                                                <Button style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={token.logoURI ? token.logoURI : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />}>{token.symbol}</Button>
                                                                                                {/* <Text style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>{token.priceUSD}</Text> */}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </Modal>
                                                </div >
                                                :
                                                <div>
                                                    <Card isWarning style={{ borderRadius: '5px' }}>
                                                        <div style={{ backgroundColor: "#191326", display: 'flex', justifyContent: 'left', alignItems: 'center', borderBottom: '1px solid rgb(237 75 158)' }}>
                                                            <Button size='md' style={{ backgroundColor: 'transparent', borderRadius: '5px', margin: '10px' }} onClick={() => { setLiquidityFlag(true) }}>Add</Button>
                                                            <Button size='md' style={{ backgroundColor: 'transparent', borderRadius: '5px', margin: '10px' }} onClick={() => { setLiquidityFlag(false) }} >Remove</Button>
                                                        </div>
                                                        {
                                                            liquidityFlag ?
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                                    <Button onClick={handleOpen3} style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={tokenLgo3 ? tokenLgo3 : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />} endIcon={<ChevronDownIcon />}>{tokenSymbol3}</Button>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input value={liquidityAmount1} type='number' onChange={(event) => { setLiquidityAmount1(event.target.value) }} placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} />
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                        <Button style={{ backgroundColor: 'transparent', padding: '0px', border: '1px solid #ed4b9e', borderRadius: '50%', width: '40px', height: '40px', color: '#ed4b9e' }}><AddIcon /></Button>
                                                                    </div>
                                                                    <Button onClick={handleOpen4} style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={tokenLgo4 ? tokenLgo4 : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />} endIcon={<ChevronDownIcon />}>{tokenSymbol4}</Button>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input value={liquidityAmount2} type="number" onChange={(event) => { setLiquidityAmount2(event.target.value) }} placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} readOnly />
                                                                    </div>
                                                                </CardBody>
                                                                :
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer' }}>

                                                                </CardBody>
                                                        }
                                                        <CardFooter style={{ backgroundColor: 'rgb(0 0 0 / 38%)', textAlign: 'center' }}>
                                                            {
                                                                liquidityFlag ?
                                                                    <Button style={{ borderRadius: '5px' }} onClick={AddLiquidity} width="100%" startIcon={<AddIcon />}>Add Liquidity</Button>
                                                                    :
                                                                    <Button style={{ borderRadius: '5px' }} width="100%" startIcon={<RemoveIcon />}>Remove Liquidity</Button>
                                                            }
                                                            <h3 onClick={() => setSwapFlag(true)} style={{ cursor: 'pointer', color: '#ed4b9e', marginBottom: '0px' }}>Swap?</h3>
                                                        </CardFooter>
                                                    </Card>
                                                    <Modal
                                                        open={open3}
                                                        onClose={handleClose3}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(244, 238, 255, 0.6)' }}
                                                    >
                                                        <div style={{ padding: "32px", width: "400px" }}>
                                                            <Card isSuccess style={{ borderRadius: '5px' }}>
                                                                <div style={{ height: "80px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid #31d0aa' }}>
                                                                    <Heading size="lg" style={{ margin: '0px' }}>Select a token</Heading>
                                                                </div>
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input type="text" placeholder="Search name or paste address" style={{ textAlign: 'left', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} value={searchValue} onChange={(event) => { setsearchValue(event.target.value) }} />
                                                                    </div>
                                                                    <div style={{ overflowY: 'overlay', height: '400px' }}>
                                                                        {
                                                                            tokenData ?
                                                                                tokenData.map((token) => {
                                                                                    if (!token.chainId || token.chainId !== 4) {
                                                                                        return (
                                                                                            <div key={token.address} onClick={() => { setToken3([token.address, token.logoURI, token.symbol, token.decimals, token.priceUSD]) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                                                                <Button style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={token.logoURI ? token.logoURI : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />}>{token.symbol}</Button>
                                                                                                {/* <Text style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>{token.priceUSD}</Text> */}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </Modal>
                                                    <Modal
                                                        open={open4}
                                                        onClose={handleClose4}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(244, 238, 255, 0.6)' }}
                                                    >
                                                        <div style={{ padding: "32px", width: "400px" }}>
                                                            <Card isSuccess style={{ borderRadius: '5px' }}>
                                                                <div style={{ height: "80px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid #31d0aa' }}>
                                                                    <Heading size="lg" style={{ margin: '0px' }}>Select a token</Heading>
                                                                </div>
                                                                <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)' }}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Input type="text" placeholder="Search name or paste address" style={{ textAlign: 'left', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} value={searchValue} onChange={(event) => { setsearchValue(event.target.value) }} />
                                                                    </div>
                                                                    <div style={{ overflowY: 'overlay', height: '400px' }}>
                                                                        {
                                                                            tokenData ?
                                                                                tokenData.map((token) => {
                                                                                    if (!token.chainId || token.chainId !== 4) {
                                                                                        return (
                                                                                            <div key={token.address} onClick={() => { setToken4([token.address, token.logoURI, token.symbol, token.decimals, token.priceUSD]) }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                                                                <Button style={{ backgroundColor: 'transparent', padding: '0px' }} startIcon={<img alt='token' src={token.logoURI ? token.logoURI : defalt} style={{ width: '20px', height: '20px', borderRadius: '50%', flex: '1' }} />}>{token.symbol}</Button>
                                                                                                {/* <Text style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>{token.priceUSD}</Text> */}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </Modal>
                                                </div>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            {/* <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid gray', mt: '10px', display: 'grid' }}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, background: '#23323c', color: 'white', fontFamily: 'Pancake' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody style={{ background: '#23323c' }}>
                                            {
                                                tradingHistory ?
                                                    tradingHistory
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row, i) => {
                                                            if (row.type === 'buy') {
                                                                return (
                                                                    <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                                                                        {columns.map((column) => {
                                                                            const value = row[column.id];
                                                                            if (column.id === 'transaction') {
                                                                                let hashNetwork = 'snowtrace.io';
                                                                                if (Network.network === 'eth') {
                                                                                    hashNetwork = 'etherscan.io';
                                                                                } else if (Network.network === 'bsc') {
                                                                                    hashNetwork = 'bscscan.com';
                                                                                } else if (Network.network === 'polygon') {
                                                                                    hashNetwork = 'polygonscan.com'
                                                                                } else if (Network.network === 'fantom') {
                                                                                    hashNetwork = 'ftmscan.com'
                                                                                }
                                                                                return (
                                                                                    <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', fontFamily: 'Pancake', color: '#29b0ff' }}>
                                                                                        <a target='blank' style={{ color: '#29b0ff' }} href={`https://${hashNetwork}/tx/${value}`}>{value.substr(0, 10)}...{value.substr(-10)}</a>
                                                                                    </TableCell>
                                                                                );
                                                                            } else {
                                                                                return (
                                                                                    <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', fontFamily: 'Pancake', color: '#29b0ff' }}>
                                                                                        {value}
                                                                                    </TableCell>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </TableRow>
                                                                );
                                                            } else {
                                                                return (
                                                                    <TableRow hover role="checkbox" tabIndex={-1} key={i + 1000} >
                                                                        {columns.map((column) => {
                                                                            const value = row[column.id];
                                                                            if (column.id === 'transaction') {
                                                                                let hashNetwork = 'snowtrace.io';
                                                                                if (Network.network === 'eth') {
                                                                                    hashNetwork = 'etherscan.io';
                                                                                } else if (Network.network === 'bsc') {
                                                                                    hashNetwork = 'bscscan.com';
                                                                                } else if (Network.network === 'polygon') {
                                                                                    hashNetwork = 'polygonscan.com'
                                                                                } else if (Network.network === 'fantom') {
                                                                                    hashNetwork = 'ftmscan.com'
                                                                                }
                                                                                return (
                                                                                    <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', fontFamily: 'Pancake', color: '#ff4a68' }}>
                                                                                        <a target='blank' style={{ color: '#ff4a68' }} href={`https://${hashNetwork}/tx/${value}`}>{value.substr(0, 10)}...{value.substr(-10)}</a>
                                                                                    </TableCell>
                                                                                );
                                                                            } else {
                                                                                return (
                                                                                    <TableCell key={column.id + i} align={column.align} style={{ borderBottom: 'gray', fontFamily: 'Pancake', color: '#ff4a68' }}>
                                                                                        {value}
                                                                                    </TableCell>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </TableRow>
                                                                );
                                                            }
                                                        })
                                                    :
                                                    <></>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={tradingHistory.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    style={{ background: '#23323c' }}
                                />
                            </Paper> */}
                        </Box>
                    </Box>
                    <Toaster />
                </Box>
            }
        </Box>
    );
}