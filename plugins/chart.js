import { Bar, Line, Doughnut, Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement
)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('LineChart', Line)

    nuxtApp.vueApp.component('DoughnutChart', Doughnut)

    nuxtApp.vueApp.component('BarChart', Bar)

    nuxtApp.vueApp.component('PieChart', Pie)
})
