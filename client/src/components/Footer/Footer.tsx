import { Link } from "@carbon/react";
function Footer() {
  return (
    <footer className="app-footer">
      <p>
        <Link size="lg" href="https://github.com/codevivi">
          Project
        </Link>
        <span> Made by </span>
        <Link size="lg" href="https://github.com/codevivi">
          Vilma
        </Link>
      </p>
      <p>This application was created following IBM internship task for applicants.</p>
    </footer>
  );
}
export default Footer;
