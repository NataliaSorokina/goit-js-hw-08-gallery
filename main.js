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
    if (event.target.nodeName !== 'IMG' ) {
        return;
    };
    refs.lightbox.classList.add('is-open');
    refs.image.src = event.target.dataset.source;
}

function closeModalHandler() {
    window.removeEventListener('keydown', pressEscKeyHandler);
    refs.lightbox.classList.remove('is-open');
    refs.image.src = '';
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