import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function Adminchart({ adminDashboardData }) {
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: adminDashboardData.courses.map((course) => course.courseName),
    datasets: [
      {
        data: adminDashboardData.courses.map(
          (course) => course.totalStudentsEnrolled
        ),
        backgroundColor: generateRandomColors(
          adminDashboardData.courses.length
        ),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: adminDashboardData.courses.map((course) => course.courseName),
    datasets: [
      {
        data: adminDashboardData.courses.map(
          (course) => course.totalAmountGenerated
        ),
        backgroundColor: generateRandomColors(
          adminDashboardData.courses.length
        ),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-50">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-600 text-[#e51919]"
              : "text-white"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-[#e51919]"
              : "text-white"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square lg:h-[25rem] h-full w-full flex flex-col lg:flex lg:flex-row lg:w-[41rem]">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}