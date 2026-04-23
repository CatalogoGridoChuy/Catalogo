const catalogo = document.getElementById("catalogo");
const contadorCarrito = document.querySelector(".cart span");

let carrito = [];

/* =========================
   PRODUCTOS COMPLETOS
========================= */

const secciones = [
  {
    nombre: "Tentación",
    productos: [
      {
        id: 1,
        categoria: "Tentación",
        nombre: "Tentación",
        img: "../img/catalogo/tentacion.png",
        descripcion: "Pote individual artesanal con múltiples sabores",
        precio: 290,
        sabores: [
          "Chocolate","Chocolate con almendras","Crema americana",
          "Mascarpone con frutos rojos","Vainilla","Dulce de leche granizado",
          "Dulce de leche","Frutilla","Granizado","Limón",
          "Crema cookie","Menta granizada","Tiddy galletitas"
        ]
      }
    ]
  },

  {
    nombre: "Tortas Heladas",
    productos: [
      {
        id: 2,
        categoria: "Tortas",
        nombre: "Cookies & Cream",
        img: "../img/catalogo/tortacookiecream.png",
        descripcion: "Crema americana con dulce de leche y galletas",
        precio: 580
      },
      {
        id: 3,
        categoria: "Tortas",
        nombre: "Torta Helada",
        img: "../img/catalogo/tortahelada.png",
        descripcion: "Chocolate + crema + dulce de leche + salsa",
        precio: 580
      },
      {
        id: 4,
        categoria: "Tortas",
        nombre: "Cookies Mousse",
        img: "../img/catalogo/tortacookiemousse.png",
        descripcion: "Mousse de crema americana con galletitas",
        precio: 580
      }
    ]
  },

  {
    nombre: "Bombones",
    productos: [
      {
        id: 5,
        categoria: "Bombones",
        nombre: "Bombón Crocante",
        img: "../img/catalogo/bomboncrocante.png",
        descripcion: "Chocolate con cereal crocante",
        precio: 65
      },
      {
        id: 6,
        categoria: "Bombones",
        nombre: "Bombón Escocés",
        img: "../img/catalogo/bombonescoces.png",
        descripcion: "Chocolate + dulce de leche + maní",
        precio: 75
      },
      {
        id: 7,
        categoria: "Bombones",
        nombre: "Vainilla Split",
        img: "../img/catalogo/bombonvainillasplit.png",
        descripcion: "Vainilla bañada en chocolate",
        precio: 65
      },
      {
        id: 8,
        categoria: "Bombones",
        nombre: "Bombón Suizo",
        img: "../img/catalogo/bombonsuizo.png",
        descripcion: "Dulce de leche y crema con cobertura",
        precio: 70
      },
      {
        id: 9,
        categoria: "Bombones",
        nombre: "Alfajor Cookies & Cream",
        img: "../img/catalogo/alfajorcookiesandcream.png",
        descripcion: "Helado entre galletas y chocolate",
        precio: 85
      }
    ]
  },

  {
    nombre: "Postres",
    productos: [
      {
        id: 10,
        categoria: "Postres",
        nombre: "Casatta",
        img: "../img/catalogo/postecasatta.png",
        descripcion: "Frutilla, chocolate y crema americana",
        precio: 65
      },
      {
        id: 11,
        categoria: "Postres",
        nombre: "Almendrado",
        img: "../img/catalogo/postrealmendrado.png",
        descripcion: "Crema americana con maní crocante",
        precio: 65
      },
      {
        id: 12,
        categoria: "Postres",
        nombre: "Postre Crocantino",
        img: "../img/catalogo/postrecrocantino.png",
        descripcion: "Chocolate + dulce de leche + crocante",
        precio: 380
      },
      {
        id: 13,
        categoria: "Postres",
        nombre: "Postre Delicia",
        img: "../img/catalogo/postredelicia.png",
        descripcion: "Chocolate, maní y dulce de leche",
        precio: 380
      }
    ]
  },

  {
    nombre: "Palitos",
    productos: [
      {
        id: 14,
        categoria: "Palitos",
        nombre: "Palito Bombón",
        img: "../img/catalogo/palitobombon.png",
        descripcion: "Baño de chocolate",
        precio: 30
      },
      {
        id: 15,
        categoria: "Palitos",
        nombre: "Palito Frutal",
        img: "../img/catalogo/palitofrutal.png",
        descripcion: "Frutilla / limón / naranja",
        precio: 20
      },
      {
        id: 16,
        categoria: "Palitos",
        nombre: "Palito de Crema",
        img: "../img/catalogo/palitodecrema.png",
        descripcion: "Crema americana o frutilla",
        precio: 25
      }
    ]
  },

  {
    nombre: "Familiares",
    productos: [
      {
        id: 17,
        categoria: "Familiares",
        nombre: "Helado Familiar 3L",
        img: "../img/catalogo/familiar.png",
        descripcion: "3 litros combinados a elección",
        precio: 550
      }
    ]
  }
];

/* =========================
   FLAT
========================= */

const productos = secciones.flatMap(sec =>
  sec.productos.map(p => ({ ...p, seccion: sec.nombre }))
);

/* =========================
   RENDER
========================= */

function renderCatalogo(lista = productos){
  catalogo.innerHTML = lista.map(p => `
    <div class="card-producto">

      <img src="${p.img}">

      <div class="card-body">

        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>

        <span class="precio">$${p.precio}</span>

        <button onclick="agregarCarrito(${p.id})">
          Agregar al carrito
        </button>

      </div>

    </div>
  `).join("");
}

/* =========================
   BUSCAR
========================= */

function buscarProducto(id){
  return productos.find(p => p.id === id);
}

/* =========================
   AGREGAR (CON SABORES 🔥)
========================= */

function agregarCarrito(id){
  const p = buscarProducto(id);

  // 🔥 SI TIENE SABORES (solo Tentación)
  if(p.sabores){

    let opciones = p.sabores.map(s => 
      `<option value="${s}">${s}</option>`
    ).join("");

    Swal.fire({
      title: "Elegí un sabor",
      html: `
        <select id="saborSelect" style="width:100%; padding:10px; border-radius:8px;">
          ${opciones}
        </select>
      `,
      confirmButtonText: "Agregar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return document.getElementById("saborSelect").value;
      }
    }).then(result => {

      if(result.isConfirmed){
        agregarConSabor(p, result.value); // 🔥 usamos nueva función
      }

    });

    return;
  }

  // 🔥 productos normales
  agregarConSabor(p);
}
/* =========================
   AGREGAR CON SABOR 🔥
========================= */

function agregarConSabor(p, sabor = null){

  const existe = carrito.find(x => 
    x.id === p.id && x.sabor === sabor
  );

  if(existe){
    existe.qty++;
  } else {
    carrito.push({
      ...p,
      sabor, // 🔥 guardamos el sabor
      qty:1
    });
  }

  updateCart();

  Swal.fire({
    icon: "success",
    title: "Agregado",
    text: sabor ? `${p.nombre} (${sabor})` : p.nombre,
    timer: 1200,
    showConfirmButton: false
  });
}
/* =========================
   CARRITO UI
========================= */

const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

function toggleCart(){
  cartPanel.classList.toggle("open");
  overlay.classList.toggle("show");
  document.body.style.overflow = cartPanel.classList.contains("open") ? "hidden" : "auto";
}

document.querySelector(".cart").addEventListener("click", toggleCart);
overlay.addEventListener("click", toggleCart);

/* =========================
   UPDATE CART
========================= */

function updateCart(){

  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if(carrito.length === 0){
    container.innerHTML = `<div class="empty-cart">🛒 El carrito está vacío</div>`;
    totalEl.innerText = 0;
    contadorCarrito.innerText = 0;
    return;
  }

  let total = 0;

  container.innerHTML = carrito.map(p => {

    total += p.precio * p.qty;

    return `
      <div class="cart-item">

        <img src="${p.img}">

        <div class="cart-info">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>

          <div class="qty">
            <button onclick="changeQty(${p.id},-1)">-</button>
            <span>${p.qty}</span>
            <button onclick="changeQty(${p.id},1)">+</button>
          </div>
        </div>

        <button class="remove" onclick="removeItem(${p.id})">✕</button>

      </div>
    `;
  }).join("");

  totalEl.innerText = total;
  contadorCarrito.innerText = carrito.reduce((a,b)=>a+b.qty,0);
}

/* =========================
   CONTROL
========================= */

function changeQty(id, amount){
  const item = carrito.find(p => p.id === id);

  item.qty += amount;

  if(item.qty <= 0){
    carrito = carrito.filter(p => p.id !== id);
  }

  updateCart();
}

function removeItem(id){
  carrito = carrito.filter(p => p.id !== id);
  updateCart();
}

/* =========================
   WHATSAPP
========================= */

function checkoutWhatsApp(){

  let msg = "Hola! pedido:%0A%0A";

  carrito.forEach(p => {
    msg += `🍦 ${p.nombre} x${p.qty}%0A`;
  });

  const total = carrito.reduce((a,b)=>a + b.precio * b.qty, 0);

  msg += `%0ATotal: $${total}`;

  window.open(`https://wa.me/598XXXXXXXX?text=${msg}`, "_blank");
}

/* INIT */
renderCatalogo();
updateCart();

/* =========================
   FILTROS (ARREGLADO)
========================= */

const botonesFiltro = document.querySelectorAll(".cat");

botonesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {

    // activar botón
    botonesFiltro.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const categoria = btn.innerText.trim();

    if(categoria === "Todos"){
      renderCatalogo(productos);
      return;
    }

    const filtrados = productos.filter(p => {
      return p.categoria.toLowerCase() === categoria.toLowerCase();
    });

    renderCatalogo(filtrados);
  });
});