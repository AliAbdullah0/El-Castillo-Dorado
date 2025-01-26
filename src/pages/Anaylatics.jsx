import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/SupabaseClient';

const Discussion = () => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [topics, setTopics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  // Fetch topics and messages from Supabase
  useEffect(() => {
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching topics:', error);
        setTopics([]); // Default to an empty array
      } else {
        setTopics(data || []); // Ensure data is always an array
      }
    };

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        setMessages([]); // Default to an empty array
      } else {
        setMessages(data || []); // Ensure data is always an array
      }
    };

    fetchTopics();
    fetchMessages();
  }, []);

  // Handle input changes
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Add a new topic
  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (topic.trim()) {
      setIsLoadingTopic(true);
      const { data, error } = await supabase
        .from('topics')
        .insert([{ name: topic }]);

      setIsLoadingTopic(false);

      if (error) {
        console.error('Error adding topic:', error);
      } else {
        window.location.reload(); // Refresh the page
      }
    }
  };

  // Post a new message
  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && username.trim() && selectedTopic) {
      setIsLoadingMessage(true);
      const { data, error } = await supabase
        .from('messages')
        .insert([{ content: message, username, topic_id: selectedTopic.id }]);

      setIsLoadingMessage(false);

      if (error) {
        console.error('Error posting message:', error);
      } else {
        window.location.reload(); // Refresh the page
      }
    }
  };

  // Filter topics based on search
  const filteredTopics = topics.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-general">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-[#d3ccb7] shadow-md p-4">
        <h2 className="text-4xl font-light mb-4">
          <span>| </span>
          Topics
        </h2>
        <input
          type="text"
          value={search}
          onChange={handleInputChange(setSearch)}
          placeholder="Search topics..."
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ul className="space-y-2">
          {filteredTopics.map((t) => (
            <li
              key={t.id}
              className={`cursor-pointer p-2 rounded-lg ${
                selectedTopic?.id === t.id
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-[#bab3a1]'
              }`}
              onClick={() => setSelectedTopic(t)}
            >
              {t.name}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddTopic} className="mt-6 space-y-4">
          <input
            type="text"
            value={topic}
            onChange={handleInputChange(setTopic)}
            placeholder="New topic name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={isLoadingTopic}
            className={`w-full p-2 rounded-lg text-white flex items-center justify-center ${
              isLoadingTopic
                ? 'bg-orange-300 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoadingTopic ? (
              <span className="loader animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
            ) : (
              'Add Topic'
            )}
          </button>
        </form>
      </aside>

      {/* Discussion Section */}
      <main className="flex-1 p-6">
        <h2 className="text-4xl font-light mb-4">
          <span>| </span>
          Discussion Board
        </h2>
        {selectedTopic ? (
          <div>
            <h2 className="text-2xl text-orange-600 mb-4">
              <span>| </span>
              {selectedTopic.name}
            </h2>
            <div className="space-y-4">
              {messages
                .filter((msg) => msg.topic_id === selectedTopic.id)
                .map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-[#d3ccb7] p-4 rounded-lg shadow-md w-fit"
                  >
                    <p className="text-gray-950">{msg.content}</p>
                    <div className="text-sm text-gray-800 mt-2">
                      Posted by {msg.username} on{' '}
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
            <form onSubmit={handlePostMessage} className="mt-6 space-y-4">
              <input
                type="text"
                value={username}
                onChange={handleInputChange(setUsername)}
                placeholder="Your name"
                required
                className="w-full p-2 border rounded-lg border-gray-400 focus:outline-none md:w-[25%] focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                value={message}
                onChange={handleInputChange(setMessage)}
                minLength="3"
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg focus:outline-none border-gray-400 focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={isLoadingMessage}
                className={`w-full p-2 rounded-lg text-white flex items-center justify-center ${
                  isLoadingMessage
                    ? 'bg-orange-300 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {isLoadingMessage ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                ) : (
                  'Post Message'
                )}
              </button>
            </form>
          </div>
        ) : (
          <p>Select a topic to view or post messages.</p>
        )}
      </main>
    </div>
  );
};

export default Discussion;
