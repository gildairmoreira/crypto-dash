import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

// Props do componente que recebe uma série de dados e uma cor opcional
type Props = {
  readonly series: number[][]
  readonly color?: string // Cor opcional para personalizar o gráfico
  readonly theme?: 'dark' | 'light' // Tema para ajustar o background
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
    // Habilita o modo sparkline (gráfico minimalista)
    sparkline: {
      enabled: true,
    },
  },
  // Configuração da linha do gráfico
  stroke: {
    show: true,
    curve: 'smooth', // Suaviza a linha
    width: 4, // Espessura da linha
    lineCap: 'round', // Estilo das extremidades
    colors: ['#0050d1'], // Cor padrão da linha
  },
  // Remove a grade do gráfico para visual mais limpo
  grid: {
    show: false,
  },
  // Configuração do tooltip (dica ao passar o mouse)
  tooltip: {
    enabled: true,
    followCursor: true,
    x: {
      show: false, // Esconde o valor do eixo X
    },
    y: {
      formatter: (value) => '$' + value.toLocaleString(), // Formata valores como moeda
    },
    marker: {
      show: false, // Esconde o marcador no tooltip
    },
  },
  // Configuração do eixo X (escondido)
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  // Configuração do eixo Y (escondido)
  yaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  // Configuração do preenchimento abaixo da linha
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1, // Opacidade inicial do gradiente
      opacityTo: 0.8, // Opacidade final do gradiente
      stops: [0, 90, 100]
    }
  },
  // Configuração dos pontos no gráfico
  markers: {
    size: 0, // Tamanho 0 esconde os pontos por padrão
    colors: ['#0050d1'], // Cor padrão dos pontos
    strokeColors: '#fff', // Cor da borda dos pontos
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    showNullDataPoints: true,
    hover: {
      size: 8, // Tamanho do ponto ao passar o mouse
      sizeOffset: 3
    }
  }
}

// Componente que renderiza o gráfico de card (versão menor do gráfico)
function CardChart({ series, color, theme = 'dark' }: Props) {
  const isDark = theme === 'dark'
  
  // Validar e filtrar dados inválidos
  const validSeries = series.filter(point => 
    Array.isArray(point) && 
    point.length === 2 && 
    typeof point[0] === 'number' && 
    typeof point[1] === 'number' && 
    !isNaN(point[0]) && 
    !isNaN(point[1]) && 
    isFinite(point[0]) && 
    isFinite(point[1])
  )
  
  // Se não há dados válidos, não renderizar o gráfico
  if (validSeries.length === 0) {
    return (
      <div className="h-[100px] flex items-center justify-center">
        <span className={`text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Dados indisponíveis
        </span>
      </div>
    )
  }
  
  return (
    <Chart
      height={100} // Altura reduzida para caber no card
      options={{
        ...options,
        chart: {
          ...options.chart,
          background: 'transparent',
        },
        // Permite sobrescrever a cor da linha se fornecida via props
        stroke: {
          ...options.stroke,
          colors: color ? [color] : options.stroke?.colors,
        },
        // Permite sobrescrever a cor dos pontos se fornecida via props
        markers: {
          ...options.markers,
          colors: color ? [color] : options.markers?.colors,
        },
        // Ajusta o tooltip conforme o tema
        tooltip: {
          ...options.tooltip,
          theme: isDark ? 'dark' : 'light',
          style: {
            fontSize: '12px',
            fontFamily: 'inherit',
          },
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex]
            return `
              <div class="${
                isDark 
                  ? 'bg-gray-900 border border-gray-700 text-white' 
                  : 'bg-white border border-gray-200 text-gray-900'
              } px-3 py-2 rounded-lg shadow-lg">
                <span class="font-medium">$${value.toLocaleString()}</span>
              </div>
            `
          }
        },
        // Ajusta o preenchimento conforme o tema
        fill: {
          ...options.fill,
          opacity: isDark ? 0.1 : 0.05
        },
      }}
      series={[{
        name: 'Price',
        data: validSeries, // Dados validados do preço
      }]}
    />
  )
}

export default CardChart
