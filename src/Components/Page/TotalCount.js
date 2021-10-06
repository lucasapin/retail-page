import React from "react";
import CountGraph from "./CountGraph";

export default function TotalCount(props) {
  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="row">
        <div className="col-md-12">
          <h4 className="mt-1">
            Number of Transactions vs Customer Count per Hour
          </h4>
          {!props.loading ? (
            <CountGraph
              className="GraphThreeBox"
              groupedTransactions={props.ordersSelected}
              KaiduCount={props.dataKaidu}
            />
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
