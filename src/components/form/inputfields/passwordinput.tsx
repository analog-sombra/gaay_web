import { Fa6RegularEye, Fa6RegularEyeSlash } from "@/components/icons";
import { Input } from "antd";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  title?: string;
  placeholder?: string;
  required?: boolean;
  disable?: boolean;
  maxlength?: number;
  extratax?: string;
};

export function PasswordInput<T extends FieldValues>(
  props: PasswordInputProps<T>
) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Get the error for this specific field
  const error = errors[props.name as keyof typeof errors];
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <>
          {props.title && (
            <div className="w-full flex flex-wrap">
              <label htmlFor={props.name} className="text-sm font-normal">
                {props.title}
                {props.required && <span className="text-rose-500">*</span>}
              </label>
              {props.extratax && (
                <p className="text-red-500 text-sm">{props.extratax}</p>
              )}
            </div>
          )}

          <Input.Password
            showCount={props.maxlength ? true : undefined}
            maxLength={props.maxlength ?? undefined}
            status={error ? "error" : undefined}
            className="w-full"
            value={field.value}
            disabled={props.disable ?? false}
            iconRender={(visible) =>
              visible ? <Fa6RegularEye /> : <Fa6RegularEyeSlash />
            }
            onChange={(e) => {
              if (!e) return;
              const { value } = e.target;

              field.onChange(value);
            }}
            placeholder={props.placeholder ?? undefined}
          />
          {error && (
            <p className="text-xs text-red-500">{error.message?.toString()}</p>
          )}
        </>
      )}
    />
  );
}
