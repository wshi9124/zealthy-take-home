interface AddressFormProps {
  streetAddress: string;
  setStreetAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
}

export default function AddressForm({
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  state,
  setState,
  zip,
  setZip,
}: AddressFormProps) {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Street Address</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Zip</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
}
