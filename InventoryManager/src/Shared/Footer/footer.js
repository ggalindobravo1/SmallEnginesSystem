class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <footer class="bg-dark text-center text-white">    
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2020 Copyright:
        <a class="text-white" href="#">Latin Code Systems</a>
      </div>
      <!-- Copyright -->
    </footer>

      `
    }
  }

  customElements.define('main-footer', Footer);