class Column {
    constructor (colName, colType, nn = false, ai = false, pk = false){
        this.colName = colName;
        this.colType = colType;
        this.nn = nn;
        this.ai = ai;
        this.pk = pk;
    }
}