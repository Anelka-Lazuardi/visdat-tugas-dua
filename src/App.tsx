import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  BarElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar, Radar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  BarElement,
  RadialLinearScale,
  Filler
);

const nilai = {
  ipk: [
    4,
    3.93,
    3.93,
    3.69,
    2.92,
    2.84,
    2.86,
    2.76
  ],
  ips: [
    4,
    3.85,
    3.94,
    2.95,
    1.88,
    1.9,
    3.07,
    2.1
  ]
}

const maxIpk = Math.max(...nilai.ipk);
const minIpk = Math.min(...nilai.ipk);
const maxIps = Math.max(...nilai.ips);
const minIps = Math.min(...nilai.ips);

const labels = [...new Array(8)].map((_, b) => `Semester ${b + 1}`);

const defaultValue = {
  labels,
  datasets: [
    {
      label: 'IPK',
      data: nilai.ipk,
      borderColor: '#FBA834',
      backgroundColor: '#FBA834',
    },
    {
      label: 'IPS',
      data: nilai.ips,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
}
const options: ChartOptions<'line' | 'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true, // Display legend as circles
      },
    },
    title: {
      display: true,
      text: 'Tugas 1 Visualisasi Data',
    },
    datalabels: {
      display: false
    }


  },
  maintainAspectRatio: false,
  // aspectRatio: 5 / 3,
  layout: {
    padding: {
      top: 32,
      right: 16,
      bottom: 16,
      left: 8
    }
  },

  scales: {
    y: {
      // stacked: true,
      min: 0,
      max: 4,
      ticks: {
        stepSize: 1
      }
    },

  }
};
const lineData: ChartData<'line'> = defaultValue
const barData: ChartData<'bar'> = defaultValue

// Radar

const radarData = {
  labels: labels,
  datasets: [
    {
      label: 'IPK',
      data: nilai.ipk,
      borderColor: '#FBA834',
      backgroundColor: 'rgba(251, 168, 52, 0.2)',
      pointBackgroundColor: '#FBA834',
    },
    {
      label: 'IPS',
      data: nilai.ips,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.2)',
      pointBackgroundColor: 'rgba(53, 162, 235, 1)',
    }
  ],
};

const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      text: 'Comparison of IPK and IPS (Area)',
    },
    datalabels: {
      display: false,
    },
  },
  // aspectRatio: 1,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 32,
      right: 16,
      bottom: 16,
      left: 8,
    },
  },
  scales: {
    r: {
      min: 0,
      max: 4,
      ticks: {
        stepSize: 1,
        z: 10,
        showLabelBackdrop: false,
        font: {
          weight: 'bold',
          size: 15
        }
      },

    },
  },
};
const keylabels: ('ipk' | 'ips')[] = ['ipk', 'ips'];

const GenerateMinOrMax = ({ value, type }: { value: number, type: ('ipk' | 'ips') }) => {
  let classTd = "p-2 whitespace-nowrap text-center "
  if (type === "ipk") {
    if (value === maxIpk) classTd += 'font-extrabold text-[#436850]'
    else if (value === minIpk) classTd += 'font-extrabold text-[#B80000]'
  }
  else if (type === "ips") {
    if (value === maxIps) classTd += 'font-extrabold text-[#436850]'
    else if (value === minIps) classTd += 'font-extrabold text-[#B80000]'
  }

  return (
    <td className={classTd}>
      {value}
    </td>
  )
}


export default function App() {

  return <main className="w-full max-w-screen-xl container pt-20">

    <div className="text-4xl font-extrabold  text-center md:text-5xl lg:text-7xl" >
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Tugas 2 Visualisasi Data
      </h1>
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Redesign Comparision IPK and IPS
      </h1>
    </div>

    <div className="w-full py-20 overflow-x-scroll lg:overflow-hidden">
      <table className="w-full  table-auto ">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr className="bg-gray-200">
            <th className="p-2 whitespace-nowrap"></th>
            {labels.map((_, value) => (
              <th key={value} className="p-2 whitespace-nowrap">{`Semester ${value + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm divide-y-2 divide-gray-300">
          {keylabels.map((name, index: number) => (
            <tr key={index} >
              <td className={`p-2 whitespace-nowrap font-extrabold text-center ${name === "ipk" ? 'text-primary' : 'text-secondary'}`}>{name.toUpperCase()}</td>
              {nilai[name].map((val: number, idx: number) => (
                // <td key={idx} className="p-2 whitespace-nowrap text-center">{val}</td>
                <GenerateMinOrMax key={idx} value={val} type={name} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>


    <div className="grid grid-cols-1 gap-3 pt-5   lg:grid-cols-2 ">
      <div className="p-2  bg-white shadow-lg rounded-lg overflow-hidden w-full h-[500px]">
        <Line options={{ ...options, plugins: { ...options.plugins, title: { text: "Comparison of IPK and IPS (Line)", display: true, } } }} data={lineData} />
      </div>
      <div className="p-2 bg-white shadow-lg rounded-lg overflow-hidden w-full h-[500px]">
        <Bar options={{ ...options, plugins: { ...options.plugins, title: { text: "Comparison of IPK and IPS (Bar)", display: true, } } }} data={barData} />
      </div>
      <div className="col-span-1 flex justify-center lg:col-span-2">
        <div className="p-2 bg-white shadow-lg rounded-lg overflow-hidden  h-[500px] w-full lg:w-1/2">
          <Radar options={radarOptions} data={radarData} />
        </div>
      </div>


    </div>


  </main >
}

