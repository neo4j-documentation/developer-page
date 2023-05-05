export default function Cypher() {
    return (
        <>
            <span className="match">
                <span className="hljs-keyword opaque">MATCH </span>
                <span className="node opaque">(j</span>
                <span className="opaque node nodelabel">:
                    <span className="hljs-type">Person</span>{' '}
                </span>
                <span className="node where inline-where opaque">{'{name: "Adam"}'}</span>

                <span className="node opaque">)</span>

                <span className="relationship opaque">-[r:<span className="hljs-type">LIKES</span>]-&gt;</span>
                <span className="node opaque">(tech:<span className="hljs-type">Technology</span>)</span>
                <span className="relationship opaque">&lt;-[r2:<span className="hljs-type">LIKES</span>]-</span></span>
            <span className="node opaque">(p:<span className="hljs-type nodelabel">Person</span>)</span>

            <br />
            <span className="where opaque">
                <span className="hljs-keyword">WHERE</span> tech.type=<span className="hljs-string">'Graphs'</span>
            </span>
            <br />
            <span className="return opaque"><span className="hljs-keyword">RETURN</span> p.name;</span>
        </>
    )

}