import { createContext } from 'react';

const UdownContext = createContext({
    currentPath: '',
    pathEntries: 0,
    userHistory: [],
    pushHistory: () => {},
    isLoggedIn: false,
    chatOpened: false,
    msgBtnClass: 'chat_button',
    openMsg: () => {}
})

export default UdownContext;