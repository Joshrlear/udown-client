import { createContext } from 'react';

const UdownContext = createContext({
    currentPath: '',
    pathEntries: 0,
    userHistory: [],
    pushHistory: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () =>{},
    chatOpened: false,
    msgBtnClass: 'chat_button',
    openMsg: () => {},
    closeChat: () => {},
    startChat: () => {},
    chatRoomName: '',
    expandNav: () => {},
    query: '',
    defineQuery: () => {},
    hasMessage: false,
})

export default UdownContext;