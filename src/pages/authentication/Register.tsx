import { useEffect, useState } from "react";
import useTokenStore, { useEmailStore } from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../services/endpoints/authService";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Box,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormValues {
  email: string;
  username: string;
  name: string;
  dob: string;
  address: string;
  mobile_no: string;
  gender: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const { email } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const { setToken } = useTokenStore();

  const form = useForm<FormValues>({
    initialValues: {
      email: email || "",
      username: "",
      name: "",
      dob: "",
      address: "",
      mobile_no: "",
      gender: "Male",
      password: "",
      confirm_password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      username: (value: string) => (value ? null : "Username is required"),
      name: (value: string) => (value ? null : "Name is required"),
      dob: (value: string) => (value ? null : "Date of birth is required"),
      address: (value: string) => (value ? null : "Address is required"),
      mobile_no: (value: string) =>
        value ? null : "Mobile number is required",
      password: (value: string) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirm_password: (value: string, values: any) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });

  useEffect(() => {
    if (email) {
      form.setFieldValue("email", email);
    }
  }, [email]);

  const handleSubmit = async (values: FormValues) => {
    const payload = {
      user_type: "Patient",
      password: values.password,
      confirm_password: values.confirm_password,
      data: {
        email: values.email,
        username: values.username,
        name: values.name,
        dob: values.dob,
        address: values.address,
        mobile_no: values.mobile_no,
        gender: values.gender,
      },
    };

    try {
      setLoading(true);
      const response = await registerApi(payload);
      if (response.results.token) {
        setToken(response.results.token);
        toast.success(response.message);
        router("/otp-verifation");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="w-full h-full py-4 flex items-center justify-center">
      <Box className="w-full max-w-xl gap-4 flex flex-col items-center justify-center h-full  border-gray-300 border p-10 rounded-xl shadow-lg">
        <Stack align="center" mb="md">
          <Title order={2}>Register</Title>
          <Text c="dimmed" size="sm">
            Sign up has never been this easy
          </Text>
        </Stack>

        <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">
          <Stack gap={"sm"}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Username"
              placeholder="Choose a username"
              {...form.getInputProps("username")}
            />

            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              {...form.getInputProps("name")}
            />

            <TextInput
              type="date"
              label="Date of Birth"
              {...form.getInputProps("dob")}
            />

            <TextInput
              label="Address"
              placeholder="Enter your address"
              {...form.getInputProps("address")}
            />

            <TextInput
              label="Mobile Number"
              placeholder="Enter your mobile number"
              {...form.getInputProps("mobile_no")}
            />

            <Select
              label="Gender"
              data={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              {...form.getInputProps("gender")}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              {...form.getInputProps("confirm_password")}
            />

            <Button type="submit" loading={loading} fullWidth>
              Register
            </Button>
          </Stack>
        </form>

        <Text size="sm" c="dimmed" mt="sm">
          Already have an account?{" "}
          <Text component="a" href="/login" fw={500} c="dark">
            Log in
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
