import React, { FC } from 'react';
import { Modal } from 'antd';
import './style.scss';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: React.ReactNode;
  width?: any,
}

const CustomModal: FC<GenericModalProps> = ({ isOpen, onClose, component , width }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      className='custom-modal'
      width={width}
    >
      {component}
    </Modal>
  );
};

export default CustomModal;
