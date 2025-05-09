const DonationHistory = ({ donations = [] }) => {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-red-600 mb-6">Your Donation History</h2>
          <p className="text-lg text-gray-700 mb-12">
            Thank you for your selfless contribution! Below are the records of your previous donations.
          </p>
  
          {/* Donation History Table */}
          <div className="overflow-x-auto shadow-xl rounded-lg border-2 border-red-500">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-300">Date</th>
                  <th className="px-6 py-3 border-r border-gray-300">Donation Type</th>
                  <th className="px-6 py-3 border-r border-gray-300">Location</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={index} className="hover:bg-red-100 transition duration-300 ease-in-out">
                    <td className="px-6 py-3 border-t border-r border-gray-300">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 border-t border-r border-gray-300">{donation.type}</td>
                    <td className="px-6 py-3 border-t border-r border-gray-300">{donation.location}</td>
                    <td className="px-6 py-3 border-t border-gray-300">
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded-full ${
                          donation.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : donation.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* No Donations Message */}
          {donations.length === 0 && (
            <p className="mt-8 text-gray-600 text-lg italic">
              You haven't made any donations yet. Start contributing today!
            </p>
          )}
        </div>
      </section>
    );
  };
  
  export default DonationHistory;
  