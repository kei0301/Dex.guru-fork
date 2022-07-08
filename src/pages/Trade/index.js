import {
    BinanceIcon,
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
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMetaMask } from "metamask-react";
import { parseUnits } from '@ethersproject/units';

import {
    getFactoryContractInstance,
    getSwapContractInstance,
    getTokenContractInstance,
} from '../../utils/web3'
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const BN = web3.utils.BN;

export default function Exchange() {

    const RouterAddress = '0xD751613727B0dDCC4b65F3d7072FCB1F3283193e';
    const wethAddress = '0x5944cB6Fe916b1F5142faF63d0bFA9779382eE75';

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
        setswapAmount2(tokenPrice1 / tokenPrice2 * swapAmount1);
    }, [swapAmount1, tokenPrice1, tokenPrice2])

    const AddLiquidity = async () => {
        if (status === 'notConnected') {
            toast.error('Connect the Wallet');
        } else {
            if (window.ethereum.networkVersion !== "43113") {
                toast.error('Change to Avalanche Mainnet')
            } else {
                if (liquidityAmount1 === '' || liquidityAmount1 === '0') {
                    toast.error('Input the Correct Token Amount')
                } else {
                    const tokenAddress3 = '0x5944cB6Fe916b1F5142faF63d0bFA9779382eE75'
                    const tokenAddress4 = '0xAB5Cee7735A9B06b936C6157fdDaF4E2366F50a5'
                    // const amount1 = parseUnits(String(liquidityAmount1), tokenDecimal3)
                    const amount1 = (new BN(liquidityAmount1).mul(new BN(10).pow(new BN(tokenDecimal3)))).toString();
                    // const amount2 = parseUnits(String(liquidityAmount2), tokenDecimal4)
                    const amount2 = (new BN(liquidityAmount2).mul(new BN(10).pow(new BN(tokenDecimal4)))).toString();
                    const swapContract = getSwapContractInstance();
                    const tokenContract1 = getTokenContractInstance(tokenAddress3)
                    const tokenContract2 = getTokenContractInstance(tokenAddress4)
                    try {
                        const allowance1 = await tokenContract1.methods
                            .allowance(account, RouterAddress)
                            .call();
                        if (allowance1 < Number(amount1) && tokenAddress3 !== wethAddress) {
                            console.log(allowance1, amount1)
                            // const amount = parseUnits(String(1e20), tokenDecimal3)
                            const amount = (new BN(String(1e20)).mul(new BN(10).pow(new BN(tokenDecimal3)))).toString();
                            await tokenContract1.methods
                                .approve(RouterAddress, amount)
                                .send({ from: account });
                        }

                        const allowance2 = await tokenContract2.methods
                            .allowance(account, RouterAddress)
                            .call();
                        if (allowance2 < Number(amount2) && tokenAddress4 !== wethAddress) {
                            // const amount = parseUnits(String(1e20), tokenDecimal4)
                            const amount = (new BN(String(1e20)).mul(new BN(10).pow(new BN(tokenDecimal4)))).toString();
                            await tokenContract2.methods
                                .approve(RouterAddress, amount)
                                .send({ from: account });
                        }

                        if (tokenAddress3 === wethAddress) {
                            console.log(tokenAddress4, amount2, account, 'here')
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
            if (window.ethereum.networkVersion !== "43113") {
                toast.error('Change to Avalanche Mainnet')
            } else {
                if (swapAmount1 === '' || swapAmount1 === '0') {
                    toast.error('Input the Correct Token Amount')
                } else {
                    const amount1 = parseUnits(String(swapAmount1), tokenDecimal1)
                    // const amount1 = (new BN(swapAmount1).mul(new BN(10).pow(new BN(tokenDecimal1)))).toString();
                    const swapContract = getSwapContractInstance();
                    try {

                        const tokenAddress1 = '0x5944cB6Fe916b1F5142faF63d0bFA9779382eE75'
                        const tokenAddress2 = '0xAB5Cee7735A9B06b936C6157fdDaF4E2366F50a5'

                        if (tokenAddress1 === wethAddress) {
                            console.log(tokenAddress1, wethAddress, tokenDecimal1, amount1, 'here')
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
                                // const amount = parseUnits(String(1e20), tokenDecimal3)
                                const amount = (new BN(String(1e20)).mul(new BN(10).pow(new BN(tokenDecimal3)))).toString();
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
                                // const amount = parseUnits(String(1e20), tokenDecimal3)
                                const amount = (new BN(String(1e20)).mul(new BN(10).pow(new BN(tokenDecimal3)))).toString();
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Toaster />
            {
                swapFlag ?
                    <div style={{ padding: "32px", width: "400px" }}>
                        <Card isWarning ribbon={<CardRibbon text="Avalanche" />}>
                            <div style={{ height: "124px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid rgb(237 75 158)' }}>
                                <Heading size="lg" style={{ margin: '0px' }}>Swap</Heading>
                                <Heading size="md" style={{ margin: '0px' }}>Trade tokens in an Instant</Heading>
                            </div>
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
                                    <Input value={swapAmount2} onChange={(event) => { setswapAmount2(event.target.value) }} type="number" placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} />
                                </div>
                            </CardBody>
                            <CardFooter style={{ backgroundColor: 'rgb(0 0 0 / 38%)', textAlign: 'center' }}>
                                <Button onClick={TokenSwap} width="100%">Swap</Button>
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
                                <Card isSuccess>
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
                                <Card isSuccess>
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
                    <div style={{ padding: "32px", width: "400px" }}>
                        <Card isWarning ribbon={<CardRibbon text="Avalanche" />}>
                            <div style={{ height: "124px", backgroundColor: "#191326", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid rgb(237 75 158)' }}>
                                <Heading size="lg" style={{ margin: '0px' }}>Add Liquidity</Heading>
                                <Heading size="md" style={{ margin: '0px' }}>Add liquidity to receive LP tokens</Heading>
                            </div>
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
                                            <Input value={liquidityAmount2} type="number" onChange={(event) => { setLiquidityAmount2(event.target.value) }} placeholder="0.00" style={{ textAlign: 'right', height: '50px', margin: '10px 0px', borderRadius: '5px', fontFamily: 'Pancake' }} />
                                        </div>
                                    </CardBody>
                                    :
                                    <CardBody style={{ backgroundColor: 'rgb(0 0 0 / 38%)', display: 'flex', flexDirection: 'column', alignItems: 'start', cursor: 'pointer' }}>
                                        <Button style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <Text style={{ flex: '1' }}>WAVAX/USDT</Text>
                                        </Button>
                                        <Button style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <Text style={{ flex: '1' }}>WAVAX/USDT</Text>
                                        </Button>
                                        <Button style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <Text style={{ flex: '1' }}>WAVAX/USDT</Text>
                                        </Button>
                                        <Button style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <img alt='token' src={defalt} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                                            <Text style={{ flex: '1' }}>WAVAX/USDT</Text>
                                        </Button>
                                    </CardBody>
                            }
                            <CardFooter style={{ backgroundColor: 'rgb(0 0 0 / 38%)', textAlign: 'center' }}>
                                {
                                    liquidityFlag ?
                                        <Button onClick={AddLiquidity} width="100%" startIcon={<AddIcon />}>Add Liquidity</Button>
                                        :
                                        <Button width="100%" startIcon={<RemoveIcon />}>Remove Liquidity</Button>
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
                                <Card isSuccess>
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
                                <Card isSuccess>
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
        </div >
    );
};
