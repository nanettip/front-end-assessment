var ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('GET', 'http://localhost:8080/data');
ajaxRequest.onload = function() {
    console.log(ajaxRequest.responseText);
};
ajaxRequest.send();