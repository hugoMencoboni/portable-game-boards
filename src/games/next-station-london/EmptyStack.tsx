interface EmptyStackProps {
  width: string;
  height: string;
}

const EmptyStack = ({ width, height }: EmptyStackProps) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: "5px",
        border: "1px dashed white",
      }}
    />
  );
};

export default EmptyStack;
