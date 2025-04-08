import './Footer.scss';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper_link">
        <a href="https://github.com/shevadead" target="_blank" rel="noreferrer">
          shevadead
        </a>
        <a href="https://github.com/k0nnte" target="_blank" rel="noreferrer">
          k0nnte
        </a>
        <a href=" https://github.com/binkki" target="_blank">
          binkki
        </a>
      </div>
      <p>2025</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/rss-logo.svg" alt="logo_course" className="logo" />
      </a>
    </footer>
  );
}
