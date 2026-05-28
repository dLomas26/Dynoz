import { Sparkles } from 'lucide-react';

const footerLinks = {
  Company: ['About', 'Careers'],
  Legal: ['Disclaimer'],
  Support: ['Contact'],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="relative flex items-center justify-center w-9 h-9 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
              >
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Dynoz AI
              </span>
            </div>
            <p className="text-dark-400 text-sm">
              Where Service Meets Intelligence.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase()}`}
                      className="text-dark-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">
            © 2026 Centora Technologies Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
