// app/contact/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import "./contact.scss";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Vui lòng điền vào trường này.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Vui lòng nhập địa chỉ email hợp lệ.",
      });
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Vui lòng nhập số điện thoại hợp lệ.",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus({
        submitted: true,
        success: true,
        message:
          "Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi bạn trong thời gian sớm.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Vị trí</h3>
            <p>144 Xuân Thủy, quận Cầu Giấy</p>
            <p>Hà Nội, Việt Nam</p>
          </div>

          <div className="info-card">
            <div className="icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Số điện thoại</h3>
            <p>Dịch vụ khách hàng: +843831354</p>
            <p>Đặt vé máy bay: +8487885321</p>
          </div>

          <div className="info-card">
            <div className="icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Địa chỉ Email</h3>
            <p>bookings@airline.com</p>
            <p>support@airline.com</p>
          </div>

          <div className="info-card">
            <div className="icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Giờ làm việc</h3>
            <p>Thứ Hai - Thứ Sáu: 8:00AM - 8:00PM</p>
            <p>Cuối tuần: 9:00AM - 6:00PM</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ đề</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Chọn chủ đề</option>
                <option value="booking">Đặt vé máy bay</option>
                <option value="cancellation">Hủy vé</option>
                <option value="rescheduling">Đổi lịch bay</option>
                <option value="refund">Hoàn tiền</option>
                <option value="baggage">Hành lý</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập tin nhắn của bạn ở đây..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Gửi tin nhắn
            </button>

            {submitStatus.submitted && (
              <div
                className={`status-message ${
                  submitStatus.success ? "success" : "error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
