class SideMenu extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

      <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white" id="sidenav">
      <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none" onclick="relocateFnc(1)">
        <div class="fs-5 d-none d-sm-inline"><i class="fa fa-home fa-4x"></i></div>
      </a>
      <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            
            <li>
                <a href="#submenu2"  class="nav-link px-0 align-middle" onclick="relocateFnc(2)" id="inventory">
                <i class="fa fa-th-large"></i> <span class="ms-1 d-none d-sm-inline">Inventory</span></a>
             </li>
          <li>
              <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
              <i class="fa fa-tags"></i> <span class="ms-1 d-none d-sm-inline">Oders</span> </a>
              <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  <li class="w-100">
                      <a href="#" class="nav-link px-0" onclick="relocateFnc(3)" id="orders"> <span class="d-sm-inline">Purchase Order</span> </a>
                  </li>
                  <li>   
                    <a href="#" class="nav-link px-0" onclick="relocateFnc(4)" id="salesords"> <span class="d-none d-sm-inline">Sales Order</span> </a>
                  </li>
              </ul>
          </li>
          <li>
              <a href="#" class="nav-link px-0 align-middle" onclick="relocateFnc(5)" id="products">
                  <i class="fa fa-tasks"></i> <span class="ms-1 d-none d-sm-inline">Products</span></a>
          </li>
          <li>
                <a href="#submenu2"  class="nav-link px-0 align-middle" onclick="relocateFnc(6)" id="POS">
                <i class="fa fa-usd"></i> <span class="ms-1 d-none d-sm-inline">POS</span></a>
            </li>
          
          <li>
              <a href="#submenu3"  class="nav-link px-0 align-middle" onclick="relocateFnc(7)" id="suppliers">
                  <i class="fa fa-link"></i> <span class="ms-1 d-none d-sm-inline">Suppliers</span> </a>
                
          </li>
          <li>
              <a href="#" class="nav-link px-0 align-middle" onclick="relocateFnc(8)" id="persons">
                  <i class="fa fa-group"></i> <span class="ms-1 d-none d-sm-inline">Persons</span> </a>
          </li>
          <li>
              <a href="#" class="nav-link px-0 align-middle" onclick="relocateFnc(9)" id="Customers">
          <i class="fa fa-group"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
          </li>
      </ul>
      <hr>
      <div class="dropdown pb-4">
          <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
              <span class="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li>
                  <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" id="signOutHead">Sign out</a></li>
          </ul>
      </div>
  </div>
 
`}
}

customElements.define('main-side', SideMenu);