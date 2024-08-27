import { useCallback, useState } from "react"

interface ReturnType {
  value: boolean
  onTrue: () => void
  onFalse: () => void
  onToggle: () => void
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export function useBoolean(
  defaultValue?: boolean,
  callback?: (value: boolean) => void
): ReturnType {
  const [value, setValue] = useState(!!defaultValue)

  const onTrue = useCallback(() => {
    setValue(true)
    callback?.(true)
  }, [callback])

  const onFalse = useCallback(() => {
    setValue(false)
    callback?.(false)
  }, [callback])

  const onToggle = useCallback(() => {
    setValue(prev => !prev)
    callback?.(!value)
  }, [callback, value])

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  }
}
