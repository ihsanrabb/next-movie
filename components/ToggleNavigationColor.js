import { useContext } from 'react'
import HeaderContext from '../context/HeaderContext'

export default function ToggleNavigationColor() {
  const {color, toggleColor} = useContext(HeaderContext)

  return (
    <button onClick={() => toggleColor(!color)}>
      Toggle Navigation Color
    </button>
  )
}