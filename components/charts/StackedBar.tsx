import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = { color?: string };

const StackedBar = ({ color = "#333" }: Props) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const types = [
    { name: "uv", color: "#82ca9d" },
    { name: "pv", color: "#8884d8" },
  ];

  const [active, setActive] = useState([true, true]);
  const [activeIndex, setActiveIndex] = useState([-1, -1]);
  const [singleTooltip, setSingleTooltip] = useState(false);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={10} />
          <YAxis axisLine={false} fontSize={10} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="p-2 bg-gray-800 opacity-75 text-white">
                    {!singleTooltip && (
                      <>
                        <p className="text-center font-bold opacity-100 p-1">
                          {label}
                        </p>
                        <hr />
                      </>
                    )}
                    {payload.map((d, i) =>
                      singleTooltip ? (
                        activeIndex[i] > -1 && (
                          <div key={i}>
                            <p className="text-center font-bold opacity-100 p-1">
                              {payload[i].name}
                            </p>
                            <hr />
                            <div className="flex gap-2 items-center p-1">
                              <div
                                className="rounded-full w-4 h-4"
                                style={{ backgroundColor: types[i].color }}
                              />
                              <p key={i} className="font-bold">
                                <span className="text-sm font-normal">
                                  {label}
                                </span>{" "}
                                : {payload[i].value}
                              </p>
                            </div>
                          </div>
                        )
                      ) : (
                        <div key={i} className="flex gap-2 items-center p-1">
                          <div
                            className="rounded-full w-4 h-4"
                            style={{ backgroundColor: types[i].color }}
                          />
                          <p key={i} className="font-bold">
                            <span className="text-sm font-normal">
                              {payload[i].name}
                            </span>{" "}
                            : {payload[i].value}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                );
              }
            }}
          />
          <Legend
            onClick={(e) => {
              types.map((t, index) => {
                if (e.dataKey == t.name) {
                  const tempA = [...active];
                  tempA[index] = !tempA[index];
                  setActive(tempA);
                }
              });
            }}
          />
          {types.map((e, i) => (
            <Bar
              key={i}
              dataKey={e.name}
              stackId="a"
              fill={e.color}
              onMouseEnter={(d, index) => {
                const tempAI: number[] = [];
                types.map(() => tempAI.push(-1));
                tempAI[i] = index;
                setActiveIndex(tempAI);
                setSingleTooltip(true);
              }}
              onMouseLeave={() => {
                const tempAI: number[] = [];
                types.map(() => tempAI.push(-1));
                setActiveIndex(tempAI);
                setSingleTooltip(false);
              }}
              hide={!active[i]}
            >
              {data.map((entry, indexB) => (
                <Cell
                  cursor="pointer"
                  fill={indexB === activeIndex[i] ? color : e.color}
                  key={`cell-${indexB}`}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBar;
