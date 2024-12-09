interface BirthdayFormProps {
  birthdate: string;
  setBirthdate: (value: string) => void;
}

export default function BirthdayForm({
  birthdate,
  setBirthdate,
}: BirthdayFormProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Birthdate</label>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
