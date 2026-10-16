import { useCallback, useRef, useState } from 'react'
import prompts from '../assets/rest-prompts.json'

export function createRestPrompts(seed?: number, promptsList: string[] = prompts) {
  let random = Math.random
  if (seed !== undefined) {
    let state = seed >>> 0
    random = () => {
      state = (1664525 * state + 1013904223) >>> 0
      return state / 0x100000000
    }
  }

  const seededShuffle = (items: string[], previous?: string) => {
    const shuffled = items.slice()
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1))
      ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
    }
    if (
      previous !== undefined &&
      shuffled.length > 1 &&
      shuffled[0] === previous
    ) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }
    return shuffled
  }

  let pool = seededShuffle(promptsList)
  let index = 0

  return {
    current: () => pool[index],
    next: () => {
      const previous = pool[index]
      index += 1
      if (index >= pool.length) {
        pool = seededShuffle(promptsList, previous)
        index = 0
      }
      return pool[index]
    },
    remaining: () => pool.length - index,
  } as const
}

export default function useRestPrompts(promptsList: string[] = prompts) {
  const managerRef = useRef(createRestPrompts(undefined, promptsList))
  const [current, setCurrent] = useState(managerRef.current.current())
  const next = useCallback(() => {
    setCurrent(managerRef.current.next())
  }, [])

  return { current, next } as const
}
