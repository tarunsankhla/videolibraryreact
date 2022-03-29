import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from '../../context/HistoryContext';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import "./HistoryPage.css";
import HistoryVideoCards from '../../components/UI/Cards/HistoyryVideoCards/HistoryVideoCards';

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
  }, []);
  
  const deleteAllHistoryHandler = async() => { 
    try {
        // console.log(\)
        var res = await axios.delete(`/api/user/history/all`,{ headers:{
            authorization:localStorage.getItem("jafnaToken")}});
        console.log(res);
        // setHistoryContextArray();
        // (async() => {
        //     var res = await axios.get("/api/user/history",{ headers:{
        //       authorization:localStorage.getItem("jafnaToken")}});
        //     console.log(res);
        //     // console.log(res.data.products);
            setHistoryContextArray(res.data.history);
           
        // })()
    }
    catch (err) { 
        console.log(err)
    }
}

  return (
    <div className='history-main-container'>
      <div>
        <button className="normal-btn" onClick={() => deleteAllHistoryHandler()}>Clear History</button>
      </div>
      <div className='history-container'>
        {historyContextArray.map((item) => (
          <HistoryVideoCards key={item.id} props={item}/>
        ))}
      </div>
    </div>
  )
}

export default HistortyPage