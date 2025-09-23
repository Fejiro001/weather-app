import starOne from "../../assets/images/star-1.svg";
import starTwo from "../../assets/images/star-2.svg";
import { useTheme } from "../../hooks";

const BgNoise = () => {
  const { isDark } = useTheme();
  const cloudOneStart = isDark ? "#3E45C5" : "#FFFFFF";
  const cloudOneEnd = isDark ? "#3E46C7" : "#FFFFFF";

  const cloudTwoStart = isDark ? "#332CAD" : "#D8D8D8";
  const cloudTwoEnd = isDark ? "#332DAD" : "#FFFFFF";

  return (
    <>
      {/* CLOUD 1 */}
      <svg
        width="415"
        height="275"
        viewBox="0 0 415 275"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute mask-radial-at-bottom-left h-auto -bottom-6/12 -left-30 md:-left-10 z-10 rotate-10"
      >
        <path
          d="M301.266 42.1735C292.553 44.3476 284.459 47.7249 277.087 52.0518C252.287 12.796 204.282 -8.03699 156.742 3.82599C101.877 17.517 66.917 69.9376 73.7018 124.641C66.973 124.286 60.077 124.907 53.1973 126.624C15.9611 135.915 -6.69548 173.614 2.59097 210.829C11.8774 248.044 49.5896 270.678 86.8258 261.386C95.0776 259.327 102.608 255.868 109.241 251.33C128.027 270.308 156.052 279.186 183.851 272.249C201.701 267.794 216.56 257.529 226.951 243.986C242.486 251.06 260.424 253.141 278.278 248.685C295.411 244.41 309.801 234.787 320.116 222.048C328.46 222.338 336.981 221.511 345.486 219.388C394.451 207.17 424.247 157.591 412.035 108.655C399.823 59.7182 350.231 29.9548 301.266 42.1735Z"
          fill="url(#paint0_linear_233_2449)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_233_2449"
            x1="417.988"
            y1="72.6216"
            x2="141.891"
            y2="90.1671"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={cloudOneStart} />
            <stop offset="1" stopColor={cloudOneEnd} />
          </linearGradient>
        </defs>
      </svg>

      {/* CLOUD 2 */}
      <svg
        width="665"
        height="340"
        viewBox="0 0 665 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute mask-radial-at-bottom-left h-auto -bottom-2/3 -right-2/4 md:-right-1/3"
      >
        <path
          d="M0.198242 187.638C3.0235 150.884 35.1534 123.377 71.9656 126.192C79.961 126.805 87.5205 128.8 94.4263 131.92C95.1568 130.936 95.8896 129.954 96.6523 128.998C96.6721 128.691 96.6746 128.39 96.6969 128.083C99.5197 91.3289 131.65 63.8219 168.462 66.6374C180.303 67.5421 191.175 71.4872 200.399 77.6274C208.973 52.6886 233.581 35.6697 261.142 37.7783C278.643 39.118 293.79 47.9006 303.709 60.7766C316.114 22.9989 353.085 -2.91125 394.567 0.262637C428.574 2.86552 456.598 24.3362 469.177 53.6032C478.638 49.6408 489.152 47.7844 500.086 48.6224C536.898 51.4378 564.455 83.5154 561.635 120.267C561.565 121.167 561.466 122.057 561.362 122.947C568.429 121.728 575.761 121.347 583.239 121.918C631.981 125.648 668.471 168.12 664.737 216.781C660.998 265.443 618.456 301.871 569.709 298.141C568.684 298.062 567.671 297.94 566.656 297.829C555.152 314.415 535.393 324.644 513.789 322.993C498.264 321.806 484.618 314.69 474.882 304.053C446.793 327.492 409.892 340.457 370.507 337.441C343.809 335.399 319.373 326.253 298.851 312.047C285.69 330.406 263.522 341.653 239.33 339.802C216.6 338.064 197.412 325.163 186.711 306.903C174.216 316.2 158.441 321.218 141.683 319.935C108.206 317.372 82.3926 290.614 80.1071 258.146C74.2041 259.335 68.046 259.76 61.7443 259.28C24.9346 256.467 -2.61957 224.392 0.198242 187.638Z"
          fill="url(#paint0_linear_233_2444)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_233_2444"
            x1="60.5"
            y1="148"
            x2="532.631"
            y2="122.913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={cloudTwoStart} />
            <stop offset="1" stopColor={cloudTwoEnd} />
          </linearGradient>
        </defs>
      </svg>

      <img src={starOne} className="absolute right-20 bottom-10" />
      <img src={starOne} className="absolute left-20 top-10" />
      <img src={starTwo} className="absolute left-1/2 bottom-10" />
      <img src={starTwo} className="absolute left-2/3 top-5 h-auto w-3" />
    </>
  );
};

export default BgNoise;
