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

    const { name, wiki } = element

    useEffect(() => {
      const getWikiData = async () => {
        const regex = /\/wiki\/(.*)$/g
        const wikiTitle = regex.exec(wiki)![1]

        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`
        )

        if (response.ok) {
          const { extract, thumbnail } = (await response.json()) as {
            extract: string
            thumbnail?: { source: string }
          }

          setWikiSummary(extract)
          setWikiImage(thumbnail?.source ?? "")
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
            className="relative w-4/5 h-4/5 border rounded-sm bg-white p-3 pt-6 overflow-auto md:w-3/4 md:h-3/5 lg:w-auto lg:h-auto lg:max-w-2xl lg:max-h-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1.5 right-1.5 text-black"
              onClick={() => closeModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ElementSummary element={element} wikiImage={wikiImage} />

            <p>
              <h1 className="text-xl font-semibold mb-3">{name}</h1>
              {wikiSummary}
            </p>
          </div>
        )}
      </div>
    )
  }

export default Modal

function ElementSummary({
  element,
  wikiImage,
}: {
  element: ElementData
  wikiImage?: string
}) {
  const {
    atomicMass,
    atomicNumber,
    boilingPoint,
    electronicConfiguration,
    groupBlock,
    meltingPoint,
    name,
    standardState,
    wiki,
    yearDiscovered,
  } = element

  const Fact: FunctionComponent<{ title: string }> = ({ title, children }) => (
    <p>
      <span className="mr-1 font-semibold">{`${title}:`}</span>
      {children}
    </p>
  )

  return (
    <div className="w-2/5 text-sm md:text-base float-right ml-6">
      {wikiImage && <img src={wikiImage} alt={name} className="my-3 w-full" />}
      <Fact title="Atomic Number">{atomicNumber}</Fact>
      <Fact title="Group">
        {groupWikis[groupBlock] ? (
          <A className="capitalize" href={groupWikis[groupBlock]}>
            {groupBlock}
          </A>
        ) : (
          <span className="capitalize">{groupBlock}</span>
        )}
      </Fact>
      <Fact title="Standard State">
        <span className="capitalize">
          {standardState ? standardState : "???"}
        </span>
      </Fact>
      <Fact title="Atomic Weight">
        <span>
          {atomicMass}
          <A
            className="ml-1 font-semibold"
            href="https://en.wikipedia.org/wiki/Standard_atomic_weight"
          >
            A<sub>r</sub>
          </A>
        </span>
      </Fact>
      <Fact title="Melting Point">
        <span>
          {meltingPoint ? meltingPoint : "???"}
          {meltingPoint && (
            <A className="ml-1" href="https://en.wikipedia.org/wiki/Kelvin">
              K
            </A>
          )}
        </span>
      </Fact>
      <Fact title="Boiling Point">
        {boilingPoint ? boilingPoint : "???"}
        {boilingPoint && (
          <A className="ml-1" href="https://en.wikipedia.org/wiki/Kelvin">
            K
          </A>
        )}
      </Fact>
      <Fact title="Electron Configuration">
        {electronicConfiguration.toString().replace(/\./g, " ")}
      </Fact>
      <Fact title="Year Discovered">{yearDiscovered}</Fact>
      <div className="flex justify-around text-sm my-3">
        <A href={wiki}>Wikipedia</A>
        <A href={periodicVideoLink(atomicNumber)}>Video</A>
      </div>
    </div>
  )
}

function periodicVideoLink(atomicNumber: number) {
  const formattedNumber =
    atomicNumber < 10
      ? `00${atomicNumber}`
      : atomicNumber < 100
      ? `0${atomicNumber}`
      : atomicNumber

  return `http://periodicvideos.com/videos/${formattedNumber}.htm`
}
