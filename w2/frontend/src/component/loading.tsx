import React from "react";

const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      width="50"
      height="25"
    >
      <circle
        fill="#3B82F6"
        stroke="#3B82F6"
        strokeWidth="5"
        r="5"
        cx="20"
        cy="16"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="16;34;16;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.5s"
        />
      </circle>
      <circle
        fill="#3B82F6"
        stroke="#3B82F6"
        strokeWidth="5"
        r="5"
        cx="50"
        cy="16"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="16;34;16;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        />
      </circle>
      <circle
        fill="#3B82F6"
        stroke="#3B82F6"
        strokeWidth="5"
        r="5"
        cx="80"
        cy="16"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1s"
          values="16;34;16;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  );
};

export default Loading;
