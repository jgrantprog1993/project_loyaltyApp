// @ts-nocheck
import React, { useState, useEffect }from 'react';
import { QrReader } from 'react-qr-reader';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import axios from 'axios'
import { API_URL } from "../utils/config"
import { concat } from 'next-pwa/cache';

const Qrscan = (cookieToken) => {
    const router = useRouter();
	const [result, setResult] = useState('No result');
    const [dataX, setDataX] = useState(null);
    
    useEffect(
        () => {
          // This runs AFTER the first render,
          // so the ref is set by now.
          console.log("render");
          if (result!=='No result'){
            const obj = JSON?.parse(result)
            console.log(obj);
            const resultID = obj.id
            
            console.log("token");
            console.log(cookieToken)
            const fetchData = async () => {
                const response = await fetch(`${API_URL}/api/users/me?populate=*`,{
                    method: "GET", 
                    
                    headers: {"x-auth-token": localStorage.getItem("token")}
                })
                const newData = await response.json();
                console.log("newData");
                console.log(newData)
             }
            fetchData()
            console.log(resultID)
           
          }
        },
            // The effect "depends on" inputRef
        [result]
      );

    let handleScan = (result, error) => {
        if (!!result) {
            setResult(result?.text);
            const obj = JSON.parse(result?.text)
            ///console.log(obj)
            //toast.success(`Collected ${obj.reward} Stamp for: ${obj.id}`)




            router.push(`/vouchers`)

          }

          if (!!error) {
            console.info(error);
          }
      };
    
    let handleError = err => {
    // alert(err);
    };


    const ScanOverlay = () => {
       
        return(
            <svg viewBox='0 0 100 100' className='top-0 left-0 box-border absolute w-full h-full'>
                <path fill= "none" d="M13, 0 L0,0 L0,13" stroke="rgba(255,0,0,0.9)" strokeWidth='2'></path>
                <path fill= "none" d="M0, 87 L0, 100 L13, 100" stroke="rgba(255,0,0,0.9)" strokeWidth='2'></path>
                <path fill= "none" d="M87, 100 L100, 100 L100, 87" stroke="rgba(255,0,0,0.9)" strokeWidth='2'></path>
                <path fill= "none" d="M100, 13 L100,0 87,0" stroke="rgba(255,0,0,0.9)" strokeWidth='2'></path>
            </svg>
        )

    }
    

	return (
      <>
        <h3>Qr Code Scan by Web Cam</h3>
        <QrReader
        scanDelay={300}
        style={{ height: 240, width: 320 }}
        onError={handleError}
        onResult={handleScan}
        facingMode="environment"
        ViewFinder={ScanOverlay}
        />
        <h3>Scanned By WebCam Code: {result}</h3>
     </>
	);
}


export default Qrscan;