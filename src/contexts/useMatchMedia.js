import { useState, useEffect, useMemo, useRef } from 'react'

function useMatchMedia(media = []) {
  const { mediaQueries, initialState } = useMemo(
    () =>
      Object.keys(media).reduce(
        (result, key) => {
          const medium = media[key]
          const mediaQueryList = [
            medium.minWidth && `(min-width: ${medium.minWidth})`,
            medium.maxWidth && `(max-width: ${medium.maxWidth})`,
          ]
            .filter(qs => !!qs)
            .join(' and ')

          return {
            ...result,
            mediaQueries: {
              ...result.mediaQueries,
              [key]: window && window.matchMedia(mediaQueryList),
            },
            initialState: {
              ...result.initialState,
              [key]: Boolean(medium.isDefaultValue),
            },
          }
        },
        { mediaQueries: {}, initialState: {} }
      ),
    [media]
  )

  const [state, setState] = useState(initialState)
  const currentState = useRef(null)

  useEffect(() => {
    const mediaQueryKeys = Object.keys(mediaQueries)

    const update = target => {
      const nextState = mediaQueryKeys.reduce(
        (result, key) => ({
          ...result,
          [key]: mediaQueries[key].matches,
        }),
        {}
      )

      // To prevent state updated twice
      // More information: https://stackoverflow.com/questions/44830917/window-matchmedia-listener-firing-twice/44864722#44864722
      if (
        currentState.current === null ||
        currentState.current[target] !== nextState[target]
      ) {
        setState(nextState)
        currentState.current = nextState
      }
    }

    const callbacks = mediaQueryKeys.reduce(
      (result, key) => ({
        ...result,
        [key]: () => update(key),
      }),
      {}
    )

    update()
    mediaQueryKeys.map(key => mediaQueries[key].addListener(callbacks[key]))

    return () => {
      mediaQueryKeys.map(key =>
        mediaQueries[key].removeListener(callbacks[key])
      )
    }
  }, [mediaQueries])

  return state
}

export default useMatchMedia
