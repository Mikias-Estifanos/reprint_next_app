interface ButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
  }
  
  export default function Button({ text, onClick, disabled }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {text}
      </button>
    );
  }
  