import { CategoryType, markerType } from '@/app/_types/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { SetStateAction } from 'react';
import { useState } from 'react';

interface CategorySelectorProps {
  setCategory: React.Dispatch<SetStateAction<CategoryType>>;
  setSelectedMarker: React.Dispatch<SetStateAction<'' | markerType>>;
}

const CategorySelector = ({setCategory,setSelectedMarker}:CategorySelectorProps) => {
  const [selected, setSelected] = useState<CategoryType>('');
  return (
    <div className="flex flex-col w-auto max-w-md items-start gap-3 z-50">
      <Select onValueChange={(value:CategoryType)=>{setSelected(value)}}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="검색하고 싶은 주변 장소" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CE7">카페</SelectItem>
          <SelectItem value="CT1">문화시설</SelectItem>
          <SelectItem value="PO3">공공기관</SelectItem>
          <SelectItem value="SC4">학교</SelectItem>
          <SelectItem value="AC5">학원</SelectItem>
          <SelectItem value="AD5">숙박</SelectItem>
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="w-auto h-full rounded-lg"
        onClick={() => {setCategory(selected)}}
      >
        Search
      </Button>
    </div>
  );
};

export default CategorySelector;
