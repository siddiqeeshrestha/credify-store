import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductOption } from '@/lib/api';

interface ProductOptionsProps {
  productId: string;
  options: ProductOption[];
  selectedValues: Record<string, string>;
  onOptionChange: (key: string, value: string) => void;
  className?: string;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  productId,
  options,
  selectedValues,
  onOptionChange,
  className = ''
}) => {
  if (!options || options.length === 0) {
    return null;
  }

  const renderSelectOption = (option: ProductOption) => {
    const selectedValue = selectedValues[option.key];
    
    return (
      <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
          {option.name} {option.required && <span className="text-red-500">*</span>} &gt;
        </div>

        <div className="grid grid-cols-4 gap-5 w-full max-w-[475px]">
          {option.options.map((selectOption, index) => {
            const isSelected = selectedValue === selectOption.value;
            const basePrice = 0; // TODO: Get from product
            const finalPrice = basePrice + (selectOption.priceModifier || 0);
            
            return (
              <div
                key={index}
                className="w-[108px] h-[38px] flex flex-col items-start pt-2.5 pb-0 px-0"
              >
                <Button
                  variant="outline"
                  className={`flex flex-col w-[108px] h-8 items-center justify-center px-[21px] py-px relative mb-[-4.00px] rounded-[200px] border border-solid border-[#dbdbdb] shadow-[0px_1px_2px_#0000000d] ${
                    isSelected
                      ? "bg-[#98042d] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#000000d9]"
                  }`}
                  onClick={() => onOptionChange(option.key, selectOption.value)}
                >
                  <div className="relative flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-normal text-sm text-center tracking-[0] leading-[26px] whitespace-nowrap">
                    {selectOption.label}
                    {selectOption.priceModifier && selectOption.priceModifier !== 0 && (
                      <span className="ml-1 text-xs">
                        ({selectOption.priceModifier > 0 ? '+' : ''}${selectOption.priceModifier})
                      </span>
                    )}
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInputOption = (option: ProductOption) => {
    const selectedValue = selectedValues[option.key] || '';
    
    return (
      <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
          {option.name} {option.required && <span className="text-red-500">*</span>} &gt;
        </div>

        <div className="flex flex-col h-[55px] items-start gap-4 relative self-stretch w-full">
          <div className="flex w-[330px] h-[55px] items-center gap-[7px] px-4 py-3 relative bg-[#ffffff] rounded-xl border border-solid border-[#191a23]">
            <div className="flex items-center gap-[7px] relative flex-1 grow">
              <img
                className="relative flex-[0_0_auto]"
                alt="Icon"
                src="/figmaAssets/icon.svg"
              />

              <Input
                placeholder={option.placeholder || `Enter ${option.name.toLowerCase()}`}
                value={selectedValue}
                onChange={(e) => onOptionChange(option.key, e.target.value)}
                className="relative w-[185.14px] [font-family:'Poppins',Helvetica] font-medium text-black text-[13px] tracking-[0] leading-[normal] border-0 p-0 h-auto bg-transparent"
                required={option.required}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckboxOption = (option: ProductOption) => {
    const selectedValue = selectedValues[option.key] === 'true';
    
    return (
      <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id={`option-${option.key}`}
            checked={selectedValue}
            onChange={(e) => onOptionChange(option.key, e.target.checked.toString())}
            className="h-4 w-4 text-[#98042d] focus:ring-[#98042d] border-gray-300 rounded"
            required={option.required}
          />
          <label
            htmlFor={`option-${option.key}`}
            className="[font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal] cursor-pointer"
          >
            {option.name} {option.required && <span className="text-red-500">*</span>}
          </label>
        </div>
        {option.placeholder && (
          <p className="text-sm text-gray-600 ml-7">{option.placeholder}</p>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-start gap-8 ${className}`}>
      {options
        .filter(option => option.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((option) => {
          switch (option.type) {
            case 'select':
              return (
                <div key={option.id} className="w-full">
                  {renderSelectOption(option)}
                </div>
              );
            case 'input':
              return (
                <div key={option.id} className="w-full">
                  {renderInputOption(option)}
                </div>
              );
            case 'checkbox':
              return (
                <div key={option.id} className="w-full">
                  {renderCheckboxOption(option)}
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};