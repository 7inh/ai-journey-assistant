import { ReactNode } from "react";

interface PaddingContainerProps {
  children: ReactNode;
  className?: string;
}

const PaddingContainer = ({
  children,
  className = "",
}: PaddingContainerProps) => {
  return (
    <div className={`px-4 sm:px-6 md:px-8 lg:px-12 w-full ${className}`}>
      {children}
    </div>
  );
};

export default PaddingContainer;
