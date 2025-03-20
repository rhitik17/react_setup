import { useEffect, useState } from "react";
import useTokenStore, { useEmailStore } from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../services/endpoints/authService";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/common/PasswordInput";
import RedButton from "../../components/common/RedButton";

const Register = () => {
  const { email } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    affiliateName: "",
    fullName: "",
    contactPerson: "",
    phone: "",
    password: "",
  });
  const router = useNavigate();
  const { setToken } = useTokenStore();

  useEffect(() => {
    if (email) {
      setFormData((prevData) => ({
        ...prevData,
        input: email || "",
      }));
    }
  }, [email]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const validateForm = () => {
    const { affiliateName, contactPerson, phone, password } = formData;
    let errors: any = {};
    // Validate Permanent Address
    if (!affiliateName) errors.email = "affiliateName is required.";
    if (!contactPerson) errors.password = "contactPerson is required.";
    if (!phone) errors.password = "phone is required.";
    if (!password) errors.password = "Password is required.";

    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      const response = await registerApi(formData);
      if (response.results.token) {
        setToken(response.results.token);
        toast.success(response.message);
        router("/otp-verifation");
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center  justify-center   ">
      <div className="w-full max-w-xl gap-4 flex flex-col  items-center justify-center h-full max-h-[80vh] border-gray-300 border p-10 ">
        {/* Header Section */}
        {/* <div className="flex flex-row gap-4  ">
          <div>
            <img
              src="/logo.svg"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl  font-bold text-zinc-900">
              Nepal Trade Union Congress
            </h1>
            <p className="text-base text-zinc-900">
              नेपाल ट्रेड युनियन काँग्रेस
            </p>
          </div>
        </div> */}

        {/* Welcome Section */}
        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <h2 className="text-3xl font-semibold text-zinc-900">Register</h2>
          <p className="text-base text-gray-600">
            sign up has never been this easy
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4  bg-white  "
        >
          <FormInput
            label="Affiliate Name"
            name="affiliateName"
            type="text"
            placeholder=""
            value={formData.affiliateName}
            onChange={handleInputChange}
            InputClassName="h-11"
            required={true}
            error={errors?.AffiliateName}
          />
          <FormInput
            label="Full name"
            name="fullName"
            type="text"
            placeholder=""
            value={formData.fullName}
            onChange={handleInputChange}
            InputClassName="h-11"
            required={true}
            error={errors?.fullName}
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="text"
            placeholder=""
            value={formData.phone}
            onChange={handleInputChange}
            InputClassName="h-11"
            required={true}
            error={errors?.phone}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="*******"
            onChange={handleInputChange}
            InputClassName="h-11"
            required={true}
            error={errors?.password}
          />

          {/* Sign In Button */}
          <RedButton
            text="Get started"
            className="h-11 w-full flex items-center text-center justify-center"
            disable={loading}
            loading={loading}
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className=" text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-gray-800 font-semibold">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
