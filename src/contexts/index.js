import React from 'react'
import useMatchMedia from './useMatchMedia'

const MatchMediaContext = React.createContext(null)
export const MatchMediaProvider = ({ children, media }) => {
  const value = useMatchMedia(media)

  return (
    <MatchMediaContext.Provider value={value}>
      {children}
    </MatchMediaContext.Provider>
  )
}

export default MatchMediaContext
