// Sadece anasayfada çalışacak
if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
    console.log("Sayfa bulunmuyor");
} else {
    (async function () {
        // API ve localStorage anahtarlarını tanımladım
        const API_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
        // console.log(API_URL, "API GELDİ");
        const LS_KEY = "my_products";
        const LS_FAV_KEY = "my_favorites";
        const LS_STARS_KEY = "product_stars";
        let products = [];
        let favorites = JSON.parse(localStorage.getItem(LS_FAV_KEY)) || [];
        let favoriteStars = JSON.parse(localStorage.getItem(LS_STARS_KEY)) || [];

        // Ürünleri önce localStorage'dan, eğer yoksa API'den çekiyorum.
        if (localStorage.getItem(LS_KEY)) {
            products = JSON.parse(localStorage.getItem(LS_KEY));
        } else {
            try {
                const res = await fetch(API_URL);
                products = await res.json();
                localStorage.setItem(LS_KEY, JSON.stringify(products));
            } catch (e) {
                alert("Ürünler alınamadı.");
                return;
            }
        }

        // Stiller
        const style = document.createElement("style");
        style.innerHTML = `
        .carousel-container {
            width: 1200px;
            min-height: 400px;
            margin: 40px auto;
            padding: 32px 24px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 24px rgba(0,0,0,0.10);
            font-family: Arial,sans-serif;
        }
        .carousel-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #ff6000;
            
        }
        .carousel-list {
            display: flex;
            overflow-x: auto;
            gap: 16px;
            scroll-behavior: smooth;
        }
        .carousel-item {
            width: 220px;
            height: 330px;
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
            padding: 12px;
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            transition: box-shadow .2s;
            box-sizing: border-box;
        }
        .carousel-item:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .carousel-img {
            width: 100%;
            height: 110px;
            object-fit: contain;
            border-radius: 8px;
            background: #fff;
            margin-bottom: 10px;
        }
        .carousel-name {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
            color: #222;
            min-height: 36px;
        }
        .carousel-original {
            font-size: 15px;
            color: #888;
            text-decoration: line-through;
            margin-bottom: 2px;
        }
        .carousel-price {
            font-size: 18px;
            color: #ff6000;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .carousel-prices {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }
        .carousel-prices span {
            display: block;
        }
       
        .carousel-discount {
            font-size: 15px;
            color: #1bbd7e;
            font-weight: 500;
            margin-bottom: 2px;
        }
        .carousel-heart {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 32px;
            height: 28px;
            cursor: pointer;
            transition: fill .2s;
        }
        .carousel-stars {
            left: 20px;
            cursor: pointer;
            transition: fill .2s;
            display:flex;
            gap: 5px;
        }
        .carousel-addcart {
            margin-top: auto;
            width: 100%;
            padding: 8px 0;
            background: #ff6000;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background .2s;
        }
        .carousel-addcart:hover {
            background: #e65500;
        }
        @media (max-width: 1300px) {
            .carousel-container { 
                width: 98vw;
                min-width: 320px;
              }
        }
        @media (max-width: 600px) {
            .carousel-item { 
                width: 140px; 
                height: 210px; 
                min-width: 140px;
            }
            .carousel-img { 
            height: 60px;
            }
            .carousel-title {
            font-size: 16px;
            }
        }
        `;
        document.head.appendChild(style);

        // Carousel ana container
        const container = document.createElement("div");
        container.className = "carousel-container";
        container.innerHTML = `
            <div class="carousel-title">Beğenebileceğinizi düşündüklerimiz</div>
            <div class="carousel-list"></div>
        `;
        document.body.prepend(container);

        // Ürünlerin ekleneceği listeyi seçiyorum.
        const list = container.querySelector(".carousel-list");

        // Her ürün için kart oluşturuyorum.
        products.forEach(product => {
            const item = document.createElement("div");
            item.className = "carousel-item";

            // Ürün resmi ve link
            const img = document.createElement("img");
            img.className = "carousel-img";
            img.src = product.img;
            img.alt = product.name;
            img.style.cursor = "pointer";
            img.onclick = () => window.open(product.url, "_blank");

            // Ürün adı
            const name = document.createElement("div");
            name.className = "carousel-name";
            name.textContent = product.name;

            // Fiyatlar ve indirim
            const prices = document.createElement("div");
            prices.className = "carousel-prices";
            if (product.price !== product.original_price) {
                prices.innerHTML = `
            <div style="display:flex; gap:8px; align-items:center;">
            <span class="carousel-original">${product.original_price}₺</span>
            <span class="carousel-discount">-%${Math.round(100 - (product.price / product.original_price) * 100)}</span>
            </div>
            <span class="carousel-price">${product.price}₺</span>
            `;
            } else {
                prices.innerHTML = `<span class="carousel-price">${product.price}₺</span>`;
            }


            const starsContainer = document.createElement("div");
            starsContainer.className = "carousel-stars";

            let starCount = favoriteStars.find(obj => obj.id === product.id)?.star || 0;

            for (let i = 1; i <= 5; i++) {
                const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                star.setAttribute("viewBox", "0 0 24 24");
                star.setAttribute("width", "24");
                star.setAttribute("height", "24");
                star.style.cursor = "pointer";
                star.innerHTML = `
                <path d="M12 .587l3.668 7.568 8.332 1.214-6.032 5.882 1.424 8.304L12 18.896l-7.392 3.855 1.424-8.304-6.032-5.882 8.332-1.214L12 .587z"
                fill="${i <= starCount ? "#ff6000" : "none"}"
                stroke="#ff6000"
                stroke-width="2"/>
                `;

                // Yıldıza tıklayarak puan verme
                star.onclick = (e) => {
                    e.stopPropagation();
                    starCount = i;
                    // Yıldızın doluluk oranını güncelleme
                    Array.from(starsContainer.children).forEach((s, idx) => {
                        s.querySelector("path").setAttribute("fill", idx < starCount ? "#ff6000" : "none");
                    });
                    // localStorage'a kaydediyorum
                    const idx = favoriteStars.findIndex(obj => obj.id === product.id);
                    if (idx > -1) {
                        favoriteStars[idx].star = starCount;
                    } else {
                        favoriteStars.push({ id: product.id, star: starCount });
                    }
                    localStorage.setItem(LS_STARS_KEY, JSON.stringify(favoriteStars));
                };
                starsContainer.appendChild(star);
            }


            const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            heart.setAttribute("viewBox", "0 0 24 24");
            heart.classList.add("carousel-heart");
            heart.innerHTML = `
            <path d="M12 21s-7.5-6.2-9.5-9.2C-1.1 7.5 2.4 3 7 3c2.1 0 4.1 1.1 5 2.7C13.9 4.1 15.9 3 18 3c4.6 0 8.1 4.5 4.5 8.8C19.5 14.8 12 21 12 21z"
                fill="${favorites.includes(product.id) ? "#ff6000" : "none"}"
                stroke="#ff6000"
                stroke-width="2"/>
            `;

            // Kalbe tıklanınca ekleme ve çıkarma
            heart.onclick = (e) => {
                e.stopPropagation();
                if (favorites.includes(product.id)) {
                    favorites = favorites.filter(id => id !== product.id);
                    heart.querySelector("path").setAttribute("fill", "none");
                } else {
                    favorites.push(product.id);
                    heart.querySelector("path").setAttribute("fill", "#ff6000");
                }
                localStorage.setItem(LS_FAV_KEY, JSON.stringify(favorites));
                // console.log("Favori :", favorites);
            };

            // Sepete ekle butonu
            const addCartBtn = document.createElement("button");
            addCartBtn.className = "carousel-addcart";
            addCartBtn.textContent = "Sepete Ekle";
            addCartBtn.onclick = (e) => {
                e.stopPropagation();
                alert("Ürün sepete eklendi!");
            };

            // Tıklanınca ürün sayfası yeni sekmede açılır
            item.onclick = () => window.open(product.url, "_blank");


            // Tüm elemanları kartın içine ekliyorum.
            item.appendChild(img);
            item.appendChild(name);
            item.appendChild(prices);
            item.appendChild(starsContainer);
            item.appendChild(heart);
            item.appendChild(addCartBtn);
            list.appendChild(item);
        });
    })();
}