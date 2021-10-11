import classnames from "classnames"
import React, { useState } from "react"
import PageContainer from "../../components/PageContainer"
import ElementBlock from "../../components/periodic-table/ElementBlock"
import elementData, {
  ElementData,
} from "../../components/periodic-table/elementData"
import Modal from "../../components/periodic-table/Modal"

const PeriodicTable = () => {
  const [activeElement, setActiveElement] = useState<ElementData>()

  const clearActiveElement = () => setActiveElement(undefined)

  const getElement = (atomicNumber: number) => elementData[atomicNumber]

  const groups = [
    [1, 3, 11, 19, 37, 55, 87],
    [4, 12, 20, 38, 56, 88],
    [21, 39],
    [22, 40, 72, 104],
    [23, 41, 73, 105],
    [24, 42, 74, 106],
    [25, 43, 75, 107],
    [26, 44, 76, 108],
    [27, 45, 77, 109],
    [28, 46, 78, 110],
    [29, 47, 79, 111],
    [30, 48, 80, 112],
    [5, 13, 31, 49, 81, 113],
    [6, 14, 32, 50, 82, 114],
    [7, 15, 33, 51, 83, 115],
    [8, 16, 34, 52, 84, 116],
    [9, 17, 35, 53, 85, 117],
    [2, 10, 18, 36, 54, 86, 118],
  ].map((group) => group.map(getElement))

  const createRange = (start: number, end: number): number[] => [
    ...new Array(end - start + 1).fill(start).map((x, i) => x + i),
  ]
  const lanthanides = createRange(57, 71).map(getElement)
  const actinides = createRange(89, 103).map(getElement)

  return (
    <PageContainer title="Periodic Table of the Elements · Dylan Byars">
      <div
        className="relative min-h-screen flex flex-col justify-around items-center"
        onKeyUp={(e) => e.key === "Escape" && clearActiveElement()}
        tabIndex={0}
      >
        <h1 className="text-lg md:text-4xl">Periodic Table of the Elements</h1>
        <div className={classnames(["flex flex-col", { blur: activeElement }])}>
          <div className="flex pb-6">
            {groups.map((elements, i) => (
              <div
                key={elements[0].atomicMass}
                className="flex flex-col justify-end"
              >
                {elements.map((element) => (
                  <ElementBlock
                    key={element.name}
                    element={element}
                    setActiveElement={setActiveElement}
                  />
                ))}
                {i === 2 && (
                  // group 3 has 2 placeholder elements that point to the lanthanides and actinides
                  <>
                    <div className="flex justify-center items-center w-12 h-12 m-1 border border-grey-dark rounded-sm bg-indigo-lightest">
                      <small>57-71</small>
                    </div>
                    <div className="flex justify-center items-center w-12 h-12 m-1 border border-grey-dark rounded-sm bg-green-lightest">
                      <small>89-103</small>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {[lanthanides, actinides].map((group) => (
              <div className="flex justify-end" key={group[0].groupBlock}>
                {group.map((element) => (
                  <ElementBlock
                    key={element.name}
                    element={element}
                    setActiveElement={setActiveElement}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {activeElement && (
          <Modal element={activeElement} closeModal={clearActiveElement} />
        )}
      </div>
    </PageContainer>
  )
}

export default PeriodicTable
