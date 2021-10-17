import classNames from "classnames"
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
        className={classNames(
          [
            `${
              groupBlockStyles[element.groupBlock]
            } relative flex justify-center items-center lg:items-end border border-grey-dark w-element__portrait h-element__portrait landscape:w-element landscape:h-element cursor-pointer m-px`,
          ],
          { "border-grey-darkest": isHovered } // TODO: not working
        )}
      >
        <small className="hidden lg:block absolute top-0.5 right-1.5">
          {element.atomicNumber}
        </small>
        <div className="hidden text-sm landscape:block md:text-base lg:text-lg lg:mb-0.5 xl:text-2xl">
          {element.symbol}
        </div>
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

export const Placeholder: FunctionComponent = ({ children }) => (
  <div className="flex justify-center items-center border border-grey-dark w-element__portrait h-element__portrait landscape:w-element landscape:h-element m-px">
    <small className="hidden md:block">{children}</small>
  </div>
)
