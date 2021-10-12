import classnames from "classnames"
import React, { FunctionComponent, useEffect, useState } from "react"
import { ElementData } from "./elementData"

const groupWikis: Record<string, string> = {
  nonmetal: "https://en.wikipedia.org/wiki/Nonmetal",
  "noble gas": "https://en.wikipedia.org/wiki/Noble_gas",
  "alkali metal": "https://en.wikipedia.org/wiki/Alkali_metal",
  "alkaline earth metal": "https://en.wikipedia.org/wiki/Alkaline_earth_metal",
  metalloid: "https://en.wikipedia.org/wiki/Metalloid",
  halogen: "https://en.wikipedia.org/wiki/Halogen",
  metal: "https://en.wikipedia.org/wiki/Post-transition_metal",
  "transition metal": "https://en.wikipedia.org/wiki/Transition_metal",
  lanthanoid: "https://en.wikipedia.org/wiki/Lanthanide",
  actinoid: "https://en.wikipedia.org/wiki/Actinide",
}

const A: FunctionComponent<{ href: string; className?: string }> = ({
  href,
  className,
  children,
}) => (
  <a
    href={href}
    className={classnames([
      "text-indigo-dark hover:text-indigo-darkest trans trans-fast",
      className,
    ])}
  >
    {children}
  </a>
)

const Modal: FunctionComponent<{ element: ElementData; closeModal: Function }> =
  ({ element, closeModal }) => {
    const [wikiSummary, setWikiSummary] = useState("")
    const [wikiImage, setWikiImage] = useState("")

    const {
      name,
      atomicNumber,
      atomicMass,
      standardState,
      meltingPoint,
      boilingPoint,
      groupBlock,
      electronicConfiguration,
      yearDiscovered,
      wiki,
    } = element

    useEffect(() => {
      // pull the last bit of the wiki url off
      const regex = /wiki\/(.*)/g
      const url = wiki
      const wikiTitle = regex.exec(url)![1]

      const wikiData = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`

      const getWikiData = async () => {
        const response = await fetch(wikiData)

        if (response.ok) {
          const data = await response.json()

          setWikiSummary(data.extract)
          setWikiImage(data.thumbnail.source ?? "")
        }
      }

      getWikiData()
    }, [wiki])

    return (
      <div
        className="absolute pin flex justify-center items-center w-screen h-screen z-30"
        onClick={() => closeModal()}
      >
        {wikiSummary && (
          <div
            className="flex justify-between relative w-3/4 border bg-white shadow-lg p-5 max-h-3/4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 mr-4 mt-4 px-2 py-1 rounded-full trans trans-fast border border-indigo-light hover:border-indigo-dark text-indigo-light hover:text-indigo-dark hover text-sm"
              onClick={() => closeModal()}
            >
              close
            </button>
            <div className="w-1/2 flex flex-col justify-around items-center">
              <h1 className="text-3xl">{name}</h1>
              {/* TODO: fix a size on the img so the modal doesn't move too much */}
              {wikiImage && <img src={wikiImage} alt={name} className="my-3" />}
              <div className="flex flex-col justify-between ">
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Group:</p>
                  {groupWikis[groupBlock] ? (
                    <A className="capitalize" href={groupWikis[groupBlock]}>
                      {groupBlock}
                    </A>
                  ) : (
                    <p className="capitalize">{groupBlock}</p>
                  )}
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Standard State:</p>
                  <p className="capitalize">
                    {standardState ? standardState : "???"}
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Atomic Weight:</p>
                  <p>
                    {atomicMass}
                    <A
                      className="ml-1 font-semibold"
                      href="https://en.wikipedia.org/wiki/Standard_atomic_weight"
                    >
                      A<sub>r</sub>
                    </A>
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Melting Point:</p>
                  <p>
                    {meltingPoint ? meltingPoint : "???"}
                    {meltingPoint && (
                      <A
                        className="ml-1"
                        href="https://en.wikipedia.org/wiki/Kelvin"
                      >
                        K
                      </A>
                    )}
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Boiling Point:</p>
                  <p>
                    {boilingPoint ? boilingPoint : "???"}
                    {boilingPoint && (
                      <A
                        className="ml-1"
                        href="https://en.wikipedia.org/wiki/Kelvin"
                      >
                        K
                      </A>
                    )}
                  </p>
                </div>
                <div className="flex my-1">
                  <A
                    className="mr-1 font-semibold"
                    href="https://en.wikipedia.org/wiki/Electron_configuration"
                  >
                    Electron Configuration:
                  </A>
                  <p>
                    {electronicConfiguration.toString().replace(/\./g, " ")}
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Year Discovered:</p>
                  <p>{yearDiscovered}</p>
                </div>
              </div>
            </div>

            <p className="w-1/2 my-auto px-10 font-light max-h-1/2">
              {wikiSummary}
            </p>

            <div className="absolute bottom-0 right-0 mr-4 mb-4">
              <A className="text-sm" href={wiki}>
                Wikipedia
              </A>
              <A
                className="ml-4 text-sm"
                href={periodicVideoLink(atomicNumber)}
              >
                Video
              </A>
            </div>
          </div>
        )}
      </div>
    )
  }

export default Modal

function periodicVideoLink(atomicNumber: number) {
  const formattedNumber =
    atomicNumber < 10
      ? `00${atomicNumber}`
      : atomicNumber < 100
      ? `0${atomicNumber}`
      : atomicNumber

  return `http://periodicvideos.com/videos/${formattedNumber}.htm`
}
