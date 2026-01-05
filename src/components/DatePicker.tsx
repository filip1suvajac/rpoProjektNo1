import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";


type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export default function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* fake input */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full text-left
          bg-[#0F212E] border border-slate-600
          rounded-md p-3 text-white
          hover:border-teal-500
        "
      >
        {value ? format(value, "dd.MM.yyyy") : "Izberi datum"}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 rounded-lg bg-[#0F212E] border border-slate-700 p-3">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            className="text-white"
          />
        </div>
      )}
    </div>
  );
}
