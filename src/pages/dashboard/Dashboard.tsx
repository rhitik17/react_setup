import { Button, Card, Grid, Text, Title } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";

// Example data for the chart
const data = [
  { date: "Mar 22", Apples: 110 },
  { date: "Mar 23", Apples: 60 },
  { date: "Mar 24", Apples: 80 },
  { date: "Mar 25", Apples: null },
  { date: "Mar 26", Apples: null },
  { date: "Mar 27", Apples: 40 },
  { date: "Mar 28", Apples: 120 },
  { date: "Mar 29", Apples: 80 },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
     

      {/* Main Dashboard Content */}
      <div className="flex-grow p-8">

        {/* Key Metrics - Overview Cards */}
        <Grid gutter="xl" className="mb-10">
          <Grid.Col span={12}   >
            <Card shadow="sm" className="bg-white p-6 rounded-lg border border-gray-200">
              <Text size="lg" className="font-semibold text-gray-800">Total Consultations</Text>
              <Text className="text-4xl font-bold text-indigo-600">150</Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}   >
            <Card shadow="sm" className="bg-white p-6 rounded-lg border border-gray-200">
              <Text size="lg" className="font-semibold text-gray-800">Disease Predictions</Text>
              <Text className="text-4xl font-bold text-indigo-600">78</Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}   >
            <Card shadow="sm" className="bg-white p-6 rounded-lg border border-gray-200">
              <Text size="lg" className="font-semibold text-gray-800">Patients Treated</Text>
              <Text className="text-4xl font-bold text-indigo-600">230</Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Recent Activity Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between items-center mb-4">
            <Text size="lg" className="font-semibold text-gray-800">Recent Activities</Text>
            <Button variant="outline" color="indigo" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <Text size="sm">Consultation with Patient John (Mar 29)</Text>
              <Text size="sm" className="text-gray-400">Completed</Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text size="sm">Disease Prediction for Mary (Mar 28)</Text>
              <Text size="sm" className="text-gray-400">Completed</Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text size="sm">Consultation with Patient Sarah (Mar 27)</Text>
              <Text size="sm" className="text-gray-400">In Progress</Text>
            </div>
          </div>
        </div>

       


      </div>
    </div>
  );
};

export default Dashboard;
