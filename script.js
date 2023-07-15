const pdfUrl = 'files/Blood meridian, or, The evening - McCarthy, Cormac, 1933-_new.pdf';

const container = document.getElementById('pdf-container');

let pdfDoc = null;
const scale = 1.5;

function renderPages() {
    const numPages = pdfDoc.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.appendChild(canvas);

            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.className = 'page-number';
            pageNumberDiv.textContent = pageNum; // Exibe o número da página
            pageDiv.appendChild(pageNumberDiv);

            container.appendChild(pageDiv);

            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    }
}

// Carregar e exibir o PDF
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    pdfDoc = pdf;
    renderPages();
});