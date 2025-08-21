import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 mt-10 w-full">
      <div className="container mx-auto text-center">

        {/* Links */}
        <div className="mb-4">
          <Link to="/about" className="mx-4 text-gray-300 hover:text-amber-500">About Us</Link>
          <Link to="/services" className="mx-4 text-gray-300 hover:text-amber-500">Services</Link>
          <Link to="/contact" className="mx-4 text-gray-300 hover:text-amber-500">Contact</Link>
          <Link to="/privacy-policy" className="mx-4 text-gray-300 hover:text-amber-500">Privacy Policy</Link>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} ForkSquare. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
