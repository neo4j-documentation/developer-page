import QuickLink from "../components/quick-link";
import Graph from "../components/graph/graph";
import { useRef, useState } from "react";
import { nodes, rels } from './graph/data'
import type Nevada from "@neo4j-nevada/core";
import type { Node, Relationship } from "@neo4j-nevada/core";

export default function Hero() {
  const nevada = useRef<Nevada>(null)

  const nevadaNodes: Node[] = nodes.map(node => ({
    id: node.identity.toString(),
    size: Math.min(Math.random() * 20, 5),
    caption: node.properties.name || node.properties.title || 'foo',
    color: node.labels.includes('Movie') ? '#0070d9' : 'rgb(86, 148, 128)'

  }))
  const nevadaRels: Relationship[] = rels.map(rel => ({
    id: rel.identity.toString(),
    from: rel.start.identity.toString(),
    to: rel.end.identity.toString(),
    type: rel.type,
    caption: rel.type,
    width: 1.5,
    color: 'rgba(59, 130, 246, 0.2)',
  }))

  const setFocus = (focus: string | undefined) => {
    switch (focus) {
      case 'nodes':
        nevada.current?.setZoom(20)
        nevada.current?.fit([nevadaNodes[Math.round(Math.random() * nevadaNodes.length)].id], {})
        break;
      case 'properties':
        nevada.current?.setZoom(20)
        nevada.current?.fit([nevadaNodes[Math.round(Math.random() * nevadaNodes.length)].id], {})
        break;
      case 'relationships':
        const randomRel = nevadaRels[Math.round(Math.random() * nevadaRels.length)]

        nevada.current?.setZoom(15)
        nevada.current?.fit([randomRel.from, randomRel.to], {})
        break;
      default:
        nevada.current?.setZoom(2);
        nevada.current?.fit([], {})
        break;
    }
  }

  return (
    <div id="page-home">
      <div className="bg-neutral-20 blazing-fast">
        <section className="relative" id="hero-ssection">
          <Graph nevada={nevada} nodes={nevadaNodes} rels={nevadaRels} />
          <div className="grid-container relative">
            <div className="grid-x">
              <div className="cell small-12 large-6 pt-8 pb-4 left-column">
                <div className="hero-section mb-8 mx-auto" style={{ maxWidth: '45rem' }}>
                  <p className="text-overline-lg">Get started with Neo4j</p>
                  <h1>A simple structure for representing connected data.</h1>
                  <div className="mb-12">
                    <p className="text-subtitle font-normal mb-4">
                      You can use
                      <a href="#" onMouseOver={() => setFocus('nodes')} onMouseOut={() => setFocus(undefined)}> Nodes </a>
                      and
                      <a href="#" onMouseOver={() => setFocus('relationships')} onMouseOut={() => setFocus(undefined)}> Relationships </a>
                      to model real-world entites and their connections, making data
                      exploration, analysis, and insights a breeze across various applications.
                    </p>
                    <p className="text-subtitle font-normal mb-4">
                      Add <a href="#" onMouseOver={() => setFocus('properties')} onMouseOut={() => setFocus(undefined)}> Properties </a>
                      to Nodes and Relationships to add context to your data.
                    </p>
                    <p className="text-subtitle font-normal mb-4">
                      Neo4j traverses connected data by
                      <a href="#" onMouseOver={() => setFocus('type')} onMouseOut={() => setFocus(undefined)}> relationship type </a>
                      and
                      <a href="#" onMouseOver={() => setFocus('direction')} onMouseOut={() => setFocus(undefined)}> direction </a>
                      to provide real-time responses from highly connected datasets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="cell small-12 large-6 text-center right-column relative"></div>
            </div>

            <div className="grid-x grid-margin-x grid-margin-y">
              <QuickLink
                link="#"
                image="https://dist.neo4j.com/wp-content/uploads/20221101082027/gdb-icon-hierarchy.svg"
                overline="Get Started Guide"
                text="Take your first steps with Neo4j"
              />
              <QuickLink
                link="#"
                image="https://dist.neo4j.com/wp-content/uploads/20221101082030/paper-text-3.svg"
                overline="Documentation"
                text="Manuals for Neo4j, Cypher and drivers"
              />
              <QuickLink
                link="#"
                image="https://dist.neo4j.com/wp-content/uploads/20220315165554/learning-monitor-1.svg"
                overline="Neo4j GraphAcademy"
                text="Learn online at your own pace"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
