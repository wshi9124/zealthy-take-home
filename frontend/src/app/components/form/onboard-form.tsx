import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";
import RenderFormFields from "./render-form-fields";
import StepIndicatorWizard from "./step-indicator-wizard";

interface PageConfig {
  page: number;
  components: string[];
  created_at: string;
  id: number;
  updated_at: string;
}

interface User {
  currentUserId: number | undefined;
  about_me: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  birthdate: string | null;
}

export default function OnboardForm() {
  const { currentUser, setCurrentUser } = useUser();
  const router = useRouter();
  const [pageConfigs, setPageConfigs] = useState<PageConfig[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [aboutMe, setAboutMe] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [aboutMeComplete, setAboutMeComplete] = useState<boolean>(false);
  const [addressComplete, setAddressComplete] = useState<boolean>(false);
  const [birthdateComplete, setBirthdateComplete] = useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const renderFormFieldsProps = {
    components:
      pageConfigs.find((config) => config.page === pageNumber)?.components ||
      [],
    aboutMe,
    setAboutMe,
    aboutMeComplete,
    streetAddress,
    setStreetAddress,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    addressComplete,
    birthdate,
    setBirthdate,
    birthdateComplete,
  };

  useEffect(() => {
    const fetchPageConfigs = async () => {
      try {
        const response = await fetch("/api/page_config/page-config");
        if (!response.ok) {
          throw new Error(
            `Error fetching page configs: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPageConfigs(data);
        console.log(data);
      } catch (error: any) {
        // setError(error.message);
        console.log("Error fetching page configs:", error);
      }
    };

    fetchPageConfigs();
  }, []);

  // checking if any sections are complete already
  useEffect(() => {
    if (currentUser) {
      const aboutMeValue = currentUser.about_me || "";
      const streetAddressValue = currentUser.street_address || "";
      const cityValue = currentUser.city || "";
      const stateValue = currentUser.state || "";
      const zipValue = currentUser.zip || "";
      const birthdateValue = currentUser.birthdate || "";

      setAboutMe(aboutMeValue);
      setStreetAddress(streetAddressValue);
      setCity(cityValue);
      setState(stateValue);
      setZip(zipValue);
      setBirthdate(birthdateValue);

      setAboutMeComplete(aboutMeValue.trim() !== "");
      setAddressComplete(
        streetAddressValue.trim() !== "" &&
          cityValue.trim() !== "" &&
          stateValue.trim() !== "" &&
          zipValue.trim() !== ""
      );
      setBirthdateComplete(birthdateValue.trim() !== "");
    }
  }, [currentUser]);

  // Update isSaveButtonDisabled based on form completion
  useEffect(() => {
    const currentPageConfig = pageConfigs.find(
      (config) => config.page === pageNumber
    );
    if (!currentPageConfig) return;

    const { components } = currentPageConfig;

    // Check if all fields in the current page are completed
    const isAboutMeComplete = components.includes("about_me")
      ? aboutMe.trim() !== ""
      : true;
    const isAddressComplete = components.includes("address")
      ? streetAddress.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zip.trim() !== ""
      : true;
    const isBirthdateComplete = components.includes("birthdate")
      ? birthdate.trim() !== ""
      : true;

    const isFormComplete =
      isAboutMeComplete && isAddressComplete && isBirthdateComplete;

    setIsSaveButtonDisabled(!isFormComplete);
  }, [
    aboutMe,
    streetAddress,
    city,
    state,
    zip,
    birthdate,
    pageConfigs,
    pageNumber,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Check if the button is disabled (meaning the form is incomplete)
    if (isSaveButtonDisabled) {
      setErrorMessage(
        "You need to complete all parts of the form before continuing."
      );
      return;
    }

    const updatedUserData: User = {
      currentUserId: currentUser?.id,
      about_me: aboutMe,
      street_address: streetAddress,
      city: city,
      state: state,
      zip: zip,
      birthdate: birthdate,
    };

    try {
      const response = await fetch("/api/user/user-update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setCurrentUser(updatedUser);
        setPageNumber(pageNumber + 1);
        setErrorMessage(null);
        console.log("User updated:", updatedUser);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Something went wrong.");
        console.log("Error updating user:", errorData);
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
      console.log("Error submitting form:", error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  useEffect(() => {
    const currentPageConfig = pageConfigs.find(
      (config) => config.page === pageNumber
    );

    if (currentPageConfig) {
      const { components } = currentPageConfig;

      // Check if all components in the current page are marked as complete
      const allComponentsComplete = components.every((component) => {
        switch (component) {
          case "about_me":
            return aboutMeComplete;
          case "address":
            return addressComplete;
          case "birthdate":
            return birthdateComplete;
          default:
            return true; // If it's an unknown component, assume it's complete
        }
      });

      // Increment pageNumber if all components on the current page are complete
      if (allComponentsComplete) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
  }, [
    pageConfigs,
    pageNumber,
    aboutMeComplete,
    addressComplete,
    birthdateComplete,
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-gray-800 pb-6">
        Onboard Form Page {pageNumber}
      </h1>
      <StepIndicatorWizard pageNumber={pageNumber} pageConfigs={pageConfigs} />
      {errorMessage && <p className="text-red-500 pb-5">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <RenderFormFields {...renderFormFieldsProps} />
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Save and Continue
          </button>
        </div>
      </form>
      <button
        className="mt-4 w-40 py-2 px-4 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleLogout}
      >
        Back to login
      </button>
    </div>
  );
}
