class FlipBook {
    constructor(bookElem) {
        this.elems = {
            book: bookElem,
            leaves: bookElem.querySelectorAll(".leaf"),
            buttons: {
                next: document.getElementById("nextPage"),
                prev: document.getElementById("prevPage")
            },
            surpriseButton: document.getElementById("surpriseButton") // Botón sorpresa
        };
        this.setupEvents();
        this.currentPagePosition = 0;
        this.turnPage(0);
    }

    setPagePosition(page, position, index) {
        var transform = "translate3d(0,0," + ((position < 0 ? 1 : -1) * Math.abs(index)) + "px)";
        if (position < 0) {
            transform += "rotate3d(0,1,0,-180deg)";
            page.classList.add("turned");
        } else {
            page.classList.remove("turned");
        }
        if (page.style.transform !== transform) {
            page.style.transform = transform;
        }
    }

    turnPage(delta) {
        this.currentPagePosition += delta;

        if (this.currentPagePosition < 0) {
            this.currentPagePosition = 0;
            return;
        }
        if (this.currentPagePosition > this.elems.leaves.length) {
            this.currentPagePosition = this.elems.leaves.length;
            return;
        }

        this.elems.leaves.forEach((page, index) => {
            var pageNumber = index;
            this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
        });

        // Deshabilitar botones cuando corresponde
        if (this.currentPagePosition === 0) {
            this.elems.buttons.prev.setAttribute("disabled", "disabled");
        } else if (this.currentPagePosition === this.elems.leaves.length) {
            this.elems.buttons.next.setAttribute("disabled", "disabled");

            // 🌟 Mostrar el botón sorpresa cuando se llegue a la última página
            this.elems.surpriseButton.style.display = "block";
        } else {
            this.elems.buttons.next.removeAttribute("disabled");
            this.elems.buttons.prev.removeAttribute("disabled");

            // Ocultar el botón mientras aún no se llega a la última página
            this.elems.surpriseButton.style.display = "none";
        }
    }

    setupEvents() {
        document.getElementById("nextPage").addEventListener("click", () => {
            let currentPage = this.elems.leaves[this.currentPagePosition];
            if (currentPage) {
                currentPage.style.transition = "transform 0.5s ease-in-out";
                currentPage.style.transform = "rotateY(-180deg)";
            }
            this.turnPage(1);
        });

        document.getElementById("prevPage").addEventListener("click", () => {
            let currentPage = this.elems.leaves[this.currentPagePosition - 1];
            if (currentPage) {
                currentPage.style.transition = "transform 0.5s ease-in-out";
                currentPage.style.transform = "rotateY(0deg)";
            }
            this.turnPage(-1);
        });

        // Evento del botón sorpresa
        this.elems.surpriseButton.addEventListener("click", function () {
            window.location.href = "animacion.html";
        });
    }
}



var flipBook = new FlipBook(document.getElementById("flipbook"));
