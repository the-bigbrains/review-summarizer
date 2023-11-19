import { Icon } from "@iconify/react";
import Modal from "./Modal";
import TitleBar from "./TitleBar";

interface Props {
  visible: boolean;
  pos: { x: number; y: number };
  raw?: string;
  close: () => void;
}

const HoverModal = (props: Props) => {
  return (
    <Modal
      className={`${
        props.visible ? "block" : "hidden"
      } absolute z-10 max-w-xs p-3 pt-1 `}
      style={{ left: props.pos.x, top: props.pos.y }}
    >
      <TitleBar className="items-end">
        <Modal onClick={props.close} className="w-fit p-1">
          {/** Close **/}
          <Icon
            icon="ph:x-bold"
            height={16}
            width={16}
            className="text-black"
          />
        </Modal>
      </TitleBar>
      {props.raw ? props.raw : "No data"}
    </Modal>
  );
};

export default HoverModal;
