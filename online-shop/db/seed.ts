import { db } from "./index";
import { categories, products } from "./schemas";

async function seed() {

  await db.delete(products);
  await db.delete(categories);

  const [laptopuri, telefoane, accesorii, monitoare, audio] = await db
    .insert(categories)
    .values([
      { name: "Laptopuri", slug: "laptopuri" },
      { name: "Telefoane", slug: "telefoane" },
      { name: "Accesorii", slug: "accesorii" },
      { name: "Monitoare", slug: "monitoare" },
      { name: "Audio", slug: "audio" },
    ])
    .returning();

  await db.insert(products).values([

    { name: "MacBook Air M3", slug: "macbook-air-m3", description: "Subțire, silențios, baterie pe toată ziua.", price: 5499.99, stock: 8, categoryId: laptopuri.id },
    { name: "MacBook Pro 14", slug: "macbook-pro-14", description: "Putere de workstation într-un laptop.", price: 10999.0, stock: 3, categoryId: laptopuri.id },
    { name: "Dell XPS 13", slug: "dell-xps-13", description: "Ultrabook compact cu ecran fără margini.", price: 6299.5, stock: 5, categoryId: laptopuri.id },
    { name: "Lenovo ThinkPad X1", slug: "lenovo-thinkpad-x1", description: "Clasicul de business, tastatură excelentă.", price: 7150.0, stock: 4, categoryId: laptopuri.id },
    { name: "Asus ROG Strix G16", slug: "asus-rog-strix-g16", description: "Laptop de gaming cu răcire agresivă.", price: 8499.99, stock: 6, categoryId: laptopuri.id },

    { name: "iPhone 15", slug: "iphone-15", description: "Cameră bună, ecosistem Apple.", price: 4299.0, stock: 15, categoryId: telefoane.id },
    { name: "Samsung Galaxy S24", slug: "samsung-galaxy-s24", description: "Android de top, ecran superb.", price: 3899.99, stock: 12, categoryId: telefoane.id },
    { name: "Google Pixel 8", slug: "google-pixel-8", description: "Cea mai bună procesare foto software.", price: 3299.0, stock: 9, categoryId: telefoane.id },
    { name: "Xiaomi Redmi Note 13", slug: "xiaomi-redmi-note-13", description: "Raport calitate-preț imbatabil.", price: 1099.99, stock: 40, categoryId: telefoane.id },
    { name: "OnePlus 12", slug: "oneplus-12", description: "Încărcare rapidă, Android curat.", price: 3599.0, stock: 7, categoryId: telefoane.id },


    { name: "Mouse Logitech MX Master 3S", slug: "mouse-logitech-mx-master-3s", description: "Mouse wireless de precizie pentru productivitate.", price: 549.99, stock: 25, categoryId: accesorii.id },
    { name: "Tastatură Keychron K2", slug: "tastatura-keychron-k2", description: "Mecanică, compactă, wireless.", price: 449.0, stock: 18, categoryId: accesorii.id },
    { name: "Tastatură Razer BlackWidow", slug: "tastatura-razer-blackwidow", description: "Mecanică cu iluminare RGB.", price: 699.99, stock: 11, categoryId: accesorii.id },
    { name: "Hub USB-C Anker 7-in-1", slug: "hub-usb-c-anker-7in1", description: "HDMI, USB 3.0, cititor de card.", price: 279.5, stock: 30, categoryId: accesorii.id },
    { name: "Stand laptop aluminiu", slug: "stand-laptop-aluminiu", description: "Ridică ecranul la nivelul ochilor.", price: 189.99, stock: 22, categoryId: accesorii.id },


    { name: "Dell UltraSharp U2723QE", slug: "dell-ultrasharp-u2723qe", description: "4K, USB-C, culori precise.", price: 2799.0, stock: 6, categoryId: monitoare.id },
    { name: "LG UltraGear 27GP850", slug: "lg-ultragear-27gp850", description: "165Hz, 1ms, pentru gaming.", price: 1899.99, stock: 9, categoryId: monitoare.id },
    { name: "Samsung Odyssey G5", slug: "samsung-odyssey-g5", description: "Curbat, 144Hz, imersiv.", price: 1499.0, stock: 10, categoryId: monitoare.id },


    { name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5", description: "Cele mai bune căști cu noise cancelling.", price: 1699.99, stock: 14, categoryId: audio.id },
    { name: "Apple AirPods Pro 2", slug: "apple-airpods-pro-2", description: "In-ear, ANC, integrare Apple.", price: 1249.0, stock: 20, categoryId: audio.id },
    { name: "JBL Flip 6", slug: "jbl-flip-6", description: "Boxă portabilă, rezistentă la apă.", price: 449.99, stock: 28, categoryId: audio.id },
  ]);

}

seed();