import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from '../../../../context/HistoryContext';
import ViewCount from '../../../../utils/ViewCount';
import IcRoundCheckCircleConfirmWatchLater from '../../Icons/IcRoundCheckCircle';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route"
import "./HistoryVideoCards.css";
import { Toast } from '../../Toast/toast';

function HistoryVideoCards({ props }) {
    const { historyContextArray, setHistoryContextArray } = useHistory();
    const { videoid, snippet, statistics } = props;
    console.log(props, videoid, snippet, statistics)
    const deleteHistoryHandler = async (id) => {
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/history/${id}`, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            if (res.status === 200) {
                Toast("success","Removed from History!!")
            }
            (async () => {
                var res = await axios.get("/api/user/history", {
                    headers: {
                        authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                    }
                });
                setHistoryContextArray(res.data.history);
            })()
        }
        catch (err) {
            console.log(err);
            Toast("error","Failed to remove from history")
        }
    }
    return (
        <div>

            <div className="card cart-card history-card">
                <Link to="/video/watch" state={props}>
                    <img className="card-img" loading="lazy" src={snippet.thumbnails} alt={snippet.channelTitle} />

                    <div className="card-content history-card-content">
                        <div className="card-body">
                                                      <span className="text-grey elipsis pd-btm">
                                    {snippet.title
                                }</span>
                               
                                <div className="card-body-channel ">
                                    <img className="channel-img" src={snippet.channelImg} loading="lazy" alt="channelimg" />
                                    <span className="elipsis md-txt elipsis-md"> {
                                        snippet.channelTitle
                                    }</span>
                                </div>
                            <h2> <ViewCount viewCount={statistics.viewCount} /></h2>
                        </div>
                    </div>
                </Link>
                <span className="material-icons-round badge topright-badge " onClick={() => { deleteHistoryHandler(props._id) }}>
                    <IcTwotoneDelete />
                </span>
            </div>

        </div>
    )
}

export default HistoryVideoCards