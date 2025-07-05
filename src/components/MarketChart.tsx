import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import { customChartTooltip } from '../utils/helpers'

// Props do componente que recebe uma série de dados no formato number[][]
type Props = {
  series: number[][]
}

// Configurações do gráfico usando ApexCharts
const options: ApexOptions = {
  chart: {
    // Remove a barra de ferramentas do gráfico
    toolbar: {
      show: false,
    },
    type: 'line',
    // Desabilita o zoom no gráfico
    zoom: {
      enabled: false,
    },
    background: 'transparent',
    // Configurações de animação do gráfico
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  // Configuração da linha do gráfico
  stroke: {
    curve: 'smooth', // Suaviza a linha
    width: 4, // Espessura da linha
    lineCap: 'round', // Estilo das extremidades
    colors: ['#0050d1'], // Cor da linha
  },
  // Configuração da grade do gráfico
  grid: {
    borderColor: '#1e293b',
    strokeDashArray: 0,
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
  },
  // Configuração do eixo Y
  yaxis: {
    labels: {
      offsetX: -10,
      style: { colors: '#94a3b8' },
      formatter: (value) => '$' + value.toLocaleString(), // Formata valores como moeda
    },
    tickAmount: 6, // Quantidade de marcações no eixo
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  // Configuração do tooltip (dica ao passar o mouse)
  tooltip: {
    enabled: true,
    followCursor: true,
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
      return customChartTooltip(data[1], 4) // Usa função personalizada para formatar o tooltip
    },
  },
  // Configuração do eixo X
  xaxis: {
    type: 'numeric',
    axisTicks: { color: '#1e293b' },
    axisBorder: { color: '#1e293b' },
    labels: {
      style: { colors: '#94a3b8' },
      formatter: (value) => moment(value).format('YYYY/MM/DD h:mm'), // Formata datas
      rotateAlways: false,
      hideOverlappingLabels: true,
    },
    tickAmount: 8,
  },
  // Configuração do preenchimento abaixo da linha
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1, // Opacidade inicial do gradiente
      opacityTo: 0.9, // Opacidade final do gradiente
      stops: [0, 90, 100]
    }
  },
  // Configuração dos pontos no gráfico
  markers: {
    size: 0, // Tamanho 0 esconde os pontos por padrão
    colors: ['#0050d1'], // Cor dos pontos igual à linha
    strokeColors: '#fff', // Cor da borda dos pontos
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    showNullDataPoints: true,
    hover: {
      size: 8, // Tamanho do ponto ao passar o mouse
      sizeOffset: 3
    }
  }
}

// Componente que renderiza o gráfico de mercado
function MarketChart({ series }: Props) {
  return (
    <ReactApexChart
      height={450} // Altura do gráfico
      options={options} // Configurações definidas acima
      series={[{
        name: 'Price',
        data: series, // Dados do preço
      }]}
    />
  )
}

export default MarketChart
