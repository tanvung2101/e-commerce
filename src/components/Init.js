"use client"

import React, { useEffect, useState } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import axiosClient from '@/apis/axiosClient'
import { useDispatch, useSelector } from 'react-redux';
import { MODE_THEME } from '@/constants';
import { changeTheme } from '@/redux/commonSlice';
import AuthApis from '@/apis/authApis';
import { clearInfo, setProfileAuth } from '@/redux/accountSlice';
import { getCookies } from 'cookies-next';
import { deleteAll } from '@/redux/cartItemSlice';


const Init = ({ children }) => {
    // const { token } = useSelector((state) => state.account);
    const { theme } = useSelector((state) => state.common);
    const dispatch = useDispatch();
    const {token} = getCookies()
  console.log('dgdgdgdgd', token) 


    // const [loading, setLoading] = useState(true);

    // axiosClient.defaults.headers.common = {
    //     'Authorization': `Bearer ${token}`
    // }
    useEffect(() => {
        switch (theme) {
            case MODE_THEME.DARK:
                document.documentElement.setAttribute("data-theme", "light");
                dispatch(changeTheme(MODE_THEME.DARK))
                break;
            case MODE_THEME.DARK:
            default:
                document.documentElement.setAttribute("data-theme", "dark");
                dispatch(changeTheme(MODE_THEME.DARK))
                break;
        }
    }, [dispatch, theme])

    // useEffect(() => {
    //     if (token) {
    //         AuthApis.getProfile()
    //             .then((res) => {
    //                 dispatch(setProfileAuth(res))
    //             })
    //             .catch((err) => {
    //                 errorHelper(err)
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     } else {
    //         setLoading(false)
    //     }
    // }, [dispatch, token])
    // useEffect(() => {
    //     if(!token){
    //         dispatch(deleteAll());
    //         dispatch(clearInfo())
    //     }
    // }, [dispatch, token])
    return (
        <>
            {children }
            <ToastContainer
                position="top-right"
                transition={Zoom}
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    )
}

export default Init
