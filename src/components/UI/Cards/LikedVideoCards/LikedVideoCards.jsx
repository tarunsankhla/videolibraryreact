import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLikes } from '../../../../context/LikesContext';
import { VAR_ENCODE_TOKEN } from '../../../../utils/Route';
import ViewCount from '../../../../utils/ViewCount';
import { IcTwotoneDelete } from '../../Icons';
import { Toast } from '../../Toast/toast';
import "./LikedVideoCards.css";

function LikedVideoCards({props}) {
    const { videoid, snippet, statistics } = props;
    const { likesContextArray, setLikesContextArray } = useLikes();
    const RemoveVideoFromLikesHandler = async () => {
        try {
            var res = await axios.delete(`/api/user/likes/${videoid}`, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            setLikesContextArray(res.data.likes);
            Toast("success", " Removed !!");
        }
        catch (err) {
            console.log(err);
            Toast("error", "Failed to Remove !!");
        }
    }
  return (
    <div>
            <div className="card cart-card transparent">
                <div className='liked-content'>
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
                </div>
                <span className="material-icons-round badge topright-badge liked-delete" onClick={() => { RemoveVideoFromLikesHandler(props) }}>
                    <IcTwotoneDelete />
                </span>
            </div>
        </div>
  )
}

export default LikedVideoCards