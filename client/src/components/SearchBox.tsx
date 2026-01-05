import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import MonthPicker from './MonthPicker';
import { IExchangeFilter } from '../types/filters';
import ChooseMonthsRange from './ChooseMonthsRange';
import ChooseAvgRange from './ChooseAvgRange';

interface SearchBoxProps {
  onSearch: (filters: IExchangeFilter) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filterType, setFilterType] = useState<'month' | 'avg' | 'chooseMonth' | 'none'>('none');
  const [minRate, setMinRate] = useState<number | undefined>(undefined);
  const [maxRate, setMaxRate] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<{ field: 'month' | 'avg'; direction: 'asc' | 'desc'; }>({
    field: 'month',
    direction: 'desc',
  });
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  useEffect(() => {
    onSearch({
      months: selectedMonths,
      startDate: startDate,
      endDate: endDate,
      minAverageRate: minRate,
      maxAverageRate: maxRate,
      sortField: sort.field,
      sortDirection: sort.direction,
    });
  }, [sort, selectedMonths, startDate, endDate, minRate, maxRate]);

  const handleSort = (field: 'month' | 'avg', direction: 'asc' | 'desc') => {
    setSort({ field, direction });
  };

  const handleFilterClick = (type: 'month' | 'avg') => {
    setFilterType(type);
  };

  const handleSearch = () => {
    setIsMonthPickerOpen(isMonthPickerOpen => !isMonthPickerOpen);
  }

  const handleCancel = () => {
    setIsMonthPickerOpen(false);
    setFilterType('none');
  };

  const handleChangeAvgRange = (startValue: number, endValue: number) => {
    setMinRate(startValue);
    setMaxRate(endValue);
  }

  const handleMonthChange = (months: number[]) => {
    setSelectedMonths(months);
    setIsMonthPickerOpen(false);
  };

  const handleChageDateRange = (startMonth: string, endMonth: string) => {
    setStartDate(startMonth);
    setEndDate(endMonth);
  };

  const handleREsetFiltering = () => {
    setSelectedMonths([]);
    setMinRate(undefined);
    setMaxRate(undefined);
    setEndDate('');
    setStartDate('');
    setSort({ field: 'month', direction: 'desc' });
    setFilterType('none');
  };

  return (
    <>
      <div className="search-box">
        <div className="search-inputs">
          <h3>Month</h3>
          <button onClick={() => handleSort('month', 'asc')}>▲</button>
          <button onClick={() => handleSort('month', 'desc')}>▼</button>
          <button onClick={() => handleSearch()}>🔎︎</button>
          <button onClick={() => handleFilterClick('month')}>⌘</button>
        </div>

        <div className="search-inputs">
          <h3>Average Rate</h3>
          <button onClick={() => handleSort('avg', 'asc')}>▲</button>
          <button onClick={() => handleSort('avg', 'desc')}>▼</button>
          <button onClick={() => handleFilterClick('avg')}>⌘</button>
        </div>
        <div className="search-inputs">
          <button onClick={() => handleREsetFiltering()}>reset filtering</button>
        </div>
      </div>
      <div className="choose-container" >
        {isMonthPickerOpen && (
          <MonthPicker
            selectedMonths={selectedMonths}
            onMonthChange={handleMonthChange}
            onCancel={handleCancel}
          />
        )}
        {
          filterType==='avg' && (
            <ChooseAvgRange onConfirm={handleChangeAvgRange} onCancel={handleCancel}/>
          )
        }
        {filterType === 'month' && (
          <ChooseMonthsRange onConfirm={handleChageDateRange} onCancel={handleCancel}/>
        )}
      </div>
    </>
  );
};

export default SearchBox;

// import React, { useState, useEffect } from 'react';
// import './SearchBox.css';
// import FilterRangePicker from './FilterRangePicker';  // קומפוננטה נפרדת
// import { IExchangeFilter } from '../types/filters';

// interface SearchBoxProps {
//   onSearch: (filters: IExchangeFilter) => void;
// }

// const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
//   const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [filterType, setFilterType] = useState<'month' | 'avg' | 'chooseMonth' | 'none'>('none');
//   const [minRate, setMinRate] = useState<number | undefined>(undefined);
//   const [maxRate, setMaxRate] = useState<number | undefined>(undefined);
//   const [sort, setSort] = useState<{ field: 'month' | 'avg'; direction: 'asc' | 'desc'; }>({
//     field: 'month',
//     direction: 'desc',
//   });
//   const [isFilterRangePickerOpen, setIsFilterRangePickerOpen] = useState(false);

//   useEffect(() => {
//     onSearch({
//       months: selectedMonths,
//       startDate: startDate,
//       endDate: endDate,
//       minAverageRate: minRate,
//       maxAverageRate: maxRate,
//       sortField: sort.field,
//       sortDirection: sort.direction,
//     });
//   }, [sort, selectedMonths, startDate, endDate, minRate, maxRate]);

//   const handleSort = (field: 'month' | 'avg', direction: 'asc' | 'desc') => {
//     setSort({ field, direction });
//   };

//   const handleFilterClick = (type: 'month' | 'avg') => {
//     setFilterType(type);
//     if (type === 'month') {
//       setIsFilterRangePickerOpen(true);  // פותחים את ה-FilterRangePicker לחודשים
//     } else if (type === 'avg') {
//       setMinRate(undefined);
//       setMaxRate(undefined);
//     }
//   };

//   const handleSearch = () => {
//     setIsFilterRangePickerOpen(isFilterRangePickerOpen => !isFilterRangePickerOpen);
//   };

//   const handleCancel = () => {
//     setSelectedMonths([]);
//     setIsFilterRangePickerOpen(false);
//   };

//   const handleMonthChange = (months: number[]) => {
//     setSelectedMonths(months);
//     setIsFilterRangePickerOpen(false);
//   };

//   const handleResetFiltering = () => {
//     setSelectedMonths([]);
//     setMinRate(undefined);
//     setMaxRate(undefined);
//     setEndDate('');
//     setStartDate('');
//     setSort({ field: 'month', direction: 'desc' });
//     setFilterType('none');
//   };

//   const handleFilterRange = (range: { start: number; end: number }) => {
//     setStartDate(`${range.start}`);
//     setEndDate(`${range.end}`);
//     setIsFilterRangePickerOpen(false);
//   };

//   return (
//     <>
//       <div className="search-box">
//         <div className="search-inputs">
//           <h3>Month</h3>
//           <button onClick={() => handleSort('month', 'asc')}>▲</button>
//           <button onClick={() => handleSort('month', 'desc')}>▼</button>
//           <button onClick={() => handleSearch()}>🔎︎</button>
//           <button onClick={() => handleFilterClick('month')}>⌘</button>
//         </div>

//         <div className="search-inputs">
//           <h3>Average Rate</h3>
//           <button onClick={() => handleSort('avg', 'asc')}>▲</button>
//           <button onClick={() => handleSort('avg', 'desc')}>▼</button>
//           <button onClick={() => handleFilterClick('avg')}>⌘</button>
//         </div>

//         <div className="search-inputs">
//           <button onClick={() => handleResetFiltering()}>reset filtering</button>
//         </div>
//       </div>
//       <div className="choose-container">
//         {isFilterRangePickerOpen && filterType === 'month' && (
//           <FilterRangePicker
//             selectedRange={{ start: 1, end: 12 }}
//             onChooseRange={handleFilterRange}
//             onCancel={handleCancel}
//           />
//         )}
//         {filterType === 'avg' && (
//           <div className="average-rate-filter">
//             <h3>Set Average Rate Range</h3>
//             <input
//               type="number"
//               placeholder="Min Average Rate"
//               value={minRate || ''}
//               onChange={(e) => setMinRate(parseFloat(e.target.value) || undefined)}
//             />
//             <input
//               type="number"
//               placeholder="Max Average Rate"
//               value={maxRate || ''}
//               onChange={(e) => setMaxRate(parseFloat(e.target.value) || undefined)}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchBox;
