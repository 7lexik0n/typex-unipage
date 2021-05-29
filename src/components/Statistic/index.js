export default function Statistic(props) {
  const { attempts = 0, mistakes = 0, speed = 0 } = props;
  let accuracy;

  if (attempts > 0) {
    accuracy = mistakes > 0 ? 100 - (100 * mistakes) / attempts : 100;
  } else {
    accuracy = 0;
  }

  return (
    <div>
      <div>STATISTIC</div>
      <div>Accuracy: {accuracy.toFixed(2)}%</div>
      <div>Speed: {speed} symbols/min.</div>
    </div>
  );
}
