const { Component } = require("react");

class AnimatedCircles extends Component {
  componentDidMount() {
    const { count, center, circleSize, offset, radius, delay } = this.props;
    const offsetToC = this.offsetTo(center);
    const theta = (2 * Math.PI) / count;
    const delta = offset ? theta / 2 : 0;

    Array(count)
      .fill()
      .forEach((_, idx) => {
        const start = this.getLocation(theta, delta, idx, radius, offsetToC);
        const end = this.getLocation(
          theta,
          delta,
          idx,
          radius * 0.6,
          offsetToC
        );

        this.animateCircle(idx, start, end, circleSize, delay);
      });
  }

  animateCircle(idx, start, end, circleSize, delay) {
    TweenMax.fromTo(
      this.refs[idx],
      1,
      {
        attr: { r: circleSize, cx: start.x, cy: start.y },
      },
      {
        attr: { r: circleSize / 8, cx: end.x, cy: end.y },
        ease: Sine.easeInOut,
        delay,
        yoyo: true,
        repeat: -1,
      }
    );
  }

  render() {
    const { count, circleSize, radius, center, offset, fill } = this.props;
    const theta = (2 * Math.PI) / count;
    const delta = offset ? theta / 2 : 0;
    const nodes = Array(count).fill();

    return (
      <g>
        {this.getCircles(theta, delta, radius, circleSize, fill, center, nodes)}
      </g>
    );
  }

  getCircles(theta, delta, radius, circleR, fill, center, nodes) {
    const offsetToC = this.offsetTo(center);

    return nodes.map((_, idx) => {
      const l = this.getLocation(theta, delta, idx, radius, offsetToC);
      return (
        <circle
          key={idx}
          ref={idx}
          cx={l.x}
          cy={l.y}
          r={circleR}
          fill={fill}
          strokeWidth={circleR * 0.2}
        />
      );
    });
  }

  getLocation(theta, delta, idx, r, offsetToC) {
    return this.polarToCartesian(delta + theta * idx, r, offsetToC);
  }

  polarToCartesian(theta, r, offsetToC) {
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return offsetToC({ x, y });
  }

  offsetTo(center) {
    return function offsetToC({ x, y }) {
      return {
        x: center.x + x,
        y: center.y - y,
      };
    };
  }
}

class Nucleus extends Component {
  componentDidMount() {
    const { r } = this.props;

    TweenMax.fromTo(
      this.refs.circle,
      1,
      {
        attr: { r: r },
      },
      {
        attr: { r: r / 8 },
        ease: Sine.easeInOut,
        yoyo: true,
        repeat: -1,
      }
    );
  }

  render() {
    const { x, y, r, fill } = this.props;

    return <circle ref="circle" cx={x} cy={y} r={r} fill={fill} />;
  }
}

function Canvas({ w, h, children, bgColor = "transparent" }) {
  const viewBox = [0, 0, w, h].join(" ");
  const styles = {
    display: "block",
    backgroundColor: bgColor,
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",
  };

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={styles}
    >
      {children}
    </svg>
  );
}

class AnimatedCirclesApp extends Component {
  render() {
    const s = 200;
    const center = { x: s / 2, y: s / 2 };
    const circleColor = "#fff";
    const circleSize = 3;
    const amp = 12;
    const crests = [
      { count: 8, offset: false },
      { count: 16, offset: false },
      { count: 16, offset: true },
      { count: 16, offset: false },
      { count: 16, offset: true },
      { count: 16, offset: false },
    ];

    const styles = {
      link: {
        color: "white",
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        textDecoration: "none",
        letterSpacing: "0.1em",
      },
    };

    return (
      <>
        <div className="vh-100 flex items-center">
          <Canvas w={s} h={s}>
            <Nucleus
              x={center.x}
              y={center.y}
              r={circleSize}
              fill={circleColor}
            />
            {crests.map(({ count, offset }, idx) => (
              <AnimatedCircles
                key={idx}
                count={count}
                circleSize={circleSize}
                radius={amp + amp * idx}
                center={center}
                offset={offset}
                delay={(0.8 * (idx + 1)) / crests.length}
                fill={circleColor}
              />
            ))}
          </Canvas>
        </div>
      </>
    );
  }
}

export default AnimatedCirclesApp;
