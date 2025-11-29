import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface ProductOptionData {
  id?: string;
  productId?: string;
  type: 'select' | 'input' | 'checkbox';
  name: string;
  key: string;
  required: boolean;
  placeholder?: string;
  options: {
    label: string;
    value: string;
    priceModifier?: number;
    description?: string;
  }[];
  sortOrder: number;
  isActive: boolean;
}

interface ProductOptionsManagerProps {
  productId?: string;
  options: ProductOptionData[];
  onChange: (options: ProductOptionData[]) => void;
  className?: string;
}

export const ProductOptionsManager: React.FC<ProductOptionsManagerProps> = ({
  productId,
  options,
  onChange,
  className = ''
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const defaultOption: ProductOptionData = {
    type: 'select',
    name: 'Select Amount',
    key: 'amount',
    required: true,
    placeholder: '',
    options: [],
    sortOrder: 0,
    isActive: true,
  };

  const handleAddOption = () => {
    const newOption = {
      ...defaultOption,
      sortOrder: options.length,
    };
    onChange([...options, newOption]);
    setEditingIndex(options.length);
  };

  const handleUpdateOption = (index: number, updates: Partial<ProductOptionData>) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], ...updates };
    onChange(updatedOptions);
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onChange(updatedOptions);
    setEditingIndex(null);
  };

  const handleMoveOption = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= options.length) return;

    const updatedOptions = [...options];
    [updatedOptions[index], updatedOptions[newIndex]] = [updatedOptions[newIndex], updatedOptions[index]];
    
    // Update sort orders
    updatedOptions.forEach((option, i) => {
      option.sortOrder = i;
    });

    onChange(updatedOptions);
  };

  const handleAddSelectOption = (optionIndex: number) => {
    const option = options[optionIndex];
    const newSelectOption = {
      label: '',
      value: '',
      priceModifier: 0,
      description: '',
    };
    
    handleUpdateOption(optionIndex, {
      options: [...option.options, newSelectOption]
    });
  };

  const handleUpdateSelectOption = (
    optionIndex: number, 
    selectIndex: number, 
    updates: Partial<typeof options[0]['options'][0]>
  ) => {
    const option = options[optionIndex];
    const updatedSelectOptions = [...option.options];
    updatedSelectOptions[selectIndex] = { ...updatedSelectOptions[selectIndex], ...updates };
    
    handleUpdateOption(optionIndex, {
      options: updatedSelectOptions
    });
  };

  const handleDeleteSelectOption = (optionIndex: number, selectIndex: number) => {
    const option = options[optionIndex];
    const updatedSelectOptions = option.options.filter((_, i: number) => i !== selectIndex);
    
    handleUpdateOption(optionIndex, {
      options: updatedSelectOptions
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Product Options</h3>
        <button
          type="button"
          onClick={handleAddOption}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Option
        </button>
      </div>

      {options.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p>No options configured. Add your first option to get started.</p>
          <p className="text-sm mt-1">Options allow customers to select variants like amounts, sizes, or custom fields.</p>
        </div>
      )}

      <div className="space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {option.type}
                </span>
                <span className="font-medium text-gray-900">{option.name || 'Untitled Option'}</span>
                {option.required && (
                  <span className="text-xs text-red-600">Required</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleMoveOption(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveOption(index, 'down')}
                  disabled={index === options.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  className="p-1 text-indigo-600 hover:text-indigo-900"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteOption(index)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {editingIndex === index && (
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => handleUpdateOption(index, { name: e.target.value })}
                      placeholder="e.g., Select Amount, IGN#TAG"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Key</label>
                    <input
                      type="text"
                      value={option.key}
                      onChange={(e) => handleUpdateOption(index, { key: e.target.value })}
                      placeholder="e.g., amount, ign_tag"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={option.type}
                      onChange={(e) => handleUpdateOption(index, { type: e.target.value as any })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="select">Select Dropdown</option>
                      <option value="input">Text Input</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>
                  
                  {option.type === 'input' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Placeholder</label>
                      <input
                        type="text"
                        value={option.placeholder || ''}
                        onChange={(e) => handleUpdateOption(index, { placeholder: e.target.value })}
                        placeholder="e.g., Enter your IGN#TAG"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={option.required}
                      onChange={(e) => handleUpdateOption(index, { required: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Required</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={option.isActive}
                      onChange={(e) => handleUpdateOption(index, { isActive: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                </div>

                {option.type === 'select' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      <button
                        type="button"
                        onClick={() => handleAddSelectOption(index)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Option
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {option.options.map((selectOption: any, selectIndex: number) => (
                        <div key={selectIndex} className="grid grid-cols-4 gap-2 items-center p-3 bg-gray-50 rounded-md">
                          <input
                            type="text"
                            value={selectOption.label}
                            onChange={(e) => handleUpdateSelectOption(index, selectIndex, { label: e.target.value })}
                            placeholder="Label (e.g., 475 VP)"
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            value={selectOption.value}
                            onChange={(e) => handleUpdateSelectOption(index, selectIndex, { value: e.target.value })}
                            placeholder="Value (e.g., 475)"
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="number"
                            step="0.01"
                            value={selectOption.priceModifier || 0}
                            onChange={(e) => handleUpdateSelectOption(index, selectIndex, { priceModifier: parseFloat(e.target.value) || 0 })}
                            placeholder="Price +/-"
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteSelectOption(index, selectIndex)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      {option.options.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No options added yet. Click "Add Option" to get started.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};