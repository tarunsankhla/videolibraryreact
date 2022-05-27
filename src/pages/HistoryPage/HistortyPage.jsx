import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from '../../context/HistoryContext';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import "./HistoryPage.css";
import HistoryVideoCards from '../../components/UI/Cards/HistoyryVideoCards/HistoryVideoCards';
import {
  HolderImg1,
  HolderImg2,
  HolderImg3,
  HolderImg4,
  HolderImg5,
  HolderImg6,
  HolderImg7,
  HolderImg8,
  HolderImg9
} from "../../assets/Holders/holder";
import { VAR_ENCODE_TOKEN } from "../../utils/Route";
import { Toast } from '../../components/UI/Toast/toast';

function HistortyPage() {
  const { historyContextArray, setHistoryContextArray } = useHistory();
  useEffect(() => {
    try {
      (async () => {
        var res = await axios.get("/api/user/history", {
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          }
        });
        setHistoryContextArray(res.data.history);

      })()
    }
    catch (error) {
      console.log("Product list page error", error);
    }
  }, []);

  const deleteAllHistoryHandler = async () => {
    try {
      var res = await axios.delete(`/api/user/history/all`, {
        headers: {
          authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
        }
      });
      setHistoryContextArray(res.data.history);
      if (res.status === 200) { 
        Toast("success", "Cleared History!");
      }
    }
    catch (err) {
      Toast("erro", "Couldn't Clear History! Try again Later");
    }
  }

  return (
    <>
      <div className='history-main-container'>
      <div className="page-title">History</div>
      <div className='history-btn-container'>
        <button className="normal-btn-history" onClick={() => deleteAllHistoryHandler()}>Clear Full History</button>
      </div>
      <hr />
      <div className='history-container'>
        {historyContextArray.length === 0
        ?<div className='nocontent'>
              <div className='page-title md-txt' >Literally Nothing in your history, go and explore the App. Watch some video and ComeBack Later</div>
              <img src={HolderImg5} className="holders" loading="lazy" /></div>
          :historyContextArray.map((item) => (
          <HistoryVideoCards key={item.id} props={item} />
        ))}
      </div>
    </div></>
  )
}

export default HistortyPage