import MaterialTable from "material-table";
import { format } from "date-fns";

const TimeSheetTable = (props) => {
  const { date, timesheet, getTimesheet } = props;
  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  const addTimesheet = `http://localhost:8000/timesheet/${formattedDate}`;
  const updateAndDeleteTimesheet = `http://localhost:8000/timesheet`;

  const columns = [
    // { title: "Employee Number", field: "employee_number", filtering: false },
    { title: "Employee Name", field: "employee_name" },
    {
      title: "Scheduled Start Hour",
      field: "scheduled_start_hour",
      filtering: false,
      type: "time",
    },
    {
      title: "Actual Start Hour",
      field: "actual_start_hour",
      filtering: false,
      type: "time",
    },
    {
      title: "Scheduled Finish Hour",
      field: "scheduled_finish_hour",
      filtering: false,
      type: "time",
    },
    {
      title: "Actual Finish Hour",
      field: "actual_finish_hour",
      filtering: false,
      align: "left",
      type: "time",
    },
  ];
  return (
    <div id="table-two-container">
      <h4 id="schedulingTitle">Timesheet Exception</h4>
      <MaterialTable
        columns={columns}
        data={timesheet}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              console.log(newRow);
              fetch(addTimesheet, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newRow),
              })
                .then((response) => response.json())
                .then((response) => {
                  getTimesheet(formattedDate);
                  resolve();
                });
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              fetch(addTimesheet + "/" + oldRow.id, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newRow),
              })
                .then((resp) => resp.json())
                .then((resp) => getTimesheet(formattedDate));
              resolve();
            }),
          onRowDelete: (oldRow) =>
            new Promise((resolve, reject) => {
              fetch(updateAndDeleteTimesheet + "/" + oldRow.id, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((resp) => resp.json())
                .then((resp) => getTimesheet(formattedDate));
              resolve();
            }),
        }}
        title=""
        options={{
          filtering: false,
          //   tableLayout: "auto",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 3,
          pageSizeOptions: [3, 5, 10, 15, 25, 50, 100],
          //   rowStyle: (data, index) =>
          //     index % 2 == 0
          //       ? { background: "#212529", color: "white" }
          //       : { background: "#212529", color: "white" },
          //   headerStyle: { background: "lightgray", color: "black" },
        }}
      />
    </div>
  );
};

export default TimeSheetTable;
