import * as React from "react";
import { Button } from "@nukehub/docs-kit/components/ui/Button.tsx";
import { Input } from "@nukehub/docs-kit/components/ui/Input.tsx";
import { Label } from "@nukehub/docs-kit/components/ui/Label.tsx";
import { Textarea } from "@nukehub/docs-kit/components/ui/Textarea.tsx";
import { Checkbox } from "@nukehub/docs-kit/components/ui/Checkbox.tsx";
import { RadioGroup } from "@nukehub/docs-kit/components/ui/RadioGroup.tsx";
import { Select } from "@nukehub/docs-kit/components/ui/Select.tsx";
import { Switch } from "@nukehub/docs-kit/components/ui/Switch.tsx";
import { Combobox } from "@nukehub/docs-kit/components/ui/Combobox.tsx";
import { MultiSelect } from "@nukehub/docs-kit/components/ui/MultiSelect.tsx";
import { Slider } from "@nukehub/docs-kit/components/ui/Slider.tsx";
import { SearchInput } from "@nukehub/docs-kit/components/ui/SearchInput.tsx";
import { Badge } from "@nukehub/docs-kit/components/ui/Badge.tsx";
import { Skeleton } from "@nukehub/docs-kit/components/ui/Skeleton.tsx";
import { Calendar } from "@nukehub/docs-kit/components/ui/Calendar.tsx";
import { TimePicker } from "@nukehub/docs-kit/components/ui/TimePicker.tsx";
import { DateRangePicker } from "@nukehub/docs-kit/components/ui/DateRangePicker.tsx";
import { Modal } from "@nukehub/docs-kit/components/ui/Modal.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@nukehub/docs-kit/components/ui/Dialog.tsx";
import { useConfirmDialog } from "@nukehub/docs-kit/components/ui/ConfirmDialog.tsx";
import { Toaster, useToast } from "@nukehub/docs-kit/components/ui/Toaster.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@nukehub/docs-kit/components/ui/Card.tsx";
import { Tooltip } from "@nukehub/docs-kit/components/ui/Tooltip.tsx";
import { Logo } from "@nukehub/docs-kit/components/ui/Logo.tsx";
import { Image } from "@nukehub/docs-kit/components/ui/Image.tsx";

function Section({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 rounded-xl border border-border bg-card/50 p-6">{children}</div>;
}

function ButtonSection() {
  return (
    <Section>
      <div className="flex flex-wrap gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button loading>Loading</Button>
      </div>
    </Section>
  );
}

function InputLabelSection() {
  const [value, setValue] = React.useState("");
  return (
    <Section>
      <div className="space-y-2">
        <Label htmlFor="showcase-input">Email address</Label>
        <Input
          id="showcase-input"
          type="email"
          placeholder="you@example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Section>
  );
}

function TextareaLabelSection() {
  const [value, setValue] = React.useState("Type something here…");
  return (
    <Section>
      <div className="space-y-2">
        <Label htmlFor="showcase-textarea">Description</Label>
        <Textarea id="showcase-textarea" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </Section>
  );
}

function CheckboxSection() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Section>
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Enable notifications
      </Checkbox>
    </Section>
  );
}

function RadioGroupSection() {
  const [value, setValue] = React.useState("astro");
  return (
    <Section>
      <RadioGroup
        value={value}
        onChange={setValue}
        options={[
          { value: "astro", label: "Astro" },
          { value: "react", label: "React" },
          { value: "svelte", label: "Svelte", disabled: true },
          { value: "vue", label: "Vue" },
        ]}
      />
    </Section>
  );
}

function SelectSection() {
  const [value, setValue] = React.useState("orange");
  return (
    <Section>
      <Select
        value={value}
        onChange={setValue}
        options={[
          { value: "red", label: "Red" },
          { value: "orange", label: "Orange" },
          { value: "green", label: "Green" },
          { value: "cyan", label: "Cyan" },
          { value: "purple", label: "Purple" },
        ]}
        placeholder="Pick an accent"
      />
    </Section>
  );
}

function SwitchSection() {
  const [on, setOn] = React.useState(true);
  return (
    <Section>
      <div className="flex items-center gap-3">
        <Switch checked={on} onCheckedChange={setOn} />
        <span className="text-sm text-foreground">{on ? "On" : "Off"}</span>
      </div>
    </Section>
  );
}

function ComboboxSection() {
  const [value, setValue] = React.useState("");
  return (
    <Section>
      <Combobox
        value={value}
        onChange={setValue}
        options={[
          { value: "astro", label: "Astro" },
          { value: "react", label: "React" },
          { value: "svelte", label: "Svelte" },
          { value: "vue", label: "Vue" },
          { value: "solid", label: "Solid" },
        ]}
        placeholder="Pick a framework"
      />
    </Section>
  );
}

function MultiSelectSection() {
  const [value, setValue] = React.useState<string[]>(["react"]);
  return (
    <Section>
      <MultiSelect
        value={value}
        onChange={setValue}
        options={[
          { value: "astro", label: "Astro" },
          { value: "react", label: "React" },
          { value: "svelte", label: "Svelte" },
          { value: "vue", label: "Vue" },
          { value: "solid", label: "Solid" },
        ]}
        placeholder="Pick frameworks"
      />
    </Section>
  );
}

function SliderSection() {
  const [value, setValue] = React.useState(42);
  return (
    <Section>
      <div className="space-y-2">
        <Slider value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
    </Section>
  );
}

function SearchInputSection() {
  const [value, setValue] = React.useState("");
  return (
    <Section>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        placeholder="Search components..."
      />
    </Section>
  );
}

function BadgeSkeletonSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </Section>
  );
}

function CalendarSection() {
  const [date, setDate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Section>
      <div className="relative inline-block">
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground hover:bg-accent"
        >
          {date || "Pick a date"}
        </button>
        <Calendar
          value={date}
          onSelect={(d) => {
            setDate(d);
            setOpen(false);
          }}
          open={open}
          onClose={() => setOpen(false)}
          anchorRef={anchorRef}
        />
      </div>
    </Section>
  );
}

function TimePickerSection() {
  const [hour, setHour] = React.useState(10);
  const [minute, setMinute] = React.useState(30);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Section>
      <div className="relative inline-block">
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground hover:bg-accent"
        >
          {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
        </button>
        <TimePicker
          hour={hour}
          minute={minute}
          onChange={(h, m) => {
            setHour(h);
            setMinute(m);
          }}
          open={open}
          onClose={() => setOpen(false)}
          anchorRef={anchorRef}
        />
      </div>
    </Section>
  );
}

function DateRangePickerSection() {
  const [range, setRange] = React.useState({ from: "", to: "" });
  return (
    <Section>
      <DateRangePicker value={range} onChange={setRange} />
    </Section>
  );
}

function ModalSection() {
  const [open, setOpen] = React.useState(false);
  return (
    <Section>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Example Modal">
        <div className="px-6 pb-6">
          <p className="text-sm text-muted-foreground">
            This is a centered modal with an overlay and focus trap.
          </p>
          <div className="mt-4 flex justify-end">
            <Button size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </Section>
  );
}

function DialogSection() {
  const [open, setOpen] = React.useState(false);
  return (
    <Section>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compound Dialog</DialogTitle>
            <DialogDescription>
              Built with DialogContent, Header, Title, Description, Footer, and Close.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Dialogs use the kit's focus trap and Escape-to-close behavior.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Continue</Button>
          </DialogFooter>
          <DialogClose onClick={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Section>
  );
}

function ConfirmDialogSection() {
  const { confirm, dialog } = useConfirmDialog();
  const { info } = useToast();
  const handleConfirm = async () => {
    const ok = await confirm({
      title: "Delete item?",
      description: "This action cannot be undone.",
      variant: "danger",
      confirmLabel: "Delete",
    });
    info(ok ? "Deleted" : "Cancelled", ok ? "The item was removed." : "No changes were made.");
  };
  return (
    <Section>
      {dialog}
      <Button variant="outline" onClick={handleConfirm}>
        Show Confirm
      </Button>
    </Section>
  );
}

function ToastSection() {
  const { success, error, info } = useToast();
  return (
    <Section>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => success("Success", "Operation completed.")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => error("Error", "Something went wrong.")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => info("Info", "Here is a quick tip.")}>
          Info
        </Button>
      </div>
    </Section>
  );
}

function CardSection() {
  return (
    <Section>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>A styled container for grouped content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cards use the card background, border, and foreground tokens.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </Section>
  );
}

function TooltipSection() {
  return (
    <Section>
      <Tooltip content="This is a tooltip">
        <Button variant="outline">Hover or focus me</Button>
      </Tooltip>
    </Section>
  );
}

function LogoSection() {
  return (
    <Section>
      <div className="flex items-center gap-4">
        <Logo size={24} />
        <Logo size={40} />
        <Logo size={64} />
      </div>
    </Section>
  );
}

function ImageSection() {
  return (
    <Section>
      <Image
        src="https://placehold.co/600x400/1a1a1a/ffffff?text=Showcase+Image"
        alt="Showcase placeholder"
        aspect="video"
        rounded="lg"
        wrapperClassName="max-w-md"
      />
    </Section>
  );
}

const SECTIONS: { key: string; title: string; Component: React.FC }[] = [
  { key: "button", title: "Button", Component: ButtonSection },
  { key: "input-label", title: "Input + Label", Component: InputLabelSection },
  { key: "textarea-label", title: "Textarea + Label", Component: TextareaLabelSection },
  { key: "checkbox", title: "Checkbox", Component: CheckboxSection },
  { key: "radio-group", title: "RadioGroup", Component: RadioGroupSection },
  { key: "select", title: "Select", Component: SelectSection },
  { key: "switch", title: "Switch", Component: SwitchSection },
  { key: "combobox", title: "Combobox", Component: ComboboxSection },
  { key: "multi-select", title: "MultiSelect", Component: MultiSelectSection },
  { key: "slider", title: "Slider", Component: SliderSection },
  { key: "search-input", title: "SearchInput", Component: SearchInputSection },
  { key: "badge-skeleton", title: "Badge + Skeleton", Component: BadgeSkeletonSection },
  { key: "calendar", title: "Calendar", Component: CalendarSection },
  { key: "time-picker", title: "TimePicker", Component: TimePickerSection },
  { key: "date-range-picker", title: "DateRangePicker", Component: DateRangePickerSection },
  { key: "modal", title: "Modal", Component: ModalSection },
  { key: "dialog", title: "Dialog", Component: DialogSection },
  { key: "confirm-dialog", title: "ConfirmDialog", Component: ConfirmDialogSection },
  { key: "toast", title: "Toast", Component: ToastSection },
  { key: "card", title: "Card", Component: CardSection },
  { key: "tooltip", title: "Tooltip", Component: TooltipSection },
  { key: "logo", title: "Logo", Component: LogoSection },
  { key: "image", title: "Image", Component: ImageSection },
];

export interface UiShowcaseProps {
  section?: string;
}

export default function UiShowcase({ section }: UiShowcaseProps) {
  if (section) {
    const found = SECTIONS.find((s) => s.key === section);
    if (!found) return null;
    const { Component } = found;
    return <Component />;
  }

  return (
    <div className="space-y-8">
      {SECTIONS.map(({ key, title, Component }) => (
        <div key={key}>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{title}</h2>
          <Component />
        </div>
      ))}
    </div>
  );
}
