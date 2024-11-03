// Cargar Google Charts para visualizar
google.charts.load('current', { packages: ['corechart'] });

//globales
let dataset = null;
let csv = null;
let columns = []
let header = []
let model = null
let X_train = null
let y_train = null
let yPredict = [];

// Mostrar campos adicionales según el objetivo de entrenamiento seleccionado
document.getElementById('train-objective').addEventListener('change', (event) => {
    const isPrediction = event.target.value === 'prediccion';
    const isSupervised = event.target.value === 'supervisado';
    const isClasificacion = event.target.value === "clasificacion";
    document.getElementById('prediction-label').style.display = isPrediction ? 'block' : 'none';
    document.getElementById('prediction-input').style.display = isPrediction ? 'block' : 'none';


});





// Cargar datos del .csv
document.getElementById('dataset').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        csv = e.target.result;
        dataset = parseCSV(csv);
        columns = dataset.length > 0 ? Object.keys(dataset[0]) : [];
        console.log("Dataset cargado:", dataset);
        console.log("Columnas:", columns);

        populateVariableSelects(columns);
        populateTree(columns);

    };

    reader.readAsText(file);
});

function joinArrays() {
    var a = []

    if (arguments.length == 6) {
        a.push([arguments[0], arguments[2], arguments[4]])
        for (var i = 0; i < arguments[1].length; i++) {
            a.push([arguments[1][i], arguments[3][i], arguments[5][i]])
        }
    }
    return a
}

function joinArraysPolynomial() {
    var a = []
    if (arguments.length == 10) {
        a.push([arguments[0], arguments[2], arguments[4], arguments[6], arguments[8]]);
        for (var i = 0; i < arguments[1].length; i++) {
            a.push([arguments[1][i], arguments[3][i], arguments[5][i], arguments[7][i], arguments[9][i]]);
        }
    }
    return a;
}

function parseCSV(csv) {
    const rows = csv.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
        let obj = {};
        row.forEach((value, index) => {
            obj[headers[index]] = parseFloat(value) || value;
        });
        return obj;
    });
    return data;
}

function populateVariableSelects(columns) {
    const inputSelect = document.getElementById('input-variable');
    const outputSelect = document.getElementById('output-variable');

    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    columns.forEach(col => {
        const option = document.createElement('option');
        option.value = col;
        option.textContent = col;

        inputSelect.appendChild(option.cloneNode(true));
        outputSelect.appendChild(option);
    });
}

function populateTree(columns) {

    columns.forEach((col, index) => {
       
        header.push(col.replace(/\r/g, ''))
        
        

    })
    console.log("headers")
    console.log(header)
}


function Entrenar() {

    const inputSelect = document.getElementById('modelos').value;
    console.log(inputSelect)

    if (inputSelect === "LinealRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta la grafica de tree
        document.getElementById("chart_div").style.display = "block"; //Muestra el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";
        LinealRegresion()
    } else if (inputSelect === "PolynomialRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta grafica de tree
        document.getElementById("chart_div").style.display = "block"; //muestra chart

        Polynomial()
    } else if (inputSelect === "DecisionTree") {
        document.getElementById('tree-data').style.display = 'block'; //muestra grafica tree
        document.getElementById("chart_div").style.display = "none"; //oculta el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";

        DecisionTree()
    }


}

function Predecir() {
    const inputSelect = document.getElementById('modelos').value;
    console.log(inputSelect)

    if (inputSelect === "LinealRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta la grafica de tree
        document.getElementById("chart_div").style.display = "block"; //Muestra el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";
        PrediccionLinealRegresion()
    } else if (inputSelect === "PolynomialRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta grafica de tree
        document.getElementById("chart_div").style.display = "block"; //muestra chart

        PrediccionPolynomial()
    } else if (inputSelect === "DecisionTree") {
        document.getElementById('tree-data').style.display = 'block'; //muestra grafica tree
        document.getElementById("chart_div").style.display = "none"; //oculta el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";

        DecisionTree()
    }

}

function Tendencia() {
    const inputSelect = document.getElementById('modelos').value;
    

    if (inputSelect === "LinealRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta la grafica de tree
        document.getElementById("chart_div").style.display = "block"; //Muestra el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";
        Tendencias()
    } else if (inputSelect === "PolynomialRegression") {
        document.getElementById('tree-data').style.display = 'none'; //oculta grafica de tree
        document.getElementById("chart_div").style.display = "block"; //muestra chart

        Tendencias()
    } else if (inputSelect === "DecisionTree") {
        document.getElementById('tree-data').style.display = 'block'; //muestra grafica tree
        document.getElementById("chart_div").style.display = "none"; //oculta el chart
        document.getElementById("log1").innerHTML = "";
        document.getElementById("log2").innerHTML = "";
        document.getElementById("log3").innerHTML = "";
        document.getElementById("log4").innerHTML = "";
        document.getElementById("log5").innerHTML = "";
        document.getElementById("log6").innerHTML = "";
        document.getElementById("log7").innerHTML = "";
        document.getElementById("log8").innerHTML = "";
        document.getElementById("log9").innerHTML = "";

        alert("No se puede aplicar tendencias")
    }
}

function LinealRegresion() {
    if (!dataset) {
        alert("Por favor, cargue un dataset y seleccione el algoritmo de regresión lineal.");
        return;
    }

    const trainSize = parseFloat(document.getElementById('train-size').value) / 100;
    // Verifica si el usuario seleccionó predicción y ejecuta predicción
    const trainObjective = document.getElementById('train-objective').value;

    // Inicializar las variables de entrada y salida
    let inputFeatures, targetVariable;

    if (trainObjective === 'supervisado') {
        // Leer los valores de los selects para las variables de entrada y salida
        inputFeatures = document.getElementById('input-variable').value;
        targetVariable = document.getElementById('output-variable').value;
        console.log(inputFeatures)

        // Verificar que ambas variables estén seleccionadas
        if (!inputFeatures || !targetVariable) {
            alert("Por favor, seleccione tanto la variable de entrada como la de salida.");
            return;
        }
    } else {
        // Si no es supervisado, puedes definir valores predeterminados
        inputFeatures = document.getElementById('input-variable').value;
        targetVariable = document.getElementById('output-variable').value;
    }


    // Datos de entrenamiento
    const trainData = dataset.slice(0, Math.floor(trainSize * dataset.length));


    X_train = trainData.map(d => d[inputFeatures]);
    y_train = trainData.map(d => d[targetVariable]);

    console.log("X_train: ")
    console.log(X_train)
    console.log(y_train)

    if (typeof LinearRegression !== 'function') {
        console.error("Error: LinearRegression no está definido. Asegúrate de que tytus.js esté cargado correctamente.");
        return;
    }

    model = new LinearRegression();
    model.fit(X_train, y_train);


    alert("Modelo entrenado")



}

function PrediccionLinealRegresion() {

    const trainObjective = document.getElementById('train-objective').value;

    if (trainObjective === 'prediccion') {
        const predictionValue = document.getElementById('prediction-input').value;


        let cadena = predictionValue.toString()
        let numeros = cadena.split(",")
        let predict_values = []
        numeros.forEach((value) => {
            predict_values.push(value)
        })
        console.log(predict_values)

        //valor_predict = model.predict([numeroMasCercano]); // Predicción para el nuevo valor
        let yPredict = model.predict(predict_values)

        document.getElementById("log1").innerHTML = yPredict

        console.log("Predicción para el valor ingresado:", yPredict);
        const a = joinArrays('x', X_train, 'yTrain', y_train, 'yPredict', yPredict);


        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawChart(a));

    } else {

        yPredict = model.predict(X_train); // Predicción para los datos de entrenamiento
        console.log("Predicción para el valor ingresado:", yPredict);
        document.getElementById("log1").innerHTML = yPredict
        const a = joinArrays('x', X_train, 'yTrain', y_train, 'yPredict', yPredict);

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawChart(a));

    }

}

function Polynomial() {

    if (!dataset) {
        alert("Por favor, cargue un dataset y seleccione el algoritmo de regresión lineal.");
        return;
    }

    let inputFeatures, targetVariable;

    const trainSize = parseFloat(document.getElementById('train-size').value) / 100;

    // Datos de entrenamiento
    const trainData = dataset.slice(0, Math.floor(trainSize * dataset.length));

    inputFeatures = document.getElementById('input-variable').value;
    targetVariable = document.getElementById('output-variable').value;

    X_train = trainData.map(d => d[inputFeatures]);
    y_train = trainData.map(d => d[targetVariable])
    console.log(X_train)

    model = new PolynomialRegression();

    model.fit(X_train, y_train, 2);
    alert("Modelo entrenado")



}

function PrediccionPolynomial() {

    const trainObjective = document.getElementById('train-objective').value;

    let predict_values = []

    if (trainObjective === "prediccion") {
        const predictionValue = document.getElementById('prediction-input').value;


        let cadena = predictionValue.toString()
        let numeros = cadena.split(",")
        numeros.forEach((value) => {
            predict_values.push(value)
        })
        console.log(predict_values)

    } else {
        predict_values = X_train
    }
    console.log(predict_values)

    model.fit(X_train, y_train, 2);
    yPredict = model.predict(predict_values);
    r2 = model.getError();

    model.fit(X_train, y_train, 3);
    let yPredict2 = model.predict(predict_values);
    r22 = model.getError();

    model.fit(X_train, y_train, 4);
    let yPredict3 = model.predict(predict_values);
    r23 = model.getError();

    for (let i = 0; i < predict_values.length; i++) {
        yPredict[i] = Number(yPredict[i].toFixed(2));
        yPredict2[i] = Number(yPredict2[i].toFixed(2));
        yPredict3[i] = Number(yPredict3[i].toFixed(2));
    }

    document.getElementById("log1").innerHTML = 'X Train: [' + X_train + ']';
    document.getElementById("log2").innerHTML = 'Y Train: [' + y_train + ']';
    document.getElementById("log3").innerHTML = 'X To Predict: [' + predict_values + ']';
    document.getElementById("log4").innerHTML = 'Y Prediction Degree 2: [' + yPredict + ']';
    document.getElementById("log5").innerHTML = 'Y Prediction Degree 3: [' + yPredict2 + ']';
    document.getElementById("log6").innerHTML = 'Y Prediction Degree 4: [' + yPredict3 + ']';
    document.getElementById("log7").innerHTML = 'R^2 for Degree 2: ' + Number(r2.toFixed(2));
    document.getElementById("log8").innerHTML = 'R^2 for Degree 3: ' + Number(r22.toFixed(2));
    document.getElementById("log9").innerHTML = 'R^2 for Degree 4: ' + Number(r23.toFixed(2));

    const a = joinArraysPolynomial('x', X_train, 'Training', y_train, 'Prediction Degree 2', yPredict, 'Prediction Degree 3', yPredict2, 'Prediction Degree 4', yPredict3);

    console.log("estructura: ", a)
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => drawChartP(a));
}

function DecisionTree() {
    if (!dataset) {
        alert("Por favor, cargue un dataset y seleccione el algoritmo de regresión lineal.");
        return;
    }

    //mostrar .csv en html
    const codeElement = document.getElementById("text-info");
    codeElement.innerHTML = "[<br />"


    //Conseguir cada fila del dataset
    console.log("rows")
    const rows = csv.split("\n");
    rows.forEach((row, index) => {
        console.log(row)
        codeElement.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + "[" + row + "],<br/>"
    })



    codeElement.innerHTML += "]<br />"
    console.log(header)
    let value2 = header[header.length-1]
    console.log(value2)
    let header2 = []

    header.forEach((row, index)=> {
        if(index != header.length-1) {
            header2.push(row)
        }

    })

    testWithChart = () => {

        let dtSt = []
        //Insertar header que ya es un array de elementos
        

        rows.forEach((row, index) => {
            let row_array = []
            value = row.split(",")
            value.forEach((row2) => {
                row_array.push(row2.replace(/\r/g, ''))
            })

            dtSt.push(row_array)
        })

        console.log(dtSt)
        

        const trainObjective = document.getElementById('train-objective').value;
        let predict_values = []
        if (trainObjective === 'prediccion') {
            const predictionValue = document.getElementById('prediction-input').value;
            predict_values = predictionValue.toString().split(",")

        } else {
            rows.forEach((row, index) => {
                if (index == 1) {
                    value = row.split(",")
                    predict_values = value

                }
            })

        }
        console.log(header2)
        console.log(predict_values)



        let dTree = new DecisionTreeID3(dtSt);
        console.log(dTree)
        console.log(dTree.dataset)
        let root = dTree.train(dTree.dataset);
        let predict = dTree.predict([
            header2,
            predict_values,
        ], root)
        return {
            dotStr: dTree.generateDotString(root),
            predictNode: predict
        };
    }



    var chart = document.getElementById("tree");
    var {
        dotStr,
        predictNode
    } = this.testWithChart()
    //console.log(predictNode);
    document.getElementById("log1").innerHTML = "Childs: [] "  + " id: " + predictNode.id  + " tag: "  + predictNode.tag + " " + value2 + ": " + predictNode.value
    var parsDot = vis.network.convertDot(dotStr);
    var data = {
        nodes: parsDot.nodes,
        edges: parsDot.edges
    }
    var options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD', // UD, DU, LR, RL
                sortMethod: 'directed', // hubsize, directed
                //shakeTowards: 'roots' // roots, leaves                        
            },
        },
    };
    var network = new vis.Network(chart, data, options);




}

const Tendencias = () => {
    //xvalues y yvalues son del .csv
    if (X_train.length > 1 && y_train.length > 1) {
        const trendData = [];

        const slope = (y_train[y_train.length - 1] - y_train[0]) / (X_train[X_train.length - 1] - X_train[0]);
        const trendText = slope > 0 ? "La tendencia es ascendente." : "La tendencia es descendente.";
        
        alert(trendText)
        
        // Preparar los datos para el gráfico
        for (let i = 0; i < X_train.length; i++) {
            trendData.push([X_train[i], y_train[i]]);
        }

        google.charts.setOnLoadCallback(() => drawChartTendencia(trendData));
    } else {
        alert('No hay suficientes datos para determinar la tendencia.', 'error');
    }
};



function drawChartP(a) {
    var data = google.visualization.arrayToDataTable(a);
    var options = {
        seriesType: 'scatter',
        series: {
            1: { type: 'line' },
            2: { type: 'line' },
            3: { type: 'line' }
        }
    };
    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChart(a) {


    var data = new google.visualization.arrayToDataTable(a);

    var options = {
        seriesType: 'scatter',
        series: { 1: { type: 'line' } }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

const drawChartTendencia = (trendData) => {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    data.addRows(trendData);

    const options = {
        title: 'Tendencia de Datos',
        hAxis: { title: 'X' },
        vAxis: { title: 'Y' },
        legend: 'none',
        trendlines: { 0: { type: 'linear', lineWidth: 2, opacity: 0.7 } } // Configura la línea de tendencia
    };

    const chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}




