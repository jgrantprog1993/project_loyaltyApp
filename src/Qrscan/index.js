// @ts-nocheck
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


const Qrscan = () => {

	const [result, setResult] = useState('No result');

    
    let handleScan = (result, error) => {
        if (!!result) {
            setResult(result?.text);
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