import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span className="text-gray-400">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="px-4 pb-4 text-sm text-gray-600">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
