import { createContext } from 'react'

const ChatContext = createContext({
    navStatus: 'nav_on',
    navOff: () => {},
    navOn: () => {},
})

export default ChatContext