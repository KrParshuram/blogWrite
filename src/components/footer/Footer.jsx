import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Parshuram</h2>
          <p>Phone: <a href="tel:+917323801941" className="hover:text-white">+91 73238 01941</a></p>
          <p>
            Email:{" "}
            <a
              href="mailto:yadavparshuram991@gmail.com"
              className="hover:text-white"
            >
              yadavparshuram991@gmail.com
            </a>
          </p>
        </div>

        {/* Right section */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/krparshu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            {/* LinkedIn SVG Icon */}
            <svg
              className="w-6 h-6 fill-current"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.938v5.67H9.355V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.368-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.145.925-2.07 2.07-2.07 1.142 0 2.068.925 2.068 2.07 0 1.142-.926 2.068-2.07 2.068zm1.777 13.02H3.56V9h3.554v11.453zM22.225 0H1.771C.792 0 0 .77 0 1.726v20.548C0 23.23.792 24 1.771 24h20.451C23.21 24 24 23.23 24 22.274V1.726C24 .77 23.21 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Parshuram. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
