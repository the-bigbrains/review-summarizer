import Modal from "./Modal";

interface Props {
  visible: boolean;
  pos: { x: number; y: number };
  raw?: string;
  close: () => void;
}

const HoverModal = (props: Props) => {
  return (
    <Modal
      className={`${props.visible ? "block" : "hidden"} absolute z-10`}
      style={{ left: props.pos.x, top: props.pos.y }}
    >
      <button onClick={props.close}>close</button>
      {props.raw ? props.raw : "No data"}
    </Modal>
  );
};

export default HoverModal;
