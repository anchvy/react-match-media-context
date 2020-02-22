# react-match-media-context

✨ Super lightweight package to handle responsive screen size as needed with React context and window.matchMedia! <Javascript>

## Installation
```npm
$ npm install react-match-media-context  
```
```yarn
$ yarn add react-match-media-context  
```

## How to use?!

1. Import the context and put on ROOT component and apply with your custom configuration to `media` prop!

```import-provider
// App.js

import { MatchMediaProvider } from 'react-match-media-context'

// custom configuration example
// you can get { mobile, tablet, desktop, customScreen, foo, bar, ...whatever you need } from context!

const queries = {
  bar: {
    minWidth: '250px',
    maxWidth: '450px',
  },
  mobile: {
    maxWidth: '450px',
    isDefaultValue: true, // fallback state on ssr
  },
  tablet: {
    minWidth: '451px',
    maxWidth: '800px',
  },
  desktop: {
    minWidth: '801px',
    maxWidth: '1000px',
  },
  foo: {
    minWidth: '1000px',
  },
  [your custom variable name]: { 
    minWidth: 'xxx',
    maxWidth: 'xxx', 
    isDefaultValue: true, // optional
  }
}

const App = () => {
  return (
    <MatchMediaProvider media={media}>
      <HomePage />
    </MatchMediaProvider>
  )
}
```

2. Go to your responsive styled component

```import-context
// NavigationBar.js

import React, { useContext } from 'react'
import MatchMediaContext from 'react-match-media-context'

import NavMobile from './nav/mobile'
import NavDesktop from './nav/desktop'

const NavigationBar = () => {
  // relate to above configuration, you can get;
  // { mobile, tablet, desktop, foo, bar } = useContext(MatchMediaContext)
  const { mobile } = useContext(MatchMediaContext)
  const navBarComponent = mobile ? NavMobile : NavDesktop

  return (
    <div className="some-navbar-classname">
       {navBarComponent}
    </div>
  )
}
```

## Limitation!

- The window.matchMedia is being used for this package. Please check the browser compatibility on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
- `react` and `react-dom` must be ^16.8 or above
- Does not support on SSR 😞 (Please set `isDefaultValue` on fallback item)
- Support `min-width` and `max-width` as of now ~


## Props

### MatchMediaProvider's props

- media `<{ [key: string]: Object }>`
  - `Object.minWidth <string>`: minimum screen width to be matched
  - `Object.maxWidth <string>`: maximum screen width to be matched
  - `Object.isDefaultValue? <boolean>`: if it's defined as true, when we cannot access window.matchMedia (SSR) or the current running browser is not supported. The value of this key will be true.
  
  


