import { Button, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { APICreateconsultation } from "../../api/consultation";

const ConsultationPage = () => {
  const [formValues, setFormValues] = useState({
    doctor_name: "JohnDoe",
    patient_name: "JohnDoe",
    specialist: "Neurologist",
    patient_gender: "Male",
    disease_name: "Test Disease",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...formValues,
    };
    const response = await APICreateconsultation(payload);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      <TextInput
        label="Doctor Name"
        name="doctor_name"
        placeholder="Doctor Name"
        value={formValues.doctor_name}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Patient Name"
        name="patient_name"
        placeholder="Patient Name"
        value={formValues.patient_name}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Specialist"
        name="specialist"
        placeholder="Specialist"
        value={formValues.specialist}
        onChange={handleChange}
        required
      />
      <Select
        label="Patient Gender"
        name="patient_gender"
        value={formValues.patient_gender}
        onChange={handleChange}
        data={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ]}
      />
      <TextInput
        label="Disease Name"
        name="disease_name"
        placeholder="Disease Name"
        value={formValues.disease_name}
        onChange={handleChange}
        required
      />
      {/* <TextInput
        label="Consultation Date"
        name="consultation_date"
        type="date"
        value={formValues.consultation_date}
        onChange={handleChange}
        required
      /> */}
      <Button className="bg-primary-500" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ConsultationPage;
