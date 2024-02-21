import toast from "react-hot-toast";
import axios from "axios";

import React, { useState } from "react";

import "./contact.css";
import useLoading from "../../hook/useLoading";

function SimpleForm() {
  const { setLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    await axios
      .post("user/contact-us", formData)
      .then((res) => {
        toast.success("Your message has been sent successfully");
        setFormData({ name: "", email: "", message: "" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <div className="container">
        <div className="from-parent">
          <div className="simple-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="p-2"
                  placeholder="message"
                />
              </div>
              <div className="form-btn">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SimpleForm;
