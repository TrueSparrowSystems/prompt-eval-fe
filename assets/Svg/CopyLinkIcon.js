import React from "react";

export default function CopyLinkIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
      <rect width={48} height={48} fill={props.fill} rx={4} />
      <rect
        width={47}
        height={47}
        x={0.5}
        y={0.5}
        stroke="#000"
        strokeOpacity={0.1}
        rx={3.5}
      />
      <path fill={props.fill} d="M34 34H14V14h20z" />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.2}
        d="M19 26h-2a1 1 0 0 1-1-1v-7a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v2m-2 13h6a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"
      />
    </svg>
  );
}
