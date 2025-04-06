import { Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";

const data = [
  {
    date: "Mar 22",
    Apples: 110,
  },
  {
    date: "Mar 23",
    Apples: 60,
  },
  {
    date: "Mar 24",
    Apples: 80,
  },
  {
    date: "Mar 25",
    Apples: null,
  },
  {
    date: "Mar 26",
    Apples: null,
  },
  {
    date: "Mar 27",
    Apples: 40,
  },
  {
    date: "Mar 28",
    Apples: 120,
  },
  {
    date: "Mar 29",
    Apples: 80,
  },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <Text>Hello</Text>
      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: "Apples", color: "indigo.6" }]}
        curveType="monotone"
        connectNulls
      />
    </div>
  );
};

export default Dashboard;
