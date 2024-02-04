import { emptyArray } from "@/lib/getEmptyArray";

export default function GenresFilterLoading() {
  return (
    <div className="flex flex-row justify-between animate-pulse-slow-5 px-4">
      <span className="w-12 p-2 bg-slate-600 rounded-lg"></span>
      <span className=" px-4 py-2 bg-slate-600 rounded-lg"></span>
    </div>
  );
}
