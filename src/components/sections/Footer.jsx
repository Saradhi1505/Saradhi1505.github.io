import { profile } from '../../data/content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-faint">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-ink-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-clay transition-colors duration-200">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-clay transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-clay transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
