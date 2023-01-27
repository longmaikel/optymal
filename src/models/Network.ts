import { Network as NetworkCore } from "vis-network";
class Network {
  private nodes;
  private edges;
  private container;
  constructor(nodes, edges, containerId) {
    this.nodes = this.prepareNodes(nodes);
    this.edges = edges;
    this.container = document.getElementById(containerId);
  }

  private prepareNodes(nodes) {
    nodes.forEach(
      (node) =>
        (node.image = this.renderNodeSVG(
          1 + node.id,
          node.ee,
          node.le,
          node.diff
        ))
    );
    return nodes;
  }

  public draw() {
    const options = {
      nodes: {
        shape: "circle",
        size: 30,
        font: {
          size: 32,
        },
        borderWidth: 2,
        shadow: true,
      },
      edges: {
        width: 2,
        shadow: true,
      },
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
        },
      },
      interaction: {
        zoomView: false,
        selectable: false,
        selectConnectedEdges: false,
        dragView: false,
      },
    };

    const data = {
      nodes: this.nodes,
      edges: this.edges,
    };
    const network = new NetworkCore(this.container, data, options);
  }

  private renderNodeSVG(nodeNumber, asap, alap, diff) {
    const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">

 <g>
  <title>Layer 1</title>
  <path stroke="#000" id="svg_2" d="m50.41379,99.24134c-26.44313,0 -47.86206,-21.97447 -47.86206,-49.10344c0,-27.12897 21.41893,-49.10344 47.86206,-49.10344c26.44313,0 47.86206,21.97447 47.86206,49.10344c0,27.12897 -21.41893,49.10344 -47.86206,49.10344z" opacity="undefined" fill="#fff"/>
  <line id="svg_4" y2="85.65513" x2="85.51723" y1="13.20688" x1="13.06898" stroke="#000" fill="none"/>
  <line id="svg_6" y2="85.5172" x2="13.48277" y1="13.34481" x1="85.51723" stroke="#000" fill="none"/>
  <text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" stroke-width="0" id="svg_7" y="54.41377" x="5.31036" stroke="#000" fill="#000000">${asap}</text>
  <text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" stroke-width="0" id="svg_8" y="54.96549" x="64.20689" stroke="#000" fill="#000000">${alap}</text>
  <text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" stroke-width="0" id="svg_9" y="24.7586" x="33.86207" stroke="#000" fill="#000000">${nodeNumber}</text>
  <text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" stroke-width="0" id="svg_10" y="84.62066" x="33.44828" stroke="#000" fill="#000000">${diff}</text>
 </g>
</svg>`;

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
}

export default Network;
