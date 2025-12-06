function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-300 text-xs">{label}</label>
      {children}
    </div>
  );
}

export default Field;

