import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Example social media icons

function Footer() {
  return (
    <footer className="bg-[#1b3453] text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:text-teal-300 transition duration-200">Home</a></li>
              <li><a href="/about" className="hover:text-teal-300 transition duration-200">About</a></li>
              <li><a href="/contact" className="hover:text-teal-300 transition duration-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-teal-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-teal-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-teal-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-teal-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>         
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="mb-2">Email: support@jobflames.com</p>
            <p className="mb-2">Phone: +91 7572929341</p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 JobFlames. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
