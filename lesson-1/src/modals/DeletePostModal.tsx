import { FC } from 'react';
import { Modal, ModalProps, Space } from 'antd';
import usePostStore from '../hooks/usePostStore';

interface Props extends Omit<ModalProps, 'open'> {
   open: boolean | number;
}

const DeletePostModal: FC<Props> = ({ open, onOk, onCancel, ...modalProps }) => {
   const removePost = usePostStore(state => state.removePost);

   return (
      <Modal
         title='Delete post'
         closable={false}
         open={!!open}
         okButtonProps={{
            danger: true,
         }}
         onOk={e => {
            removePost(+open);
            onOk?.(e);
         }}
         onCancel={onCancel}
         {...modalProps}
      >
         <p>Are you sure delete this post?</p>
      </Modal>
   );
};

export default DeletePostModal;
