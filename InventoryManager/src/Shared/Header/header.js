class Header extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `

  <nav class="navbar navbar-expand-lg" id="headnav" tabindex="0">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <center>
          <img
            src="../../images/EmmasLogo.png"
            alt="Logo"
            width="30%"
            height="30%"
          />
        </center>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="#"
              onclick="relocateFnc(1)"
              id="home"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="relocateFnc(3)" id="Invoice"
              >Invoice</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="relocateFnc(5)" id="products"
              >Products</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="relocateFnc(6)" id="POS">POS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="relocateFnc(7)" id="suppliers"
              >Suppliers</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="relocateFnc(8)" id="customers"
              >Customers</a
            >
          </li>
        </ul>
      </div>
  
      <div class="col-sm-2 dropdown mr-5">
        <strong
          id="signinMessage"
          class="text-danger"
          role="status"
          aria-label="Not Authenticated Message"
          hidden
        ></strong>
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="hugenerd"
            width="30"
            height="30"
            class="rounded-circle"
          />
          <span class="d-none d-sm-inline mx-1" id="userName">No signed in</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#" onclick="outFnc()"> Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

          `;
	}
}

customElements.define("main-header", Header);