export default function ScrollGridLoading() {
  const emptyArray = Array.from({ length: 20 }, () => Math.random());

  return (
    <div className=" my-4">
      <ul className="flex gap-4 overflow-x-scroll no-scrollbar mt-4 animate-pulse-slow-3">
        {emptyArray.map(() => (
          <li className="flex items-center justify-center w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700">
            <div className="flex flex-col justify-center items-center bg-no-repeat bg-cover relative rounded-lg overflow-hidden h-36 w-72">
              <svg
                className="w-1/3 h-full text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
