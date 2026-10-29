const menu=[
{id:'chai',name:'Classic Cutting Chai',cat:'Chai',price:10,emoji:'☕',tag:'EVERYDAY FAVOURITE',desc:'Strong, milky chai for that familiar first sip.'},
{id:'masala',name:'Masala Chai',cat:'Chai',price:15,emoji:'🫖',tag:'HOUSE FAVOURITE',desc:'A warming blend with aromatic Indian spices.'},
{id:'ginger',name:'Adrak Chai',cat:'Chai',price:15,emoji:'🍵',tag:'GINGER KICK',desc:'Fresh ginger warmth in every comforting cup.'},
{id:'elaichi',name:'Elaichi Chai',cat:'Chai',price:15,emoji:'☕',tag:'FRAGRANT',desc:'A gentle cardamom aroma with every sip.'},
{id:'coffee',name:'Hot Coffee',cat:'Coffee',price:25,emoji:'🥤',tag:'COFFEE BREAK',desc:'A smooth, warm cup to power your day.'},
{id:'coldcoffee',name:'Cold Coffee',cat:'Coffee',price:40,emoji:'🧋',tag:'CHILLED',desc:'A cool and creamy pick-me-up.'},
{id:'samosa',name:'Crispy Samosa',cat:'Snacks',price:15,emoji:'🥟',tag:'CRUNCH TIME',desc:'Golden, flaky and perfect alongside chai.'},
{id:'bun',name:'Bun Maska',cat:'Snacks',price:25,emoji:'🥯',tag:'COMFORT FOOD',desc:'Soft bun with a buttery, sweet finish.'},
{id:'toast',name:'Butter Toast',cat:'Snacks',price:20,emoji:'🍞',tag:'LIGHT BITE',desc:'Toasty, buttery and lovely with hot chai.'},
{id:'combo',name:'Chai + Samosa Combo',cat:'Combos',price:25,emoji:'🍵',tag:'TODAY’S SPECIAL',desc:'One masala chai and one crispy samosa.'},
{id:'buncombo',name:'Ginger Chai + Bun Maska',cat:'Combos',price:35,emoji:'🫖',tag:'TEA-TIME DEAL',desc:'A warming ginger chai with buttery bun maska.'}
];
let cart={},activeCat='All';const rupees=n=>'₹'+n.toFixed(0);
const menuGrid=document.getElementById('menuGrid'),cartPanel=document.getElementById('cartPanel'),overlay=document.getElementById('overlay');
function renderMenu(){const q=document.getElementById('searchInput').value.trim().toLowerCase();const rows=menu.filter(m=>(activeCat==='All'||m.cat===activeCat)&&(m.name+' '+m.cat+' '+m.desc).toLowerCase().includes(q));menuGrid.innerHTML=rows.length?rows.map(m=>`<article class="item"><div class="item-art"><span class="item-tag">${m.tag}</span>${m.emoji}</div><h3>${m.name}</h3><p>${m.desc}</p><div class="item-bottom"><span class="price">${rupees(m.price)}</span><button class="add" aria-label="Add ${m.name}" onclick="addItem('${m.id}')">+</button></div></article>`).join(''):'<div class="empty">No menu items found. Try another search or category.</div>'}
function addItem(id){cart[id]=(cart[id]||0)+1;renderCart();toast(menu.find(m=>m.id===id).name+' added to your cart');}
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];renderCart()}
function renderCart(){const entries=Object.entries(cart);const count=entries.reduce((s,[id,q])=>s+q,0);const subtotal=entries.reduce((s,[id,q])=>s+menu.find(m=>m.id===id).price*q,0);document.getElementById('cartCount').textContent=count;document.getElementById('cartItems').innerHTML=entries.length?entries.map(([id,q])=>{const m=menu.find(x=>x.id===id);return `<div class="cart-row"><div><strong>${m.name}</strong><small>${rupees(m.price)} each · ${rupees(m.price*q)}</small></div><div class="qty"><button onclick="changeQty('${id}',-1)" aria-label="Decrease ${m.name}">−</button><b>${q}</b><button onclick="changeQty('${id}',1)" aria-label="Increase ${m.name}">+</button></div></div>`}).join(''):'<div class="cart-empty">🫖<br><strong>Your cart is waiting for chai.</strong><br>Add something tasty from the menu.</div>';document.getElementById('cartTotal').innerHTML=`<div class="total-line"><span>Subtotal</span><b>${rupees(subtotal)}</b></div><div class="total-line"><span>Taxes / extra charges</span><span>Not included</span></div><div class="total-line grand"><span>Estimated total</span><span>${rupees(subtotal)}</span></div><button class="btn primary" onclick="checkout()" ${count?'':'disabled style="opacity:.45;cursor:not-allowed"'}>Order on WhatsApp ↗</button><div class="fineprint">Demo only. Sample prices; no payment is collected. Add the shop's real WhatsApp number before using this feature.</div>`}
function openCart(){cartPanel.classList.add('open');overlay.classList.add('show');cartPanel.setAttribute('aria-hidden','false')}function closeCart(){cartPanel.classList.remove('open');overlay.classList.remove('show');cartPanel.setAttribute('aria-hidden','true')}
function checkout(){if(!Object.keys(cart).length)return;const phone=prompt('Enter the shop owner’s WhatsApp number with country code (digits only, e.g. 91XXXXXXXXXX):');if(!phone)return;const digits=phone.replace(/\D/g,'');if(digits.length<10||digits.length>15){toast('Please enter a valid number with country code');return}const lines=Object.entries(cart).map(([id,q])=>{const m=menu.find(x=>x.id===id);return `${m.name} x ${q} = ${rupees(m.price*q)}`});const total=Object.entries(cart).reduce((s,[id,q])=>s+menu.find(x=>x.id===id).price*q,0);const message=`Hello Chai Junction! I'd like to place a demo order:\n\n${lines.join('\n')}\n\nEstimated total: ${rupees(total)}\n\nPlease confirm availability and final price.`;window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`,'_blank','noopener');}
document.getElementById('openCart').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);document.getElementById('searchInput').addEventListener('input',renderMenu);document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('button[data-cat]');if(!b)return;activeCat=b.dataset.cat;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderMenu()});
let toastTimer;function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function refreshQr(){const url=window.location.href;document.getElementById('qrImage').src='https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data='+encodeURIComponent(url);document.getElementById('qrText').textContent=location.protocol==='file:'?'This preview is a local file. Deploy it online first; then the QR will point to the public site.':'Scan to open this menu on your phone.'}
document.getElementById('refreshQr').addEventListener('click',refreshQr);renderMenu();renderCart();refreshQr();


// Responsive mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        menuToggle.textContent = isOpen ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
            menuToggle.textContent = '☰';
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.nav') && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
            menuToggle.textContent = '☰';
        }
    });
}
