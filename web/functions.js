function downloadConec() {
    var name = document.getElementById("name").value
    var url = document.getElementById("url").value
    var user = document.getElementById("user").value
    var pass = document.getElementById("pass").value
    var sgbd = document.getElementById("sgbd").value

    const conec = new Conec(name, url, user, pass, sgbd)
    download(JSON.stringify(conec), "conec.json", "text/plain")
}

function downloadJSON() {

    var db = new DataBase(document.getElementById("name").value)
    var containers = document.getElementsByClassName("container")

    Object.values(containers).map(function (container) {
        var tableName = container.getElementsByClassName("tableName")[0].value
        const table = new Table(tableName)
        var rows = container.getElementsByClassName("colRow")

        Object.values(rows).map((row) => {
            var colName = row.getElementsByClassName("ColumnName")[0].value
            var colType = row.getElementsByClassName("ColumnType")[0].value
            var nn = row.getElementsByClassName("NN")[0].checked
            var ai = row.getElementsByClassName("AI")[0].checked
            var pk = row.getElementsByClassName("PK")[0].checked
            table.columns.push(new Column(colName, colType, nn, ai, pk))
        })

        db.tables.push(table)
    })

    downloadConec()
    download(JSON.stringify(db), "database.json", "text/plain")
}

function download(content, fileName, contentType) {
    const a = document.createElement("a")
    const file = new Blob([content], { type: contentType })

    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
}

function createInput(type = null, inputclass = false, placeholder = false) {

    var input = document.createElement("input")
    input.type = type
    input.className = inputclass + (type == 'text' ? " form-control" : "")

    if (placeholder) {
        input.placeholder = placeholder
    }

    if (inputclass == "PK") {
        input.onclick = function () {
            if (this.checked){

                var col = this.parentNode.parentNode
                var pks = col.parentNode.getElementsByClassName("PK")
                var count = 0
                var nn = col.getElementsByClassName("NN")[0]
                nn.checked = true

                Object.values(pks).map(pk => {
                    if (pk.checked){
                        count ++
                    }

                    if (count > 1){
                        alert("Apenas uma coluna pode ser definida como chave primária")
                        this.checked = false
                        nn.checked = false
                    }
                })
            }
        };
    }

    return input
}

function addContainer() {
    var div = document.getElementById("tables")
    var newDiv = document.createElement("div")
    var input = createInput('text', "tableName", "Nome da Tabela")

    newDiv.className = 'container'

    //Botão para remover a linha
    var remove = document.createElement("a")
    remove.className = "remove"
    remove.href = "#js"
    remove.innerHTML = '<i class="bi bi-trash"></i>'
    remove.onclick = function (e) {
        this.parentNode.parentNode.removeChild(this.parentNode)
    }

    //Tabela com os Inputs de criação
    const cols = [
        { id: "ColumnName", input: "text", name: "Column Name" },
        { id: 'ColumnType', input: 'text', name: "Data Type" },
        { id: 'NN', input: 'checkbox', name: "NN" },
        { id: 'AI', input: 'checkbox', name: "AI" },
        { id: 'PK', input: 'checkbox', name: "PK" }
    ]


    var table = document.createElement("table")
    var thead = document.createElement("thead")
    var tbody = document.createElement("tbody")
    var tr = document.createElement("tr")
    table.appendChild(thead)
    table.appendChild(tbody)

    cols.forEach(function (col) {
        var th = document.createElement("th")
        th.innerText = col.name
        tr.appendChild(th)
    })

    thead.appendChild(tr)

    var addRow = document.createElement("a")
    addRow.href = "#js"
    addRow.className = "addRow"
    addRow.innerHTML = '<i class="bi bi-plus-square"></i>'

    addRow.onclick = function () {
        var row = tbody.insertRow()
        row.className = 'colRow'
        cols.map(function (i) {
            var cell = row.insertCell()
            cell.appendChild(createInput(i.input, i.id))
        })
    }

    newDiv.appendChild(input)
    newDiv.appendChild(table)
    newDiv.appendChild(addRow)
    newDiv.appendChild(remove)
    div.appendChild(newDiv)
    addRow.click()
}
