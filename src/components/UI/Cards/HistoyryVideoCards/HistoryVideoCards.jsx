import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from '../../../../context/HistoryContext';
import ViewCount from '../../../../utils/ViewCount';
import IcRoundAutoModeAddWatchLater from '../../Icons/IcRoundAutoMode';
import IcRoundCheckCircleConfirmWatchLater from '../../Icons/IcRoundCheckCircle';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import "./HistoryVideoCards.css";

function HistoryVideoCards({ props }) {
    const { historyContextArray, setHistoryContextArray } = useHistory();
    const { videoid, snippet, statistics } = props;
    console.log(props, videoid, snippet, statistics)
    const deleteHistoryHandler = async (id) => {
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/history/${id}`, {
                headers: {
                    authorization: localStorage.getItem("jafnaToken")
                }
            });
            (async () => {
                var res = await axios.get("/api/user/history", {
                    headers: {
                        authorization: localStorage.getItem("jafnaToken")
                    }
                });
                setHistoryContextArray(res.data.history);
            })()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>

            <div className="card cart-card">
                <Link to="/video/watch" state={props}>
                    <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                    <div className="card-content">
                        <div className="card-body">
                            <span className="text-grey elipsis">{snippet.title}</span>
                            {snippet.channelTitle}

                            <h2> <ViewCount viewCount={statistics.viewCount} /></h2>
                        </div>
                    </div>
                </Link>
                <span className="material-icons-round badge topright-badge " onClick={() => { deleteHistoryHandler(props._id) }}>
                    <IcTwotoneDelete />
                    {/* <IcRoundAutoModeAddWatchLater />
                      <IcRoundCheckCircleConfirmWatchLater/> */}
                </span>
            </div>

        </div>
    )
}

export default HistoryVideoCards