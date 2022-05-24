import React from 'react';
import {Link} from 'react-router-dom';
import {HolderImg4} from "../../assets/Holders/holder";
import Button from '../../components/UI/Buttons/Button/Button';
import "./PageNotFound404.css";

function PageNotFound404() {
    return (<div className='pagenot-container'>
        <div className="page-title">Page Not Found</div>
        <img src={HolderImg4} loading="lazy"
            className="holders"/>
        <div>
          <Button name={"Go to Home"}/>
        </div>
    </div>)
}

export default PageNotFound404
