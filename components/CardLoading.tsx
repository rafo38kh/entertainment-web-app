import { emptyArray } from "@/lib/getEmptyArray";

export default function () {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 p-4">
      {emptyArray(20).map((card) => (
        <li className="flex flex-col gap-2">
          <div className="flex items-center justify-center w-full h-56 animate-pulse-slow-3 bg-gray-300  dark:bg-gray-700 rounded-lg">
            <svg
              className="w-1/2 h-full text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="flex flex-col animate-pulse-slow-5 gap-2">
            <div className="flex flex-row gap-2">
              <span className="w-1/3 bg-slate-600 rounded-lg p-2"></span>
              <span className="w-1/6 bg-slate-600 rounded-lg p-2"></span>
            </div>
            <span className="w-full bg-slate-600 rounded-lg p-2"></span>
          </div>
        </li>
      ))}
    </ul>
  );
}
