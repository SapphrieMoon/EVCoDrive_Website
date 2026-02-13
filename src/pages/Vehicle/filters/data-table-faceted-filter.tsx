import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, PlusCircle } from "lucide-react";


interface FacetedFilterProps {
    title?: string
    options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[]
    value?: string[]
    onChange: (value?: string[]) => void
}

export function DataTableFacetedFilter({ title, options, value = [], onChange }: FacetedFilterProps) {
    const selectedValues = new Set(value)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 border-dashed">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            {/* Hiện số lượng nếu chọn nhiều trên mobile */}
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.size}
                            </Badge>
                            {/* Hiện tên các option trên desktop */}
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        Đã chọn {selectedValues.size}
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge key={option.value} variant="secondary" className="rounded-sm px-1 font-normal">
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            const newValues = new Set(selectedValues)
                                            if (isSelected) {
                                                newValues.delete(option.value)
                                            } else {
                                                newValues.add(option.value)
                                            }
                                            const filterValues = Array.from(newValues)
                                            onChange(filterValues.length > 0 ? filterValues : undefined)
                                        }}
                                    >
                                        <div className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                                        )}>
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => onChange(undefined)}
                                        className="justify-center text-center text-red-500 font-medium"
                                    >
                                        Xóa tất cả bộ lọc
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}