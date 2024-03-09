import { memo, useState } from "react";
import useEncryptStore from "../../hooks/useEncryptStore";
import { getDataUrl } from "../../utils/files-utils";

const EncryptedData = memo(({ data }: { data: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <i
      onClick={handleCopy}
      tabIndex={0}
      style={{
        cursor: "pointer",
        maxWidth: "100ch",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {data.slice(0, 50)}
    </i>
  );
});

const FileEncrypterHelper = () => {
  const key = useEncryptStore((state) => state.key);
  const encrypt = useEncryptStore((state) => state.encrypt);
  const decrypt = useEncryptStore((state) => state.decrypt);

  const [encryptedFiles, setEncryptedFiles] = useState<
    Array<{ name: string; encryptedSrc: string; decryptedSrc: string }>
  >([]);

  const handleOnDrop = async (event: any) => {
    event.preventDefault();

    if (event.dataTransfer.items && key) {
      const newEncryptedFilesPromises = [...event.dataTransfer.items]
        .filter((item) => item.kind === "file")
        .map(async (item) => {
          const file = item.getAsFile();
          const dataUrl = await getDataUrl(file);
          const encryptedSrc = await encrypt(dataUrl);
          const decryptedSrc = await decrypt(encryptedSrc);
          return {
            name: file.name as string,
            encryptedSrc,
            decryptedSrc: decryptedSrc as string,
          };
        });

      const newEncryptedFiles = await Promise.all(newEncryptedFilesPromises);
      setEncryptedFiles(newEncryptedFiles);
    }
  };

  const handleOnDragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "100px",
        }}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
      >
        <p>Drop image.</p>
      </div>
      {encryptedFiles.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {encryptedFiles.map((file) => (
            <div key={file.name}>
              {file.name}: <EncryptedData data={file.encryptedSrc} />
              <img
                src={file.decryptedSrc}
                alt={file.name}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(FileEncrypterHelper);
