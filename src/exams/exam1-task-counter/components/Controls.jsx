export default function Controls({
  onIncrement, onDecrement, onAddTwo, onReset, incrementDisabled, decrementDisabled,
}) {
  return (
    <div className="row">
      <button className="btn btn--green" onClick={onIncrement} disabled={incrementDisabled}>
        Increment
      </button>
      <button className="btn btn--green" onClick={onAddTwo} disabled={incrementDisabled}>
        Plus two
      </button>
      <button className="btn btn--amber" onClick={onDecrement} disabled={decrementDisabled}>
        Decrement
      </button>
      <button className="btn btn--red" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
