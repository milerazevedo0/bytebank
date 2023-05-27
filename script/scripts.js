import selecionaCotacao from "./imprimeCotacao.js";
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar =  new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  function geraHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario
  }

  function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
  }

  let workerDolar = new Worker('./script/workers/workerDolar.js');
  workerDolar.postMessage('usd');
  workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
  })

  // Trabalhando com a moeda Iene 

  const graficoIene = document.getElementById('graficoIene');
  const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
      }]
    },
  });

  let workerIene = new Worker('./script/workers/workerIene.js');
  workerIene.postMessage('iene');
  workerIene.addEventListener("message", event =>{
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaIene, tempo, valor);
    selecionaCotacao('iene', valor)
  });

//   Trabalhando com a moeda Dolar Australiano

  const graficoAud = document.getElementById('graficoAud');
  const graficoParaAud = new Chart(graficoAud, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dolar Australiano',
        data: [],
        borderWidth: 1,
        fill: false,
        borderColor: 'rgb(75, 100, 192)',
        tension: 0.1
      }]
    },
  })

  let workeraud = new Worker('./script/workers/workerDolarAust.js');
  workeraud.postMessage('aud')
  workeraud.addEventListener("message", event =>{
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaAud, tempo, valor);
    selecionaCotacao('aud', valor)
  })