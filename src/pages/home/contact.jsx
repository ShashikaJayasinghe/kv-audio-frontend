// --- Contact.js (React Frontend) ---
// Contact form with Tailwind CSS and message sending to DB

import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully.");
        setStatus("Message sent successfully.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
        setStatus(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Network error. Please try again later.");
    }
  };

  return (
    <div className="font-sans bg-primary text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-white py-20 text-center">
        <h1 className="text-5xl font-bold text-accent mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Reach out with any questions or inquiries.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-secondary rounded-2xl shadow-md p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-800 transition"
            >
              Send Message
            </button>

            {status && <p className="text-sm text-accent pt-2">{status}</p>}
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Our Location</h3>
              <p>No. 123, Main Street, Homagama, Sri Lanka</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Phone</h3>
              <p>+94 77 123 4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Email</h3>
              <p>kvaudio@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Business Hours</h3>
              <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
              <p>Sat – Sun: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-6 text-center text-sm">
        © 2025 KV Audio Rentals (Shashika Jayasinghe) · All Rights Reserved
      </footer>
    </div>
  );
}
