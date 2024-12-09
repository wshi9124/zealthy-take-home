interface AboutMeFormProps {
  aboutMe: string;
  setAboutMe: (value: string) => void;
}

export default function AboutMeForm({ aboutMe, setAboutMe }: AboutMeFormProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">About Me</label>
      <textarea
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        rows={4}
        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
