import Link from "next/link";

const ReportsPage = () => {
  return (
    <div className="p-6">
      <h1>User Report</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div className="p-2 rounded shadow bg-white">
          <p className="text-sm">User Report</p>
          <hr />
          <p className="text-xs mt-2">
            This report provides detailed information about the registered
            users, including their name, user ID, email, and registration date.
            It is generated based on the latest data available in the system.
          </p>
          <Link
            download={true}
            href={"/gaupalak.xlsx"}
            className="text-blue-500 mt-2 block text-sm font-semibold"
          >
            Download Report
          </Link>
        </div>
      </div>
      <hr className="my-4" />
      <h1>Cow Report</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div className="p-2 rounded shadow bg-white">
          <p className="text-sm">Cow Report</p>
          <hr />
          <p className="text-xs mt-2">
            This report provides detailed information about the registered gir
            cows, including their name, cow tag no, milk production, and
            gaupalak history. It is generated based on the latest data available
            in the system.
          </p>
          <Link
            download={true}
            href={"/cowdata.xlsx"}
            className="text-blue-500 mt-2 block text-sm font-semibold"
          >
            Download Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
