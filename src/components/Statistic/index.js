export default function Statistic(props) {
  const { accuracy = 0, speed = 0, onRestart } = props;

  return (
    <div>
      <div className="alert alert-primary">Accuracy: {accuracy}%</div>
      <div className="alert alert-success">Speed: {speed} symbols/min.</div>
      <button type="button" className="btn btn-primary" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}
