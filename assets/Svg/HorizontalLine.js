import * as React from "react"
const HorizontalLine = (props) => (
  <svg width={"100%"} height={1} {...props}>
    <line
      x1="100%"
      y1="50%"
      y2="50%"
      stroke="#000"
      strokeDasharray="6 6"
      strokeOpacity={0.2}
    />
  </svg>
)
export default HorizontalLine
