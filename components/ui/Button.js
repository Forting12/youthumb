const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "bg-transparent text-blue-600 hover:underline",
};

export default function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Tag = as;
  return (
    <Tag
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
