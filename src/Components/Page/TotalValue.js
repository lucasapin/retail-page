import React from "react";
import ValueGraph from "./ValueGraph";

export default function TotalValue(props) {
  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <div className="row">
        <div className="col-md-12">
          <h4 className="mt-1">Transaction Value for the Hour</h4>

          {!props.isLoading ? (
            <ValueGraph groupedTransactions={props.ordersSelected} />
          ) : (
            <>
              <br />
              <br />
              <br />
              <br />
              <h4 style={{ textAlign: "center" }}>...Loading</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
