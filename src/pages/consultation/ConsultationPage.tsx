import {
  Button,
  Select,
  TextInput,
  Box,
  Card,
  Title,
  Text,
  Stack,
  Group,
  Avatar,
  Badge,
  Drawer,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  APIAcceptConsultation,
  APICreateconsultation,
  APIGetAllConsultations,
  APIGetAllConsultationsByPatient,
  APIGetAllDoctors,
} from "../../api/consultation";
import { useUserStore } from "../../stores/tokenStore";
import {
  IconStethoscope,
  IconUser,
  IconGenderMale,
  IconGenderFemale,
  IconGenderAgender,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConsultationPage = () => {
  interface Doctor {
    id: string;
    full_name: string;
    specialization: string;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userProfile } = useUserStore();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      doctor_id: "51df7608-b3ba-4be1-a080-a721af043748",
      patient: "52878ab7-4502-4bce-9b72-1c2167493326",
      specialist: "Cardiologist",
      patient_gender: "Male",
      message: "Hello",
      disease_name: "Test Disease",
      consultation_date: "2024-05-19",
    },
    validate: {
      //   doctor: (value) => (!value ? "Please select a doctor" : null),
      specialist: (value) => (!value ? "Please enter specialist type" : null),
      patient_gender: (value) => (!value ? "Please select gender" : null),
      disease_name: (value) => (!value ? "Please enter disease name" : null),
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const fetchDoctors = async () => {
    try {
      const response = await APIGetAllDoctors();
      if (response?.data?.results) {
        setDoctors(response?.data?.results);
      } else {
        console.warn("No doctors data found in response");
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  const fetchConsultations = async () => {
    try {
      const response = await APIGetAllConsultations();
      setConsultations(response.data.results);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    fetchConsultations();
    fetchDoctors();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    try {
      const response = await APICreateconsultation(values);
      console.log(response);
      form.reset();
      // Show success message or redirect
    } catch (error) {
      console.error("Error creating consultation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <IconGenderMale size={20} />;
      case "female":
        return <IconGenderFemale size={20} />;
      default:
        return <IconGenderAgender size={20} />;
    }
  };

  const handleAccept = async (id: any) => {
    try {
      const res: any = await APIAcceptConsultation(id);
      toast.success("Request Accepted ");
      navigate("/chats");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box className="p-8 ">
      <Stack gap="xl">
        <Title order={2} className="text-2xl font-bold text-gray-800">
          Schedule a Consultation
        </Title>

        {/* <Card withBorder shadow="sm" radius="md" p="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <Group justify="space-between" align="flex-start">
                <TextInput
                  label="Specialist Type"
                  placeholder="e.g., Cardiologist, Neurologist"
                  required
                  leftSection={<IconStethoscope size={18} />}
                  className="flex-1"
                  {...form.getInputProps("specialist")}
                />

                <Select
                  label="Patient Gender"
                  placeholder="Select gender"
                  required
                  leftSection={<IconUser size={18} />}
                  data={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  className="flex-1"
                  {...form.getInputProps("patient_gender")}
                />
              </Group>

              <Select
                label="Select Doctor"
                placeholder="Choose a doctor"
                required
                leftSection={<IconUser size={18} />}
                data={doctors.map((doctor) => ({
                  value: doctor.id,
                  label: `${doctor.full_name} (${doctor.specialization})`,
                }))}
                {...form.getInputProps("doctor")}
              />

              <TextInput
                label="Disease Name"
                placeholder="Enter the disease name"
                required
                leftSection={<IconStethoscope size={18} />}
                {...form.getInputProps("disease_name")}
              />

              <Box className="flex justify-end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="bg-primary-500 hover:bg-primary-700 transition-colors duration-200"
                >
                  Schedule Consultation
                </Button>
              </Box>
            </Stack>
          </form>
        </Card> */}
        {/* {
          <Card withBorder shadow="sm" radius="md" p="xl">
            <Title order={3} className="text-xl font-semibold mb-4">
              Recent Consultations
            </Title>
          </Card>
        )} */}

        {consultations.length > 0 && (
          <Card withBorder shadow="sm" radius="md" p="xl">
            <Title order={3} className="text-xl font-semibold mb-4">
              Recent Consultations
            </Title>
            <Stack gap="md">
              {consultations.slice(0, 3).map((consultation) => (
                <Card key={consultation.id} withBorder p="md">
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{consultation.disease_name}</Text>
                      <Text size="sm" c="dimmed">
                        {consultation.specialist}
                      </Text>
                    </div>
                    <Badge
                      color="blue"
                      variant="light"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        open();
                      }}
                    >
                      View Details
                    </Badge>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Card>
        )}
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="70%"
        title={
          <Text className="font-semibold text-2xl">Consultation Details</Text>
        }
      >
        {selectedConsultation && (
          <Stack spacing="xl">
            <Box className="border-b pb-4">
              <Text className="text-lg font-medium mb-2">
                Patient Information
              </Text>
              <Group>
                <Box>
                  <Text size="sm" c="dimmed">
                    Patient Name
                  </Text>
                  <Text>{selectedConsultation.full_name}</Text>
                </Box>
                <Box>
                  <Text size="sm" c="dimmed">
                    Gender
                  </Text>
                  <Group spacing="xs">
                    <Text>{selectedConsultation.patient_gender}</Text>
                  </Group>
                </Box>
                <Box>
                  <Text size="sm" c="dimmed">
                    Age
                  </Text>
                  <Group spacing="xs">
                    <Text>{selectedConsultation.patient_age}</Text>
                  </Group>
                </Box>
              </Group>
            </Box>

            <Box className="border-b pb-4">
              <Text className="text-lg font-medium mb-2">Medical Details</Text>
              <Group grow>
                <Box>
                  <Text size="sm" c="dimmed">
                    Disease
                  </Text>
                  <Text>{selectedConsultation.disease_name}</Text>
                </Box>
                <Box>
                  <Text size="sm" c="dimmed">
                    Specialist
                  </Text>
                  <Text>{selectedConsultation.specialist}</Text>
                </Box>
              </Group>
            </Box>

            <Box>
              <Text className="text-lg font-medium mb-2">
                Consultation Information
              </Text>
              <Stack spacing="xs">
                <Box>
                  <Text size="sm" c="dimmed">
                    Date
                  </Text>
                  <Text>{selectedConsultation.consultation_date}</Text>
                </Box>
                <Box>
                  <Text size="sm" c="dimmed">
                    Message
                  </Text>
                  <Text className="bg-gray-50 p-3 rounded">
                    {selectedConsultation.message}
                  </Text>
                </Box>
              </Stack>
              <Box className="flex justify-between pt-4">
                <Button className="bg-red-500 hover:bg-red-700 transition-colors duration-200">
                  Reject
                </Button>
                <Button
                  onClick={() => handleAccept(selectedConsultation?.id)}
                  className="bg-green-400 hover:bg-primary-700 transition-colors duration-200"
                >
                  Accept
                </Button>
              </Box>
            </Box>
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default ConsultationPage;
