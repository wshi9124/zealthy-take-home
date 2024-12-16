import React from "react";
import AboutMeForm from "./about-me-form";
import AddressForm from "./address-form";
import BirthdayForm from "./birthday-form";

interface RenderFormFieldsProps {
  components: string[];
  aboutMe: string;
  setAboutMe: (value: string) => void;
  aboutMeComplete: boolean;
  streetAddress: string;
  setStreetAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
  addressComplete: boolean;
  birthdate: string;
  setBirthdate: (value: string) => void;
  birthdateComplete: boolean;
}

export default function RenderFormFields({
  components,
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
}: RenderFormFieldsProps) {
  return (
    <>
      {components.includes("about_me") && !aboutMeComplete && (
        <AboutMeForm aboutMe={aboutMe} setAboutMe={setAboutMe} />
      )}
      {components.includes("address") && !addressComplete && (
        <AddressForm
          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zip={zip}
          setZip={setZip}
        />
      )}
      {components.includes("birthdate") && !birthdateComplete && (
        <BirthdayForm birthdate={birthdate} setBirthdate={setBirthdate} />
      )}
    </>
  );
}
