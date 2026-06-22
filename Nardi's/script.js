 
const products = [
  { id: 1, name: "Cantu", price: 850, image: "https://www.lookfantastic.ie/images?url=https://static.thcdn.com/productimg/original/12042578-1565280246489360.jpg&format=webp&auto=avif&width=985&height=985&fit=cover", desc: "Premium hair care for natural textures.", badge: "Bestseller" },
  { id: 2, name: "Mielle", price: 1200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6e6ncCoGGnWJMJfdOrh4-5PSthUucF_DFsg&s", desc: "Nourishing hair oil for healthy growth.", badge: "New" },
  { id: 3, name: "Alecrim", price: 2299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsgsWVGtLw8DdKwK2S5BVQPjk0xq-kJ8HNqw&s", desc: "Rosemary-infused hair care solution.", badge: "Luxury" },
  { id: 4, name: "The Ordinary", price: 1500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfA5ifDlUUeZUtd_Yux36BJAJ874-bRAD7sw&s", desc: "Skincare essentials for radiant skin.", badge: "Premium" },
  { id: 5, name: "9PM", price: 2500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cje9l08YF3oKBXgCyMy49_fJbJb1bZibZw&s", desc: "Luxury fragrance for the modern individual.", badge: "Limited" },
  { id: 6, name: "CeraVe Foaming Cleanser", price: 1800, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDCbzCtdcesDkfQTHgXUFVysGuvenAAKw7Q&s", desc: "Gentle foaming cleanser for all skin types.", badge: "" },
  { id: 7, name: "Dr. Rashel", price: 900, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCqD1fu1KDIB1UmFoEVjRibFEWPMo80oGwlw&s", desc: "Quality skincare products at affordable prices.", badge: "" },
  { id: 8, name: "Nivea", price: 600, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0W30JsJYEhjxNtvpLYH_039z6WExxu8aGyQ&s", desc: "Trusted skincare for everyday care.", badge: "" },
  { id: 9, name: "7Oils One", price: 950, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEhzFEcyDrpuFSiyB6IJtE6HQsBW8XEae8g&s", desc: "7-in-1 hair oil for complete nourishment.", badge: "" },
  { id: 10, name: "Victoria", price: 1100, image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/8465914/1.jpg?6852", desc: "Elegant fragrance for those who stand out.", badge: "" },
  { id: 11, name: "Colour Me", price: 2200, image: "https://m.media-amazon.com/images/I/71jVeD8kKwL._AC_SL1500_.jpg", desc: "Vibrant cosmetics for bold self-expression.", badge: "Unique" },
];

 
let cart = [];

 
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const sel = document.getElementById('fproduct');

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      <div class="product-img" style="background-image: url('${p.image}'); background-size: cover; background-position: center; font-size: 0;">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; display: none;" onerror="this.parentElement.style.display='flex'; this.parentElement.style.fontSize='5rem'; this.parentElement.textContent='${p.name.charAt(0)}'">
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-bottom">
          <div class="product-price">ETB ${p.price.toLocaleString()}</div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');

  // Populate select dropdown
  sel.innerHTML = '<option value="">— Choose a product —</option>';
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = `${p.name} — ETB ${p.price.toLocaleString()}`;
    sel.appendChild(opt);
  });
}
 
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart.push({ ...p, uid: Date.now() + Math.random() });
  updateCart();
  showToast(`${p.name} added to cart!`);
}

function removeFromCart(uid) {
  cart = cart.filter(i => i.uid !== uid);
  updateCart();
}

function updateCart() {
  const count = cart.length;
  document.getElementById('cartCount').textContent = count;
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (!count) {
    items.innerHTML = '<div class="cart-empty" style="font-size:2rem;">🛒<br><span style="font-size:1rem;display:block;margin-top:.5rem;color:var(--muted);">Your cart is empty</span></div>';
    footer.style.display = 'none';
  } else {
    items.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-emoji" style="width:50px;height:50px;background-image:url('${i.image}');background-size:cover;background-position:center;border-radius:8px;"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-price">ETB ${i.price.toLocaleString()}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i.uid})">✕</button>
      </div>
    `).join('');
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cartTotal').textContent = `ETB ${total.toLocaleString()}`;
    footer.style.display = 'block';
  }
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

function goToOrder() {
  closeCart();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  if (cart.length) {
    const sel = document.getElementById('fproduct');
    const last = cart[cart.length - 1].name;
    if ([...sel.options].some(o => o.value === last)) sel.value = last;
  }
}
 
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
 
function submitOrder() {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const product = document.getElementById('fproduct').value;
  const qty = document.getElementById('fqty').value || '1';
  const city = document.getElementById('fcity').value || 'Not specified';
  const notes = document.getElementById('fnotes').value || 'None';

  if (!name || !phone || !product) {
    alert('Please fill in your name, phone number, and select a product.');
    return;
  }

  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccess').style.display = 'block';

  const msg = `Hello Nardis! 🌟\n\nI would like to place an order:\n\n📦 Product: ${product}\n🔢 Quantity: ${qty}\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 City: ${city}\n💬 Notes: ${notes}\n\nPlease confirm my order. Thank you!`;

  setTimeout(() => {
    window.open(`https://wa.me/251930495557?text=${encodeURIComponent(msg)}`, '_blank');
  }, 600);
}
 
const tickerWords = ['✦ Premium Quality', '✦ Unique Designs', '✦ Ethiopian Craftsmanship', '✦ Luxury Redefined', '✦ Handcrafted Excellence', '✦ Fast Delivery', '✦ Authentic'];
const t = document.getElementById('tickerInner');
const doubled = [...tickerWords, ...tickerWords];
t.innerHTML = doubled.map(w => `<span>${w}</span>`).join('');
 
const features = [
  { icon: '⭐', text: 'Premium Quality' },
  { icon: '⭐', text: 'Fast Delivery' },
  { icon: '⭐', text: 'Secure Orders' },
  { icon: '⭐', text: 'Unique Designs' },
  { icon: '⭐', text: 'Gift Wrapping Available' },
  { icon: '⭐', text: 'WhatsApp Support' },
  { icon: '⭐', text: 'Ethiopia & Beyond' },
  { icon: '⭐', text: 'Custom Orders Welcome' },
];
const fi = document.getElementById('featuresInner');
fi.innerHTML = [...features, ...features].map(f =>
  `<div class="feature-item"><span class="feature-icon">${f.icon}</span>${f.text}</div>`
).join('');

 
const navItems = ['Quality', 'Premium', 'Unique Style', 'Ethiopian', 'Luxury', 'Cosmo', 'Fashion', 'Artisan', 'Elegance',   'Exclusive', 'Handcrafted', 'Gold Standard', 'Timeless'];
const bn = document.getElementById('bottomNav');
const bnd = [...navItems, ...navItems];
bn.innerHTML = bnd.map(n => `<span class="bnav-item"><span class="bnav-dot"></span>${n}</span>`).join('');
 
renderProducts();

 
(function init3D() {
  const canvas = document.getElementById('canvas3d');
  const ctx = canvas.getContext('2d');
  let W, H, tick = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

   
  const cubes = Array.from({ length: 10 }, () => ({
    x: (Math.random() - 0.5) * 1.6,
    y: (Math.random() - 0.5) * 1.2,
    z: (Math.random() - 0.5) * 1.2,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    drx: (Math.random() - 0.5) * 0.009,
    dry: (Math.random() - 0.5) * 0.013,
    drz: (Math.random() - 0.5) * 0.007,
    size: 40 + Math.random() * 70,
    alpha: 0.1 + Math.random() * 0.18,
    gold: Math.random() > 0.45,
  })); 
  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.07,
    vy: (Math.random() - 0.5) * 0.07,
    r: Math.random() * 2 + 0.5,
    a: Math.random() * 0.5 + 0.15,
  }));
 
  function project(x, y, z, fov = 300) {
    const zz = z + 4.5;
    return { x: x / zz * fov + W / 2, y: y / zz * fov + H / 2 };
  }

  function rotY(x, y, z, a) {
    return { x: x * Math.cos(a) - z * Math.sin(a), y, z: x * Math.sin(a) + z * Math.cos(a) };
  }

  function rotX(x, y, z, a) {
    return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
  }

  function rotZ(x, y, z, a) {
    return { x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), z };
  }

  function drawCube(cube) {
    const s = cube.size / 200;
    const raw = [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
    ];
    const verts = raw.map(([x, y, z]) => {
      let v = rotX(x, y, z, cube.rx);
      v = rotY(v.x, v.y, v.z, cube.ry);
      v = rotZ(v.x, v.y, v.z, cube.rz);
      return project(v.x + cube.x * 0.9, v.y + cube.y * 0.6, v.z + cube.z * 0.5);
    });
    const faces = [
      [0, 1, 2, 3], [4, 5, 6, 7],
      [0, 1, 5, 4], [2, 3, 7, 6],
      [0, 3, 7, 4], [1, 2, 6, 5]
    ];
    const color = cube.gold ?
      `rgba(201,168,76,${cube.alpha})` :
      `rgba(160,130,255,${cube.alpha * 0.65})`;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    faces.forEach(f => {
      ctx.beginPath();
      ctx.moveTo(verts[f[0]].x, verts[f[0]].y);
      f.slice(1).forEach(i => ctx.lineTo(verts[i].x, verts[i].y));
      ctx.closePath();
      ctx.stroke();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    tick += 0.005;

    // Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = 100;
      if (p.x > 100) p.x = 0;
      if (p.y < 0) p.y = 100;
      if (p.y > 100) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x / 100 * W, p.y / 100 * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.a * 0.38})`;
      ctx.fill();
    });

    // Orbital ellipses
    const cx = W / 2,
      cy = H / 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 130 + i * 90, (130 + i * 90) * 0.28, tick * 0.7 + i * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,168,76,${0.055 - i * 0.01})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Cubes
    cubes.forEach(cube => {
      cube.rx += cube.drx;
      cube.ry += cube.dry;
      cube.rz += cube.drz;
      cube.x += Math.sin(tick + cube.ry) * 0.0008;
      cube.y += Math.cos(tick + cube.rx) * 0.0008;
      drawCube(cube);
    });

    requestAnimationFrame(animate);
  }
  animate();
})();