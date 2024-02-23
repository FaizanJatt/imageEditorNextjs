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
    <div className="flex h-20  w-full justify-between items-center pl-6  shadow-sm shadow-blue-100     bg-white text-blue-500 font-bold">
      <div className="flex-row flex gap-3 justify-center items-center ">
        <div className="text-[#7892bd]"> Image Editor</div>
        {/* <div className="h-14 w-7 rotate-45 "> */}
        <Image src={BgDesign} alt="Hourglass Vector" className="" />
        {/* </div> */}
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
          <p className="text-[#6684b4]">Upload Image</p>
        </button>
      </div>
    </div>
  );
}
