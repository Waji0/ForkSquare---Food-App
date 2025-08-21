const Contact = () => {

    
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-600">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Have questions or feedback? We’d love to hear from you!
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-gray-300 p-3 rounded-lg"
          rows={5}
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
