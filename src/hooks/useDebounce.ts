import { useState, useEffect } from "react"

export interface UseDebounceProps {
  value: string
  delay: number
}

const useDebounce = (props: UseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(props.value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(props.value)
    }, props.delay)

    return () => {
      clearTimeout(handler)
    }
  }, [props.value, props.delay])

  return debouncedValue
}

export default useDebounce
