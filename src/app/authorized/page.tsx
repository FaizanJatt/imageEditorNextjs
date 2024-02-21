"use client"; // This is a client component
import SideSection from "../components/SideSection";
import HeaderSection from "../components/HeaderSection";
import { useEffect, useRef, useState } from "react";
type ImageActionType = "Text" | "Move" | null;
type TextBoxArrType = Array<{
  x: number;
  y: number;
  text?: string;
  key: string;
  width: number;
  height: number;
  bold: boolean;
  italics: boolean;
  underline: boolean;
  fontSize: number;
  isFocused: boolean;
}>;

const fontSizeArr = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26];
export default function Authorized() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [img, setImg] = useState<Blob>();
  const [currentAction, setCurrentAction] = useState<ImageActionType>(null);
  const [preview, setPreview] = useState<string>();
  const [TextBoxArr, setTextBoxArr] = useState<TextBoxArrType>([]);
  const [currentMoveTarget, setCurrentMoveTarget] = useState<string>("");
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

  useEffect(() => {
    applyFx();
  }, [img, preview]);

  const applyFx = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = new Image();
    image.src = preview;

    image.onload = () => {
      if (canvas && context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.save();

        // context.translate(translateX, translateY);
        // context.scale(zoom, zoom);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        context.restore();
      }
    };
  };

  function onChange(key: string, text?: string) {
    const index = TextBoxArr.findIndex((i) => i.key === key);
    if (index === -1) return;

    setTextBoxArr((prev) => {
      const arr = [...prev];
      arr[index] = { ...arr[index], text };
      return arr;
    });
  }

  const imageOnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (preview && currentAction === "Text") {
      setTextBoxArr((prev) => [
        ...prev,
        {
          x: e.clientX,
          y: e.clientY,
          key: `T+${Math.floor(Math.random() * 9999)} `,
          height: 60,
          width: 250,
          bold: false,
          italics: false,
          underline: false,
          fontSize: 14,
          isFocused: false,
          text: "",
        },
      ]);
      setCurrentAction("Move");
    }
  };

  const setCurrentMoveTargetHandler = (key: string) => {
    if (currentAction === "Move") {
      setCurrentMoveTarget(key);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-row  "
      style={{ cursor: currentAction || "auto" }}
    >
      <SideSection
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
      />
      <div className="flex-1">
        <HeaderSection setImg={setImg} />
        <div className="text-[#C6A15A]  flex-1 bg-gradient-to-br from-50% from-[#C6A15A] via-30%  to-[#161616] via-[#252525]    h-full">
          {preview && (
            <div
              onClick={imageOnClickHandler}
              onMouseMove={(e) => {
                if (currentAction === "Move" && currentMoveTarget !== "") {
                  const key = currentMoveTarget;
                  const index = TextBoxArr.findIndex((i) => i.key === key);
                  setTextBoxArr((prev) => {
                    const arr = [...prev];
                    arr[index] = {
                      ...arr[index],
                      x: e.pageX,
                      y: e.pageY,
                    };
                    return arr;
                  });
                }
              }}
            >
              {/* <Image
                src={preview}
                alt="user Uploaded Img"
                width={50}
                height={50}
                style={{
                  cursor: currentAction || "auto",
                  width: "auto",
                  height: "auto",
                }}
              /> */}
              <canvas
                className=" "
                ref={canvasRef}
                style={{
                  cursor: currentAction || "auto",
                  width: "auto",
                  height: "auto",
                }}
              />

              {TextBoxArr.map((textBox) => {
                const ChangeFormattingHandler = (
                  name:
                    | "bold"
                    | "italics"
                    | "underline"
                    | "isFocused"
                    | "fontSize",
                  key: string,
                  val?: boolean | number
                ) => {
                  const index = TextBoxArr.findIndex((i) => i.key === key);
                  if (index === -1) return;

                  setTextBoxArr((prev) => {
                    const arr = [...prev];
                    arr[index] = {
                      ...arr[index],
                      [name]: val ? val : !arr[index][name],
                    };
                    return arr;
                  });
                };
                return (
                  <div
                    className={`p-5 z-30 bg-transparent    absolute  `}
                    key={textBox.key}
                    style={{
                      left: textBox.x / 2,
                      top: textBox.y,
                    }}
                    onClick={(e) => {
                      if (
                        preview &&
                        currentAction === "Move" &&
                        currentMoveTarget !== ""
                      ) {
                        setCurrentMoveTarget("");
                        setCurrentAction(null);
                      }
                      e.stopPropagation();
                    }}
                  >
                    <div
                      onFocus={() =>
                        ChangeFormattingHandler("isFocused", textBox.key, true)
                      }
                      onBlur={(e) => {
                        setTimeout(() => {
                          ChangeFormattingHandler(
                            "isFocused",
                            textBox.key,
                            false
                          );
                        }, 1500);
                      }}
                      style={{
                        cursor: "move",
                      }}
                      className="border-solid border-8 border-transparent"
                    >
                      <input
                        name={textBox.key}
                        style={{
                          width: textBox.width,
                          height: textBox.height,
                          fontSize: textBox.fontSize,
                        }}
                        className={`pl-2 bg-inherit  text-black  border-black ${
                          textBox.bold && "font-bold"
                        } ${textBox.italics && "italic"} ${
                          textBox.underline && "underline"
                        } ${
                          currentAction === "Move" && "border-solid border-2"
                        }`}
                        value={textBox.text}
                        onClick={() => setCurrentMoveTargetHandler(textBox.key)}
                        onChange={(e) => onChange(textBox.key, e.target.value)}
                      />
                      {textBox.isFocused && (
                        <div className="flex flex-1 h-8 justify-center items-center gap-5 bg-[#141414]">
                          <button
                            onClick={(e) =>
                              ChangeFormattingHandler("bold", textBox.key)
                            }
                            data-name="bold"
                            className="p-2 font-bold"
                          >
                            B
                          </button>
                          <button
                            className="p-2 italic"
                            onClick={(e) =>
                              ChangeFormattingHandler("italics", textBox.key)
                            }
                            data-name="italics"
                          >
                            I
                          </button>
                          <button
                            className="p-2 underline"
                            onClick={(e) =>
                              ChangeFormattingHandler("underline", textBox.key)
                            }
                            data-name="underline"
                          >
                            U
                          </button>

                          <select
                            value={textBox.fontSize}
                            className="bg-inherit"
                            onChange={(e) =>
                              ChangeFormattingHandler(
                                "fontSize",
                                textBox.key,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {fontSizeArr.map((fontSize) => {
                              return (
                                <option
                                  key={textBox.key + fontSize}
                                  value={fontSize}
                                >
                                  {fontSize}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
