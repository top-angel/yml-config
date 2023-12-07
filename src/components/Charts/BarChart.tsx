import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Label,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  value: number;
}

const myData: DataPoint[] = [
  { month: "Jan", value: 55 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 72 },
  { month: "Apr", value: 37 },
  { month: "May", value: 20 },
  { month: "Jun", value: 89 },
  { month: "Jul", value: 14 },
  { month: "Aug", value: 40 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 20 },
  { month: "Dec", value: 40 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="earnings ">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

interface ChartsProps {
  data?: DataPoint[];
}

const BarChartCom = ({ data = myData }: ChartsProps) => {
  return (
    <ResponsiveContainer width="100%" height={196}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{
            fontFamily: "Nunito",
            color: "#475467",
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          <Label
            value="Month"
            offset={0}
            position="insideBottom"
            fontSize={12}
            fontWeight={500}
            fill="#475467"
            fontFamily="Nunito"
            dy={10}
          />
        </XAxis>
        <YAxis
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          axisLine={false}
          tickLine={false}
          tick={{
            fontFamily: "Nunito",
            color: "#344054",
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          <Label
            value="Allocated Rewards"
            angle={-90}
            position="insideLeft"
            fontSize={12}
            fontWeight={500}
            fill="#475467"
            fontFamily="Nunito"
            dy={40}
          />
        </YAxis>
        <CartesianGrid vertical={false} />
        <CartesianGrid horizontal={true} strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          fill="#00B0AD"
          barSize={32}
          radius={[7, 7, 0, 0]}
        />
        <ReferenceLine y={0} stroke="transparent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCom;
