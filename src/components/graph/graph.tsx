
import { BasicNevadaWrapper } from '@neo4j-nevada/react'
import type Nevada from '@neo4j-nevada/core'
import type { Node, Relationship } from '@neo4j-nevada/core';
import type { RefObject } from 'react'


interface GraphProps {
  nevada: RefObject<Nevada>;
  nodes: Node[];
  rels: Relationship[];
}

export default function Graph({ nevada, nodes, rels }: GraphProps) {
  return (<div className='graph-canvas' style={{
    paddingLeft: '40%',
    height: '100%'
  }}>
    <BasicNevadaWrapper
      ref={nevada}
      nodes={nodes}
      rels={rels}
      nevadaOptions={{
        initialZoom: 2,
        layoutOptions: {}
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

    }}>focus rel</button>  */}

  </div>)
}