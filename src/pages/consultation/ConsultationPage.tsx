import { Button, Select, TextInput, Box } from "@mantine/core";
import { useForm } from '@mantine/form';
import  { useEffect, useState } from "react";
import {
  APICreateconsultation,
  APIGetAllConsultations,
  APIGetAllDoctors,
} from "../../api/consultation";

const ConsultationPage = () => {
  interface Doctor {
    id: string;
    name: string;
    specialty: string;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  const form = useForm({
    initialValues: {
      doctor: "efe63b58-01de-42ae-b681-254213a6d117",
      patient: "f907720f-15b2-42ce-813e-52c680609312",
      specialist: "Neurologist",
      patient_gender: "Male",
      disease_name: "Test Disease",
    },
  });
  
  
  const fetchDoctors = async () => {
    try {
      const response = await APIGetAllDoctors();
      setDoctors(response.data.results);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchConsultations = async () => {
    try {
      const response = await APIGetAllConsultations();
      setConsultations(response.data.results);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  console.log(consultations,"consultation")
  

  useEffect(() => {
    fetchConsultations();
    fetchDoctors();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    const response = await APICreateconsultation(values);
    console.log(response);
  };

  return (
    <Box className="p-8">
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
        <TextInput
          label="Specialist"
          placeholder="Specialist"
          required
          {...form.getInputProps('specialist')}
        />
        <Select
          label="Patient Gender"
          data={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          {...form.getInputProps('patient_gender')}
        />
        <Select
          label="Doctor"
          data={
            doctors
              ? doctors.map((doctor) => ({
                  value: doctor.id,
                  label: doctor.name,
                }))
              : []
          }
          {...form.getInputProps('doctor')}
        />
        <TextInput
          label="Disease Name"
          placeholder="Disease Name"
          required
          {...form.getInputProps('disease_name')}
        />
        <Button className="bg-primary-500" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ConsultationPage;
