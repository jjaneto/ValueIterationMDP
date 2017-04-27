var nRows, nCols;
var discount;
var prob, probBad, posState_i, posState_j, negState_i, negState_j, unr_i, unr_j;
var posStateValue, negStateValue, maxEvaluations = 10000, reward, evaluations;
var grid, gridAux, gridReward;
var gridPolicy;
var deltaMin = -1000000000;
var alRight;

function partidaGeral(){
    nRows = document.getElementById("rowNumber").value;
    nCols = document.getElementById("colNumber").value;
    discount = document.getElementById("discount").value;
    prob = document.getElementById("probAction").value;
    unr_i = document.getElementById("unr_i").value;
    unr_j = document.getElementById("unr_j").value;
    posState_i = document.getElementById("posState_i").value;
    posState_j = document.getElementById("posState_j").value;
    negState_i = document.getElementById("negState_i").value;
    negState_j = document.getElementById("negState_j").value;
    reward = document.getElementById("reward").value;
    posStateValue = document.getElementById("posState").value;
    negStateValue = document.getElementById("negState").value;

    probBad = (1 - prob)/2;
    evaluations = 0;
    console.log("l & c " + nRows + " " + nCols);
    console.log("discount " + discount);
    console.log("probabilidade " + prob);
    console.log("unreachable " + unr_i + " " + unr_j);
    console.log("posState " + posState_i + " " + posState_j);
    console.log("negState " + negState_i + " " + negState_j);
    console.log("reward " + reward);
    mdp();
    printResults();
}

function printResults(){
    var prints = "";
    //console.log("O algoritmo rodou " + evaluations);
    //prints += "O algoritmo rodou " + evaluations + "\n";
    var mat = "";
    for(i = 0; i < nRows; i++){
        for(j = 0; j < nCols; j++){
            mat += (grid[i][j]) + " ";
        }
        mat += "\n";
    }
    console.log(mat + "Melhor politica:\n");
    prints +=  mat + "Melhor politica:\n";
    var pol = "";
    for(i = 0; i < nRows; i++){
        for(j = 0; j < nCols; j++){
            pol += gridPolicy[i][j] + " ";
        }
        pol += "\n";
    }
    console.log(pol);
    prints += pol;
    //alert(prints);
}

function conf1(){
    nRows = 3;
    nCols = 4;
    discount = 1;
    prob = 0.8;
    probBad = (1 - prob)/2;
    unr_i = 1;
    unr_j = 1;
    posState_i = 0;
    posState_j = 3;
    negState_i = 1;
    negState_j = 3;
    reward = -3;
    posStateValue = 100;
    negStateValue = -100;
    evaluations = 0;
    alRight = true;
    mdp();
    alRight = false;
    printResults();
}

function conf2(){
    nRows = 3;
    nCols = 4;
    discount = 1;
    prob = 0.8;
    probBad = (1 - prob)/2;
    unr_i = 1;
    unr_j = 1;
    posState_i = 0;
    posState_j = 3;
    negState_i = 1;
    negState_j = 3;
    reward = -0.4;
    posStateValue = 100;
    negStateValue = -100;
    evaluations = 0;
    alRight = true;
    mdp();
    alRight = false;
    printResults();
}

function conf3(){
    nRows = 5;
    nCols = 5;
    discount = 1;
    prob = 0.8;
    probBad = (1 - prob)/2;
    unr_i = 2;
    unr_j = 1;
    posState_i = 4;
    posState_j = 3;
    negState_i = 1;
    negState_j = 3;
    reward = -3;
    posStateValue = 100;
    negStateValue = -100;
    evaluations = 0;
    alRight = true;
    mdp();
    alRight = false;
    printResults();
}

function conf4(){
    nRows = 5;
    nCols = 5;
    discount = 1;
    prob = 0.8;
    probBad = (1 - prob)/2;
    unr_i = 2;
    unr_j = 1;
    posState_i = 4;
    posState_j = 3;
    negState_i = 1;
    negState_j = 3;
    reward = 1;
    posStateValue = 100;
    negStateValue = -100;
    evaluations = 0;
    alRight = true;
    mdp();
    alRight = false;
    printResults();
}

function getInput(){
    if(checkInput() || alRight){
        grid = [];
        gridAux = [];
        gridPolicy = [];
        gridReward = [];
        for(var i = 0; i < nRows; i++){
            gridReward[i] = new Array(nCols);
            grid[i] = new Array(nCols);
            gridAux[i] = new Array(nCols);
            gridPolicy[i] = new Array(nCols);
            for(var j = 0; j < nCols; j++){
                gridReward[i][j] = reward;
                grid[i][j] = 0;
                gridAux[i][j] = 0;
                gridPolicy[i][j] = "";
            }
        }   

        gridReward[posState_i][posState_j] = posStateValue;
        gridReward[negState_i][negState_j] = negStateValue;
        gridReward[unr_i][unr_j] = 0;
        
        
        gridPolicy[unr_i][unr_j] = "#";
        gridPolicy[posState_i][posState_j] = "+";
        gridPolicy[negState_i][negState_j] = "-";
        return true;
    }else{
        //colocar um alert aqui
        alert("Corrija as entradas e tente novamente!");
        return false;
    }
}

function notValid(i, j){
    return (i < 0 && i >= nRows) && (j < 0 && j >= nCols);
}

function checkInput(){
    //erro no estado positivo
    if(notValid(posState_i, posState_j)){
        //alert
        alert("O estado positivo deve estar dentro do grid!");
        return false;
    }

    //erro no estado inatingivel
    if(notValid(unr_i, unr_j)){
        //alert
        alert("O estado inatingivel deve estar dentro do grid!");
        return false;
    }

    if(notValid(negState_i, negState_j)){
        //alert
        alert("O estado negativo deve estar dentro do grid!");
        return false;
    }

    if(prob < 0){
        //alert
        alert("A probabilidade de tomar uma acao deve ser positiva!");
        return false;
    }

    return true;
}

function featuredPos(i, j){
    return (i == posState_i && j == posState_j) || (i == negState_i && j == negState_j) || (i == unr_i && j == unr_j);
}

function mdp(){
    if(getInput()){
        evaluations = 0; var delta;
        do{
            gridAux = grid.slice();
            evaluations++;
            delta = 0;
            for(i = 0; i < nRows; i++){
                for(j = 0; j < nCols; j++){
                    if(featuredPos(i, j)){
                        gridAux[i][j] = gridReward[i][j];
                    }else{
                        var maior = -10000, bestAction = -1, aux = -1;
                        
                        aux = actionNorth(i, j) * prob + actionWest(i, j) * probBad + actionEast(i, j) * probBad;
                        if(aux > maior){
                            maior = aux;
                            bestAction = 0;
                        }
                        aux = actionSouth(i, j) * prob + actionWest(i, j) * probBad + actionEast(i, j) * probBad;
                        if(aux > maior){
                            maior = aux;
                            bestAction = 1;
                        }
                        aux = actionWest(i, j) * prob + actionSouth(i, j) * probBad + actionNorth(i, j) * probBad;
                        if(aux > maior){
                            maior = aux;
                            bestAction = 2;
                        }
                        aux = actionEast(i, j) * prob + actionSouth(i, j) * probBad + actionNorth(i, j) * probBad
                        if(aux > maior){
                            maior = aux;
                            bestAction = 3;
                        }
                        
                        let old = gridAux[i][j];
                        
                        //console.log(old + " " + gridAux[i][j]);
                        
                        gridAux[i][j] = gridReward[i][j] + discount * maior;

                        //console.log(old + " " + gridAux[i][j]);
                        switch(bestAction){
                        case 0: gridPolicy[i][j] = "N"; break;
                        case 1: gridPolicy[i][j] = "S"; break;
                        case 2: gridPolicy[i][j] = "W"; break;
                        case 3: gridPolicy[i][j] = "E"; break;
                            
                        }
                        
                    }
                    //delta = Math.max(delta, Math.abs(gridAux[i][j] - grid[i][j]));
                }
            }
        }while(/*delta > deltaMin &&*/ evaluations < maxEvaluations);
    }
}

function actionWest(i, j){
    if(j == 0 || (i == unr_i && j == unr_j + 1)){
        return grid[i][j];
    }else{
        return grid[i][j - 1];
    }
}

function actionEast(i, j){
    if(j == nCols - 1 || (i == unr_i && j == unr_j - 1)){
        return grid[i][j];
    }else{
        return grid[i][j + 1];
    }
}

function actionSouth(i, j){
    if(i == nRows - 1 || (i == unr_i - 1 && j == unr_j)){
        return grid[i][j];
    }else{
        return grid[i + 1][j];
    }
}

function actionNorth(i, j){
    if(i == 0 || (i == unr_i + 1 && j == unr_j)){
        return grid[i][j];
    }else{
        return grid[i - 1][j];
    }
}

//digite a opcao aqui abaixo na sintaxe: opcao();
//as opcoes sao: conf1(), conf2(), conf3() e conf4()
//para mais liberdade, colocando os valores, abra a pagina html
