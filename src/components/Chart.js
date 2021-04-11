import React, { useEffect } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchChart } from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// create coin chart data
function createData(time, price) {
  return { time, price };
}

// format timestamp to date
function convertTimeStamp(timestamp) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);
}

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: "auto",
    display: "flex",
    position: "relative",
    justiftContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
}));

const Chart = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.chart.coin);
  const chartData = useSelector((state) => state.chart.chartData);
  const isLoading = useSelector((state) => state.chart.loading);

  const formatChartData = chartData.map((data, idx) =>
    createData(convertTimeStamp(data[0]), data[1].toFixed(2))
  );

  useEffect(() => {
    dispatch(fetchChart());
  }, []);

  if (isLoading) {
    return <CircularProgress disableShrink className={classes.loader} />;
  }

  return (
    <React.Fragment>
      <Title>
        <div className={classes.title}>
          <img src={coin.image} className={classes.logo} />
          {coin.name} ({coin.symbol.toUpperCase()})
        </div>
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={formatChartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            stroke={theme.palette.text.secondary}
          >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Price ($)
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Chart;
