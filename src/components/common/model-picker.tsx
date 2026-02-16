import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function ModelPicker({ value, onChange, models, isLoading }: any) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between font-normal"
                    disabled={isLoading}
                >
                    {value
                        ? models?.find((m: any) => m.vehicleModelId === value)?.name
                        : "Chọn dòng xe..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Tìm dòng xe..." />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy dòng xe.</CommandEmpty>
                        <CommandGroup>
                            {models?.map((model: any) => (
                                <CommandItem
                                    key={model.vehicleModelId}
                                    value={model.name}
                                    onSelect={() => {
                                        onChange(model.vehicleModelId === value ? undefined : model.vehicleModelId);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", value === model.vehicleModelId ? "opacity-100" : "opacity-0")} />
                                    {model.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}