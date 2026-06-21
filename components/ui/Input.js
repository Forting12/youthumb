export default function Input({ error, className = "", ...props }) {
  return (
    <div className="w-full">
      <input
        className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-left text-xs text-red-500">{error}</p>}
    </div>
  );
}
