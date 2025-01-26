import React, { useState } from 'react';
import { supabase } from '../../supabase/SupabaseClient';

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Insert form data into Supabase
    const { name, email, message } = formData;
    const { data, error } = await supabase
      .from('contact')
      .insert([
        {
          username: name,
          email: email,
          content: message,
          created_at: new Date(),
        },
      ]);

    if (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    } else {
      console.log('Form submitted:', data);
      alert('Thank you for your feedback!');
      setFormData({ name: '', email: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="about-container p-6 bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* About Section */}
      <div className="about-content flex-1 p-6">
        <h1 className="text-4xl font-semibold mb-6 text-center md:text-left">About Me</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600">Why I Created This Platform</h2>
          <p className="text-lg mt-4">
            Hello, I’m Ali! As a passionate food enthusiast, I created this platform to connect with other people who share the same love for food. My goal is to create a community where we can share ideas, recipes, and experiences related to food. This platform allows food lovers to come together, exchange knowledge, and inspire each other.
          </p>
          <p className="mt-4">
            Whether you're a professional chef, a home cook, or simply someone who enjoys exploring different cuisines, this platform is designed to bring us all together. I hope you find it enjoyable and useful, and I look forward to seeing the vibrant discussions and sharing that take place here.
          </p>
        </section>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form flex-1 p-6 bg-general">
        <h2 className="text-2xl font-semibold text-orange-600">Contact Me</h2>
        <p className="text-lg mt-4">
          Have any questions, suggestions, or feedback? I’d love to hear from you! Please fill out the form below, and I’ll get back to you as soon as I can.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
              </svg>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
