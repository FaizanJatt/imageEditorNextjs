import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
} from "react";
import BgDesign from "../../assets/HourglassDesign.svg";
import Image from "next/image";
interface HeaderSectionsProps {
  setImg: any;
}
export default function HeaderSection(props: HeaderSectionsProps) {
  const setImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      props.setImg(undefined);
      return;
    }
    console.log(e.target.files[0]);
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
        <button onClick={() => console.log(fileInputRef.current?.click())}>
          <p>Upload Image</p>
        </button>
      </div>
    </div>
  );
}
