import { CheckCircleIcon } from "@heroicons/react/24/outline";
interface CheckBoxProps {
  checked: boolean;
}
export default function CheckBox({ checked }: CheckBoxProps) {
  return (
    <>
      {checked ? (
        <CheckCircleIcon className="h-6 w-6 fill-green-500 duration-500 ease-in-out hover:scale-125 cursor-pointer" />
      ) : (
        <CheckCircleIcon className="h-6 w-6 duration-500 ease-in-out hover:scale-125 cursor-pointer" />
      )}
    </>
  );
}
