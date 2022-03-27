import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from '../../context/HistoryContext';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import "./HistoryPage.css";

function HistortyPage() {
  const { historyContextArray, setHistoryContextArray } = useHistory();
  useEffect(()=>{
    try{
      (async() => {
      var res = await axios.get("/api/user/history",{ headers:{
        authorization:localStorage.getItem("jafnaToken")}});
      console.log(res);
      // console.log(res.data.products);
      setHistoryContextArray(res.data.history);
     
  })()}
  catch(error){
    console.log("Product list page error",error);
  }
},[]);
  return (
    <>
      {historyContextArray.map((item) => (
        <VideoCards key={item.id} props={item}/>
      ))}
    </>
  )
}

export default HistortyPage