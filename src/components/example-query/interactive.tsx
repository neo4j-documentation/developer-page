import { ReactNode, useRef } from "react"
import Cypher from "./cypher-block"

interface HoverableProps {
    onMouseOver: (className: string) => void,
    onMouseOut: (className: string) => void,
    className: string,
    children: ReactNode,
}

export default function InteractiveCypher() {
    const ref = useRef<HTMLElement>()

    const onMouseOver = (state: string) => {
        if (!ref.current) return

        ref.current.classList.add('spotlight')
        ref.current.classList.add(state)
    }

    const onMouseOut = (state: string) => {
        if (!ref.current) return

        ref.current.classList.remove('spotlight')
        ref.current.classList.remove(state)
    }

    const Hoverable = ({ className, text }: { className: string, text: string }) => {
        return (
            <a
                onMouseOver={() => onMouseOver(className)}
                onMouseOut={() => onMouseOut(className)}
            >{text}</a>
        )
    }


    return (
        <div className="grid-container">
            <div className="grid-x small-up-1 grid-padding-x-lg grid-padding-y-xl">
                <div className="cell">
                    <div className="bg-neutral-20 p-12 rounded-md">
                        <div className="grid-x items-center grid-padding-x-xl">
                            <div className="cell small-12 large-6 mb-8">
                                <div>
                                    <h3 className="mb-8">The Cypher Query Language</h3>
                                    <p className="section-subtitle mb-8">
                                        Cypher is a declarative open query language that allows for expressive and
                                        efficient queries in a property graph. Originally built by Neo4j, Cypher is
                                        easy-to-learn and the widely adopted standard graph query language of
                                        developers worldwide.
                                    </p>
                                </div>
                            </div>
                            <div className="cell small-12 large-6">
                                <div className="code-container mb-12">
                                    <div className="code-title">Cypher</div>
                                    <code className="cypher hljs" ref={ref}>
                                        <Cypher />
                                    </code>
                                </div>
                            </div>
                        </div>
                        <div className="grid-x grid-padding-x-xl">
                            <div className="cell small-12 md-6 large-3">
                                <h4 className="text-overline">Pattern Matching</h4>
                                <p>
                                    Cypher works by{' '}
                                    <Hoverable text="matching patterns in your data" className="show-match" />
                                    {' '}using an ASCII-art style syntax.
                                </p>
                            </div>
                            <div className="cell small-12 md-6 large-3">
                                <h4 className="text-overline">ASCII-art Style Syntax</h4>
                                <p>
                                    <Hoverable text="Draw nodes using parentheses" className="show-node" />. Simply
                                    {' '}<Hoverable text="define labels" className="show-label" /> and <Hoverable text="properties" className="show-inline-where" />
                                    {' '}as part of the pattern.
                                </p>
                            </div>
                            <div className="cell small-12 md-6 large-3">
                                <h4 className="text-overline">Traverse your Graph</h4>
                                <p>
                                    <Hoverable text="Expand relationships by drawing using arrows, square brackets" className="show-relationship" /> and an arrow to denote the direction.

                                </p>
                            </div>
                            <div className="cell small-12 md-6 large-3">
                                <h4 className="text-overline">Filter and Return</h4>
                                <p>
                                    Filter data <Hoverable text="within the pattern or using the WHERE clause" className="show-where" />
                                    {' '}
                                    and control the output using the
                                    {' '}
                                    <Hoverable text="RETURN clause" className="show-return" />.
                                </p>
                            </div>
                        </div>
                        <div className="grid-x grid-padding-x-xl">
                            <div className="cell small-12 mt-8">
                                <p className="section-subtitle">
                                    <a className="arrowed" href="https://graphacademy.neo4j.com/courses/cypher-fundamentals/?ref=developer" target="_blank">Learn Cypher Fundamentals on GraphAcademy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
