const Toast = ({ children }) => {
  return (
    <div className="flex place-items-center">
      <span className="font-medium text-base md:text-lg text-wrap">
        {children}
      </span>
    </div>
  );
};

export default Toast;
