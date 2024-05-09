function Header() {
  return (
    <nav className="light-green darken-1">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          React Movies
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="https://github.com/anastasiiagonemad/React-movies">Repo</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
