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
import dateFormat, { masks } from "dateformat";
import moment from 'moment';

import { FaQrcode } from 'react-icons/fa';

export default function Dashboard({userData,busLocData, scanData}) {
  
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
	
	//Weekly
	const scanDataData = scanData.data
	
	const groupByCategory = scanDataData.groupBy(scan => {
		return scan.attributes.scannedAtDate
	  });
	/////// order by date
	var orderedDates = {};
	Object.keys(groupByCategory).sort(function(a, b) {
		return moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate();
	}).forEach(function(key) {
		orderedDates[key] = groupByCategory[key];
	})
	console.log(orderedDates)
	
	
	// No of Customers

	var busUsers = []
	for(let i =0; i< scanData.data.length-1; i++){
		busUsers[i] = scanData.data[i].attributes.users_permissions_user.data.attributes.username
		
	}
	console.log('busUsers')
	const uniqBusUsers = [...new Set(busUsers)];
	const countUniqBusUsers = uniqBusUsers.length
	console.log(countUniqBusUsers)
	
	var weightAvg = 0
	function scanCountstoArrayLast7Days(countObj){
		var scanCounts = [];
		
		for (var i=0; i<7; i++) {
			scanCounts[i] = Object.values(countObj)[i]
		}
		 return(scanCounts)
		// for (var i=0; i<7; i++) {
		// 	result[i] = scanCounts[i].length()
		
		// }
	}
	const scanCountstoArrayLast7DaysVar = scanCountstoArrayLast7Days(orderedDates)
	console.log(scanCountstoArrayLast7DaysVar)
	
	function scanCountsLast7Days(scanCountstoArrayLast7DaysVar){
		var result = [];
		for (var i=0; i<7; i++) {
			if (scanCountstoArrayLast7DaysVar[i] != undefined){
			result[i] = scanCountstoArrayLast7DaysVar[i].length
			}
			else{result[i] = 0}
		}
		console.log(result)
		return(result)
	}

	const weight = scanCountsLast7Days(scanCountstoArrayLast7DaysVar).reverse()
	const weightSum = weight.reduce((partialSum, a) => partialSum + a, 0)
	weightAvg = weightSum/7
	//const weight = Object.values(weightObj);
	//const weight = [2, 1, 3, 0, 0, 0, 0]

	function Last7Days () {
		var result = [];
		for (var i=0; i<7; i++) {
			var d = new Date();
			d.setDate(d.getDate() - i);
			result.push(dateFormat(d, "mmm dd yyyy").toString())
			
		}
		return(result.reverse());
	}
	const last7Days = Last7Days()	



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
		},
		other: {
			default: "rgba(255,255, 233, 1)",
			half: "rgba(149, 255, 233, 0.5)",
			quarter: "rgba(149, 255, 233, 0.25)",
			zero: "rgba(149, 255, 233, 0)"
		  },
	  };

	  useEffect(() => {
		const ctx = canvasEl.current.getContext("2d");
		// const ctx = document.getElementById("myChart");
	
		const gradient = ctx.createLinearGradient(0, 16, 0, 600);
		gradient.addColorStop(0, colors.purple.half);
		gradient.addColorStop(0.65, colors.purple.quarter);
		gradient.addColorStop(1, colors.purple.zero);


	
		const data = {
		  labels: last7Days,
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
			},
			{
				backgroundColor: gradient,
				label: "Avg Daily Scans",
				data: [2,2,2,2,2,2,2],
				fill: false,
				borderWidth: 1,
				borderColor: colors.indigo.default,
				lineTension: 0.2,
				pointBackgroundColor: colors.indigo.default,
				pointRadius: 1
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
			<div>
				<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<dt class="truncate text-sm font-medium text-gray-500">Total Scans </dt>
						<dd class="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">{scanDataIdArray.length}</dd>
					</div>

					<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<dt class="truncate text-sm font-medium text-gray-500">Total Unique Customers</dt>
						<dd class="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">{countUniqBusUsers}</dd>
					</div>

					<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<dt class="truncate text-sm font-medium text-gray-500">Avg. Scans per Day</dt>
						<dd class="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">{weightAvg}</dd>
					</div>
				</dl>
			<div/>
		
			<hr class="border-b-2 border-gray-300 my-8 mx-4"></hr>
			<div class="flex flex-row flex-wrap mt-2">
				<div class="w-full lg:w-1/2 p-3">
					<div class="w-full p-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
					<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Total Scans per Location</h5>
						<canvas id="myChart" ref={canvasEl} height="100" />
					</div>
				</div>  
			
				<div class="w-full lg:w-1/2  p-3">
					<div class="w-full p-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
						<div class="flex items-center justify-between mb-4">
							<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Total Scans per Location</h5>
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
							
						</div>
					</div>
				</div>
			</div>
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