export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5 overflow-hidden">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="*:rounded-md flex gap-5 bg-neutral-300 opacity-70 shadow-lg"
        >
          <div className="size-28 bg-neutral-700 rounded-full" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}
