import errorIcon from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";

const ErrorPage = () => {
  return (
    <>
      <section className="main space-y-8 xl:space-y-12 flex flex-col items-center text-center gap-6 lg:mt-[1.125rem]">
        <img
          src={errorIcon}
          alt="Error icon"
          className="mx-auto h-auto w-[2.625rem]"
        />
        <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] text-preset-2 not-dark:text-(--neutral-900)">
          Something went wrong
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-preset-5 font-medium text-(--neutral-800) dark:text-(--neutral-200)">
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-(--neutral-800) hover:bg-(--neutral-700) px-4 py-3.5 flex gap-2.5 rounded-lg group"
        >
          <img
            className="group-hover:rotate-180 duration-500 transition-transform"
            src={retryIcon}
          />
          <span className="text-preset-7">Retry</span>
        </button>
      </section>
    </>
  );
};

export default ErrorPage;
