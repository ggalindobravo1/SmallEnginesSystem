class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

      <nav class="navbar navbar-expand-lg" id="headnav" tabindex="0">
      <div class="container-fluid" >
        <a class="navbar-brand" href="#">Small Engines</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
       

        <div class="col-sm-2 dropdown  mr-5">
          <strong id="signinMessage" class="text-danger" role="status" aria-label="Not Authenticated Message" hidden></strong>
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                    <span class="d-none d-sm-inline mx-1" id="userName">No signed in</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#"
                    onclick="outFnc()">
                    Sign out</a></li>
                </ul>
            </div>

      </div>
    </nav>


          `
    }
  }

  customElements.define('main-header', Header);
