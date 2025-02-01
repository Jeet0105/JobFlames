function About() {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-12 py-12">
        {/* About Section */}
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#254A74] text-center mb-8">About Us</h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            At Job Flames, we are committed to connecting job seekers with the best opportunities and helping companies hire top-tier talent.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Whether you&apos;re looking for your next career move or seeking skilled professionals to join your team, we provide a seamless platform to make it happen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-8">
            {/* Mission Statement */}
            <div className="bg-[#1b3453] text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-200">
                Our mission is to provide job seekers with the tools and resources they need to land their dream job, while offering companies a reliable platform to find the best candidates for their open positions.
              </p>
            </div>
  
            {/* Our Values */}
            <div className="bg-[#1b3453] text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="text-gray-200 space-y-4">
                <li>Integrity: We operate with honesty and transparency.</li>
                <li>Excellence: We strive to exceed expectations in all that we do.</li>
                <li>Innovation: We embrace creativity and new ideas to improve our services.</li>
                <li>Collaboration: We believe in teamwork and the power of community.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default About;
  