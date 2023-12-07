import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

interface HalfCircleProgressBarProps {
  total: number;
  percent: number;
}

const HalfCircleProgressBar: React.FC<HalfCircleProgressBarProps> = ({
  total,
  percent,
}) => {
  const data = [
    { name: "progressDone", value: percent },
    { name: "progressToDo", value: 100 - percent },
  ];

  const colors = ["#00B0AD", "#EAECF0"];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={190}
        endAngle={-10}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={0}
        dataKey="value"
        cornerRadius={1000}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={colors[index]} />
        ))}
        <Label
          value={`${total}`}
          position="center"
          fontSize={30}
          fontWeight={600}
          fill="#101828"
          fontFamily="Nunito"
        />
      </Pie>
    </PieChart>
  );
};
export default HalfCircleProgressBar;
