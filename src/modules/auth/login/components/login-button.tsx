export const LoginButton = () => {
  return (
    <button className="from-primary to-primary-light text-background hover:from-primary-light hover:to-primary mx-0 hidden h-12 cursor-pointer items-center justify-center space-x-1 rounded-2xl border border-gray-300 bg-linear-to-tl px-7 transition-colors duration-300 md:flex">
      <p className="text-sm font-medium">Login</p>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12H14.88"
          stroke="#eaf4ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6504 8.6499L16.0004 11.9999L12.6504 15.3499"
          stroke="#eaf4ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.5002 13V15.26C21.5002 19.73 19.7102 21.52 15.2402 21.52H15.1102C11.0902 21.52 9.24016 20.07 8.91016 16.53"
          stroke="#eaf4ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.90039 7.55999C9.21039 3.95999 11.0604 2.48999 15.1104 2.48999H15.2404C19.7104 2.48999 21.5004 4.27999 21.5004 8.74999"
          stroke="#eaf4ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
