import { createContext, useContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { HistoryProvider } from "./HistoryContext";
import { LikesProvider } from "./LikesContext";
import { PlayListProvider } from "./PlayListContext";
import { WatchlaterProvider } from "./WatchLaterContext";

const Provider = props =>{
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayListProvider>
                    <WatchlaterProvider>
                        <HistoryProvider>
                            <LikesProvider>
                                {props.children}
                            </LikesProvider>
                        </HistoryProvider>
                    </WatchlaterProvider>
                </PlayListProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
export { Provider };