import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (e.g., send to API)
    console.log('Form Submitted:', formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-12">
          We'd love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-left text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-left text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-left text-gray-700 mb-2">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows="5"
              required
            />
          </div>

          <button type="submit" className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUsPage;
