import { nodes, rels } from './data'
import { BasicNevadaWrapper } from '@neo4j-nevada/react'
import type Nevada from '@neo4j-nevada/core'
import { useRef } from 'react'



export default function Graph() {
  const nevada = useRef<Nevada>(null)
  const nevadaNodes = nodes.map(node => ({
    id: node.identity.toString(),
    size: Math.min(Math.random() * 20, 5),
    caption: node.properties.name || node.properties.title || 'foo',
    color: node.labels.includes('Movie') ? '#0070d9' : '#7AD1FF'

  }))
  const nevadaRels = rels.map(rel => ({
    id: rel.identity.toString(),
    from: rel.start.identity.toString(),
    to: rel.end.identity.toString(),
    type: rel.type,
    caption: rel.type,
    width: 1.5,
    color: 'rgba(59, 130, 246, 0.2)',
  }))

  return (<div className='graph-canvas' style={{
    paddingLeft: '40%',
    height: '100%'
  }}>
    <BasicNevadaWrapper
      ref={nevada}
      nodes={nevadaNodes}
      rels={nevadaRels}
      nevadaOptions={{
        initialZoom: 2
      }}
    />
    {/* <button onClick={() => {
      // nevada.current?.pinNode(nevadaNodes[0].id)
      nevada.current?.setZoom(20)
      nevada.current?.fit([nevadaNodes[Math.round(Math.random() * nevadaNodes.length)].id], {})
    }}>focus node</button> /
    <button onClick={() => {
      nevada.current?.setZoom(2)

    }}>reset</button> /

    <button onClick={() => {
      const randomRel = nevadaRels[Math.round(Math.random() * nevadaRels.length)]

      nevada.current?.setZoom(15)
      nevada.current?.fit([randomRel.from, randomRel.to], {})
    }}>focus rel</button>  */}

  </div>)
}