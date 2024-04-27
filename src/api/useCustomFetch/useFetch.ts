import React from 'react';
// import {useEffect, useState} from "react";
//
// const url =
//
// function useFetch(url) {
//     const [data,setData] = useState(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState(null)
//
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error("Network response was`");
//                 }
//                 const json = await response.json();
//                 setData(json);
//             }catch(error) {
//                 setError(error);
//             }finally {
//                 setIsLoading(false);
//             }
//         }
//         fetchData()
//     },[url])
//     return {data,isLoading,error}
// }
//
// // const {data,isLoading,error} = useFetch('https://api....')
