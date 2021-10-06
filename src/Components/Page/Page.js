import "./Page.css";
import TotalCount from "./TotalCount";
import TotalValue from "./TotalValue";
import TimeSheetTable from "./TimeSheetTable";
import DatePicker from "react-datepicker";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const Page = (props) => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [kaiduData, setKaiduData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [timesheet, setTimesheet] = useState([]);

  // API Call to the /request endpoint - Retrieve all the orders
  useEffect(() => {
    setLoading(true);
    const ordersAPI = "http://localhost:3030";
    const getOrders = axios.get(ordersAPI);
    axios.all([getOrders]).then(
      axios.spread((...allData) => {
        const allDataOrders = _.orderBy(
          allData[0].data.Sale,
          ["timeStamp"],
          ["asc"]
        );
        setOrders(allDataOrders);
        setLoading(false);
      })
    );
  }, []);

  //Filter Days in the Orders Array and set
  const filterByDay = (day, arr) => {
    const filteredGroups = arr.filter((elem) =>
      moment(elem.date).isSame(day, "day")
    );
    setSelectedOrders(filteredGroups);
  };

  //Function that gets called when a day is selected in the date-picker and retrieves the beacon count on specific location
  const getKaiduByDate = (date) => {
    setLoading(true);
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const kaiduAPI = `https://kaidu-dev1.deeppixel.ai/globalData?customer=Safetrack&building=Devesh+home&endDate=${formattedDate}T00:00:00-04:00`;
    const getKaiduData = axios.get(kaiduAPI);
    axios.all([getKaiduData]).then(
      axios.spread((...allData) => {
        console.log(allData[0].data);
        const allDataKaidu = allData[0].data.graph.data;
        setKaiduData(allDataKaidu);
        setLoading(false);
      })
    );
  };

  const daysToBeDisplayed = [];
  const daysToDispose = [];
  const groupByDay = groupedOrders.map((elem) => {
    if (daysToBeDisplayed.includes(format(new Date(elem.date), "MM/dd/yyyy"))) {
      daysToDispose.push(format(new Date(elem.date), "MM/dd/yyyy"));
    } else {
      daysToBeDisplayed.push(format(new Date(elem.date), "MM/dd/yyyy"));
    }
    return daysToBeDisplayed;
  });

  const displayDates = daysToBeDisplayed.map((day) => {
    return <option value={day}>{day}</option>;
  });

  //Groups by and reduces the array of orders to [{date: 2021-10-03, value: $278}] when orders change
  useEffect(() => {
    const sorted = _.groupBy(orders, function (order) {
      return moment(order.timeStamp).startOf("hour").format();
    });
    // Reduce each array to its total
    // as [{ date : Sep 3 , value : 10 dollars}]
    const output = [];
    Object.keys(sorted).map((date) => {
      output.push({
        date: date,
        count: sorted[date].length,
        value: sorted[date]
          .reduce((sum, currentValue) => {
            return sum + parseFloat(currentValue.calcTotal);
          }, 0)
          .toFixed(2),
      });
    });
    setGroupedOrders(output);
  }, [orders]);

  //Retrieves timesheet exceptions for day selected
  const getTimesheet = (date) => {
    const timesheetAPI = `http://localhost:8000/timesheet/${date}`;
    fetch(timesheetAPI)
      .then((resp) => resp.json())
      .then((resp) => setTimesheet(resp));
  };

  return (
    <>
      <div className="main-page">
        <div>
          <DatePicker
            id="datePicker"
            showYearDropdown
            scrollableMonthYearDropdown
            placeholderText="Select a Date"
            maxDate={new Date()}
            dateFormat="MM/dd/yyyy"
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              filterByDay(date, groupedOrders);
              getKaiduByDate(date);
              getTimesheet(format(new Date(date), "yyyy-MM-dd"));
            }}
          />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="container-fluid">
                <div className="row">
                  <TotalValue
                    loading={isLoading}
                    ordersSelected={selectedOrders}
                  />
                </div>
                <div className="row">
                  <TotalCount
                    loading={isLoading}
                    ordersSelected={selectedOrders}
                    dataKaidu={kaiduData}
                  />
                </div>
                <div className="row">
                  <TimeSheetTable
                    date={selectedDate}
                    timesheet={timesheet}
                    getTimesheet={getTimesheet}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
