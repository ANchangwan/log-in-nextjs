import { formatToTimeAgo } from "@/lib/utils";

interface ResponseProps {
  id: number;
  comment: string;
  user: {
    username: string;
  };
  created_at: Date;
}

export default function Comments({
  id,
  comment,
  user,
  created_at,
}: ResponseProps) {
  return (
    <div key={id} className="grid grid-cols-4 bg-slate-400 p-4 rounded-md">
      <div className="flex flex-col justify-center items-center gap-2  max-w-28">
        <div className="size-10 text-2xl bg-red-500 flex justify-center items-center rounded-full">
          🧑‍💻
        </div>
        <span className="text-sm">{user.username}</span>
      </div>
      <p className="col-span-2">{comment}</p>
      <span>{formatToTimeAgo(created_at.toString())}</span>
    </div>
  );
}
