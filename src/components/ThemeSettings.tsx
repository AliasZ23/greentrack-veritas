
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type ColorTheme = 'default' | 'ocean' | 'eco' | 'warm';

interface ThemeSettingsProps {
  selectedTheme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
}

export const ThemeSettings = ({ selectedTheme, onChange }: ThemeSettingsProps) => {
  const themes = [
    {
      id: 'default',
      name: 'Default',
      color: 'bg-primary',
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      color: 'bg-ocean-blue-500',
    },
    {
      id: 'eco',
      name: 'Eco Green',
      color: 'bg-eco-green-500',
    },
    {
      id: 'warm',
      name: 'Warm Gray',
      color: 'bg-warm-gray-500',
    },
  ];

  return (
    <RadioGroup
      value={selectedTheme}
      onValueChange={(value) => onChange(value as ColorTheme)}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {themes.map((theme) => (
        <div key={theme.id} className="relative">
          <RadioGroupItem
            value={theme.id}
            id={`theme-${theme.id}`}
            className="sr-only"
          />
          <Label
            htmlFor={`theme-${theme.id}`}
            className={cn(
              "flex flex-col items-center gap-2 rounded-md border-2 p-4 cursor-pointer transition-all",
              selectedTheme === theme.id
                ? "border-primary"
                : "border-transparent hover:border-muted"
            )}
          >
            <div className={cn("h-20 w-full rounded-md", theme.color)} />
            <span className="text-center font-medium">{theme.name}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ThemeSettings;
