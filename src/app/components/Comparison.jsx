"use client";


export default function Comparison({data}) {
  return (
    <section className="bg-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <span className="bg-yellow-200 text-gray-800 px-4 py-1 rounded-full text-sm font-medium">
          {data.badge}
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">
          {data.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-800">{data.subtitle}</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-x-auto">
  <table className="w-full table-fixed border-collapse text-left">
    <thead>
      <tr>
        {data.tableHeaders.map((header, index) => (
          <th
            key={index}
            className={`w-1/3 px-6 py-4 font-semibold text-sm md:text-base border-b 
              ${index === 1 
                ? "bg-[#15496F] text-white" 
                : "bg-gray-100 text-gray-700"} 
            `}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.rows.map((row, index) => (
        <tr
          key={index}
          className="even:bg-gray-50 hover:bg-gray-100 transition"
        >
          <td className="w-1/3 px-6 py-4 text-gray-900">{row.feature}</td>
          <td className="w-1/3 px-6 py-4 bg-[#163E63] text-white font-medium">
            {row.mgs}
          </td>
          <td className="w-1/3 px-6 py-4 text-gray-700">{row.others}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </section>
  );
}
