let searchInput = document.getElementById('searchInput');
let ResultsContainer = document.getElementById('ResultsContainer');
let spinner = document.getElementById('spinner');

function createsearchResults(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultcontainer = document.createElement('div');
    resultcontainer.classList.add('result-item');
    ResultsContainer.appendChild(resultcontainer);

    let resultTitle = document.createElement('a');
    resultTitle.classList.add('result-title');
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = '_blank';
    resultcontainer.appendChild(resultTitle);

    let lineBreak = document.createElement('br');
    resultcontainer.appendChild(lineBreak);

    let resultUrl = document.createElement('a');
    resultUrl.classList.add('result-url');
    resultUrl.textContent = link;
    resultUrl.href = link;
    resultUrl.target = '_blank';
    resultcontainer.appendChild(resultUrl);

    lineBreak;

    let desc = document.createElement('p');
    desc.classList.add('link-description');
    desc.textContent = description;
    resultcontainer.appendChild(desc);
}

function displayResults(searchResults) {
    spinner.classList.toggle('d-none');
    for (let result of searchResults) {
        createsearchResults(result);
    }
}

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        ResultsContainer.textContent = '';
        spinner.classList.toggle('d-none');
        let inputText = searchInput.value;
        let url = 'https://apis.ccbp.in/wiki-search?search=' + inputText;
        let options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                console.log(jsondata);
                let {
                    search_results
                } = jsondata;
                displayResults(search_results);
            });
    }
});