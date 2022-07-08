import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Button, FilledInput, FormControl, MenuItem, CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Metroverses() {

    const inputRef1 = useRef('');
    const inputRef2 = useRef('');
    const inputRef3 = useRef('');
    const [n_image1, n_imageSetFile1] = useState();
    const [n_image2, n_imageSetFile2] = useState();
    const [n_image3, n_imageSetFile3] = useState();
    const [fileUrl1, updateFileUrl1] = useState('./assets/avalanche.svg')
    const [fileUrl2, updateFileUrl2] = useState('./assets/avalanche.svg')
    const [fileUrl3, updateFileUrl3] = useState('./assets/avalanche.svg')

    const onChange1 = async (e) => {
        n_imageSetFile1(e.target.files[0]);
        updateFileUrl1(URL.createObjectURL(e.target.files[0]))
    }

    const onChange2 = async (e) => {
        n_imageSetFile2(e.target.files[0]);
        updateFileUrl2(URL.createObjectURL(e.target.files[0]))
    }

    const onChange3 = async (e) => {
        n_imageSetFile3(e.target.files[0]);
        updateFileUrl3(URL.createObjectURL(e.target.files[0]))
    }

    const Select_Image1 = () => {
        inputRef1.current.click()
    }

    const Select_Image2 = () => {
        inputRef2.current.click()
    }

    const Select_Image3 = () => {
        inputRef3.current.click()
    }

    const Upload = async () => {
        setIsLoading(true);
        let params = new FormData()
        params.append("file1", n_image1);
        params.append("file2", n_image2);
        params.append("file3", n_image3);
        params.append("network", values.network);

        async function fetchData() {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/trending/UploadAds`, params)
                .then(res => {
                    if (res.data.flag === 'create') {
                        console.log(res.data)
                        toast.success('Created successfully!')
                    } else if (res.data.flag === 'update') {
                        console.log(res.data)
                        toast.success('Updated successfully!')
                    } else {
                        toast.error('Error')
                    }
                })
                .catch(err => {
                    console.log(err, 'error');
                })
        }

        fetchData();

        setIsLoading(false)
    }

    // -----------------------------------------

    const [values, setValues] = useState({
        network: 'avalanche'
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading === true ?
                (
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', position: 'relative', top: window.innerHeight / 2 - 50
                    }}>
                        <CircularProgress />
                    </Box>
                )
                :
                <Box sx={{ width: '100%', borderRadius: '10px', padding: '10px 10px', margin: '10px 10px', display: 'grid', background: '#23323c', color: 'white', border: '1px solid gray' }}>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.network}
                            onChange={handleChange('network')}
                            sx={{ backgroundColor: '#23323c', borderRadius: '5px', height: '60px', display: 'flex', alignItems: 'center', color: 'white' }}
                        >
                            <MenuItem value={'eth'}>
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                    <img alt='token' src='./assets/ethereum.svg' style={{
                                        width: '40px', height: '40px', marginRight: '5px', borderRadius: '15px', backgroundColor: 'transparent'
                                    }} />
                                    Ethereum
                                </div>
                            </MenuItem>
                            <MenuItem value={'bsc'}>
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                    <img alt='token' src='./assets/binance.jpg' style={{
                                        width: '40px', height: '40px', marginRight: '5px', borderRadius: '15px', backgroundColor: 'transparent'
                                    }} />
                                    Binance
                                </div>
                            </MenuItem>
                            <MenuItem value={'polygon'}>
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                    <img alt='token' src='./assets/polygonscan.svg' style={{
                                        width: '40px', height: '40px', marginRight: '5px', borderRadius: '15px', backgroundColor: 'transparent'
                                    }} />
                                    Polygon
                                </div>
                            </MenuItem>
                            <MenuItem value={'fantom'}>
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                    <img alt='token' src='./assets/fantom.png' style={{
                                        width: '40px', height: '40px', marginRight: '5px', borderRadius: '15px', backgroundColor: 'transparent'
                                    }} />
                                    Fantom
                                </div>
                            </MenuItem>
                            <MenuItem value={'avalanche'}>
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Pancake' }}>
                                    <img alt='token' src='./assets/avalanche.svg' style={{
                                        width: '40px', height: '40px', marginRight: '5px', borderRadius: '15px', backgroundColor: 'transparent'
                                    }} />
                                    Avalanche
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid gray', borderRadius: '5px' }}>
                        <input
                            ref={inputRef1}
                            accept="image/*"
                            placeholder='Input the NFT Name'
                            type='file'
                            style={{ display: 'none' }}
                            textAlign='center'
                            id="filled-adornment-amount"
                            onChange={onChange1}
                        />
                        <img display="initial" style={{ width: '100%', height: '100px', borderRadius: '5px' }} src={fileUrl1} />
                        <Button variant='contained' style={{ width: '100%', fontFamily: 'Pancake', background: '#1976d27d', border: '1px solid #1976d2', marginTop: '10px', height: '60px' }} onClick={Select_Image1}>
                            Select Image
                        </Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid gray', borderRadius: '5px', flex: '1' }}>
                            <input
                                ref={inputRef2}
                                accept="image/*"
                                placeholder='Input the NFT Name'
                                type='file'
                                style={{ display: 'none' }}
                                textAlign='center'
                                id="filled-adornment-amount"
                                onChange={onChange2}
                            />
                            <img display="initial" style={{ width: '100%', height: '100px', borderRadius: '5px' }} src={fileUrl2} />
                            <Button variant='contained' style={{ width: '100%', fontFamily: 'Pancake', background: '#1976d27d', border: '1px solid #1976d2', marginTop: '10px', height: '60px' }} onClick={Select_Image2}>
                                Select Image
                            </Button>
                        </div>
                        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid gray', borderRadius: '5px', flex: '1' }}>
                            <input
                                ref={inputRef3}
                                accept="image/*"
                                placeholder='Input the NFT Name'
                                type='file'
                                style={{ display: 'none' }}
                                textAlign='center'
                                id="filled-adornment-amount"
                                onChange={onChange3}
                            />
                            <img display="initial" style={{ width: '100%', height: '100px', borderRadius: '5px' }} src={fileUrl3} />
                            <Button variant='contained' style={{ width: '100%', fontFamily: 'Pancake', background: '#1976d27d', border: '1px solid #1976d2', marginTop: '10px', height: '60px' }} onClick={Select_Image3}>
                                Select Image
                            </Button>
                        </div>

                    </div>
                    <Button variant='contained' style={{ width: '100%', fontFamily: 'Pancake', background: '#1976d27d', border: '1px solid #1976d2', marginTop: '10px', height: '60px' }} onClick={Upload}>
                        Upload Images
                    </Button>
                </Box>
            }
            <Toaster />
        </Box>
    );
}