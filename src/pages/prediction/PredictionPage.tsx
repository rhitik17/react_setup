import { Box, Button, MultiSelect, Stack, Stepper, Text } from "@mantine/core";
import {
  IconBrain,
  IconHeart,
  IconStethoscope,
  IconUserCheck,
  IconVirus,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import {
  APIGetDoctorsBySpecialization,
  APIPredictDisease,
} from "../../api/prediction";

const diseaseOptions = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "continuous_sneezing",
  "shivering",
  "chills",
  "joint_pain",
  "stomach_pain",
  "acidity",
  "ulcers_on_tongue",
  "muscle_wasting",
  "vomiting",
  "burning_micturition",
  "spotting_ urination",
  "fatigue",
  "weight_gain",
  "anxiety",
  "cold_hands_and_feets",
  "mood_swings",
  "weight_loss",
  "restlessness",
  "lethargy",
  "patches_in_throat",
  "irregular_sugar_level",
  "cough",
  "high_fever",
  "sunken_eyes",
  "breathlessness",
  "sweating",
  "dehydration",
  "indigestion",
  "headache",
  "yellowish_skin",
  "dark_urine",
  "nausea",
  "loss_of_appetite",
  "pain_behind_the_eyes",
  "back_pain",
  "constipation",
  "abdominal_pain",
  "diarrhoea",
  "mild_fever",
  "yellow_urine",
  "yellowing_of_eyes",
  "acute_liver_failure",
  "fluid_overload",
  "swelling_of_stomach",
  "swelled_lymph_nodes",
  "malaise",
  "blurred_and_distorted_vision",
  "phlegm",
  "throat_irritation",
  "redness_of_eyes",
  "sinus_pressure",
  "runny_nose",
  "congestion",
  "chest_pain",
  "weakness_in_limbs",
  "fast_heart_rate",
  "pain_during_bowel_movements",
  "pain_in_anal_region",
  "bloody_stool",
  "irritation_in_anus",
  "neck_pain",
  "dizziness",
  "cramps",
  "bruising",
  "obesity",
  "swollen_legs",
  "swollen_blood_vessels",
  "puffy_face_and_eyes",
  "enlarged_thyroid",
  "brittle_nails",
  "swollen_extremeties",
  "excessive_hunger",
  "extra_marital_contacts",
  "drying_and_tingling_lips",
  "slurred_speech",
  "knee_pain",
  "hip_joint_pain",
  "muscle_weakness",
  "stiff_neck",
  "swelling_joints",
  "movement_stiffness",
  "spinning_movements",
  "loss_of_balance",
  "unsteadiness",
  "weakness_of_one_body_side",
  "loss_of_smell",
  "bladder_discomfort",
  "foul_smell_of urine",
  "continuous_feel_of_urine",
  "passage_of_gases",
  "internal_itching",
  "toxic_look_(typhos)",
  "depression",
  "irritability",
  "muscle_pain",
  "altered_sensorium",
  "red_spots_over_body",
  "belly_pain",
  "abnormal_menstruation",
  "dischromic _patches",
  "watering_from_eyes",
  "increased_appetite",
  "polyuria",
  "family_history",
  "mucoid_sputum",
  "rusty_sputum",
  "lack_of_concentration",
  "visual_disturbances",
  "receiving_blood_transfusion",
  "receiving_unsterile_injections",
  "coma",
  "stomach_bleeding",
  "distention_of_abdomen",
  "history_of_alcohol_consumption",
  "fluid_overload.1",
  "blood_in_sputum",
  "prominent_veins_on_calf",
  "palpitations",
  "painful_walking",
  "pus_filled_pimples",
  "blackheads",
  "scurring",
  "skin_peeling",
  "silver_like_dusting",
  "small_dents_in_nails",
  "inflammatory_nails",
  "blister",
  "red_sore_around_nose",
  "yellow_crust_ooze",
];
const PredictionPage = () => {
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await APIGetDoctorsBySpecialization(response?.prediction_id);
      setDoctors(data?.data?.results); // Assuming response is an array of doctors
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  const [response, setResponse] = useState<{
    disease: string;
    confidence: number;
    recommended_specialization: string;
    prediction_id: number;
  } | null>(null);
  const handlePredict = async () => {
    const payload = {
      symptoms: selectedDiseases,
    };

    console.log("Predicting for:", payload);
    try {
      const res = await APIPredictDisease(payload);
      setResponse(res.data);
      console.log("Prediction result:", res.data);
    } catch (error) {
      console.error("Error predicting disease:", error);
    }
  };
  console.log(response);

  return (
    <div className="p-8 space-y-4">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Prediction"
          icon={<IconBrain size={24} />}
          description="Predict disease"
        >
          <Box className="space-y-6 py-8  rounded-xl ">
            <div className="bg-blue-50 p-6 rounded-lg flex items-center space-x-4">
              <IconBrain className="w-12 h-12 text-primary-500" />
              <div>
                <Text className="font-semibold">AI Analysis</Text>
                <Text className="text-sm text-gray-600">
                  Advanced algorithms analyze your symptoms
                </Text>
              </div>
            </div>

            <div className="mt-8">
              <Text className="text-lg font-medium mb-2">
                Select Your Symptoms
              </Text>
              <Text className="text-gray-600 mb-4">
                Choose the symptoms you're experiencing for an accurate
                prediction
              </Text>
              <Box className="flex items-end gap-4 w-full ">
                <MultiSelect
                  label="Symptoms"
                  className="w-full"
                  placeholder="Start typing your symptoms..."
                  data={diseaseOptions}
                  value={selectedDiseases}
                  onChange={setSelectedDiseases}
                  searchable
                  clearable
                  leftSection={
                    selectedDiseases.length > 0 ? (
                      <IconBrain className="text-primary-500" />
                    ) : null
                  }
                />
                <Button
                  className="bg-primary-500 hover:bg-slate-600 transition-all w-1/6  shadow-lg transform hover:scale-105"
                  onClick={() => {
                    handlePredict();
                  }}
                >
                  Predict
                </Button>
              </Box>
            </div>

            <Text className="text-sm text-gray-500 text-center mt-4">
              Note: This tool is for reference only. Always consult healthcare
              professionals for medical advice.
            </Text>
            {response && (
              <Box className="p-6 bg-white rounded-lg shadow-md space-y-4 max-w-xl mx-auto hover:shadow-lg transition-shadow duration-300">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <Text size="xl" fw={700} className="text-primary-500 mb-2">
                    Predicted Disease
                  </Text>
                  <Text
                    size="lg"
                    fw={500}
                    className="hover:text-primary-600 cursor-pointer"
                  >
                    {response?.disease}
                  </Text>
                </div>

                <div className="border-t border-b py-4 my-4 hover:bg-gray-50 transition-colors duration-300">
                  <Text size="lg" fw={600} className="text-gray-700 mb-2">
                    Recommended Specialization
                  </Text>
                  <Text size="md" className="text-gray-600 hover:text-gray-900">
                    {response?.recommended_specialization}
                  </Text>
                </div>

                <div className="space-y-4">
                  <Button
                    className="bg-primary-500 w-full hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    size="lg"
                    onClick={() => {
                      fetchDoctors();
                      nextStep();
                    }}
                  >
                    Get Recommended Doctors
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-50 transition-colors duration-300"
                    size="lg"
                    onClick={() => window.print()}
                  >
                    Save Results
                  </Button>
                </div>
              </Box>
            )}
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="Doctors"
          icon={<IconStethoscope size={24} />}
          description="Get recommended doctors"
        >
          <div className="bg-purple-50 p-6 rounded-lg flex items-center space-x-4">
            <IconHeart className="w-12 h-12 text-purple-500" />
            <div>
              <Text className="font-semibold">Health Insights</Text>
              <Text className="text-sm text-gray-600">
                Get detailed health risk assessments
              </Text>
            </div>
          </div>
          <Box className="space-y-4">
            {loading && <Text>Loading doctors...</Text>}

            {/* Render doctors list */}
            {!loading && doctors.length > 0 && (
              <Stack>
                {doctors.map((doctor: any) => (
                  <Box key={doctor.id} p="md" className="border rounded">
                    <Text size="lg" fw={500}>
                      {doctor.full_name}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {doctor.experience_years}
                    </Text>
                  </Box>
                ))}
              </Stack>
            )}

            {/* If no doctors are found */}
            {!loading && doctors.length === 0 && <Text>No doctors found.</Text>}
          </Box>
        </Stepper.Step>
        <Stepper.Step
          icon={<IconBrain size={24} />}
          label="Final step"
          description="Get full access"
        >
          <div className="bg-green-50 p-6 rounded-lg flex items-center space-x-4">
            <IconVirus className="w-12 h-12 text-green-500" />
            <div>
              <Text className="font-semibold">Expert Guidance</Text>
              <Text className="text-sm text-gray-600">
                Connect with specialized doctors
              </Text>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Box className="flex w-full justify-between">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button className="bg-primary-500" onClick={nextStep}>
          Next step
        </Button>
      </Box>
    </div>
  );
};

export default PredictionPage;
