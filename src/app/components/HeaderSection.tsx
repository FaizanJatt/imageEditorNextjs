import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
} from "react";
import BgDesign from "../../assets/HourglassDesign.svg";
import Image from "next/image";
type TextBoxArrType = Array<{
  x: number;
  y: number;
  text?: string;
  key: string;
  width: number;
  height: number;
  bold: boolean;
  italics: boolean;
  color: string;
  fontSize: number;
  isFocused: boolean;
}>;

interface HeaderSectionsProps {
  setImg: any;
  img: Blob | undefined;
  setTextBoxArr: Dispatch<SetStateAction<TextBoxArrType>>;
}
export default function HeaderSection(props: HeaderSectionsProps) {
  const setImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("IMG HANDLER 1");
    if (!e.target.files) {
      props.setImg(undefined);
      return;
    }
    if (props.img) {
      props.setTextBoxArr([]);
    }
    props.setImg(e.target.files[0]);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-20 flex-1  justify-between items-center pl-6 bg-[#151010] text-[#C6A15A]">
      <div className="flex-row flex gap-3">
        <div> Image Editor</div>
        <div className="h-7 w-7 rotate-12">
          <Image src={BgDesign} alt="Hourglass Vector" className="" />
        </div>
      </div>
      <div className="pr-20">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={setImgHandler}
          className=" -z-30 absolute hidden"
        />
        <button onClick={() => fileInputRef.current?.click()}>
          <p>Upload Image</p>
        </button>
      </div>
    </div>
  );
}
