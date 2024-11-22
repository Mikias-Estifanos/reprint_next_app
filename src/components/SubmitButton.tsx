interface SubmitButtonProps {
    loading: boolean;
    text: string;
  }
  
  export default function SubmitButton({ loading, text }: SubmitButtonProps) {
    return (
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Submitting...' : text}
      </button>
    );
  }
  