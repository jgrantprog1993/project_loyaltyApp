// @ts-nocheck
import React, { useState, useEffect, useCallback }from 'react';
import { QrReader } from 'react-qr-reader';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

const Qrscan = (cookieToken) => {
  const router = useRouter();
	const [result, setResult] = useState('No result');

    useEffect(
        () => {
          // This runs AFTER the first render,
          // so the ref is set by now.
          console.log("render");
          if (result!=='No result'){
            const obj = JSON?.parse(result)
            console.log(obj);
          
          }
        },
            // The effect "depends on" inputRef
        [result]
      );

    let handleScan = (result, error) => {
        if (!!result) {
            setResult(result?.text);
            const obj = JSON.parse(result?.text)
            console.log(obj)
            //toast.success(`Collected ${obj.reward} Stamp for: ${obj.id}`)
            router.push(`/vouchers/${obj.id}`)
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
                <path fill= "none" d="M13, 0 L0,0 L0,13" stroke="rgba(255,0,0,0.4)" strokeWidth='2'></path>
                <path fill= "none" d="M0, 87 L0, 100 L13, 100" stroke="rgba(255,0,0,0.4)" strokeWidth='2'></path>
                <path fill= "none" d="M87, 100 L100, 100 L100, 87" stroke="rgba(255,0,0,0.4)" strokeWidth='2'></path>
                <path fill= "none" d="M100, 13 L100,0 87,0" stroke="rgba(255,0,0,0.4)" strokeWidth='2'></path>
            </svg>
        )

    }

	return (
      <>
        <div class="w-full h-screen p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
           Scan QR Code to Redeem
          </h5>
          <div class="items-center justify-center space-y-4 md:flex md:space-y-4 md:space-x-8">
            <div>
              <QrReader
                scanDelay={300}
                style={{ height: 240, width: 320 }}
                onError={handleError}
                onResult={handleScan}
                facingMode="environment"
                ViewFinder={ScanOverlay}
              />
              <h3>Scanned By WebCam Code: {result}</h3>
            </div>
          </div>
        </div>
     </>
	);
}


export default Qrscan;