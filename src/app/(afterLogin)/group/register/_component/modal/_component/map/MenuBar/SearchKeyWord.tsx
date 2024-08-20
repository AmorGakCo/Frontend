import { markerType } from '@/app/_types/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useState } from 'react';

const SearchKeyWord = ({
  setKeyword,setSelectedMarker
}: {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMarker: React.Dispatch<React.SetStateAction<markerType|''>>;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  
  const activeSearch = () => {
    setKeyword(inputValue);
    setSelectedMarker('')
  };
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activeSearch();
    }
  };
  return (
    <div className="flex w-10 max-w-sm items-center space-x-2 z-50">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={activeEnter}
        placeholder="장소 이름"
      />
      <Button
        type="submit"
        onClick={activeSearch}
        className="w-auto h-full rounded-lg"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchKeyWord;
