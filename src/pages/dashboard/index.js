// @ts-nocheck
import BottomNav from '@/src/components/bottom-nav'
import Header from '@/src/components/header'
import Meta from '@/src/components/meta'
import { API_URL } from "../../utils/config"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import Chart from 'chart.js/auto'
import React, { useEffect, useRef } from "react";
require("core-js/actual/array/group-by-to-map");
require("core-js/actual/array/group-by");

export default function Dashboard({userData,busLocData, scanData}) {
  
   	// console.log(userData)
	// console.log(userData.id)
	// console.log(busLocData)
  	//console.log(busVouchData)
	// for(let i =0; i<=busVouchData.length -1; i++){
	//   console.log(busVouchData.data[i].createdAt)
	// }
	console.log(busLocData)
	console.log(scanData)
	let busLocDataIdArray = []
	let scanDataIdArray = []
	
	
	for(let i=0; i<= busLocData.length-1; i++){
		
		busLocDataIdArray[i] = busLocData[i].id
	}
	console.log(busLocDataIdArray)
	
	for(let i=0; i<= scanData.data.length-1; i++){
		
		scanDataIdArray[i] = scanData.data[i].attributes.location.data.id
		
	}
	console.log(scanDataIdArray)

	const counts = {}

	scanDataIdArray.forEach((el) => {
		counts[el] = counts[el] ? (counts[el] + 1) : 1;
	  })
	const countsObj = Object.entries(counts)
	console.log(countsObj)

	//Weekly
	const scanDataData = scanData.data
	console.log(scanDataData); 
	const groupByCategory = scanDataData.groupBy(scan => {
		return scan.attributes.scannedAtDate
	  });
	  console.log(groupByCategory); 

	 
	const canvasEl = useRef(null);

	const colors = {
		purple: {
		  default: "rgba(149, 76, 233, 1)",
		  half: "rgba(149, 76, 233, 0.5)",
		  quarter: "rgba(149, 76, 233, 0.25)",
		  zero: "rgba(149, 76, 233, 0)"
		},
		indigo: {
		  default: "rgba(80, 102, 120, 1)",
		  quarter: "rgba(80, 102, 120, 0.25)"
		}
	  };

	  useEffect(() => {
		const ctx = canvasEl.current.getContext("2d");
		// const ctx = document.getElementById("myChart");
	
		const gradient = ctx.createLinearGradient(0, 16, 0, 600);
		gradient.addColorStop(0, colors.purple.half);
		gradient.addColorStop(0.65, colors.purple.quarter);
		gradient.addColorStop(1, colors.purple.zero);
	
		const weight = [0, 0, 0, 0,3, 1, 2, ];
	
		const labels= [
		  "2023-02-23",
		  "2023-02-24",
		  "2023-02-25",
		  "2023-02-26",
		  "2023-02-27",
		  "2023-02-28",
		  "2023-03-01",
		];
		
		const data = {
		  labels: labels,
		  datasets: [
			{
			  backgroundColor: gradient,
			  label: "No. Scans",
			  data: weight,
			  fill: true,
			  borderWidth: 2,
			  borderColor: colors.purple.default,
			  lineTension: 0.2,
			  pointBackgroundColor: colors.purple.default,
			  pointRadius: 3
			}
		  ]
		};
		const config = {
		  type: "line",
		  data: data
		};
		const myLineChart = new Chart(ctx, config);
	
		return function cleanup() {
		  myLineChart.destroy();
		};
	  });
  



  return (
    <>
        <Meta/>
		<Header/>
        <main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'>
			
        </main>
		<body>
		<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<div class="flex items-center justify-between mb-4">
				<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Total Scans</h5>
			</div>
			<div class="flow-root">
				<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
					{countsObj.map((count) => (
					<li class="py-3 sm:py-4">
						<div class="flex items-center space-x-4">
						<div class="flex-shrink-0">
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
								{count[0]}
							</p>
							<p class="text-sm text-gray-500 truncate dark:text-gray-400">
								PlaceHolder
							</p>
						</div>
						<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
							{count[1]}
						</div>
						</div>
					</li>
					))}
				</ul>
				<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
				<li class="py-3 sm:py-4">
						<div class="flex items-center space-x-4">
						<div class="flex-shrink-0">
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
								Overall Total 
							</p>
						</div>
						<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
							{scanDataIdArray.length}
						</div>
						</div>
				</li>
				</ul>
			</div>
		</div>
		<div class="w-full p-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<span>Business Insights - Last 7 days</span>
			<canvas id="myChart" ref={canvasEl} height="100" />
		</div>
		</body> 
        <BottomNav/>
    </>
  )
}

export async function getServerSideProps({req, res}) {

  const cookieToken = getCookie('token', { req, res});
	console.log(cookieToken)
	const response = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const userData= await response.json()
	const locationData= userData.locations
	
  var string = ''
	for(let i =0; i<=locationData.length-1; i++){
			string +='&filters[location][id]='+locationData[i].id
	}

  const query = string.substring(1);
  console.log('query')
  console.log(query)
  var scanData = null
  if(query.length>1)
  {
		const response3 = await fetch(`${API_URL}/api/scans?${query}&populate=*`,
			{
				method: 'GET',
					headers: {
						Authorization:`Bearer ${cookieToken}`
					}
			})
		scanData = await response3.json()
		
	}
	else {scanData = null}
	console.log('scanData')
	console.log(scanData)
  
	return {
		props: {
      
			userData:userData,
			busLocData:locationData,
			scanData: scanData
			
		
    	}
	}

 }