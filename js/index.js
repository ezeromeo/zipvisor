document.getElementById('zipFileInput').addEventListener('change', function(e) {
    handleFiles(e.target.files);
});

var dragArea = document.getElementById('dragArea');

dragArea.addEventListener('click', function() {
    document.getElementById('zipFileInput').click();
});

dragArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    dragArea.classList.add('drag-over');
});

dragArea.addEventListener('dragleave', function() {
    dragArea.classList.remove('drag-over');
});

dragArea.addEventListener('drop', function(e) {
    e.preventDefault();
    dragArea.classList.remove('drag-over');
    var files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFiles(files) {
    if (files.length > 0) {
        var file = files[0];
        var pElement = dragArea.querySelector('p');
        pElement.className = 'fileName';
        pElement.textContent = file.name;
    }
    var file = files[0];
    var spinner = document.getElementById('spinner');
    var tableContainer = document.querySelector('.tableContainer');

    spinner.style.display = 'block';
    tableContainer.classList.add('d-none');

    JSZip.loadAsync(file).then(function(zip) {
        var pdfListContainer = document.getElementById('pdfListContainer');
        pdfListContainer.innerHTML = ''; 

        zip.forEach(function(relativePath, zipEntry) {
            var row = document.createElement('tr');
            var fileIconPath = getFileIcon(zipEntry.name);
            row.innerHTML = `<td><img src="${fileIconPath}" class="file-icon" alt="File"><span class="file-name">${zipEntry.name}</span></td>`;
            pdfListContainer.appendChild(row);
        });

        setTimeout(function() {
            spinner.classList.add('d-none');
            tableContainer.classList.remove('d-none');
            tableContainer.classList.add('d-flex', 'align-items-start', 'justify-content-start', 'flex-column');
        }, 1000);
    }, function (e) {
        alert("El archivo proporcionado no es un archivo ZIP válido.");
        spinner.classList.add('d-none');
    });
}

function getFileIcon(fileName) {
    var extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
        case 'pdf':
            return 'assets/img/pdf-icon.svg';
        case 'doc':
            return 'assets/img/doc-icon.svg';
        case 'docx':
            return 'assets/img/docx-icon.svg';
        case 'ppt':
            return 'assets/img/ppt-icon.svg';
        case 'pptx':
            return 'assets/img/pptx-icon.svg';
        case 'xls':
            return 'assets/img/xls-icon.svg';
        case 'xlsx':
            return 'assets/img/xlsx-icon.svg';
        case 'jpg':
        case 'jpeg':
            return 'assets/img/jpg-icon.svg';
        case 'png':
            return 'assets/img/png-icon.svg';
        case 'gif':
            return 'assets/img/gif-icon.svg';
        case 'svg':
            return 'assets/img/svg-icon.svg';
        case 'js':
            return 'assets/img/js-icon.svg';
        case 'json':
            return 'assets/img/json-icon.svg';
        case 'css':
            return 'assets/img/css-icon.svg';
        case 'csv':
            return 'assets/img/csv-icon.svg';
        case 'html':
            return 'assets/img/html-icon.svg';
        case 'java':
            return 'assets/img/java-icon.svg';
        case 'mp4':
            return 'assets/img/mp4-icon.svg';
        case 'mp3':
            return 'assets/img/mp3-icon.svg';
        case 'otf':
            return 'assets/img/otf-icon.svg';
        case 'exe':
            return 'assets/img/exe-icon.svg';
        default:
            return 'assets/img/file-icon.svg';
    }
}





