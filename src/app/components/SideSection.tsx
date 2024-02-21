import Image from "next/image";
import TextIcon from "../../assets/Text.svg";
import { Dispatch, SetStateAction } from "react";

type ImageActionType = "Text" | "Move" | null;

interface SideSectionProps {
  setCurrentAction: Dispatch<SetStateAction<ImageActionType>>;
  currentAction: ImageActionType;
}
export default function SideSection({
  setCurrentAction,
  currentAction,
}: SideSectionProps) {
  const selectionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: ImageActionType
  ) => {
    setCurrentAction(action);
  };

  const isSelected = (actiontype: ImageActionType) => {
    if (actiontype === currentAction) {
      return "bg-[#383434] ";
    }
  };

  return (
    <div className="pt-5 flex flex-col w-20 gap-5  bg-[#191817]  text-[#C6A15A]">
      <div className="flex h-12 pt-32 w-full flex-col  gap-12   justify-center  items-center">
        <button onClick={(e) => selectionHandler({ ...e }, "Text")}>
          <Image
            src={TextIcon}
            alt="Text Edit Icon"
            width={50}
            height={50}
            className={`p-1 rounded-3xl ${isSelected("Text")}`}
          />
        </button>
        <div className="">Save</div>
      </div>
    </div>
  );
}
