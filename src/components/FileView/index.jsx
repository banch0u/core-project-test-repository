import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";

const FileView = ({ fileBase64, type, originalName, zoom }) => {
  const viewer = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setImageUrl(null); // Reset imageUrl when the fileBase64 changes
  }, [fileBase64]);

  useEffect(() => {
    if (!fileBase64) return; // Check if fileBase64 is provided
    setImageUrl(null);
    const viewerElement = document.createElement("div");
    viewerElement.style.height = "100%";

    if (
      viewer.current &&
      type !== ".png" &&
      type !== ".jpg" &&
      type !== ".jpeg"
    ) {
      const initializeViewer = async () => {
        const instance = await WebViewer(
          {
            path: "/webviewer/lib",
            initialDoc: "",
            licenseKey:
              "demo:1715974646770:7fc4814b03000000009d860e839eb92d0cb3bffc0684d8e728af3174a6", // sign up to get a free trial key at https://dev.apryse.com
            fullAPI: true,
            disabledElements: [
              "header",
              "toolsHeader",
              "viewControlsButton",
              "searchButton",
              "panToolButton",
              "pageNavOverlay",
              "leftPanel",
              "leftPanelButton",
              "rightPanel",
              "rightPanelButton",
              "annotationEdit",
              "textPopup",
              "contextMenuPopup",
              "marqueeToolButton",
              "highlightToolButton",
              "underlineToolButton",
              "strikeoutToolButton",
              "squigglyToolButton",
              "freeHandToolButton",
              "stickyToolButton",
              "notePanel",
              "shapeToolGroupButton",
              "zoomOverlay",
              "textInsertToolButton",
              "eraserToolButton",
              "signaturePanel",
              "signatureToolButton",
              "textSelectToolButton",
              "viewControlsOverlay",
              "formToolsButton",
              "toolbarGroup-Annotate",
              "toolbarGroup-Edit",
              "toolbarGroup-Insert",
              "toolbarGroup-FillAndSign",
              "toolbarGroup-Measure",
              "toolbarGroup-Redact",
            ],
          },
          viewer.current
        );
        const { Core } = instance;
        if (windowWidth <= 2050 && windowWidth >= 1950) {
          Core.documentViewer.addEventListener("documentLoaded", () => {
            Core.documentViewer.zoomTo(1.25);
          });
        } else if (windowWidth < 1950 && windowWidth >= 1750) {
          Core.documentViewer.addEventListener("documentLoaded", () => {
            Core.documentViewer.zoomTo(1.15);
          });
        } else if (windowWidth < 1750 && windowWidth >= 1550) {
          Core.documentViewer.addEventListener("documentLoaded", () => {
            Core.documentViewer.zoomTo(1.02);
          });
        } else if (windowWidth < 1550 && windowWidth >= 1300) {
          Core.documentViewer.addEventListener("documentLoaded", () => {
            Core.documentViewer.zoomTo(0.86);
          });
        }

        const byteCharacters = atob(fileBase64);
        if (type === ".pdf") {
          const byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          const blob = new Blob(byteArrays, { type: "application/pdf" });
          Core.documentViewer.loadDocument(blob, { filename: originalName });
        } else if (type === ".docx" || type === ".doc") {
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          Core.documentViewer.loadDocument(blob, { filename: originalName });
        }
      };
      initializeViewer();
      return () => {
        if (viewerElement) {
          viewerElement.remove();
        }
      };
    } else {
      const convertBase64ToBlob = () => {
        const byteCharacters = atob(fileBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: `image/${type.substring(1)}`,
        });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      };

      convertBase64ToBlob();

      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl); // Revoke the previous blob URL
        }
      };
    }
  }, [fileBase64, originalName, type, windowWidth]);

  return (
    <>
      {type === ".png" || type === ".jpg" || type === ".jpeg" ? (
        <div style={{ height: zoom ? "82vh" : "61vh", overflow: "auto" }}>
          <img style={{ width: "100%" }} src={imageUrl} alt={originalName} />
        </div>
      ) : (
        <div key={originalName} style={{ height: "100%" }} ref={viewer}></div>
      )}
    </>
  );
};

export default FileView;
