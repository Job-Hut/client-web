import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const applicationStages = [
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "interview",
    label: "Interview",
  },
  {
    value: "offerLetter",
    label: "Offer Letter",
  },
  {
    value: "success",
    label: "Success",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export default function ApplicationStatus() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("submitted");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="applicationStage"
          size={"applicationStage"}
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value
            ? applicationStages.find((framework) => framework.value === value)
                ?.label
            : "Select application stage..."}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {applicationStages.map((application) => (
                <CommandItem
                  className="text-xs"
                  key={application.value}
                  value={application.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === application.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {application.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
