import { createContext, useContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { HistoryProvider } from "./HistoryContext";
import { PlayListProvider } from "./PlayListContext";
import { WatchlaterProvider } from "./WatchLaterContext";

const Provider = props =>{
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayListProvider>
                    <WatchlaterProvider>
                        <HistoryProvider>
                            {props.children}
                        </HistoryProvider>
                    </WatchlaterProvider>
                </PlayListProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
export { Provider };