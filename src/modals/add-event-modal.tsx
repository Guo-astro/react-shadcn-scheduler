import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";

import { useModalContext } from "../providers/modal-provider";
import { useScheduler } from "../providers/schedular-provider";
import {
  eventSchema,
  type EventFormData,
  type Variant,
  type ModalEvent,
} from "../scheduler-app.types";
import SelectDate from "../components/select-date";

// ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function AddEventModal({
  CustomAddEventModal,
}: {
  CustomAddEventModal?: React.FC<{
    register: ReturnType<typeof useForm<EventFormData>>["register"];
    errors: ReturnType<typeof useForm<EventFormData>>["formState"]["errors"];
  }>;
}) {
  const { onClose, data } = useModalContext();

  const [selectedColor, setSelectedColor] = useState<string>(
    getEventColor(data?.variant || "primary")
  );

  const typedData = data as ModalEvent;

  const { handlers } = useScheduler();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      variant: data?.variant || "primary",
      color: data?.color || "blue",
    },
  });

  // Reset the form on initialization
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description || "",
        startDate: data.startDate,
        endDate: data.endDate,
        variant: data.variant || "primary",
        color: data.color || "blue",
      });
    }
  }, [data, reset]);

  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
  ];

  function getEventColor(variant: Variant) {
    switch (variant) {
      case "primary":
        return "blue";
      case "danger":
        return "red";
      case "success":
        return "green";
      case "warning":
        return "yellow";
      default:
        return "blue";
    }
  }

  function getEventStatus(color: string) {
    switch (color) {
      case "blue":
        return "primary";
      case "red":
        return "danger";
      case "green":
        return "success";
      case "yellow":
        return "warning";
      default:
        return "default";
    }
  }

  const onSubmit: SubmitHandler<EventFormData> = (formData) => {
    const newEvent: ModalEvent = {
      id: nanoid(),
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      variant: formData.variant,
      description: formData.description,
    };

    if (!typedData?.id) {
      handlers.handleAddEvent(newEvent);
    } else {
      handlers.handleUpdateEvent(newEvent, typedData.id);
    }
    onClose(); // Close the modal after submission
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {CustomAddEventModal ? (
        <CustomAddEventModal register={register} errors={errors} />
      ) : (
        <>
          <Input
            {...register("title")}
            placeholder="Enter event name"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}

          <Textarea
            {...register("description")}
            placeholder="Enter event description"
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}

          <SelectDate data={data} setValue={setValue} />

          <Select
            value={selectedColor}
            onValueChange={(value) => {
              setSelectedColor(value);
              reset((formData) => ({
                ...formData,
                variant: getEventStatus(value),
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-4 h-4 rounded-full bg-${color.value}-500`}
                      ></span>
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" color="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save Event
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
