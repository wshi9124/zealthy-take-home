interface PageConfig {
  page: number;
  components: string[];
  created_at: string;
  id: number;
  updated_at: string;
}

interface StepIndicatorWizardProps {
  pageNumber: number;
  pageConfigs: PageConfig[];
}

export default function StepIndicatorWizard({
  pageNumber,
  pageConfigs,
}: StepIndicatorWizardProps) {
  return (
    <div className="mb-4">
      <ul className="flex space-x-4">
        {pageConfigs.map((config) => (
          <li
            key={config.id}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
              config.page < pageNumber
                ? "bg-green-500 text-white"
                : config.page === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {config.page < pageNumber ? "✓" : config.page}
          </li>
        ))}
      </ul>
    </div>
  );
}
