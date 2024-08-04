import React from 'react';
import { Company } from '@/constants/tmpCompanies';
import { IoSearch } from 'react-icons/io5';

interface CompanyListProps {
  companies: Company[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectCompany: (ccompanyName: String) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  selectedIndex,
  setSelectedIndex,
  onSelectCompany,
}) => {
  const handleItemClick = (companyName: String) => {
    onSelectCompany(companyName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, companies.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (companies[selectedIndex]) {
          handleItemClick(companies[selectedIndex].name);
        }
        break;
      case 'Escape':
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {companies.map((company, index) => (
        <div
          className={`px-4 py-2 border-b last:border-b-0 cursor-pointer transition-colors duration-200 ease-in-out ${
            selectedIndex === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100'
          }`}
          key={company.id}
          onClick={() => handleItemClick(company.name)}
          onMouseEnter={() => setSelectedIndex(index)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {company.name}
        </div>
      ))}
    </div>
  );
};

export default CompanyList;