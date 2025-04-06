import { Button, MultiSelect, Text } from "@mantine/core";
import { IconBrain, IconHeart, IconVirus } from "@tabler/icons-react";
import React, { useState } from "react";

const PredictionPage = () => {
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

  const diseaseOptions = [
    { value: "diabetes", label: "Diabetes", icon: <IconBrain /> },
    { value: "hypertension", label: "Hypertension", icon: <IconHeart /> },
    { value: "covid", label: "COVID-19", icon: <IconVirus /> },
    // Add more diseases as needed
  ];

  const handlePredict = () => {
    // Logic to predict disease based on selectedDiseases
    console.log("Predicting for:", selectedDiseases);
  };

  return (
    <div className="p-8 space-y-4">
      <Text className="text-xl font-bold">Disease Prediction</Text>
      <Text className="text-md text-gray-600">
        Welcome to the Disease Prediction tool! Here, you can select from a
        variety of diseases to receive insights and predictions based on your
        selections.
      </Text>
      <Text className="text-md text-gray-600">
        Please choose the diseases you would like to analyze from the list
        below. Our advanced algorithms will help you understand potential health
        risks and guide you towards informed decisions.
      </Text>
      <Text className="text-md text-gray-600">
        Remember, this tool is designed to assist you, but it is always best to
        consult with a healthcare professional for personalized advice.
      </Text>
      <MultiSelect
        label="Select Diseases"
        placeholder="Choose diseases"
        data={diseaseOptions}
        value={selectedDiseases}
        onChange={setSelectedDiseases}
        searchable
        clearable
        leftSection={selectedDiseases.length > 0 ? <IconBrain /> : null}
      />
      <Button className="bg-primary-500" onClick={handlePredict}>
        Predict Disease
      </Button>
    </div>
  );
};

export default PredictionPage;
