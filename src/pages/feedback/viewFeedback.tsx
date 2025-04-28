import React, { useEffect, useState } from 'react';
import { APIGetFeedbacks } from '../../api/feedback';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const response = await APIGetFeedbacks();
      setFeedbacks(response.data?.results || []); // Changed to use 'results' instead of 'feedbacks'
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading feedbacks...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <div className="text-center text-gray-500">No feedbacks available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-700">{feedback.feedback || 'No feedback message'}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">From: {feedback.sender || 'Anonymous'}</p>
                <p className="text-xs text-gray-400">
                  {new Date(feedback.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;