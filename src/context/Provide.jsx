import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { HistoryProvider } from "./HistoryContext";
import { LikesProvider } from "./LikesContext";
import { PlayListProvider } from "./PlayListContext";
import { VideoProvider } from './VideoContext';
import { WatchlaterProvider } from "./WatchLaterContext";

const Provider = props => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayListProvider>
                    <WatchlaterProvider>
                        <HistoryProvider>
                            <LikesProvider>
                                <VideoProvider>
                                    {props.children}
                                </VideoProvider>
                            </LikesProvider>
                        </HistoryProvider>
                    </WatchlaterProvider>
                </PlayListProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
export { Provider };