const BloodCompatibilityChart = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">Blood Compatibility Chart</h2>
        <p className="text-lg text-gray-700 mb-12">
          Understand the compatibility of different blood groups for donation and transfusion.
        </p>

        {/* Chart */}
        <div className="overflow-x-auto shadow-xl rounded-lg border-2 border-red-500">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-6 py-3 border-r border-gray-300">Donor Type</th>
                <th className="px-6 py-3">Recipient Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">O-</td>
                <td className="px-6 py-3 border-t border-gray-300 text-red-600 font-bold">Universal donor</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">O+</td>
                <td className="px-6 py-3 border-t border-gray-300">O+, A+, B+, AB+</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">A+</td>
                <td className="px-6 py-3 border-t border-gray-300">A+, AB+</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">B+</td>
                <td className="px-6 py-3 border-t border-gray-300">B+, AB+</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">AB+</td>
                <td className="px-6 py-3 border-t border-gray-300">Universal recipient</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">AB-</td>
                <td className="px-6 py-3 border-t border-gray-300">AB-, AB+</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">A-</td>
                <td className="px-6 py-3 border-t border-gray-300">A-, A+, AB-, AB+</td>
              </tr>
              <tr className="hover:bg-red-100 transition duration-300 ease-in-out">
                <td className="px-6 py-3 border-t border-r border-gray-300">B-</td>
                <td className="px-6 py-3 border-t border-gray-300">B-, B+, AB-, AB+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <p className="text-gray-600 text-lg italic">
            * Please consult with your doctor or blood bank for detailed compatibility information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BloodCompatibilityChart;
