import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log(formData);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      alert('Thank you for reaching out! We will get back to you soon.');
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 py-12">
      {/* Contact Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#254A74] text-center mb-6">Contact Us</h2>
        <p className="text-lg sm:text-xl text-gray-700 text-center mb-8">
          Have a question or feedback? Feel free to reach out to us!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="text-[#254A74] font-medium">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border-2 border-[#254A74] focus:border-[#1b3453] focus:outline-none rounded-lg shadow-sm text-[#254A74] placeholder:text-[#a3b0c1] transition duration-200"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[#254A74] font-medium">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border-2 border-[#254A74] focus:border-[#1b3453] focus:outline-none rounded-lg shadow-sm text-[#254A74] placeholder:text-[#a3b0c1] transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="text-[#254A74] font-medium">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border-2 border-[#254A74] focus:border-[#1b3453] focus:outline-none rounded-lg shadow-sm text-[#254A74] placeholder:text-[#a3b0c1] transition duration-200"
                placeholder="Enter your message"
                rows="6"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1b3453] text-white p-4 rounded-lg mt-4 hover:bg-[#254A74] focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
