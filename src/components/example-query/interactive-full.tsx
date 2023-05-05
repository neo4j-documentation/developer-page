import { ReactNode, useRef } from "react"
import Cypher from "./cypher-block"

interface HoverableProps {
    onMouseOver: (className: string) => void,
    onMouseOut: (className: string) => void,
    className: string,
    children: ReactNode,
}

export default function InteractiveCypher() {
    const ref = useRef<HTMLDivElement>()

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
        <section id="why-neo4j" class="pb-0">
            <div className="why-neo4j grid-container interactive-cypher">
                <div className="grid-x">
                    <div className="cell small-12 medium-10 large-8 medium-offset-1 large-offset-2">
                        <div className="section-header md:text-center">
                            <h2 className="section-title m-auto" style={{ maxWidth: '620px' }}>
                                Query Using Cypher
                            </h2>
                        </div>

                        <div className="section-subtitle md:text-center">
                            <p>
                                Cypher is a declarative open query language that allows for expressive and
                                efficient queries in a property graph. Originally built by Neo4j, Cypher is
                                easy-to-learn and the widely adopted standard graph query language of
                                developers worldwide.
                            </p>
                        </div>

                        <div className="code-container mb-12">
                            <div className="code-title">Cypher</div>
                            <code className="cypher hljs" ref={ref}>
                                <Cypher />
                            </code>
                        </div>

                        <div className="section-subtitle text-center" style={{ width: '80%', margin: 'auto' }}>
                            <p>
                                Cypher works by
                                <Hoverable text=" matching patterns in your data" className="show-match" />.
                                {' '}Patterns consist of{' '}
                                <Hoverable text="nodes" className="show-node" />
                                {' '}and{' '}
                                <Hoverable text="the relationships that connect them" className="show-relationship" />.
                                {/* </p><p> */}
                                {' '}
                                You can filter your queries <Hoverable text="within the pattern or using the WHERE clause" className="show-where" />.
                                {' '}
                                The output of the query is defined by the
                                <Hoverable text=" RETURN clause" className="show-return" />.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
