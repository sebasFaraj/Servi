import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const ServiGuy = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI response - Replace with actual API call
    setTimeout(() => {
      setResponse(
        "Based on your request, I recommend booking a handyman with expertise in home repairs. " +
        "They can help you with the task efficiently and safely. Would you like me to help you book a handyman now?"
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <MessageSquare className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">ServiGUY Assistant</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-lg font-semibold block mb-3">
              What kind of help do you need?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your task or problem..."
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-teal-500 h-32
                       bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700
                     transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50
                     disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Get Assistance
              </>
            )}
          </button>
        </form>

        {response && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">ServiGUY's Recommendation:</h3>
            <p className="text-gray-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiGuy;