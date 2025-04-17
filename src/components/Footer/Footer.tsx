export default function Footer() {
  return (
    <footer className="w-full flex justify-around items-center">
      <div className="flex gap-4 text-blue-950 my-5">
        <a
          href="https://github.com/shevadead"
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-transparent  hover:border-blue-950 transition-all duration-300"
        >
          shevadead
        </a>
        <a
          href="https://github.com/k0nnte"
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-transparent  hover:border-blue-950 transition-all duration-300"
        >
          k0nnte
        </a>
        <a
          href="https://github.com/vidfefe"
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-transparent  hover:border-blue-950 transition-all duration-300"
        >
          vidfefe
        </a>
      </div>
      <p className="text-blue-950">2025</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/rss-logo.svg" alt="logo_course" className="h-12 w-auto" />
      </a>
    </footer>
  );
}
