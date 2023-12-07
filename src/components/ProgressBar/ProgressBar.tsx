import classNames from "classnames";
type props = {
  percentage: number;
  bgcolor: string;
  label?: string;
  value?: string;
  className?: string;
};
const ProgressBar = ({
  percentage,
  bgcolor,
  label,
  value,
  className,
}: props) => {
  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <div className="text-darkgray text-base font-primary font-medium">
          {label}
        </div>
        <div className="text-darkgray text-base font-primary font-medium">
          {value}
        </div>
      </div>
      <div
        className={classNames(
          "h-2 w-full bg-opacity-20 rounded overflow-hidden",
          bgcolor
        )}
      >
        <div
          style={{ width: `${percentage}%` }}
          className={classNames(`h-full rounded-xl`, bgcolor)}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
