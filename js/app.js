/**
 * SUTEJA WOOD ART - Taksu Bali Layout & Interactive Controller
 * Handles navigation, mobile drawer, product modal lightbox, category filtering, and WhatsApp inquiry routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initProductModal();
  initCategoryFilters();
  initContactForm();
});

/* -------------------------------------------------------------------------
   1. Sticky Header
   ------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   ------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('close');
  const menuWrapper = document.getElementById('menuWrapper');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  menuButton?.addEventListener('click', () => {
    menuWrapper?.classList.add('show-box');
  });

  closeButton?.addEventListener('click', () => {
    menuWrapper?.classList.remove('show-box');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuWrapper?.classList.remove('show-box');
    });
  });
}

/* -------------------------------------------------------------------------
   3. Artwork Collection Database (Local Images for 100% Reliability)
   ------------------------------------------------------------------------- */
const ARTWORKS = {
  'dewi-goddess': {
    title: 'Sacred Dewi Sri Balinese Goddess Sculpture',
    category: 'Mythological Sculptures',
    img: 'images/statue_dewi.jpg',
    timber: 'Aged Solid Suar Hardwood (Kiln-Dried)',
    desc: 'An ethereal and revered representation of Dewi Sri, the Balinese goddess of prosperity, fertility, and spiritual peace. Masterfully chiseled with intricate ceremonial headdress and graceful prayer mudra.'
  },
  'ganesha': {
    title: 'Lord Ganesha Supreme Wisdom Statue',
    category: 'Mythological Sculptures',
    img: 'images/prod_ganesha.jpg',
    timber: 'Select Solid Suar Wood (Single Log, Oven Kiln-Dried)',
    desc: 'An iconic spiritual sculpture capturing Lord Ganesha, revered remover of obstacles and patron of supreme wisdom. Masterfully chiseled with intricate royal crown praba motifs, modaka sweet, and peaceful presence.'
  },
  'penari': {
    title: 'Balinese Legong Royal Dancer Sculpture',
    category: 'Traditional Figurative',
    img: 'images/prod_penari.jpg',
    timber: 'Aged Solid Suar & Waru Hardwood',
    desc: 'Capturing the graceful elegance, dynamic arching posture, and fluid hand mudras of a classical Balinese royal court dancer, crowned with tropical frangipani blossoms and ceremonial regalia.'
  },
  'meditating-deity': {
    title: 'Contemplative Balinese Deity Sculpture',
    category: 'Mythological Sculptures',
    img: 'images/statue_meditating.jpg',
    timber: 'Solid Kiln-Dried Suar Wood',
    desc: 'A serene spiritual protector sculpted in deep meditative contemplation, exhibiting smooth flowing curves, serene facial tranquility, and sacred poise.'
  },
  'monumental-deity': {
    title: 'Royal Balinese Consecrated Deity Shrine Sculpture',
    category: 'Mythological Sculptures',
    img: 'images/hero_statue.jpg',
    timber: 'Monumental Century Suar Trunk',
    desc: 'A magnificent monumental wood sculpture depicting Balinese deities sculpted with sublime grace from an unbroken antique solid suar trunk.'
  },
  'garuda': {
    title: 'Temple Courtyard Guardian Deity Sculpture',
    category: 'Mythological Sculptures',
    img: 'images/gallery_1.jpg',
    timber: 'Single Log Solid Suar Wood',
    desc: 'A classical temple guardian sculpture sculpted with profound spiritual expression and traditional decorative jewelry, celebrating Ubud’s living heritage.'
  },
  'barong': {
    title: 'Sacred Barong & Traditional Deity Face Mask',
    category: 'Sacred Masks',
    img: 'images/gallery_5.jpg',
    timber: 'Aged Sacred Pule Wood with Gold Accents',
    desc: 'The supreme guardian king spirit of Bali. Hand-chiseled according to sacred agung temple carving rites, with fearsome protective fangs and ceremonial mirror inlays.'
  },
  'hiasan': {
    title: 'Sacred Balinese Goddess Wall Relief Plaque',
    category: 'Architectural Wall Reliefs',
    img: 'images/prod_hiasan.jpg',
    timber: 'Aged Solid Teak Wood (Kayu Jati)',
    desc: 'A high-relief carved wall plaque portraying an ethereal Balinese goddess emerging from lotus petals. Exudes spiritual tranquility, warmth, and timeless heritage for residential interiors.'
  },
  'ramayana': {
    title: 'Intricate Lotus Blossom Relief Medallion',
    category: 'Architectural Wall Reliefs',
    img: 'images/gallery_2.jpg',
    timber: 'Select Aged Perhutani Teak Wood',
    desc: 'A master-level circular floral medallion carved with multi-layered depth, acanthus petals, and traditional Balinese foliage.'
  },
  'temple-shrine': {
    title: 'Mas Village Sacred Temple Architecture & Shrine Carvings',
    category: 'Architectural Wall Reliefs',
    img: 'images/temple_bg.jpg',
    timber: 'Historical Temple Heritage Reference',
    desc: 'A tribute to the sacred shrines of Mas Village, Ubud, where traditional wood carving originated and flourished through generations of devotion.'
  },
  'kotak': {
    title: 'Hand-Carved Keepsake Jewelry Chest',
    category: 'Home Decor & Keepsakes',
    img: 'images/prod_kotak.jpg',
    timber: 'Perhutani Select Teak Wood (Kayu Jati)',
    desc: 'An artisanal keepsake chest featuring deeply carved Balinese botanical foliage and frangipani blossoms. Hand-burnished with natural beeswax and lined with velvet to protect precious heirlooms.'
  },
  'kotak-flower': {
    title: 'Artisanal Floral Keepsake Jewelry Chest',
    category: 'Home Decor & Keepsakes',
    img: 'images/gallery_4.jpg',
    timber: 'Perhutani Solid Teak Hardwood',
    desc: 'Heirloom keepsake chest hand-chiseled with dense Balinese floral relief motifs, featuring a smooth natural beeswax hand finish.'
  },
  'souvenir': {
    title: 'Miniature Meditative Monks Trio',
    category: 'Desk Decor & Keepsakes',
    img: 'images/prod_souvenir.jpg',
    timber: 'Smooth Indonesian Waru Wood (Hibiscus)',
    desc: 'A serene trio of contemplative monks in prayerful anjali mudra. Smooth tactile curves highlighted by natural two-tone grain flow, representing peaceful mindfulness.'
  },
  'souvenir-monks-5': {
    title: 'Five Contemplative Monks in Sacred Meditation',
    category: 'Desk Decor & Keepsakes',
    img: 'images/gallery_3.jpg',
    timber: 'Fine Indonesian Waru Hardwood',
    desc: 'A harmonious quintet of miniature monks carved in contemplative seated posture, radiating peace, mindfulness, and Balinese tranquility.'
  },
  'artisan-craft': {
    title: 'Master Sculptor Hand-Chiseling at Ubud Atelier',
    category: 'Art Furniture & Living',
    img: 'images/artisan_hands.jpg',
    timber: 'Living Atelier Craftsmanship',
    desc: 'An authentic behind-the-scenes glimpse of Master Suteja and senior carvers shaping solid raw timber with traditional chisels and mallets.'
  },
  'atelier-sanctum': {
    title: 'Suteja Wood Art Living Atelier & Sanctum Display',
    category: 'Art Furniture & Living',
    img: 'images/hero_bg.jpg',
    timber: 'Atelier Exhibition Sanctuary',
    desc: 'Atmospheric gallery and studio pavilion in Mas Village, Ubud, showcasing the union of monumental spiritual sculptures and live-edge furniture.'
  }
};

const WA_PHONE = '6287861871288';

/* -------------------------------------------------------------------------
   4. Lightbox Modal
   ------------------------------------------------------------------------- */
function initProductModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  const closeBtn = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTimber = document.getElementById('modalTimber');
  const modalTag = document.getElementById('modalTag');
  const modalWaBtn = document.getElementById('modalWaBtn');

  document.querySelectorAll('[data-art]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const artKey = btn.getAttribute('data-art');
      const item = ARTWORKS[artKey];
      if (!item) return;

      if (modalImg) {
        modalImg.src = item.img;
        modalImg.alt = item.title;
      }
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalDesc) modalDesc.textContent = item.desc;
      if (modalTimber) modalTimber.textContent = item.timber;
      if (modalTag) modalTag.textContent = item.category;

      const message = encodeURIComponent(
        `Hello Suteja Wood Art,\n\nI am inquiring about this masterpiece:\n*${item.title}*\nCategory: ${item.category}\nTimber: ${item.timber}\n\nCould you please share availability, pricing, and worldwide crated shipping details? Thank you!`
      );
      if (modalWaBtn) {
        modalWaBtn.href = `https://wa.me/${WA_PHONE}?text=${message}`;
      }

      modal.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}

/* -------------------------------------------------------------------------
   5. Category Filtering
   ------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn-taksu');
  const cards = document.querySelectorAll('[data-cat]');

  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   6. Contact Form Routing to WhatsApp
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'Custom Commission';
    const messageText = form.querySelector('[name="message"]')?.value.trim() || '';

    if (!name || !phone) {
      alert('Please provide your name and WhatsApp/phone number.');
      return;
    }

    const waMsg = encodeURIComponent(
      `Hello Master Suteja & Team,\n\nI would like to submit an inquiry through your website:\n\n` +
      `*Full Name:* ${name}\n` +
      `*Email:* ${email || 'Not provided'}\n` +
      `*WhatsApp/Phone:* ${phone}\n` +
      `*Subject:* ${subject}\n` +
      `*Message / Project Details:* ${messageText || 'None'}\n\n` +
      `Thank you!`
    );

    window.open(`https://wa.me/${WA_PHONE}?text=${waMsg}`, '_blank');
  });
}
