import jsonData from "../data.json";
import { useMemo } from "react";
import { Chart, AxisOptions } from "react-charts";
import "./App.css";

type KRPoints = {
  date: Date;
  kr: number;
};

type Series = {
  label: string;
  data: KRPoints[];
};

const data: Series[] = [
  {
    label: "Zombie_Area51",
    data: [...jsonData].map((v) => ({
      date: new Date(v.timestamp * 1000),
      kr: v.KR,
    })),
  },
];

function App() {
  const primaryAxis = useMemo(
    (): AxisOptions<KRPoints> => ({
      getValue: (datum) => datum.date,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<KRPoints>[] => [
      {
        getValue: (datum) => datum.kr,
      },
    ],
    [],
  );

  return (
    <div className="chart-container">
      <Chart
        options={{
          initialWidth: 800,
          initialHeight: 400,
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}

export default App;
