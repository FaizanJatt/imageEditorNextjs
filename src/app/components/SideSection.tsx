import Image from "next/image";
import TextIcon from "../../assets/Text.svg";
import DragIcon from "../../assets/drag.svg";
import DownloadIcon from "../../assets/download.svg";
import { Dispatch, SetStateAction } from "react";

type ImageActionType = "Text" | "Move" | "Download" | null;

interface SideSectionProps {
  setCurrentAction: Dispatch<SetStateAction<ImageActionType>>;
  currentAction: ImageActionType;
  download: (download?: boolean) => void;
}
export default function SideSection({
  setCurrentAction,
  currentAction,
  download,
}: SideSectionProps) {
  const selectionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: ImageActionType
  ) => {
    setCurrentAction(action);
  };

  const isSelected = (actiontype: ImageActionType) => {
    if (actiontype === currentAction) {
      return "bg-gradient-to-br from-10% from-blue-200 via-30%  to-[white] via-blue-200 rounded-xl  ";
    }
  };

  return (
    <div className=" pt-10 justify-start items-center flex bg-[#e2e2e24f]  flex-col w-20 gap-12      text-[#7892bd] font-bold">
      {/* <div className="flex pt-16 w-full flex-col  gap-12   justify-center  items-center"> */}

      <button onClick={(e) => selectionHandler({ ...e }, "Text")}>
        <Image
          src={TextIcon}
          alt="Text Edit Icon"
          width={50}
          height={50}
          className={`p-1 w-15  ${isSelected("Text")}`}
        />
        <p className="text-xs ">Add text</p>
      </button>
      <div
        onClick={() => setCurrentAction("Move")}
        className={` w-15 flex-col font-mono justify-center items-center flex text-xs h-12  p-1  
        )}`}
      >
        <Image
          src={DragIcon}
          alt="Text Edit Icon"
          width={50}
          height={50}
          className={`p-1 w-15  ${isSelected("Move")}`}
        />
        <p>Move Text</p>
      </div>
      {/* <div className="font-mono text-xs flex justify-center items-center">
        Border
      </div> */}
      <div
        onClick={() => download(true)}
        className="p-1  justify-center  items-center flex flex-col font-mono text-xs"
      >
        <Image
          src={DownloadIcon}
          alt="Text drag Icon"
          width={50}
          height={50}
          className={`p-1 w-15  `}
        />
        <p>Save</p>
      </div>
    </div>
    // </div>
  );
}
