import { createContext, useContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { PlayListProvider } from "./PlayListContext";

const Provider = props =>{
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayListProvider>
                    {props.children}
                </PlayListProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
export { Provider };