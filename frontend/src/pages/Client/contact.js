import React, { useState } from "react";
import { FaMap, FaPhone, FaEnvelope } from "react-icons/fa6";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(""); // Trạng thái gửi form

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(""); // Reset trạng thái

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Giả lập gửi API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Thay bằng API thực tế

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setSubmissionStatus("success"); // Thành công
    } catch (error) {
      setSubmissionStatus("error"); // Thất bại
    }

    setIsSubmitting(false);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-5 me-auto">
            <h1>Contact Us</h1>
            <p className="mb-5 text-muted">
            If you have any questions, feedback, or inquiries, feel free to reach out to us using the form beside.
            We're here to help and will respond as soon as possible!
            </p>
            <ul className="list-unstyled pl-md-5 mb-5">
              <li className="d-flex text-black mb-3">
                <span className="me-3">
                  <FaMap />
                </span>
                <span>
                  University Of Science
                  <br />
                  Ho Chi Minh City National University
                </span>
              </li>
              <li className="d-flex text-black mb-3">
                <span className="me-3">
                    <FaPhone />
                </span>
                <span>(+64) 636363636</span>
              </li>
              <li className="d-flex text-black">
                <span className="me-3">
                    <FaEnvelope />
                </span>
                <span> contact@sickalinz.com </span>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label className="col-form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name ? "error" : ""}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                  {errors.name && <label className="text-danger">{errors.name}</label>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label className="col-form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? "error" : ""}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                  {errors.email && <label className="text-danger">{errors.email}</label>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label className="col-form-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    className={`form-control ${errors.message ? "error" : ""}`}
                    value={formData.message}
                    onChange={handleInputChange}
                    aria-required="true"
                  ></textarea>
                  {errors.message && <label className="text-danger">{errors.message}</label>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="submit"
                    value={isSubmitting ? "Submitting..." : "Send Message"}
                    className="btn1"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </form>
            {submissionStatus === "success" && (
              <div className="alert alert-success mt-3">Your message was sent successfully!</div>
            )}
            {submissionStatus === "error" && (
              <div className="alert alert-danger mt-3">Failed to send your message. Please try again.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
