import items from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    // card: document.querySelector('.lightbox__content'),
    image: document.querySelector('.lightbox__image'),
    btn: document.querySelector('.lightbox__button'),
};

refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(items));
refs.gallery.addEventListener('click', openModalHandler);
refs.btn.addEventListener('click', closeModalHandler);
refs.overlay.addEventListener('click', clickOnOverlay)

function createGalleryItemsMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
            return `
                <li class='gallery__item'>
                    <a
                        class='gallery__link'
                        href='${original}'
                    >
                        <img
                        class='gallery__image'
                        src='${preview}'
                        data-source='${original}'
                        alt='${description}'
                        />
                    </a>
                </li>
                `;
        })
        .join('');
}

function openModalHandler(event) {
    event.preventDefault();
    window.addEventListener('keydown', pressEscKeyHandler);
    window.addEventListener('keydown', flipThroughImagesHandler);
    
    if (event.target.nodeName !== 'IMG' ) {
        return;
    };
    refs.lightbox.classList.add('is-open');
    refs.image.src = event.target.dataset.source;
    refs.image.alt = event.target.alt;
}

function closeModalHandler() {
    window.removeEventListener('keydown', pressEscKeyHandler);
    refs.lightbox.classList.remove('is-open');
    refs.image.src = '';
    refs.image.alt = '';
}

function clickOnOverlay(event) {
    if (event.currentTarget === event.target) {
        closeModalHandler();
    }
}

function pressEscKeyHandler(event) {
    if (event.code === 'Escape') {
        closeModalHandler();
    }
}

function flipThroughImagesHandler(event) {
    const imagesArray = document.querySelectorAll('.gallery__image');
    const imagesSrc = [];
    const imagesAlt = [];
    imagesArray.forEach(image => imagesSrc.push(image.dataset.source));
    imagesArray.forEach(image => imagesAlt.push(image.alt));
    let currentImageIndex = imagesSrc.indexOf(refs.image.src);
    let currentAltIndex = imagesAlt.indexOf(refs.image.alt);

    if (event.code === 'ArrowLeft') {
        if (currentImageIndex < 0 && currentAltIndex < 0) {
            currentImageIndex = imagesSrc.length;
            currentAltIndex = imagesAlt.length;
        } /* else { */
            currentImageIndex -= 1;
            currentAltIndex -= 1;
        // }        
    }

    if (event.code === 'ArrowRight') {
        if (currentImageIndex > imagesSrc.length && currentAltIndex > imagesAlt.length) {
            currentImageIndex = 0;
            currentAltIndex = 0;
        } /* else { */
            currentImageIndex += 1;
            currentAltIndex += 1;
        // }
    }

    refs.image.src = imagesSrc[currentImageIndex];
    refs.image.alt = imagesAlt[currentAltIndex];

}