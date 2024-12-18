interface RankPlaceholderProps {
  service: 'navy' | 'army' | 'air';
}

export function RankPlaceholder({ service }: RankPlaceholderProps) {
  const baseStyles = "w-32 h-32";

  switch (service) {
    case 'navy':
      return (
        <svg
          className={baseStyles}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Navy rank placeholder - anchor design */}
          <circle cx="50" cy="50" r="45" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
          <path
            d="M50 20v60M35 35h30M35 65h30"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="8" fill="#2563eb" />
        </svg>
      );

    case 'army':
      return (
        <svg
          className={baseStyles}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Army rank placeholder - chevron design */}
          <circle cx="50" cy="50" r="45" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
          <path
            d="M30 60l20-20 20 20M30 45l20-20 20 20"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'air':
      return (
        <svg
          className={baseStyles}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Air Force rank placeholder - eagle wings design */}
          <circle cx="50" cy="50" r="45" stroke="#0284c7" strokeWidth="2" fill="#f0f9ff" />
          <path
            d="M20 50h60M30 40c10-10 30-10 40 0M30 60c10 10 30 10 40 0"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
