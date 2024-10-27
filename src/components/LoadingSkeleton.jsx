function LoadingSkeleton({ total = 6 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      {Array.from({ length: total }).map((_, index) => {
        return (
          <div className="card" key={index}>
            <div className="card__skeleton card__title"></div>
            <div className="card__skeleton card__description"> </div>
          </div>
        );
      })}
    </div>
  );
}
export default LoadingSkeleton;
