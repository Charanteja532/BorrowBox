const items = {
    1: {
        name: "Canon Camera",
        category: "CAMERA",
        location: "📍 Madhapur · 1.2 km away",
        price: 200,
        duration: "/ 3 hrs",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=85",
        description: "Canon camera available for borrowing in Madhapur. Perfect for photography, small events, trips and personal projects.",
        owner: "Rahul"
    },

    6: {
        name: "Laptop",
        category: "ELECTRONICS",
        location: "📍 Madhapur · 2.1 km away",
        price: 300,
        duration: "/ day",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000&q=85",
        description: "Laptop available for temporary use. Suitable for students, presentations, coding and personal work.",
        owner: "Arjun"
    },

    3: {
        name: "Power Drill",
        category: "TOOLS",
        location: "📍 Madhapur · 800 m away",
        price: 50,
        duration: "/ 3 hrs",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1000&q=85",
        description: "Power drill available for short-term borrowing. Useful for home repairs, furniture work and small projects.",
        owner: "Vikram"
    },

    4: {
        name: "Tripod",
        category: "CAMERA",
        location: "📍 Madhapur · 1.5 km away",
        price: 100,
        duration: "/ day",
        image: "https://images.unsplash.com/photo-1606986628253-47c7d7c7e7b8?w=1000&q=85",
        description: "Camera tripod available for borrowing. Suitable for photography, video recording and content creation.",
        owner: "Kiran"
    }
};


const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

if (itemId && items[itemId]) {

    const item = items[itemId];

    const itemImageElement = document.getElementById("itemImage");

    if (itemImageElement) {
        itemImageElement.src = item.image;
        document.getElementById("itemName").textContent = item.name;
        document.getElementById("itemCategory").textContent = item.category;
        document.getElementById("itemLocation").textContent = item.location;
        document.getElementById("itemPrice").textContent = "₹" + item.price;
        document.getElementById("itemDuration").textContent = item.duration;
        document.getElementById("itemDescription").textContent = item.description;
        document.getElementById("itemOwner").textContent = item.owner;

        document.title = item.name + " | BorrowBox";

        const basketButton = document.querySelector(".basket-button");

        if (basketButton) {

            basketButton.addEventListener("click", function() {

                let basket = JSON.parse(localStorage.getItem("borrowBoxBasket")) || [];

                const alreadyAdded = basket.some(function(basketItem) {
                    return basketItem.id === itemId;
                });

                if (alreadyAdded) {
                    alert("This item is already in your basket.");
                    return;
                }

                basket.push({
                    id: itemId,
                    name: item.name,
                    category: item.category,
                    location: item.location,
                    price: item.price,
                    duration: item.duration,
                    image: item.image,
                    owner: item.owner
                });

                localStorage.setItem(
                    "borrowBoxBasket",
                    JSON.stringify(basket)
                );

                alert(item.name + " added to your basket.");
            });
        }
    }
}


const uploadImage = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

if (uploadImage && imagePreview) {

    uploadImage.addEventListener("change", function() {

        const file = uploadImage.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function(event) {

                imagePreview.innerHTML =
                    '<img src="' +
                    event.target.result +
                    '" alt="Item preview">';

            };

            reader.readAsDataURL(file);
        }
    });
}


const basketItems = document.getElementById("basketItems");

if (basketItems) {

    let basket = JSON.parse(localStorage.getItem("borrowBoxBasket")) || [];

    if (basket.length === 0) {

        basketItems.innerHTML = `
            <div class="empty-basket">
                <h2>Your basket is empty</h2>
                <p>Add items you want to borrow.</p>
            </div>
        `;

    } else {

        basket.forEach(function(item) {

            const basketItem = document.createElement("div");

            basketItem.className = "basket-item";

            basketItem.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="basket-item-image"
                >

                <div class="basket-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.category}</p>
                    <p>${item.location}</p>

                    <span class="basket-item-price">
                        ₹${item.price} ${item.duration}
                    </span>
                </div>

                <button
                    class="remove-button"
                    data-id="${item.id}"
                >
                    Remove
                </button>
            `;

            basketItems.appendChild(basketItem);
        });


        const removeButtons =
            document.querySelectorAll(".remove-button");

        removeButtons.forEach(function(button) {

            button.addEventListener("click", function() {

                const id = button.getAttribute("data-id");

                basket = basket.filter(function(item) {
                    return item.id !== id;
                });

                localStorage.setItem(
                    "borrowBoxBasket",
                    JSON.stringify(basket)
                );

                location.reload();
            });
        });
    }


    const basketCount =
        document.getElementById("basketCount");

    const basketTotal =
        document.getElementById("basketTotal");

    if (basketCount) {
        basketCount.textContent = basket.length;
    }

    if (basketTotal) {

        const total = basket.reduce(function(sum, item) {
            return sum + item.price;
        }, 0);

        basketTotal.textContent = "₹" + total;
    }
}