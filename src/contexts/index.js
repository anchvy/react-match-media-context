import React from 'react'
import useMatchMedia from './useMatchMedia'

const ResponsiveContext = React.createContext(null)
export const ResponsiveProvider = ({ children, media }) => {
  const value = useMatchMedia(media)

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export default ResponsiveContext
