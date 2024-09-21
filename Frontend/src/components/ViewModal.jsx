import React from "react";

const ViewModal = ({ onClose, viewPost }) => {
  return (
    <div className=" ">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-20  ">
        <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg ">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-lg font-bold text-center">Post Details</h1>
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr className="mb-2 mt-2" />

          {/* Display post details */}
          <div className="py-5 max-h-60 overflow-y-scroll">
            <h3 className="text-xl font-bold">{viewPost.title}</h3>
            <p className="text-gray-700 mt-2">{viewPost.description}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white py-2 w-full rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
