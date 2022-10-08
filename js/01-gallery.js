import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  galleryContainer: document.querySelector(".gallery"),
};

let imgInOriginalSize;

refs.galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryMarkup(galleryItems)
);

refs.galleryContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  showImgInOriginalSize(e);
});

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
       <div class="gallery__item">
         <a class="gallery__link" href="${original}">
           <img
             class="gallery__image"
             src="${preview}"
             data-source="${original}"
             alt="${description}"
           />
         </a>
       </div>`;
    })
    .join("");
}

function showImgInOriginalSize(e) {
  imgInOriginalSize = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapeKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapeKeyPress);
      },
    }
  );
  imgInOriginalSize.show();
}

function onEscapeKeyPress(e) {
  if (e.code === "Escape") {
    imgInOriginalSize.close();
  }
}
