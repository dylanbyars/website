import React, {
  useState,
  useRef,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react"
import { ElementData } from "./elementData"
import ElementDetail from "./ElementDetail"

const groupBlockStyles: any = {
  nonmetal: "bg-yellow-lightest",
  "noble gas": "bg-blue-lighter",
  "alkali metal": "bg-grey-light",
  "alkaline earth metal": "bg-red-lighter",
  metalloid: "bg-orange-lighter",
  halogen: "bg-blue-lightest",
  metal: "bg-pink-lighter",
  "transition metal": "bg-teal-lightest",
  lanthanoid: "bg-indigo-lightest",
  actinoid: "bg-green-lightest",
  "probably metal": "bg-grey-lightest",
  "probably noble gas": "bg-grey-lighter",
}

const ElementBlock: FunctionComponent<{
  element: ElementData
  setActiveElement: Dispatch<SetStateAction<ElementData | undefined>> // TODO: it feels weird to be this explicit
}> = ({ element, setActiveElement }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [offsetX, setOffsetX] = useState({})
  const [offsetY, setOffsetY] = useState({})

  const elementRef = useRef(null) as any // TODO this is lazy

  const handleMouseOver = () => {
    setIsHovered(true)

    const elementPosition = elementRef.current!.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const offsetX =
      elementPosition.x > viewportWidth / 2
        ? { left: "-8rem" }
        : { right: "-8rem" }

    const offsetY =
      elementPosition.y > viewportHeight / 2
        ? { top: "-8rem" }
        : { bottom: "-8rem" }

    setOffsetX(offsetX)
    setOffsetY(offsetY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOffsetX({})
    setOffsetY({})
  }

  return (
    <div
      className="relative"
      ref={elementRef}
      onClick={() => setActiveElement(element)}
    >
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseLeave}
        className={`${
          groupBlockStyles[element.groupBlock]
        } relative flex justify-center items-end border border-grey-dark rounded-sm w-12 h-12 m-1 cursor-pointer`}
      >
        <small className="absolute top-0 right-0 pt-1 pr-1">
          {element.atomicNumber}
        </small>
        <div className="mb-1 text-xl">{element.symbol}</div>
      </div>
      {isHovered && (
        <div className="absolute" style={{ ...offsetY, ...offsetX }}>
          <ElementDetail element={element} />
        </div>
      )}
    </div>
  )
}

export default ElementBlock
