import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-slate-900 border-t border-slate-800 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LEFT */}

          <div className="text-center lg:text-left">

            <h2 className="text-2xl font-black text-white">

              ⚡ FYTCLUB

            </h2>

            <p className="text-slate-400 mt-2">

              Train • Compete • Dominate

            </p>

          </div>

          {/* CENTER */}

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-medium">

            <Link
              to="/about"
              className="hover:text-orange-400 transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="/privacy-policy"
              className="hover:text-orange-400 transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-orange-400 transition-all duration-300"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contact"
              className="hover:text-orange-400 transition-all duration-300"
            >
              Contact
            </Link>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-5 text-2xl text-white">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 hover:scale-110 transition-all duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 hover:scale-110 transition-all duration-300"
            >
              <FaXTwitter />
            </a>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">

          © 2026 FYTCLUB. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;