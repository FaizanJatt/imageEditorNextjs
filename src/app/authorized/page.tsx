"use client"; // This is a client component
import Image from "next/image";
import SideSection from "../components/SideSection";
import HeaderSection from "../components/HeaderSection";
import { useEffect, useState } from "react";
type ImageActionType = "Text" | null;
export default function Authorized() {
  const [img, setImg] = useState<Blob>();
  const [currentAction, setCurrentAction] = useState<ImageActionType>(null);
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(img);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [img]);

  const imageOnClickHandler = () => {
    if (preview) {
    }
  };

  return (
    <main className="flex min-h-screen flex-row  ">
      <SideSection
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
      />
      <div className="flex-1">
        <HeaderSection setImg={setImg} />
        <div className="text-[#C6A15A]  flex-1 bg-gradient-to-br from-50% from-[#C6A15A] via-30%  to-[#161616] via-[#252525]    h-full">
          {preview && (
            <button onClick={imageOnClickHandler}>
              <Image
                src={preview}
                alt="user Uploaded Img"
                width={400}
                height={400}
                className="h-full"
              />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
