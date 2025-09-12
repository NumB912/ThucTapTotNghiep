import { useState } from "react"

const useStoreUser = (key = "data", initialValue = 3) => {
  const [data, setData] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  const setLocalDataStore = (value) => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key)
      setData(initialValue)
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
    setData(value)
  }

  return { data, setLocalDataStore }
}

export default useStoreUser
