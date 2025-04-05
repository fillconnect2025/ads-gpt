
import React from 'react';

interface DividerProps {
  from?: string;
  via?: string;
  to?: string;
}

const Divider: React.FC<DividerProps> = ({ 
  from = "blue-400", 
  via = "purple-500", 
  to = "pink-500" 
}) => {
  return (
    <div className={`h-6 bg-gradient-to-r from-${from} via-${via} to-${to}`}></div>
  );
};

export default Divider;
