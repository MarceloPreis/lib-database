function downloadConec() {
    var name = document.getElementById("name").value;
    var url = document.getElementById("url").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var sgbd = document.getElementById("sgbd").value;

    const conec = new Conec(name, url, user, pass, sgbd);
    download(JSON.stringify(conec), "conec.json", "text/plain")
}

function downloadJSON() {
    var db = new DataBase(document.getElementById("name").value);
    var teste = document.getElementsByClassName("container");
    Object.values(teste).map(function (container) {
        var tableName = container.getElementsByClassName("tableName")[0].value;
        const table = new Table(tableName);
        var rows = container.getElementsByClassName("colRow");
        console.log(rows)
        Object.values(rows).map((row) => {
            var colName = row.getElementsByClassName("colName")[0].value;
            var colType = row.getElementsByClassName("colType")[0].value;
            table.columns.push({ 'colName': colName, 'colType': colType })
        })
        db.tables.push(table);
    })
    
    downloadConec();
    download(JSON.stringify(db), "database.json", "text/plain");
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function createInput(inputId, inputclass, placeholder = null) {
    var input = document.createElement("input");
    input.className = inputclass + " form-control";
    if (inputId)
        input.id = inputId;
    if (placeholder)
        input.placeholder = placeholder;
    return input;
}

function createSelect(id, opt = []){
    var select = document.createElement("select");
    select.id = id;

    opt.forEach(key, value => {
        var option = document.createElement("option");
        option.value = key;
        option.innerText = value;
    });

    return select;
}

function addContainer() {
    var div = document.getElementById("tables");
    var newDiv = document.createElement("div");
    var input = createInput(null, "tableName", "Nome da Tabela");
    newDiv.className = 'container';

    var remove = document.createElement("a")
    remove.className = "remove";
    remove.href = "#js";
    remove.innerHTML = '<i class="bi bi-trash"></i>';
    remove.onclick = function (e) {
        this.parentNode.parentNode.removeChild(this.parentNode)
    };

    const cols = ['Column Name', 'Column Type']
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    table.appendChild(thead);
    table.appendChild(tbody);

    cols.map(function (col) {
        var th = document.createElement("th");
        th.innerText = col;
        tr.appendChild(th);
    })

    thead.appendChild(tr);

    var addRow = document.createElement("a");
    addRow.href = "#js";
    addRow.className = "addRow";
    addRow.innerHTML = '<i class="bi bi-plus-square"></i>';
    addRow.onclick = function (e) {
        var row = tbody.insertRow();
        row.className = 'colRow';
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        cell0.appendChild(createInput(null, 'colName '));
        cell1.appendChild(createInput(null, 'colType'))
    }

    newDiv.appendChild(input);
    newDiv.appendChild(table);
    newDiv.appendChild(addRow);
    addRow.click();
    newDiv.appendChild(remove);
    div.appendChild(newDiv);
}