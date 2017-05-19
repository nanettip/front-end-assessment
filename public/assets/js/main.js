var ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('GET', 'http://localhost:8080/data');
ajaxRequest.onload = function() {
    var ulContainer = document.getElementById("list");
    var selectContainer = document.getElementById("selector");
    function dataObject(number) {
        this.number = number;
        this.toString = function() {
            if (this.number.toString() % 3 == 0) {
                return "Wrecking";
            }
            else if (this.number.toString() % 5 == 0) {
                return "Ball";
            }
            else {
                return this.number.toString();
            }
        }
    }
    function search(value, dataObjectArray){
        for (var i = 0; i < dataObjectArray.length; i++) {
            if (dataObjectArray[i].number == value) {
                return true;
            }
        }
        return false;
    }
    function renderHTML(data) {
        data.forEach(function(e) {
            if ((e.number % 2) == 1) {
                ulContainer.innerHTML += '<li class="' + e.number.toString() + '" style="background-color:#A6ACAF"> ' + e.toString() + '</li>';
            }
            else {
                ulContainer.innerHTML += '<li class="' + e.number.toString() + '"> ' + e.toString() + '</li>';
            }
            selectContainer.innerHTML += '<option value="' + e.number.toString() + '"> ' + e.toString() + '</option>';
        });
    }
    var ajaxData = JSON.parse(ajaxRequest.responseText);
    var dataArray = ajaxData.data.split(",");
    var objectArray = [];
    dataArray.forEach(function(e) {
        if (objectArray.length == 0) {
            objectArray.push(new dataObject(e));
        }
        else if (search(e, objectArray) == false) {
            objectArray.push(new dataObject(e));
        }
    });
    objectArray.sort(function(a, b){
        return a.number-b.number;
    });
    
    renderHTML(objectArray);
    selectContainer.addEventListener("change", function() {
        var listItems = document.getElementsByTagName('li');
        var target = document.getElementsByClassName(selectContainer.value)[0];

        for(var i = 0; i < listItems.length; i++) {
            listItems[i].style.color = '#000';
        }
        target.style.color = '#ff0000';
    });

    ulContainer.addEventListener("click", function(e) {
        if (e.target.tagName == 'LI') {
            alert(e.target.textContent + ' was clicked!');
        }
    });
};
ajaxRequest.send();
