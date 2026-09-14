const itemImage = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

if (itemImage) {
    itemImage.addEventListener("change", function() {
        const file = itemImage.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                imagePreview.innerHTML =
                    '<img src="' + event.target.result + '" alt="Item preview">';
            };

            reader.readAsDataURL(file);
        }
    });
}