import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="spinner-container">
      <ClipLoader
        color={"#black"}
        loading={loading}
        css={override}
        size={20}
      />
    </div>
  );
};

export default LoadingSpinner;
