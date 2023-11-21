import { useEffect, useMemo, useState } from "react";
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

type Data = {
  timestamp: number;
  KR: number;
};

function App() {
  const [data, setData] = useState<Series[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw = await fetch(
          "https://raw.githubusercontent.com/alcpereira/kr-scraper/main/data.json",
        );
        const json: Data[] = await raw.json();
        return json;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const formatData = async () => {
      const jsonData = await fetchData();
      if (!jsonData) return;

      const formattedData = [
        {
          label: "Zombie_Area51",
          data: [...jsonData].map((v) => ({
            date: new Date(v.timestamp * 1000),
            kr: v.KR,
          })),
        },
      ];

      setData(formattedData);
    };
    formatData();
  }, []);

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
      {data.length && (
        <Chart
          options={{
            initialWidth: 800,
            initialHeight: 400,
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      )}
    </div>
  );
}

export default App;
