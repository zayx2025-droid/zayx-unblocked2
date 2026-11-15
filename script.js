let cartCount = 0;
    const cartItemsList = [];

    const menuBtn = document.getElementById('menuBtn');
    const cartBtn = document.getElementById('cartBtn');
    const menuDrawer = document.getElementById('menuDrawer');
    const cartDrawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('closeMenu');
    const closeCart = document.getElementById('closeCart');
    const cartBadge = document.getElementById('cartCount');
    const cartCountTitle = document.getElementById('cartCountTitle');
    const toast = document.getElementById('toast');

    function openDrawer(drawer) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }

    function closeAllDrawers() {
      menuDrawer.classList.remove('active');
      cartDrawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => openDrawer(menuDrawer));
    cartBtn.addEventListener('click', () => openDrawer(cartDrawer));
    overlay.addEventListener('click', closeAllDrawers);
    closeMenu.addEventListener('click', closeAllDrawers);
    closeCart.addEventListener('click', closeAllDrawers);

    function addToCart(productName) {
      cartCount++;
      cartBadge.innerText = cartCount;
      cartCountTitle.innerText = cartCount;
      cartItemsList.push(productName);
      updateCartUI();

      toast.innerText = `Added "${productName}" to bag`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function updateCartUI() {
      const cartContainer = document.getElementById('cartItems');
      if (cartItemsList.length === 0) {
        cartContainer.innerHTML = `<p class="body-text">Your bag is currently empty.</p>`;
        return;
      }
      cartContainer.innerHTML = cartItemsList.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom: 16px; font-size: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <span>${item}</span>
          <button onclick="removeFromCart(${index})" style="color:var(--text-muted); font-size: 12px; text-decoration:underline;">Remove</button>
        </div>
      `).join('');
    }

    function removeFromCart(index) {
      cartItemsList.splice(index, 1);
      cartCount--;
      cartBadge.innerText = cartCount;
      cartCountTitle.innerText = cartCount;
      updateCartUI();
    }
