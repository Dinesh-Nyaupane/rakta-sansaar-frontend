import React from 'react';

const RequestCard = ({ request }) => {
//   const {
//     requesterName,
//     bloodType,
//     location,
//     distance,
//     timeAgo,
//     contactNumber
//   } = request;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-3 w-full max-w-md mx-auto hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{"requesterName"}</h2>
          <p className="text-red-600 font-bold text-xl">{"bloodType"}</p>
          <p className="text-gray-600">{"location"}</p>
          {"distance" && (
            <p className="text-gray-400 text-sm">{"distance"} km away</p>
          )}
        </div>
        <div className="text-sm text-gray-500">{"timeAgo"}</div>
      </div>

      <div className="mt-4">
        <a
          href={`tel:${"contactNumber"}`}
          className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Respond
        </a>
      </div>
    </div>
  );
};

export default RequestCard;
