import React from 'react';

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-hw-border py-8 text-center text-sm text-hw-muted">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="text-hw-accent transition-transform group-hover:scale-110 duration-300">
            {'</>'}
          </div>
          <span className="font-bold tracking-tight text-white">Hello World.</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Hello World. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-hw-text transition-colors">Twitter</a>
          <a href="#" className="hover:text-hw-text transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-hw-text transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
