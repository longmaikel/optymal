class NetworkTransformer {
  private userData: any;
  private nodes: any;
  private edges: any;

  private max;

  private T;
  constructor(userData: any) {
    this.userData = userData;
    this.nodes = [];
    this.edges = [];
    this.max = 0;
    this.T = 0;
  }

  public getNodes() {
    return this.nodes;
  }

  public getEdges() {
    return this.edges;
  }

  public transform() {
    this.transformFromUserData();
    this.moveForward();
    this.moveBackward();
    this.findCriticalPath();
    this.calculateTimeForNodes();
    // debugger;
    console.log("nodes", this.nodes);
    console.log("egdes", this.edges);
  }

  private transformFromUserData() {
    this.userData.forEach((el, i) => {
      this.nodes.push({
        id: i,
        // label: (1 + i).toString(),
        group: 0,
        ee: null,
        le: null,
        image: null,
        shape: "image",
      });
      console.log("petla", i, this.nodes);
      const events: any = el.connections
        .split("-")
        .map((e) => Number.parseInt(e.trim()));

      this.max = this.max >= events[1] ? this.max : events[1];

      this.edges.push({
        from: events[0] - 1,
        to: events[1] - 1,
        arrows: "to",
        label: `${el.name}${el.time}`,
        time: Number.parseInt(el.time),
        ef: null,
        es: null,
        ls: null,
        lf: null,
      });
    });

    this.nodes = this.nodes.filter((node) => node.id < this.max);
  }

  private moveForward() {
    for (let i = 0; i < this.max; ++i) {
      if (i == 0) {
        this.edges.forEach((edge) => {
          if (edge.from == i) {
            edge.es = 0;
            edge.ef = edge.es + edge.time;
          }
        });
      } else {
        const toEdges = this.edges.filter((e) => e.to == i);
        let toEdge = toEdges[0];
        toEdges.forEach((e) => (toEdge = toEdge.ef >= e.ef ? toEdge : e));
        this.edges.forEach((edge) => {
          if (edge.from == i) {
            edge.es = toEdge.ef;
            edge.ef = edge.es + edge.time;
            this.T = edge.ef;
          }
        });
      }
    }
  }

  private moveBackward() {
    const lastId = this.max - 1;
    for (let i = lastId; i >= 0; --i) {
      if (i == lastId) {
        this.edges.forEach((edge) => {
          if (edge.to == i) {
            // debugger;
            edge.lf = this.T;
            edge.ls = edge.lf - edge.time;
          }
        });
      } else {
        const fromEdges = this.edges.filter((e) => e.from == i);
        let fromEdge = fromEdges[0];
        fromEdges.forEach(
          (e) => (fromEdge = fromEdge.ls <= e.ls ? fromEdge : e)
        );
        this.edges.forEach((edge) => {
          if (edge.to == i) {
            edge.lf = fromEdge.ls;
            edge.ls = edge.lf - edge.time;
          }
        });
      }
    }

    // calculate diff
    this.edges.forEach((edge) => {
      edge.diff = edge.ls - edge.es;
    });
  }

  private findCriticalPath() {
    // debugger;
    this.edges.forEach((edge) => {
      if (edge.diff == 0) {
        edge.color = { color: "red" };
      }
    });
    // debugger;
  }

  private calculateTimeForNodes() {
    this.nodes.forEach((node) => {
      if (node.id === 0) {
        node.ee = 0;
        node.le = 0;
        node.diff = 0;
      } else if (node.id === this.max - 1) {
        node.ee = this.T;
        node.le = this.T;
        node.diff = node.le - node.ee;
      } else {
        const toEdges = this.edges.filter((e) => e.to == node.id);
        let toEdge = toEdges[0];
        toEdges.forEach((e) => (toEdge = toEdge.ef >= e.ef ? toEdge : e));

        const fromEdges = this.edges.filter((e) => e.from == node.id);
        let fromEdge = fromEdges[0];
        fromEdges.forEach(
          (e) => (fromEdge = fromEdge.ls <= e.ls ? fromEdge : e)
        );
        // debugger;
        node.ee = toEdge.ef;
        node.le = fromEdge.ls;
        node.diff = node.le - node.ee;
      }
    });
  }
}

export default NetworkTransformer;
