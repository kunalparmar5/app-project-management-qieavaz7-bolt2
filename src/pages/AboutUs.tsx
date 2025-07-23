import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-base text-gray-700">
          We are a team of passionate developers, designers, and innovators dedicated
          to building impactful digital experiences. With a shared vision of
          excellence and a user-first approach, we strive to deliver intuitive,
          scalable, and future-ready solutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-base text-gray-700">
          To empower businesses and individuals by creating high-quality software
          solutions that solve real-world problems and drive growth.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
        <ul className="list-disc pl-6 text-base text-gray-700">
          <li>Custom Web & Mobile App Development</li>
          <li>UI/UX Design & Prototyping</li>
          <li>Cloud Solutions & DevOps</li>
          <li>Data Analytics & AI Integration</li>
          <li>Technical Consulting & Support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Let's Connect</h2>
        <p className="text-base text-gray-700">
          We’d love to hear from you. Whether you have a question, idea, or a project
          in mind, feel free to reach out and start a conversation.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
