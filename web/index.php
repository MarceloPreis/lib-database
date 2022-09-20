<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crie sua database</title>

    <script>
        function teste() {
            var teste = document.getElementsByClassName("container");

            Object.values(teste).map(function(container) {
                var tableName = container.getElementsByClassName("tableName").value;
                var rows = container.getElementsByClassName("row");
                Object.values(rows).map((row) => {
                    var colName = row.getElementsByClassName("colName")[0].value;
                    var  = row.getElementsByClassName("colType")[0].value;   
                })

            })

            table = [tableName, colcolTypeName, ]
        }

        function addContainer() {
            var div = document.getElementById("tables");
            var newDiv = document.createElement("div");
            newDiv.setAttribute("class", "container")

            var input = document.createElement("input")
            input.type = "text";
            input.setAttribute("class", "tableName");

            var remove = document.createElement("a")
            remove.href = "#js";
            remove.innerText = "remove";
            remove.onclick = function(e) {
                this.parentNode.parentNode.removeChild(this.parentNode)
            };

            const cols = ['Field Name', 'Field Type']
            var table = document.createElement("table");
            var thead = document.createElement("thead");
            table.appendChild(thead);

            var tbody = document.createElement("tbody");
            table.appendChild(tbody);
            table.setAttribute("class", "table")

            var tr = document.createElement("tr");
            cols.map(function(col) {
                var th = document.createElement("th");
                th.innerText = col;
                tr.appendChild(th);
            })

            thead.appendChild(tr);

            var addRow = document.createElement("a");
            addRow.href = "#js";
            addRow.innerText = "Add Atributte";
            addRow.onclick = function(e) {
                var row = tbody.insertRow();
                row.setAttribute("class", "row");
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);

                cell0.innerHTML = '<input class="colName" required></input>';
                cell1.innerHTML = '<input class="colType" required></input>';
            }


            newDiv.appendChild(input);
            newDiv.appendChild(remove);
            newDiv.appendChild(table);
            newDiv.appendChild(addRow);
            div.appendChild(newDiv);
        }
    </script>
</head>

<body>
    <form action="" method="get">
        <label for="name">Name: </label>
        <input type="text" id="name">
        <label for="url">Url: </label>
        <input type="text" id="url">
        <label for="porta">Porta: </label>
        <input type="text" id="porta">
        <label for="user">User: </label>
        <input type="text" id="user">
        <label for="pass">Pass: </label>
        <input type="text" id="pass">
        <label for="sgbd">Selecione SGBD: </label>
        <select name="sgbd" id="sgbd">
            <option value="1">MySQL</option>
        </select>
        <button type="submit">Enviar</button>


        <hr>
        <a href=#js onclick="addContainer()">Add</a>
        <div id="tables">
            <div class="container"></div>
        </div>
        <a href="#js" onclick="teste()">Teste</a>
    </form>

</body>

</html>